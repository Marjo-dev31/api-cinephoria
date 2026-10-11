output "api_url" {
  description = "Public HTTP API URL to use from the CloudFront frontend."
  value       = aws_apigatewayv2_api.http.api_endpoint
}

output "rds_endpoint" {
  description = "Private RDS endpoint."
  value       = aws_db_instance.mysql.address
}

output "dynamodb_movie_sales_table" {
  description = "DynamoDB table holding movie sale records."
  value       = aws_dynamodb_table.movie_sales.name
}
