# Useful outputs after terraform apply
output "api_gateway_url" {
  description = "The URL of the visitor counter API"
  value       = "${aws_apigatewayv2_stage.prod.invoke_url}/count"
}

output "cloudfront_domain" {
  description = "The CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "The live website URL"
  value       = "https://${var.domain_name}"
}
