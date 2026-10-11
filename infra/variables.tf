variable "project_name" {
  description = "Name used to prefix AWS resources."
  type        = string
  default     = "cinephoria"
}

variable "environment" {
  description = "Deployment environment, for example dev or prod."
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region hosting the API and RDS."
  type        = string
  default     = "eu-west-3"
}

variable "vpc_cidr" {
  type        = string
  default     = "10.30.0.0/16"
}

variable "availability_zones" {
  description = "Exactly two AZs in the selected region."
  type        = list(string)
  default     = ["eu-west-3a", "eu-west-3b"]
}

variable "app_secret_name" {
  description = "Existing Secrets Manager secret containing SECRET_TOKEN."
  type        = string
  default     = "cinephoria"
}

variable "lambda_zip_path" {
  description = "Relative or absolute path to the Lambda zip produced by npm run package:lambda."
  type        = string
  default     = "../dist/cinephoria-api.zip"
}

variable "frontend_origins" {
  description = "CloudFront/S3 origins permitted by API CORS. Keep this list in sync with src/main.ts."
  type        = list(string)
  default = [
    "https://dykoa3a9xthu7.cloudfront.net",
  ]
  validation {
    condition     = length(var.frontend_origins) > 0
    error_message = "At least one frontend origin is required for CORS."
  }
}

variable "db_name" {
  type    = string
  default = "cinephoria"
}

variable "db_username" {
  type    = string
  default = "cinephoria_admin"
}

variable "db_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "rds_multi_az" {
  type    = bool
  default = false
}

variable "rds_deletion_protection" {
  type    = bool
  default = true
}

variable "rds_skip_final_snapshot" {
  description = "Set false in production so destroy requires a final snapshot."
  type        = bool
  default     = false
}

