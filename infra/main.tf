locals {
  name        = "${var.project_name}-${var.environment}"
  tags        = { Project = var.project_name, Environment = var.environment, ManagedBy = "Terraform" }
  app_secrets = jsondecode(data.aws_secretsmanager_secret_version.app.secret_string)
}

# Read only during deployment. Lambda makes no runtime Secrets Manager call.
data "aws_secretsmanager_secret" "app" {
  name = var.app_secret_name
}
data "aws_secretsmanager_secret_version" "app" {
  secret_id = data.aws_secretsmanager_secret.app.id
}

resource "aws_vpc" "this" {
  cidr_block = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = merge(local.tags, { Name = "${local.name}-vpc" })
}

resource "aws_subnet" "private" {
  for_each = toset(var.availability_zones)
  vpc_id = aws_vpc.this.id
  availability_zone = each.value
  cidr_block = cidrsubnet(var.vpc_cidr, 8, index(var.availability_zones, each.value))
  tags = merge(local.tags, { Name = "${local.name}-private-${each.value}" })
}

resource "aws_route_table" "private" {
  for_each = toset(var.availability_zones)
  vpc_id = aws_vpc.this.id
  tags = merge(local.tags, { Name = "${local.name}-private-rt-${each.value}" })
}
resource "aws_route_table_association" "private" {
  for_each = aws_subnet.private
  subnet_id = each.value.id
  route_table_id = aws_route_table.private[each.key].id
}

# Free private path from Lambda to DynamoDB; no NAT, EIP or Internet gateway.
resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id = aws_vpc.this.id
  service_name = "com.amazonaws.${var.aws_region}.dynamodb"
  vpc_endpoint_type = "Gateway"
  route_table_ids = [for route_table in aws_route_table.private : route_table.id]
  tags = merge(local.tags, { Name = "${local.name}-dynamodb" })
}

resource "aws_security_group" "lambda" {
  name = "${local.name}-lambda"
  description = "Lambda access to private RDS and DynamoDB"
  vpc_id = aws_vpc.this.id
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = local.tags
}
resource "aws_security_group" "rds" {
  name = "${local.name}-rds"
  description = "MySQL access from the Cinephoria Lambda only"
  vpc_id = aws_vpc.this.id
  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    security_groups = [aws_security_group.lambda.id]
  }
  tags = local.tags
}

resource "random_password" "rds" {
  length = 32
  # RDS MySQL rejects several characters that the random provider can generate.
  # A 32-character alphanumeric password remains appropriate for this training project.
  special = false
  keepers = {
    password_policy_version = "rds-mysql-alphanumeric-v1"
  }
}
resource "aws_db_subnet_group" "this" {
  name = "${local.name}-rds"
  subnet_ids = [for subnet in aws_subnet.private : subnet.id]
  tags = local.tags
}
resource "aws_db_instance" "mysql" {
  identifier = local.name
  engine = "mysql"
  engine_version = "8.4"
  instance_class = var.db_instance_class
  allocated_storage = 20
  max_allocated_storage = 100
  storage_type = "gp3"
  storage_encrypted = true
  db_name = var.db_name
  username = var.db_username
  password = random_password.rds.result
  port = 3306
  db_subnet_group_name = aws_db_subnet_group.this.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible = false
  multi_az = var.rds_multi_az
  deletion_protection = var.rds_deletion_protection
  skip_final_snapshot = var.rds_skip_final_snapshot
  backup_retention_period = 7
  auto_minor_version_upgrade = true
  copy_tags_to_snapshot = true
  final_snapshot_identifier = "${local.name}-final"
  apply_immediately = false
  tags = local.tags
}

resource "aws_dynamodb_table" "movie_sales" {
  name = "${local.name}-movie-sales"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
  tags = local.tags
}

resource "aws_iam_role" "lambda" {
  name = "${local.name}-lambda"
  assume_role_policy = jsonencode({ Version = "2012-10-17", Statement = [{ Effect = "Allow", Action = "sts:AssumeRole", Principal = { Service = "lambda.amazonaws.com" } }] })
  tags = local.tags
}
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
resource "aws_iam_role_policy_attachment" "lambda_vpc" {
  role = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "${local.name}-dynamodb-sales"
  role = aws_iam_role.lambda.id
  policy = jsonencode({ Version = "2012-10-17", Statement = [{ Effect = "Allow", Action = ["dynamodb:PutItem", "dynamodb:Scan"], Resource = aws_dynamodb_table.movie_sales.arn }] })
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${local.name}"
  retention_in_days = 30
  tags = local.tags
}
resource "aws_lambda_function" "api" {
  function_name = local.name
  role = aws_iam_role.lambda.arn
  runtime = "nodejs22.x"
  handler = "dist/lambda.handler"
  filename = var.lambda_zip_path
  source_code_hash = filebase64sha256(var.lambda_zip_path)
  timeout = 29
  memory_size = 1024
  architectures = ["arm64"]
  environment {
    variables = {
      NODE_ENV = "production"
      CORS_ORIGINS = join(",", var.frontend_origins)
      SECRET_TOKEN = local.app_secrets.SECRET_TOKEN
      MYSQL_DB_HOST = aws_db_instance.mysql.address
      MYSQL_DB_PORT = tostring(aws_db_instance.mysql.port)
      MYSQL_DB_USERNAME = var.db_username
      MYSQL_DB_PASSWORD = random_password.rds.result
      MYSQL_DB_DATABASE = var.db_name
      DYNAMODB_TABLE_NAME = aws_dynamodb_table.movie_sales.name
    }
  }
  vpc_config {
    subnet_ids = [for subnet in aws_subnet.private : subnet.id]
    security_group_ids = [aws_security_group.lambda.id]
  }
  depends_on = [aws_cloudwatch_log_group.lambda]
  tags = local.tags
}

resource "aws_apigatewayv2_api" "http" {
  name = "${local.name}-http"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = var.frontend_origins
    allow_methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    allow_headers = ["Authorization", "Content-Type"]
    allow_credentials = true
    max_age = 86400
  }
  tags = local.tags
}
resource "aws_apigatewayv2_integration" "lambda" {
  api_id = aws_apigatewayv2_api.http.id
  integration_type = "AWS_PROXY"
  integration_uri = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}
resource "aws_apigatewayv2_route" "proxy" {
  api_id = aws_apigatewayv2_api.http.id
  route_key = "$default"
  target = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}
resource "aws_cloudwatch_log_group" "api" {
  name = "/aws/apigateway/${local.name}"
  retention_in_days = 30
  tags = local.tags
}
resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.http.id
  name = "$default"
  auto_deploy = true
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api.arn
    format = jsonencode({ requestId = "$context.requestId", status = "$context.status", routeKey = "$context.routeKey", integrationError = "$context.integrationErrorMessage" })
  }
  tags = local.tags
}
resource "aws_lambda_permission" "api_gateway" {
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.http.execution_arn}/*/*"
}
