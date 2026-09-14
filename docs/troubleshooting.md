# Troubleshooting

## Overview

This document provides common troubleshooting procedures for the Ayus Kitchen Kubernetes deployment.

## Check Application Status

```bash
kubectl get pods -n ayus-kitchen-dev
kubectl get deployment -n ayus-kitchen-dev
kubectl get svc -n ayus-kitchen-dev
```

## CrashLoopBackOff

When a pod repeatedly crashes, check the current logs:

```bash
kubectl logs <pod-name> -n ayus-kitchen-dev
```

Check logs from the previous container instance:

```bash
kubectl logs <pod-name> -n ayus-kitchen-dev --previous
```

Check pod events:

```bash
kubectl describe pod <pod-name> -n ayus-kitchen-dev
```

## ImagePullBackOff

Check which image the pod is trying to use:

```bash
kubectl get pod <pod-name> -n ayus-kitchen-dev -o jsonpath='{.spec.containers[*].image}'
```

Check pod events for registry or authentication errors:

```bash
kubectl describe pod <pod-name> -n ayus-kitchen-dev
```

## ArgoCD OutOfSync

Check the application status:

```bash
kubectl get application ayus-kitchen-dev -n argocd
```

Force an ArgoCD refresh:

```bash
kubectl annotate application ayus-kitchen-dev -n argocd argocd.argoproj.io/refresh=hard --overwrite
```

Describe the application:

```bash
kubectl describe application ayus-kitchen-dev -n argocd
```

## Frontend API Problems

The frontend should use the relative API path:

```javascript
const API_BASE = "/api";
```

Search the project for hard-coded localhost or API references:

```bash
grep -RIn -E 'localhost:8082|127\.0\.0\.1:8082|API_BASE|fetch\(' frontend . --exclude-dir=node_modules --exclude-dir=.git
```

## Database Problems

Check application pods:

```bash
kubectl get pods -n ayus-kitchen-dev
```

Test the backend health endpoint through the ingress:

```bash
curl -i \
  -H "Host: ayus-kitchen.local" \
  http://127.0.0.1:8081/api/health
```

The expected database status is:

```json
{"status":"ok","database":"up","version":"0.1.0"}
```

## Ingress Problems

Check ingress configuration:

```bash
kubectl get ingress -n ayus-kitchen-dev
```

Check the NGINX Ingress Controller:

```bash
kubectl get pods -n ingress-nginx
```

Check ingress controller logs:

```bash
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

## Useful Diagnostic Commands

```bash
kubectl get events -n ayus-kitchen-dev --sort-by=.lastTimestamp
kubectl get pods -n ayus-kitchen-dev -o wide
kubectl get deployment -n ayus-kitchen-dev
kubectl get svc -n ayus-kitchen-dev
kubectl get ingress -n ayus-kitchen-dev
```
