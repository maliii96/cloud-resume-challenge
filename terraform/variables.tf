variable "domain_name" {
  description = "The domain name for the resume site"
  type        = string
  default     = "maliksresume.click"
}

variable "s3_bucket_name" {
  description = "The S3 bucket name for the static site"
  type        = string
  default     = "maliksresume.click"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
  default     = "arn:aws:acm:us-east-1:066862724982:certificate/94436dbd-7cf1-4a65-aa5a-82718ec51e5a"
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID"
  type        = string
  default     = "Z00896483ARDHCTKJXSNF"
}
