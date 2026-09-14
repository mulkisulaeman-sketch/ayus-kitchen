# Deployment

## Overview

Ayus Kitchen is deployed to a K3s Kubernetes cluster using Helm and ArgoCD.

The application deployment follows the GitOps workflow.

## Deployment Components

| Component | Location |
|---|---|
| Helm Chart | `deploy/helm/ayus-kitchen` |
| Environment Values | GitOps repository |
| ArgoCD Application | `ayus-kitchen-dev` |
| Kubernetes Namespace | `ayus-kitchen-dev` |

## Helm Chart

The application Helm chart is stored in the application repository:

```text
deploy/helm/ayus-kitchen
```

The chart contains the Kubernetes resources required by the application.

## Environment Configuration

Development environment values are stored in the GitOps repository:

```text
apps/ayus-kitchen/dev/values.yaml
```

This keeps environment-specific configuration separate from the application source code.

## ArgoCD Application

The ArgoCD application is:

```text
ayus-kitchen-dev
```

The application deploys to:

```text
namespace: ayus-kitchen-dev
```

ArgoCD automatically synchronizes the desired state from Git.

## Verify Deployment

Check ArgoCD:

```bash
kubectl get application ayus-kitchen-dev -n argocd
```

Check pods:

```bash
kubectl get pods -n ayus-kitchen-dev -o wide
```

Check deployments:

```bash
kubectl get deployment -n ayus-kitchen-dev
```

Check services:

```bash
kubectl get svc -n ayus-kitchen-dev
```

Check ingress:

```bash
kubectl get ingress -n ayus-kitchen-dev
```

## API Health Check

Test the application through the ingress:

```bash
curl -i \
  -H "Host: ayus-kitchen.local" \
  http://127.0.0.1:8081/api/health
```

Expected response:

```json
{"status":"ok","database":"up","version":"0.1.0"}
```

## Deployment Verification Checklist

- ArgoCD application is Synced.
- ArgoCD application is Healthy.
- Application pods are Running.
- Services are available.
- Ingress is configured.
- Backend health check returns HTTP 200.
- Database status reports `up`.
