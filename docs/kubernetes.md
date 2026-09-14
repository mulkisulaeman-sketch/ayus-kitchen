# Kubernetes

## Namespaces

| Namespace | Purpose |
|---|---|
| argocd | ArgoCD control plane |
| ayus-kitchen-dev | Ayus Kitchen application |
| observability | Grafana, Loki, and Alloy |
| ingress-nginx | NGINX Ingress Controller |

## Application Workloads

The application is deployed in:

```text
ayus-kitchen-dev
```

The namespace contains:

- Frontend
- Backend
- PostgreSQL

Check workloads:

```bash
kubectl get pods -n ayus-kitchen-dev -o wide
```

Check services:

```bash
kubectl get svc -n ayus-kitchen-dev
```

Check ingress:

```bash
kubectl get ingress -n ayus-kitchen-dev
```

## Health Checks

Backend health endpoint:

```text
/health
```

Version endpoint:

```text
/version
```

Users endpoint:

```text
/users
```

Through the Kubernetes ingress:

```text
/api/health
/api/version
/api/users
```

## Troubleshooting

### Check Pod Events

```bash
kubectl describe pod <pod-name> -n ayus-kitchen-dev
```

### Check Logs

```bash
kubectl logs <pod-name> -n ayus-kitchen-dev
```

### Follow Logs

```bash
kubectl logs -f <pod-name> -n ayus-kitchen-dev
```

### Check Deployments

```bash
kubectl get deployment -n ayus-kitchen-dev
```

### Check ReplicaSets

```bash
kubectl get rs -n ayus-kitchen-dev
```
