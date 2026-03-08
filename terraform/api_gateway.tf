# HTTP API Gateway
resource "aws_apigatewayv2_api" "resume_api" {
  name          = "cloud-resume-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET"]
    allow_headers = ["Content-Type"]
  }

  tags = {
    Project = "cloud-resume-challenge"
  }
}

# Lambda integration
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.resume_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.visitor_counter.invoke_arn
  payload_format_version = "2.0"
}

# Route: GET /count
resource "aws_apigatewayv2_route" "get_count" {
  api_id    = aws_apigatewayv2_api.resume_api.id
  route_key = "GET /count"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# Deploy stage
resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.resume_api.id
  name        = "prod"
  auto_deploy = true

  tags = {
    Project = "cloud-resume-challenge"
  }
}
