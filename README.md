# 🚀 Scrapzee - Cloud-Native Microservices Platform

<div align="center">

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

**Enterprise-grade waste management platform showcasing progressive delivery, zero-trust networking, and GitOps automation**

[Overview](#-overview) • [DevOps Features](#-devops-features) • [Components](#-components) • [Quick Start](#-quick-start)

---


---

## 📖 Overview

Scrapzee is a production-ready scrap management platform built with microservices architecture, demonstrating advanced DevOps practices including canary deployments, network security policies, and automated GitOps workflows.

**What sets this project apart:**
- 🔨 CI/CD pipeline with GitHub Actions, Trivy scanning, and Docker Hub
- 🎯 Progressive delivery with Argo Rollouts
- 🔒 Zero-trust networking with security policies
- 🔄 GitOps automation with ArgoCD
- 📈 Auto-scaling with HPA (2-5 replicas)
- ⚡ Zero-downtime canary deployments

---

## 🚀 DevOps Features

### CI/CD Pipeline (GitHub Actions)
**Automated build and security scanning**:
- Docker containerization of all services
- Trivy security scanning for critical vulnerabilities
- Automated push to Docker Hub registry
- Multi-stage builds for optimized images

### Progressive Delivery (Argo Rollouts)
**Canary deployment strategy** with automated traffic shifting:
- Step 1: Deploy canary → 20% traffic
- Step 2-4: Gradual increase → 40%, 60%, 80%
- Step 5: Full promotion → 100%
- Automated rollback on health check failures

### Zero-Trust Networking
**10-layer network policy enforcement**:
1. Default deny all traffic
2. DNS egress for name resolution
3. Frontend ingress (port 80)
4. Auth service access (port 5001)
5. User service access (port 5002)
6. Dealer service access (port 5003)
7. Pricing service access (port 5004)
8. MySQL access (port 3306)
9. Backend-to-MySQL egress
10. Backend-to-backend communication

### GitOps Automation
**ArgoCD-driven deployments**:
- Auto-sync every 3 minutes
- Git as single source of truth
- Self-healing on configuration drift
- Declarative infrastructure management

### Auto-Scaling
**Horizontal Pod Autoscaler (HPA)**:
- Min replicas: 2 (high availability)
- Max replicas: 5 (cost optimization)
- Scale triggers: CPU > 80%, Memory > 80%

---

## 🏗️ Components

### Application Services

**Frontend** (React + Nginx)
- Modern responsive UI with TailwindCSS
- Client-side routing with React Router
- Vite-powered build system

**Auth Service** (Flask - Port 5001)
- JWT token generation and validation
- User registration and login
- Password hashing with Werkzeug

**User Service** (Flask - Port 5002)
- Profile management
- Scrap pickup requests
- Personal dashboard

**Dealer Service** (Flask - Port 5003)
- Dealer operations
- Request assignments
- Performance analytics

**Pricing Service** (Flask - Port 5004)
- Dynamic scrap pricing
- Category management
- Price history tracking

**Database** (MySQL 8.0 StatefulSet)
- Persistent 10Gi storage
- Network-isolated from external access

### Infrastructure Components

**NGINX Ingress Controller**
- Path-based routing to services
- Canary traffic splitting
- Load balancing across replicas

**Argo Rollouts**
- Progressive delivery controller
- Automated canary analysis
- Health-based rollback

**ArgoCD**
- GitOps continuous delivery
- Kustomize-based manifests
- Auto-sync from GitHub

**Kubernetes Resources**
- Namespace: Logical isolation
- Services: Internal networking
- HPAs: Auto-scaling policies
- Network Policies: Security rules
- Secrets: Encrypted credentials

### CI/CD Workflow

**GitHub Actions Pipeline**
- Triggered on push to main branch
- Multi-stage Docker builds for each service
- Trivy scans for critical vulnerabilities
- Automated push to Docker Hub
- Version tagging with Git commit SHA

**Container Security**
- Trivy scans for CVEs in dependencies
- Blocks builds with critical vulnerabilities
- Base image security best practices
- Non-root user execution

---

## 📦 Project Structure

```
scrapzee-app/
├── services/
│   ├── auth-service/
│   ├── user-service/
│   ├── dealer-service/
│   ├── pricing-service/
│   ├── frontend/
│   ├── docker-compose.yaml
│   └── init-db.sql
│
├── k8s/
│   ├── argocd/
│   │   ├── scrapzee-project.yaml
│   │   └── scrapzee-dev.yaml
│   │
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── kustomization.yaml
│   │   │
│   │   ├── deployments/           # Argo Rollouts
│   │   │   ├── auth-service-rollout.yaml
│   │   │   ├── user-service-rollout.yaml
│   │   │   ├── dealer-service-rollout.yaml
│   │   │   ├── pricing-service-rollout.yaml
│   │   │   ├── frontend-rollout.yaml
│   │   │   └── mysql.yaml
│   │   │
│   │   ├── services/              # Canary services
│   │   │   ├── auth-svc-canary.yaml
│   │   │   ├── user-svc-canary.yaml
│   │   │   ├── dealer-svc-canary.yaml
│   │   │   ├── pricing-svc-canary.yaml
│   │   │   ├── frontend-svc-canary.yaml
│   │   │   └── mysql-svc.yaml
│   │   │
│   │   ├── ingress/               # Traffic routing
│   │   │   ├── ingress.yaml
│   │   │   ├── ingress-canary-auth.yaml
│   │   │   ├── ingress-canary-user.yaml
│   │   │   ├── ingress-canary-dealer.yaml
│   │   │   ├── ingress-canary-pricing.yaml
│   │   │   └── ingress-canary-frontend.yaml
│   │   │
│   │   ├── hpa/                   # Auto-scaling
│   │   │   ├── auth-hpa.yaml
│   │   │   ├── user-hpa.yaml
│   │   │   ├── dealer-hpa.yaml
│   │   │   ├── pricing-hpa.yaml
│   │   │   └── frontend-hpa.yaml
│   │   │
│   │   ├── network-policies/      # Security policies
│   │   │   ├── 1-default-deny-all.yaml
│   │   │   ├── 2-allow-dns-egress.yaml
│   │   │   ├── 3-allow-frontend.yaml
│   │   │   ├── 4-allow-auth.yaml
│   │   │   ├── 5-allow-dealer.yaml
│   │   │   ├── 6-allow-user.yaml
│   │   │   ├── 7-allow-pricing.yaml
│   │   │   ├── 8-allow-mysql.yaml
│   │   │   ├── 9-allow-backend-to-mysql-egress.yaml
│   │   │   └── 10-allow-backend-to-backend.yaml
│   │   │
│   │   └── secrets/
│   │       └── scrapzee-secrets.yaml
│   │
│   └── configure.sh
│
├── README.md
└── project-snapshots.md
```

---

## 🔧 Technology Stack

### Frontend
- React 18, Vite, TailwindCSS, Nginx

### Backend
- Flask 3.0, SQLAlchemy, PyJWT, MySQL 8.0

### DevOps Infrastructure
- **Docker** - Containerization
- **Docker Hub** - Container registry
- **GitHub Actions** - CI/CD pipeline
- **Trivy** - Container security scanning
- **Kubernetes** - Container orchestration
- **Argo Rollouts** - Progressive delivery
- **ArgoCD** - GitOps automation
- **NGINX Ingress** - Traffic management
- **Kustomize** - Config management

### Security
- Kubernetes Network Policies
- JWT authentication
- Kubernetes Secrets
- Zero-trust architecture

---

## ☸️ Kubernetes Resources

| Resource | Count | Purpose |
|----------|-------|---------|
| Namespace | 1 | Isolation |
| Argo Rollouts | 5 | Progressive delivery |
| Services | 11 | Networking (5 stable + 5 canary + MySQL) |
| Ingress | 6 | Traffic routing (1 main + 5 canary) |
| HPA | 5 | Auto-scaling |
| Network Policies | 10 | Security |
| StatefulSet | 1 | MySQL database |
| Secrets | 1 | Credentials |

**Resource Limits per Pod:**
- CPU: 100m request, 500m limit
- Memory: 128Mi request, 512Mi limit

---

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (minikube/kind)
- kubectl CLI
- Argo Rollouts controller
- ArgoCD
- NGINX Ingress controller

### Installation

```bash
# Clone repository
git clone https://github.com/Sagarrrsh/scrapzee-app.git
cd scrapzee-app

# Configure cluster
cd k8s
chmod +x configure.sh
./configure.sh

# Deploy with ArgoCD
kubectl apply -f argocd/scrapzee-project.yaml
kubectl apply -f argocd/scrapzee-dev.yaml

# Add to /etc/hosts
echo "127.0.0.1 scrapzee.local" | sudo tee -a /etc/hosts

# Access application
open http://scrapzee.local
```

### Local Development

```bash
cd services
docker-compose up -d
open http://localhost:3000
```

---

## 📊 Monitoring

### Check Deployment Status

```bash
# View rollout status
kubectl argo rollouts get rollout auth-service -n scrapzee

# Watch canary deployment
kubectl argo rollouts get rollout auth-service -n scrapzee --watch

# Check pods
kubectl get pods -n scrapzee

# Check HPA
kubectl get hpa -n scrapzee
```

### Manage Rollouts

```bash
# Manual promotion
kubectl argo rollouts promote auth-service -n scrapzee

# Abort canary
kubectl argo rollouts abort auth-service -n scrapzee

# View ArgoCD apps
kubectl get applications -n argocd
```

### Verify Network Policies

```bash
# List policies
kubectl get networkpolicies -n scrapzee

# Test connectivity
kubectl exec -it <pod-name> -n scrapzee -- wget -O- http://auth-svc:5001/health
```

---

## 🛣️ Roadmap

### Phase 1: Observability
- [ ] Prometheus + Grafana
- [ ] ELK Stack logging
- [ ] Jaeger tracing

### Phase 2: Advanced Features
- [ ] Redis caching
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] Service mesh (Istio)

### Phase 3: Security
- [ ] Cert-manager for TLS
- [ ] OAuth2/OIDC
- [ ] Pod Security Standards

### Phase 4: CI/CD Enhancement
- [ ] Automated testing in pipeline
- [ ] Load testing with K6
- [ ] Multi-environment deployments (dev/staging/prod)
- [ ] Semantic versioning automation

---

## 🎓 What You'll Learn

**DevOps Practices:**
- CI/CD with GitHub Actions
- Container security with Trivy
- Docker multi-stage builds
- GitOps with ArgoCD
- Progressive delivery with Argo Rollouts
- Zero-trust networking
- Auto-scaling strategies
- Zero-downtime deployments

**Architecture:**
- Microservices design
- RESTful APIs
- Database per service pattern

**Platform Engineering:**
- Kubernetes orchestration
- Infrastructure as Code
- Declarative configuration

---

## 👤 Author

**Sagar S H**
- GitHub: [@Sagarrrsh](https://github.com/Sagarrrsh)
- LinkedIn: [Sagar S H](https://linkedin.com/in/sagar-s-h-212914249)

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file

---

<div align="center">

**Built with ❤️ by Sagar S H**

*Showcasing enterprise-grade DevOps practices*

[![Star on GitHub](https://img.shields.io/github/stars/Sagarrrsh/scrapzee-app?style=social)](https://github.com/Sagarrrsh/scrapzee-app)

</div>
