# 🚀 Scrapzee - Cloud-Native Microservices Platform

> A production-ready scrap management platform built with microservices architecture, containerized with Docker, orchestrated by Kubernetes, and deployed using GitOps principles with ArgoCD.

[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)](https://argo-cd.readthedocs.io/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

---

## 📖 Overview

Scrapzee transforms waste management through a modern microservices platform that enables users to sell recyclable materials at competitive rates with doorstep pickup. Built with enterprise-grade DevOps practices, this project demonstrates end-to-end cloud-native application development and deployment.

### 🎯 Key Features

- **Microservices Architecture** - Independent services for Auth, Pricing, and User Management
- **NGINX Ingress Controller** - Smart routing for external traffic to internal services
- **Modern Frontend** - Responsive React UI with TailwindCSS
- **GitOps Deployment** - Automated deployments via ArgoCD
- **Auto-Scaling** - HPA configured for 2-5 replicas based on load
- **Zero-Downtime Updates** - Rolling deployments with health checks
- **Production Ready** - Security, monitoring, and persistence included

---

## 🏗️ Architecture

<img width="1161" height="986" alt="Untitled Diagram drawio (1)" src="https://github.com/user-attachments/assets/586b85e2-a335-49b9-978c-203a3b9b8838" />


```
Routing Rules:
- scrapzee.local/            → Frontend Service
- scrapzee.local/api/auth    → Auth Service
- scrapzee.local/api/pricing → Pricing Service
- scrapzee.local/api/users   → User Service
```

### 🔧 Tech Stack

**Frontend**
- React 18 with Hooks
- Vite (Build Tool)
- TailwindCSS (Styling)
- Lucide React (Icons)

**Backend Services**
- Flask 3.0 (Python)
- SQLAlchemy (ORM)
- PyJWT (Authentication)
- MySQL 8.0 (Database)

**Infrastructure**
- Docker (Containerization)
- Kubernetes (Orchestration)
- NGINX Ingress Controller (Traffic Routing)
- ArgoCD (GitOps)
- Helm (Package Management)

**DevOps**
- GitHub (Version Control)
- DockerHub (Container Registry)
- Horizontal Pod Autoscaler (Auto-scaling)

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Kubernetes cluster (Minikube/EKS)
- kubectl configured
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Sagarrrsh/scrapzee-app.git
cd scrapzee-microservices
```

### 2. Build & Push Images
```bash
export DOCKER_USERNAME=your-dockerhub-username
./build-and-push-all.sh
```

### 3. Install NGINX Ingress Controller
```bash
# For Minikube
minikube addons enable ingress

# For cloud (AWS/GCP/Azure)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

### 4. Deploy with ArgoCD
```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Deploy application
./deploy-with-argocd.sh
```

### 5. Access Application
```bash
# Add to /etc/hosts
echo "127.0.0.1 scrapzee.local" | sudo tee -a /etc/hosts

# For Minikube, start tunnel
minikube tunnel

# Visit: http://scrapzee.local
```

---

## 📦 Project Structure

```
scrapzee-microservices/
├── services/
│   ├── auth-service/          # JWT authentication & user registration
│   ├── pricing-service/       # Dynamic pricing logic
│   ├── user-service/          # User profiles & scrap requests
│   └── frontend/              # React UI
├── k8s/
│   ├── 00-namespace.yaml      # Namespace definition
│   ├── 01-secrets.yaml        # Secrets management
│   ├── 02-mysql.yaml          # MySQL StatefulSet
│   ├── 03-auth-service.yaml   # Auth deployment + HPA
│   ├── 04-pricing-service.yaml
│   ├── 05-user-service.yaml
│   ├── 06-ingress.yaml        # NGINX Ingress routing rules
│   └── 08-frontend.yaml       # Frontend deployment
├
└── README.md
```

---

## 🎨 Services Overview

### Auth Service (Port 5001)
- User registration & login
- JWT token generation & validation
- Password hashing with Werkzeug
- Role-based access (user/dealer/admin)

**Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Pricing Service (Port 5002)
- Dynamic pricing for scrap categories
- Location-based price multipliers
- Price history tracking
- Admin price management

**Endpoints:**
- `GET /api/pricing/categories` - List all categories
- `POST /api/pricing/calculate` - Calculate price
- `PUT /api/pricing/categories/:id/price` - Update price (admin)

### User Service (Port 5003)
- User profile management
- Scrap pickup requests
- Dashboard with statistics
- Request history

**Endpoints:**
- `GET /api/users/profile` - Get user profile
- `POST /api/users/requests` - Create pickup request
- `GET /api/users/dashboard` - User statistics

---

## 🌐 Ingress Controller Configuration

### How It Works

The NGINX Ingress Controller acts as the single entry point for all external traffic:

1. **Path-based routing** - Routes requests based on URL paths
2. **Service discovery** - Automatically discovers backend services
3. **Load balancing** - Distributes traffic across pod replicas
4. **SSL termination** - Handles HTTPS certificates (when configured)

### Routing Rules

```yaml
# Frontend (React SPA)
/                     → frontend-service:80

# Backend APIs
/api/auth/*           → auth-service:80
/api/pricing/*        → pricing-service:80
/api/users/*          → user-service:80
```

### Benefits Over API Gateway

- ✅ **Native Kubernetes** - Built-in K8s resource
- ✅ **Simpler Architecture** - One less layer to manage
- ✅ **Better Performance** - Direct routing without extra hop
- ✅ **Standard Solution** - Industry-standard approach
- ✅ **Cost-effective** - No additional infrastructure needed

---

## ☸️ Kubernetes Resources

**Deployed Resources:**
- **9 Pods** (1 MySQL + 8 microservice replicas)
- **4 Services** (ClusterIP for internal communication)
- **3 HorizontalPodAutoscalers** (Auto-scaling 2-5 replicas)
- **1 StatefulSet** (MySQL with 10Gi PersistentVolume)
- **1 Ingress** (NGINX for external routing)

**Resource Limits per Service:**
- CPU: 100m (request) - 500m (limit)
- Memory: 128Mi (request) - 512Mi (limit)

---

## 🔄 GitOps Workflow

```
1. Developer pushes code to GitHub
         ↓
2. ArgoCD polls repository (every 3 min)
         ↓
3. Detects changes in k8s/ manifests
         ↓
4. Automatically syncs to Kubernetes cluster
         ↓
5. Rolling update with zero downtime
         ↓
6. Self-healing on drift detection
```

**Benefits:**
- ✅ Git as single source of truth
- ✅ Automated deployments
- ✅ Easy rollbacks (git revert)
- ✅ Audit trail of all changes
- ✅ Declarative configuration

---

## 🧪 Testing

### Local Development
```bash
# Start all services with Docker Compose
cd infrastructure
docker-compose up
```

### API Testing
```bash
# Register user
curl -X POST http://scrapzee.local/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'

# Get pricing categories
curl http://scrapzee.local/api/pricing/categories
```

### Load Testing
```bash
# Install hey
go install github.com/rakyll/hey@latest

# Load test via Ingress
hey -n 10000 -c 100 http://scrapzee.local/api/auth/health
```

---

## 📊 Monitoring & Observability

**ArgoCD Dashboard:**
- Application sync status
- Resource health monitoring
- Git commit history
- Real-time sync visualization

**Kubernetes Metrics:**
```bash
# View pod metrics
kubectl top pods -n scrapzee

# View HPA status
kubectl get hpa -n scrapzee

# View ingress status
kubectl get ingress -n scrapzee

# View logs
kubectl logs -f deployment/auth-service -n scrapzee
```

**Ingress Monitoring:**
```bash
# Check ingress controller logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx

# View ingress details
kubectl describe ingress scrapzee-ingress -n scrapzee
```

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (Werkzeug)
- ✅ Kubernetes Secrets for sensitive data
- ✅ CORS configuration via Ingress
- ✅ Network policies ready
- ✅ RBAC enabled
- ✅ Non-root containers
- ✅ TLS/SSL ready (cert-manager compatible)

---

## 🚢 Deployment Options

### Option 1: ArgoCD (Recommended)
```bash
./deploy-with-argocd.sh
```

### Option 2: Kubectl
```bash
kubectl apply -f k8s/
```

### Option 3: Helm
```bash
helm install scrapzee ./helm/scrapzee
```

---

## 📈 Scaling

**Horizontal Pod Autoscaler (HPA):**
- Min replicas: 2
- Max replicas: 5
- Target CPU: 80%
- Target Memory: 80%

**Manual Scaling:**
```bash
kubectl scale deployment auth-service --replicas=3 -n scrapzee
```

**Ingress Scaling:**
The NGINX Ingress Controller automatically handles increased traffic by load balancing across all available pod replicas.

---

## 🐛 Troubleshooting

**View Logs:**
```bash
kubectl logs -f deployment/frontend -n scrapzee
```

**Check Ingress Status:**
```bash
kubectl get ingress -n scrapzee
kubectl describe ingress scrapzee-ingress -n scrapzee
```

**Test Backend Connectivity:**
```bash
# Test from within cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- sh
curl http://auth-service.scrapzee.svc.cluster.local/health
```

**Check Ingress Controller:**
```bash
kubectl get pods -n ingress-nginx
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

**Force ArgoCD Sync:**
```bash
kubectl patch application scrapzee-microservices -n argocd \
  --type merge -p '{"operation":{"sync":{}}}'
```

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Microservices architecture design
- ✅ RESTful API development
- ✅ Docker containerization
- ✅ Kubernetes orchestration
- ✅ NGINX Ingress Controller configuration
- ✅ GitOps principles with ArgoCD
- ✅ CI/CD pipeline implementation
- ✅ Cloud-native application patterns
- ✅ Infrastructure as Code
- ✅ Auto-scaling & high availability
- ✅ Zero-downtime deployments
- ✅ Path-based routing strategies

---

## 🛣️ Roadmap

- [ ] Add Istio service mesh for advanced traffic management
- [ ] Implement Prometheus monitoring
- [ ] Add Grafana dashboards
- [ ] Integrate ELK stack for logging
- [ ] Add Redis caching layer
- [ ] Implement rate limiting in Ingress
- [ ] Add cert-manager for automatic TLS
- [ ] Add end-to-end tests
- [ ] Multi-region deployment

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@Sagar S H](https://github.com/Sagarrrsh)
- LinkedIn: [Sagar S H](https://linkedin.com/in/sagar-s-h-212914249)

---

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate modern DevOps practices
- Inspired by real-world e-waste management challenges
- Thanks to the NGINX Ingress Controller team for excellent documentation
- Thanks to the open-source community for amazing tools

---

## 📞 Support

For questions or support, please open an issue on GitHub or reach out via email.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ and ☕

</div>
