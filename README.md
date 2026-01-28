# 🚀 Scrapzee - Cloud-Native Microservices Platform

<div align="center">

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

**A production-ready scrap management platform built with microservices architecture, demonstrating enterprise-grade DevOps practices and cloud-native development.**

[Features](#-key-features) • [Architecture](#️-architecture) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

Scrapzee is a modern waste management platform that enables users to sell recyclable materials at competitive rates with convenient doorstep pickup. This project showcases end-to-end cloud-native application development, from microservices design to Kubernetes orchestration and GitOps deployment.

---

## ✨ Key Features

### 🏗️ **Architecture & Design**
- **Microservices Architecture** - Independent, scalable services for Auth, User, Pricing, and Dealer management
- **RESTful API Design** - Clean API contracts with proper separation of concerns
- **Database Per Service** - Data isolation following microservices best practices

### 🚀 **DevOps & Infrastructure**
- **GitOps Deployment** - Automated continuous delivery with ArgoCD
- **NGINX Ingress Controller** - Intelligent path-based routing and load balancing
- **Horizontal Auto-Scaling** - HPA configured for 2-5 replicas based on CPU/Memory utilization
- **Zero-Downtime Updates** - Rolling deployments with health checks and readiness probes

### 🎨 **User Experience**
- **Modern React UI** - Responsive design with TailwindCSS
- **Real-time Pricing** - Dynamic price calculation based on scrap type and location
- **User Dashboard** - Track scrap requests and view statistics
- **Admin Panel** - Manage dealers and pricing configurations

### 🔒 **Security & Reliability**
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - Industry-standard password hashing
- **Kubernetes Secrets** - Secure credential management
- **Health Monitoring** - Liveness and readiness probes for all services

---

## 🏗️ Architecture

![ChatGPT Image Jan 27, 2026, 09_06_09 PM](https://github.com/user-attachments/assets/bf8f25ff-8657-4577-a73a-0521dc26156d)

### 🌐 Routing Configuration

```
External Traffic → NGINX Ingress (scrapzee.local)
                         ↓
    ┌────────────────────────────────────────┐
    │      Path-Based Routing Rules          │
    ├────────────────────────────────────────┤
    │  /                → Frontend           │
    │  /api/auth/*      → Auth Service       │
    │  /api/pricing/*   → Pricing Service    │
    │  /api/users/*     → User Service       │
    │  /api/dealer/*    → Dealer Service     │
    └────────────────────────────────────────┘
                         ↓
              ClusterIP Services
                         ↓
         Pod Replicas (Auto-scaled 2-5)
                         ↓
          MySQL Database (StatefulSet)
```

---

## 🔧 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### Frontend
- ⚛️ **React 18** - Modern UI with Hooks
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **TailwindCSS** - Utility-first styling
- 🎯 **Lucide React** - Beautiful icons
- 🌐 **Nginx** - Production web server

### Backend
- 🐍 **Flask 3.0** - Python microservices
- 🗃️ **SQLAlchemy** - Database ORM
- 🔐 **PyJWT** - Token authentication
- 🐬 **MySQL 8.0** - Relational database
- 🔒 **Werkzeug** - Password hashing

</td>
<td valign="top" width="50%">

### Infrastructure
- 🐳 **Docker** - Containerization
- ☸️ **Kubernetes** - Container orchestration
- 🔀 **NGINX Ingress** - Traffic management
- 🔄 **ArgoCD** - GitOps deployment
- 📊 **HPA** - Horizontal auto-scaling

### DevOps
- 🐙 **GitHub** - Version control
- 🐋 **Docker Hub** - Container registry
- 📝 **YAML** - Infrastructure as Code
- 🔧 **kubectl** - Cluster management

</td>
</tr>
</table>

---

## 📦 Project Structure

```
scrapzee-app/
├── services/
│   ├── auth-service/           # Authentication & authorization
│   │   ├── Dockerfile
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── pricing-service/        # Dynamic pricing engine
│   │   ├── Dockerfile
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── user-service/           # User & request management
│   │   ├── Dockerfile
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── dealer-service/         # Dealer operations
│   │   ├── Dockerfile
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── frontend/               # React application
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── nginx.conf
│   │   └── package.json
│   ├── docker-compose.yaml     # Local development
│   └── init-db.sql            # Database initialization
├── k8s/
│   ├── namespace.yaml         # Kubernetes namespace
│   ├── secrets.yaml           # Secrets management
│   ├── mysql.yaml             # Database StatefulSet
│   ├── auth-service.yaml      # Auth deployment
│   ├── pricing-service.yaml   # Pricing deployment
│   ├── user-service.yaml      # User deployment
│   ├── dealer-service.yaml    # Dealer deployment
│   ├── frontend.yaml          # Frontend deployment
│   ├── hpa-*.yaml            # Auto-scaling configs
│   └── ingress.yaml          # Traffic routing
├── README.md
└── project-snapshots.md       # Project documentation
```

---

## 🎨 Services Overview

### 🔐 Auth Service
**Purpose:** User authentication and authorization

**Features:**
- User registration with email validation
- JWT token generation and validation
- Password hashing with Werkzeug
- Role-based access control (user/dealer/admin)

**Key Endpoints:**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/verify` - Validate JWT token

---

### 💰 Pricing Service
**Purpose:** Dynamic scrap pricing management

**Features:**
- Multi-category scrap pricing
- Location-based price multipliers
- Historical price tracking
- Admin price configuration

**Key Endpoints:**
- `GET /api/pricing/categories` - List all scrap categories
- `POST /api/pricing/calculate` - Calculate total price
- `PUT /api/pricing/categories/:id/price` - Update pricing (admin)

---

### 👤 User Service
**Purpose:** User profile and request management

**Features:**
- User profile management
- Scrap pickup request creation
- Request status tracking
- Personal dashboard with analytics

**Key Endpoints:**
- `GET /api/users/profile` - Fetch user profile
- `POST /api/users/requests` - Create pickup request
- `GET /api/users/dashboard` - View statistics

---

### 🚚 Dealer Service
**Purpose:** Dealer operations and request handling

**Features:**
- Dealer profile management
- Request assignment and tracking
- Service area management
- Performance analytics

**Key Endpoints:**
- `GET /api/dealer/requests` - View assigned requests
- `PUT /api/dealer/requests/:id/status` - Update request status
- `GET /api/dealer/stats` - View performance metrics

---

## ☸️ Kubernetes Resources

### Deployed Components

| Resource Type | Count | Purpose |
|--------------|-------|---------|
| **Namespace** | 1 | Resource isolation |
| **Deployments** | 5 | Service orchestration |
| **Services** | 5 | Internal networking |
| **StatefulSet** | 1 | MySQL database |
| **PersistentVolume** | 1 | 10Gi data storage |
| **HPA** | 5 | Auto-scaling (2-5 replicas) |
| **Ingress** | 1 | External traffic routing |
| **Secrets** | 1 | Credentials management |

### Resource Allocation

**Per Service Pod:**
- **CPU Request:** 100m
- **CPU Limit:** 500m
- **Memory Request:** 128Mi
- **Memory Limit:** 512Mi

**Auto-Scaling Triggers:**
- CPU utilization > 80%
- Memory utilization > 80%

---

## 🌐 NGINX Ingress Benefits

### Why NGINX Ingress Over API Gateway?

✅ **Native Kubernetes Integration** - Built-in K8s resource, no additional infrastructure

✅ **Simplified Architecture** - One less component to manage and maintain

✅ **Superior Performance** - Direct routing without extra network hops

✅ **Industry Standard** - Battle-tested solution used by thousands of organizations

✅ **Cost Effective** - No additional cloud services or licensing fees

✅ **Path-Based Routing** - Intelligent traffic distribution based on URL patterns

✅ **Load Balancing** - Automatic distribution across pod replicas

✅ **SSL/TLS Termination** - Centralized certificate management

---

## 🔄 GitOps Workflow

```
Developer commits code
         ↓
GitHub repository updated
         ↓
ArgoCD detects changes (3-min poll)
         ↓
Validates Kubernetes manifests
         ↓
Syncs to cluster automatically
         ↓
Rolling update with zero downtime
         ↓
Health checks verify deployment
         ↓
Self-healing on drift detection
```

### Benefits
- 🎯 Git as single source of truth
- ♻️ Automated deployments
- ⏮️ Easy rollbacks via git revert
- 📝 Complete audit trail
- 🔒 Declarative configuration
- 🔍 Version control for infrastructure

---

## 🎓 Learning Outcomes

This project demonstrates practical implementation of:

- ✅ Microservices architecture patterns
- ✅ RESTful API design and development
- ✅ Docker containerization techniques
- ✅ Kubernetes orchestration and management
- ✅ NGINX Ingress configuration
- ✅ GitOps principles with ArgoCD
- ✅ Cloud-native application development
- ✅ Infrastructure as Code (IaC)
- ✅ Horizontal auto-scaling strategies
- ✅ Zero-downtime deployment practices
- ✅ Security best practices (JWT, secrets, RBAC)
- ✅ Service mesh readiness

---

## 🛣️ Roadmap

### Phase 1: Enhanced Monitoring
- [ ] Prometheus metrics integration
- [ ] Grafana dashboards
- [ ] ELK stack for centralized logging
- [ ] Distributed tracing with Jaeger

### Phase 2: Advanced Features
- [ ] Redis caching layer
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] Service mesh with Istio
- [ ] Rate limiting and throttling

### Phase 3: Security & Compliance
- [ ] Cert-manager for automatic TLS
- [ ] Network policies implementation
- [ ] OAuth2 integration
- [ ] Automated security scanning

### Phase 4: Testing & Quality
- [ ] End-to-end test suite
- [ ] Performance testing framework
- [ ] Chaos engineering experiments
- [ ] Multi-region deployment

---

## 📚 Documentation

- **[Deployment Guide](docs/DEPLOYMENT.md)** - Complete deployment instructions
- **[API Documentation](docs/API.md)** - Endpoint specifications
- **[Architecture Guide](docs/ARCHITECTURE.md)** - Detailed system design
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Sagar S H**

- 🐙 GitHub: [@Sagarrrsh](https://github.com/Sagarrrsh)
- 💼 LinkedIn: [Sagar S H](https://linkedin.com/in/sagar-s-h-212914249)
- 📧 Email: [Contact](mailto:your.email@example.com)

---

## 🙏 Acknowledgments

- Built as a portfolio project to demonstrate modern DevOps practices
- Inspired by real-world e-waste management challenges
- Special thanks to the open-source community for amazing tools
- NGINX Ingress Controller documentation and community
- ArgoCD project for GitOps excellence

---

## 📞 Support

- 💬 Open an [Issue](https://github.com/Sagarrrsh/scrapzee-app/issues) for bug reports
- 💡 Start a [Discussion](https://github.com/Sagarrrsh/scrapzee-app/discussions) for questions
- ⭐ Star this repository if you find it helpful!

---

<div align="center">

**Made with ❤️ and ☕ by Sagar S H**

[![Star on GitHub](https://img.shields.io/github/stars/Sagarrrsh/scrapzee-app?style=social)](https://github.com/Sagarrrsh/scrapzee-app)

</div>
