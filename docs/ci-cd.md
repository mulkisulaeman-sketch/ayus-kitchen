# CI/CD

## Overview

The Ayus Kitchen project separates Continuous Integration (CI) from Continuous Delivery (CD).

- GitHub Actions is responsible for CI.
- ArgoCD is responsible for CD.

## CI Pipeline

GitHub Actions performs the following steps:

1. Checkout the source code.
2. Install application dependencies.
3. Run automated tests.
4. Run the application smoke test.
5. Build the Docker image.
6. Publish the image to the container registry.

## CD Pipeline

ArgoCD monitors the GitOps repository and deploys the desired configuration to the K3s cluster.

The deployment configuration is stored separately from the application source code.

## CI/CD Flow

```text
Developer
   |
   v
GitHub Application Repository
   |
   v
GitHub Actions
   |
   +----> Tests
   |
   +----> Smoke Test
   |
   +----> Docker Build
   |
   v
Container Registry
   |
   v
GitOps Repository
   |
   v
ArgoCD
   |
   v
K3s Kubernetes Cluster
```

## CI Responsibilities

CI should verify that the application is ready to be deployed.

Typical CI checks include:

- Dependency installation
- Unit or integration tests
- Smoke tests
- Docker image build
- Container image publishing

## CD Responsibilities

CD is responsible for deploying the desired state to Kubernetes.

ArgoCD provides:

- Automated synchronization
- Self-healing
- Pruning of resources removed from Git
- Deployment status and health information

## Separation of Responsibilities

| Component | Responsibility |
|---|---|
| GitHub Actions | Build and validate application artifacts |
| Container Registry | Store container images |
| GitOps Repository | Store deployment configuration |
| ArgoCD | Reconcile Git state with Kubernetes |
| K3s | Run application workloads |

## Useful Commands

Check ArgoCD applications:

```bash
kubectl get applications -n argocd
```

Check application pods:

```bash
kubectl get pods -n ayus-kitchen-dev -o wide
```

Check deployments:

```bash
kubectl get deployment -n ayus-kitchen-dev
```
