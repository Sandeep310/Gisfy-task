# 🚀 Three-Tier DevOps CI/CD Pipeline on AWS EKS using Jenkins, Docker, Kubernetes, Terraform & Argo CD

![AWS](https://img.shields.io/badge/AWS-EKS-orange?logo=amazonaws)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red?logo=jenkins)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blue?logo=kubernetes)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple?logo=terraform)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-orange?logo=argo)
![Trivy](https://img.shields.io/badge/Trivy-Security-green)
![License](https://img.shields.io/badge/License-Apache--2.0-blue)

---

# 📌 Project Overview

This project demonstrates an **end-to-end DevOps CI/CD pipeline** for deploying a **Full Stack Application** on **Amazon EKS**.

The project automates the complete software delivery lifecycle using **Jenkins**, **Docker**, **Trivy**, **Kubernetes**, **Terraform**, **Amazon EKS**, and **Argo CD**.

The application consists of:

- 🌐 React Frontend
- ⚙️ Backend API
- 🐘 PostgreSQL Database

---

# 🏗️ Architecture

```
                    Developer
                        │
                        ▼
                   GitHub Repository
                        │
                        ▼
                 Jenkins Pipeline
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
 Docker Build      Trivy Scan      Docker Hub
        │
        ▼
   Kubernetes Manifests
        │
        ▼
      Amazon EKS
        │
        ▼
     Kubernetes Cluster
        │
        ▼
     LoadBalancer Service
        │
        ▼
      React Frontend
        │
        ▼
      Backend API
        │
        ▼
      PostgreSQL
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| AWS EKS | Kubernetes Cluster |
| Terraform | Infrastructure as Code |
| Jenkins | CI/CD |
| Docker | Containerization |
| Docker Hub | Image Registry |
| Kubernetes | Container Orchestration |
| Argo CD | GitOps Deployment |
| Trivy | Container Security Scan |
| React | Frontend |
| Backend API | Business Logic |
| PostgreSQL | Database |
| Git & GitHub | Version Control |

---

# 📂 Project Structure

```
Gisfy-task
│
├── backend
├── frontend
├── database
├── kubernetes
│   ├── backend
│   ├── frontend
│   ├── database
│   ├── Ingress
│   ├── namespace.yaml
│   └── postgres-configmap.yaml
│
├── Infra
├── Jenkinsfile
├── docker-compose.yml
├── .github
├── README.md
└── LICENSE
```

---

# 🚀 Infrastructure Provisioning

Infrastructure is provisioned using **Terraform**.

Resources created:

- VPC
- Public Subnets
- Internet Gateway
- Route Tables
- IAM Roles
- Amazon EKS Cluster
- Worker Nodes

---

# 🐳 Docker

Three Docker Images are built.

- Backend
- Frontend
- PostgreSQL

Images are pushed to Docker Hub.

Example:

```
sndeep310/backend
sndeep310/frontend
sndeep310/postgres-db
```

---

# 🔒 Security Scanning

Each Docker Image is scanned using **Trivy** before deployment.

Scanned for:

- Critical Vulnerabilities
- High Vulnerabilities

---

# ☸ Kubernetes Resources

The application is deployed on Amazon EKS.

Resources used:

- Namespace
- Deployment
- Service
- ConfigMap
- Ingress

Deployments:

- Backend
- Frontend
- PostgreSQL

---

# ⚙ Jenkins Pipeline

Pipeline Stages:

```
Checkout Source

↓

Docker Login

↓

Build Backend Image

↓

Build Frontend Image

↓

Build PostgreSQL Image

↓

Trivy Scan Backend

↓

Trivy Scan Frontend

↓

Trivy Scan PostgreSQL

↓

Push Docker Images

↓

Configure kubectl

↓

Deploy to Amazon EKS

↓

Verify Deployment
```

---

# 🔄 CI/CD Workflow

```
Developer

↓

Git Push

↓

GitHub Repository

↓

Jenkins Pipeline

↓

Docker Build

↓

Trivy Scan

↓

Docker Hub

↓

Amazon EKS

↓

Kubernetes

↓

Application
```

---

# 🌍 Application Deployment

The application is exposed using:

- Kubernetes LoadBalancer Service

Application URL:

```
http://<LoadBalancer-DNS>
```

---

# 📸 Screenshots

## Jenkins Pipeline


<img width="100%" alt="Jenkins Pipeline" src="https://github.com/user-attachments/assets/fff9efde-66da-435f-a86c-bad0baa1c56d">

<br><br>

<img width="100%" alt="Jenkins Pipeline 2" src="https://github.com/user-attachments/assets/24d21cd5-dd10-468b-9480-977980fef835">




---

## Argo CD Dashboard


<img src="https://github.com/user-attachments/assets/e854794a-e9b4-4450-873d-b34bbe7a9f95">



---

## Kubernetes Pods


<img src="https://github.com/user-attachments/assets/2508c4a6-be16-466b-a556-c15f56b5a585">



---

## Docker Hub Images


<img src="https://github.com/user-attachments/assets/a5136e63-77d3-4c53-b5dc-959c5f6af022">



---

## Running Application


<img src="https://github.com/user-attachments/assets/fc57ec02-42ca-478e-a308-43b1192f388a">



---

# 📋 Prerequisites

- AWS Account
- Terraform
- Docker
- Jenkins
- kubectl
- AWS CLI
- Git
- Docker Hub Account

---

# ▶ Deployment Steps

### Clone Repository

```bash
git clone https://github.com/Sandeep310/Gisfy-task.git
```

### Provision Infrastructure

```bash
terraform init

terraform plan

terraform apply
```

### Configure Kubernetes

```bash
aws eks update-kubeconfig \
--region ap-south-1 \
--name eks-cluster
```

### Run Jenkins Pipeline

Build the Jenkins Job.

The pipeline automatically:

- Builds Images
- Scans Images
- Pushes Images
- Deploys to Amazon EKS

---

# 📈 Future Improvements

- Helm Charts
- Prometheus Monitoring
- Grafana Dashboards
- AWS Route53
- HTTPS using ACM
- Horizontal Pod Autoscaler
- Blue-Green Deployment
- Canary Deployment
- SonarQube Integration

---

# 👨‍💻 Author

**Jai Sandeep Gudimetla**

DevOps Engineer | AWS | Docker | Kubernetes | Jenkins | Terraform | Argo CD

GitHub:

https://github.com/Sandeep310

---

# ⭐ Support

If you found this project useful,

⭐ Star this repository.

---

# 📄 License

Licensed under the Apache 2.0 License.
