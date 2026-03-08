# Cloud Resume Challenge - AOL 90s Themes

A serverless cloud resume built on AWS, styled as a fully interactive Windows 95 + AOL desktop experience. Built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).

**Live Site:** [maliksresume.click](https://maliksresume.click)

---

## Architecture

```
                        +-------------------+
                        |   Route 53 DNS    |
                        | maliksresume.click|
                        +--------+----------+
                                 |
                                 v
                        +-------------------+
                        |    CloudFront     |
                        |   Distribution    |
                        +--------+----------+
                                 |
                   +-------------+-------------+
                   |                           |
                   v                           v
          +--------+--------+        +---------+---------+
          |   S3 Bucket     |        |   API Gateway     |
          |  Static Site    |        |   (HTTP API)      |
          |  HTML/CSS/JS    |        |   GET /count      |
          +-----------------+        +---------+---------+
                                               |
                                               v
                                     +---------+---------+
                                     |     Lambda        |
                                     |    (Python)       |
                                     +---------+---------+
                                               |
                                               v
                                     +---------+---------+
                                     |    DynamoDB       |
                                     |  Visitor Counter  |
                                     +-------------------+
```

## AWS Services Used

| Service | Purpose |
|---------|---------|
| **S3** | Hosts static website files (HTML, CSS, JS) |
| **CloudFront** | CDN for HTTPS and global distribution |
| **Route 53** | DNS management for custom domain |
| **ACM** | SSL/TLS certificate for HTTPS |
| **API Gateway** | HTTP API endpoint for visitor counter |
| **Lambda** | Serverless function to increment/return visitor count |
| **DynamoDB** | NoSQL database storing visitor count |
| **IAM** | Role and policies for Lambda execution |

## Project Structure

```
malik-aol-resume/
├── index.html              # Main website (Windows 95 + AOL UI)
├── style.css               # Full styling and responsive design
├── script.js               # Interactive JS (window management, API calls)
├── lambda/
│   ├── lambda_function.py  # Visitor counter Lambda (Python)
│   └── test_lambda.py      # Unit tests for Lambda
├── terraform/
│   ├── provider.tf         # AWS provider configuration
│   ├── variables.tf        # Configurable variables
│   ├── dynamodb.tf         # DynamoDB table
│   ├── lambda.tf           # Lambda function + IAM role
│   ├── api_gateway.tf      # HTTP API Gateway
│   ├── s3.tf               # S3 bucket + policy
│   ├── cloudfront.tf       # CloudFront distribution
│   ├── route53.tf          # DNS records
│   └── outputs.tf          # Output values
└── README.md
```

## Features

- **Retro UI** - Pixel-perfect Windows 95 desktop with AOL toolbar, draggable windows, buddy list, and start menu
- **Serverless Backend** - Visitor counter powered by API Gateway + Lambda + DynamoDB
- **Infrastructure as Code** - All AWS resources defined in Terraform
- **Responsive Design** - Fully functional on mobile with touch-friendly navigation
- **Easter Eggs** - Dial-up loading screen, "You've Got Mail" notification, shutdown screen, away messages

## Technologies

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Python (AWS Lambda), boto3
- **Database:** Amazon DynamoDB
- **Infrastructure:** Terraform
- **Cloud:** AWS (S3, CloudFront, Route 53, ACM, API Gateway, Lambda, DynamoDB, IAM)

## Cloud Resume Challenge Checklist

- [x] HTML resume
- [x] Styled with CSS
- [x] Deployed to S3 as static website
- [x] HTTPS via CloudFront
- [x] Custom DNS with Route 53
- [x] Visitor counter (JavaScript)
- [x] Visitor counter API (API Gateway + Lambda)
- [x] Database for counter (DynamoDB)
- [x] Python Lambda function
- [x] Tests for Lambda
- [x] Infrastructure as Code (Terraform)
- [ ] CI/CD (GitHub Actions) - Coming soon

---

Built by **Malik Stevenson** | [LinkedIn](https://linkedin.com/in/Malik-Stevenson) | [GitHub](https://github.com/maliii96)
