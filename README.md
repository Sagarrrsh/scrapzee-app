#  Scrapzee - Cloud-Native Microservices Platform

<div align="center">

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

**Enterprise-grade waste management platform with GitOps, progressive delivery, and zero-trust security**

[Quick Start](#-quick-start) • [Architecture](#-architecture) • [Features](#-key-features) • [Docs](#-documentation)

</div>

---

## 📖 Overview

Production-ready scrap management platform showcasing modern DevOps practices: canary deployments, network security policies, and automated GitOps workflows.

### 🎯 What Makes This Special

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Progressive Delivery** | Argo Rollouts | Zero-downtime canary deployments |
| **GitOps Automation** | ArgoCD | Self-healing, declarative infrastructure |
| **Security-First** | Network Policies | Zero-trust architecture |
| **Auto-Scaling** | HPA | Dynamic scaling (2-5 replicas) |
| **CI/CD Pipeline** | GitHub Actions + Trivy | Automated security scanning |

---

## 🏗️ Architecture

<img width="1212" height="603" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/02f33cc6-18e2-4680-b1e9-1d177b7130da" />

### Service Overview

| Service | Technology | Port | Purpose |
|---------|-----------|------|---------|
| **Frontend** | React + Nginx | 80 | Modern responsive UI |
| **Auth Service** | Flask | 5001 | JWT authentication |
| **User Service** | Flask | 5002 | Profile & pickup requests |
| **Dealer Service** | Flask | 5003 | Dealer operations |
| **Pricing Service** | Flask | 5004 | Dynamic pricing engine |
| **Database** | MySQL 8.0 | 3306 | Persistent storage (10Gi) |

---

## 🚀 Key Features

<details>
<summary><b>🔄 Progressive Delivery (Click to expand)</b></summary>

### Canary Deployment Strategy
```
Step 1: 20% traffic  →  Canary pods deployed
Step 2: 40% traffic  →  Monitor metrics
Step 3: 60% traffic  →  Health checks pass
Step 4: 80% traffic  →  Final validation
Step 5: 100% traffic →  Full promotion
```

**Auto-rollback** on health check failures

</details>

<details>
<summary><b>🔒 Zero-Trust Network Security</b></summary>

### 10-Layer Security Policy

| Layer | Policy | Description |
|-------|--------|-------------|
| 1 | Default Deny All | Block all traffic by default |
| 2 | DNS Egress | Allow name resolution |
| 3 | Frontend Ingress | Port 80 external access |
| 4-7 | Service Access | Auth, User, Dealer, Pricing |
| 8 | MySQL Access | Database port 3306 |
| 9 | Backend → DB | Egress to MySQL |
| 10 | Inter-Service | Backend-to-backend |

</details>

<details>
<summary><b>⚙️ CI/CD Pipeline</b></summary>

### GitHub Actions Workflow
```yaml
Trigger: Push to main
  ↓
Build: Multi-stage Docker images
  ↓
Security: Trivy vulnerability scan
  ↓
Push: Docker Hub registry
  ↓
Deploy: ArgoCD auto-sync
```

**Security gates:** Blocks critical vulnerabilities

</details>

<details>
<summary><b>📈 Auto-Scaling</b></summary>

### HPA Configuration

| Metric | Min | Max | Threshold |
|--------|-----|-----|-----------|
| Replicas | 2 | 5 | - |
| CPU | - | - | 80% |
| Memory | - | - | 80% |

</details>

---

## 🛠️ Technology Stack

<table>
<tr>
<td width="50%">

### Application
- **Frontend:** React 18, Vite, TailwindCSS
- **Backend:** Flask 3.0, SQLAlchemy, PyJWT
- **Database:** MySQL 8.0

</td>
<td width="50%">

### DevOps
- **Orchestration:** Kubernetes
- **CI/CD:** GitHub Actions, ArgoCD
- **Security:** Trivy, Network Policies
- **Delivery:** Argo Rollouts, NGINX Ingress

</td>
</tr>
</table>

---

## ☸️ Kubernetes Resources

| Resource Type | Count | Details |
|--------------|-------|---------|
| **Namespaces** | 1 | `scrapzee` |
| **Argo Rollouts** | 5 | Progressive delivery |
| **Services** | 11 | 5 stable + 5 canary + MySQL |
| **Ingress Rules** | 6 | 1 main + 5 canary |
| **HPA** | 5 | Auto-scaling policies |
| **Network Policies** | 10 | Zero-trust security |
| **StatefulSets** | 1 | MySQL database |

**Pod Resources:** 100m-500m CPU, 128Mi-512Mi Memory

---

## 🚀 Quick Start

### Prerequisites

```bash
✓ Kubernetes cluster (minikube/kind)
✓ kubectl CLI
✓ Argo Rollouts controller
✓ ArgoCD
✓ NGINX Ingress controller
```

### Installation (3 steps)

```bash
# 1. Clone repository
git clone https://github.com/Sagarrrsh/scrapzee-app.git
cd scrapzee-app/k8s

# 2. Configure cluster
chmod +x configure.sh && ./configure.sh

# 3. Deploy with ArgoCD
kubectl apply -f argocd/scrapzee-project.yaml
kubectl apply -f argocd/scrapzee-dev.yaml
```

### Access Application

```bash
# Add to /etc/hosts
echo "127.0.0.1 scrapzee.local" | sudo tee -a /etc/hosts

# Open browser
open http://scrapzee.local
```

### Local Development

```bash
cd services
docker-compose up -d
# Access: http://localhost:3000
```

---

## 📊 Monitoring & Management

### Check Status

```bash
# View rollout status
kubectl argo rollouts get rollout auth-service -n scrapzee --watch

# Check all pods
kubectl get pods -n scrapzee

# Check auto-scaling
kubectl get hpa -n scrapzee

# View ArgoCD apps
kubectl get applications -n argocd
```

### Manage Deployments

| Action | Command |
|--------|---------|
| **Promote Canary** | `kubectl argo rollouts promote auth-service -n scrapzee` |
| **Abort Rollout** | `kubectl argo rollouts abort auth-service -n scrapzee` |
| **Restart Service** | `kubectl argo rollouts restart auth-service -n scrapzee` |
| **View History** | `kubectl argo rollouts history auth-service -n scrapzee` |

---

## 📁 Project Structure

```
scrapzee-app/
├── services/               # Microservices code
│   ├── auth-service/
│   ├── user-service/
│   ├── dealer-service/
│   ├── pricing-service/
│   ├── frontend/
│   └── docker-compose.yaml
│
└── k8s/                   # Kubernetes manifests
    ├── argocd/           # GitOps configs
    └── base/
        ├── deployments/  # Argo Rollouts
        ├── services/     # K8s Services
        ├── ingress/      # Traffic routing
        ├── hpa/          # Auto-scaling
        ├── network-policies/  # Security
        └── secrets/      # Credentials
```

---

## 🛣️ Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| **Phase 1** | Prometheus + Grafana monitoring | 🔄 In Progress |
| | Loki centralized logging | 🔄 In Progress |
| | Jaeger distributed tracing | 📋 Planned |
| **Phase 2** | Redis caching layer | 📋 Planned |
| | Message queue (Kafka) | 📋 Planned |
| | Service mesh (Istio) | 📋 Planned |
| **Phase 3** | Cert-manager TLS | 📋 Planned |
| | OAuth2/OIDC integration | 📋 Planned |
| **Phase 4** | Load testing (K6) | 📋 Planned |
| | Multi-environment pipelines | 📋 Planned |

---

## 🎓 Learning Outcomes

<table>
<tr>
<td width="33%">

### DevOps
- CI/CD pipelines
- Container security
- GitOps workflows
- Progressive delivery
- Zero-downtime deploys

</td>
<td width="33%">

### Kubernetes
- Orchestration
- Network policies
- Auto-scaling
- Rolling updates
- StatefulSets

</td>
<td width="33%">

### Architecture
- Microservices
- RESTful APIs
- Service discovery
- Load balancing
- Data persistence

</td>
</tr>
</table>

---

## 📝 Documentation

- 📘 [Installation Guide](./docs/INSTALLATION.md)
- 🔐 [Security Policies](./docs/SECURITY.md)
- 🚀 [Deployment Guide](./docs/DEPLOYMENT.md)
- 📊 [Monitoring Setup](./docs/MONITORING.md)
- 🔧 [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

## 👤 Author

**Sagar S H**

[![GitHub](https://img.shields.io/badge/GitHub-@Sagarrrsh-181717?style=flat&logo=github)](https://github.com/Sagarrrsh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sagar_S_H-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/sagar-s-h-212914249)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[![Star on GitHub](https://img.shields.io/github/stars/Sagarrrsh/scrapzee-app?style=social)](https://github.com/Sagarrrsh/scrapzee-app)

*Built with ❤️ to showcase enterprise DevOps practices*

</div>
