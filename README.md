# 📡 Cloud Resume Challenge — AOL 90s Edition

> _"Dialing... 📞 Verifying password... 🔐 Welcome! You've got a resume!"_

My take on the [Cloud Resume Challenge](https://cloudresumechallenge.dev/) — but instead of a boring static page, I built a fully interactive **Windows 95 + AOL desktop** from scratch. Draggable windows, a buddy list, dial-up sounds, "You've Got Mail" popups, and a working Start menu. If you grew up on AIM away messages and 56K modems, this one's for you.

🔗 **Live Site:** [maliksresume.click](https://maliksresume.click)

---

## 🖥️ What It Looks Like

```
╔═══════════════════════════════════════════════════════╗
║  📡 Connecting To America Online...        _ □ ×     ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║           A M E R I C A   Online                      ║
║                                                       ║
║   🏃 ──────── 📡 ──────── 🎉                         ║
║                                                       ║
║   [████████████████████░░░░░░] 78%                    ║
║   Status: Verifying password...                       ║
║                                                       ║
║                  [ Cancel ]                           ║
╚═══════════════════════════════════════════════════════╝
```

Once you're "connected," you land on a full Windows 95 desktop with:
- 📄 **About Me.txt** — who I am and what I do
- 💼 **Experience.exe** — work history (Armis, U.S. Army)
- 🎓 **Education.doc** — B.S. in IT from WGU
- 🛠️ **Skills.dll** — System Properties-style skill breakdown
- 📬 **Contact.msg** — "You've Got Mail" contact form
- 🗂️ **Projects.zip** — portfolio of builds
- 📁 **Resume** — the full document, all in one window

Plus Easter eggs: away messages, buddy list, shutdown screen, and a visitor counter powered by a real serverless backend.

---

## ⚙️ Architecture

This isn't just HTML — there's a full AWS serverless backend running behind it.

```
    User visits maliksresume.click
              │
              ▼
       ┌──────────────┐
       │   Route 53   │  DNS → resolves domain
       └──────┬───────┘
              ▼
       ┌──────────────┐
       │  CloudFront   │  CDN → HTTPS + caching
       └──────┬───────┘
              │
      ┌───────┴────────┐
      ▼                ▼
┌───────────┐   ┌─────────────┐
│    S3     │   │ API Gateway │  GET /count
│  (site)   │   └──────┬──────┘
└───────────┘          ▼
               ┌──────────────┐
               │    Lambda    │  Python → increments counter
               └──────┬───────┘
                      ▼
               ┌──────────────┐
               │   DynamoDB   │  stores visitor count
               └──────────────┘
```

---

## 🧱 AWS Services I Used

| Service | What It Does |
|---------|-------------|
| **S3** | Hosts the static site (HTML, CSS, JS) |
| **CloudFront** | CDN for HTTPS and global edge caching |
| **Route 53** | DNS — maps my custom domain to CloudFront |
| **ACM** | SSL certificate so the site loads securely |
| **API Gateway** | Public HTTP endpoint that triggers my Lambda |
| **Lambda** | Python function that increments + returns the visitor count |
| **DynamoDB** | NoSQL database that holds the count |
| **IAM** | Role + policies so Lambda can access DynamoDB and CloudWatch |

---

## 📂 Project Structure

```
malik-aol-resume/
├── index.html                  # The full Win95 + AOL desktop UI
├── style.css                   # All the retro styling + responsive design
├── script.js                   # Window management, API calls, Easter eggs
├── lambda/
│   ├── lambda_function.py      # Visitor counter (Python + boto3)
│   └── test_lambda.py          # Unit tests with mocked DynamoDB
├── terraform/
│   ├── provider.tf             # AWS provider config
│   ├── variables.tf            # Domain, cert ARN, zone ID
│   ├── dynamodb.tf             # DynamoDB table
│   ├── lambda.tf               # Lambda function + IAM role
│   ├── api_gateway.tf          # HTTP API + route + stage
│   ├── s3.tf                   # S3 bucket + policy
│   ├── cloudfront.tf           # CloudFront distribution
│   ├── route53.tf              # DNS A record
│   └── outputs.tf              # API URL, CloudFront domain
├── .github/workflows/
│   └── deploy.yml              # CI/CD — test → deploy → invalidate cache
├── .gitignore
└── README.md                   # You're reading it 👋
```

---

## 🚀 CI/CD Pipeline

Every push to `main` triggers a GitHub Actions workflow:

```
git push origin main
        │
        ▼
┌───────────────┐
│  Run Tests    │  pytest on Lambda unit tests
└───────┬───────┘
        │ ✅ pass
   ┌────┴──────┐
   ▼           ▼
┌────────┐ ┌──────────┐
│ Deploy │ │  Deploy  │
│ Site   │ │  Lambda  │
│ to S3  │ │  to AWS  │
└───┬────┘ └──────────┘
    ▼
┌────────────────┐
│  Invalidate    │
│  CloudFront    │  so users see the latest version
└────────────────┘
```

Tests fail? Nothing deploys. Simple.

---

## 🔒 Security Notes

- AWS credentials stored as **GitHub Secrets** — never in code
- Lambda IAM role follows **least privilege** — only DynamoDB + CloudWatch access
- CORS headers set on the API so only browsers can call it
- All traffic over HTTPS via CloudFront + ACM

---

## ✨ Features

- 🎨 **Pixel-perfect retro UI** — Windows 95 desktop + AOL toolbar, built from scratch with vanilla CSS
- 🖱️ **Draggable windows** — click, drag, minimize, maximize, close — just like the real thing
- 📞 **Dial-up loading screen** — with progress bar and connection status messages
- 📬 **"You've Got Mail"** — notification popup with sound effect
- 👥 **Buddy List** — skills displayed as AIM buddies (Online, Away, Offline)
- 🪟 **Start Menu** — fully functional with all resume sections
- 📊 **Live visitor counter** — powered by API Gateway + Lambda + DynamoDB
- 📱 **Responsive** — works on mobile with touch-friendly navigation
- 🔌 **Shutdown screen** — because every Windows 95 experience needs one

---

## ✅ Cloud Resume Challenge Checklist

- [x] HTML resume
- [x] Styled with CSS
- [x] Static site deployed to S3
- [x] HTTPS via CloudFront
- [x] Custom DNS domain (Route 53)
- [x] JavaScript visitor counter
- [x] Backend API (API Gateway + Lambda)
- [x] Database (DynamoDB)
- [x] Python Lambda function
- [x] Unit tests for Lambda
- [x] Infrastructure as Code (Terraform)
- [x] CI/CD pipeline (GitHub Actions)

All 12 steps. Done. ✅

---

## 🧰 Tech Stack

**Frontend:** HTML, CSS, JavaScript (vanilla — no frameworks, no libraries)
**Backend:** Python 3.12, boto3
**Database:** Amazon DynamoDB
**Infrastructure:** Terraform
**CI/CD:** GitHub Actions
**Cloud:** AWS (S3, CloudFront, Route 53, ACM, API Gateway, Lambda, DynamoDB, IAM)

---

## 👤 About Me

**Malik Stevenson** — IT & Security Support Specialist, U.S. Army veteran, and WGU grad. I work in FedRAMP-compliant environments doing IAM, endpoint administration, and security operations. I build cloud projects on the side because I genuinely enjoy making things work — and making them look good while doing it.

📧 malikmstevenson@gmail.com
🤝 [LinkedIn](https://linkedin.com/in/Malik-Stevenson)
💾 [GitHub](https://github.com/maliii96)

---

_Built from scratch — no templates, no frameworks. Just HTML, CSS, JS, Python, AWS, and a whole lot of dial-up nostalgia._ 📡
