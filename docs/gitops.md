# GitOps

## Overview

Ayus Kitchen uses ArgoCD to implement continuous delivery using the GitOps approach.

The desired Kubernetes state is stored in Git and ArgoCD continuously reconciles the cluster with the repository state.

## Repository Structure

| Repository | Purpose |
|---|---|
| ayuskitchen | Application source code and Helm chart |
| ayus-kitchen-gitops | Environment configuration and ArgoCD applications |

Application repository:

```text
git@github.com:mulkisulaeman-sketch/ayuskitchen.git
```

GitOps repository:

```text
git@github.com:mulkisulaeman-sketch/ayus-kitchen-gitops.git
```

## App of Apps

ArgoCD uses an App of Apps pattern.

The root application manages child applications such as:

- ayus-kitchen-dev
- grafana
- loki
- alloy

The root application is configured to watch:

```text
argocd/applications
```

## Continuous Delivery Flow

```text
Developer
   |
   v
Application Git Repository
   |
   v
GitOps Repository
   |
   v
ArgoCD
   |
   v
Kubernetes Cluster
```

## ArgoCD Application

The main application is:

```text
ayus-kitchen-dev
```

It deploys into:

```text
ayus-kitchen-dev
```

ArgoCD uses automated synchronization:

```yaml
syncPolicy:
  automated:
    prune: true
    selfHeal: true
```

## ArgoCD Commands

List applications:

```bash
kubectl get applications -n argocd
```

Check application status:

```bash
kubectl get application ayus-kitchen-dev -n argocd
```

Refresh an application:

```bash
kubectl annotate application ayus-kitchen-dev -n argocd argocd.argoproj.io/refresh=hard --overwrite
```

Describe an application:

```bash
kubectl describe application ayus-kitchen-dev -n argocd
```

## GitOps Benefits

- Kubernetes configuration is version controlled.
- Deployment changes are auditable through Git history.
- ArgoCD automatically reconciles the desired state.
- Manual changes in the cluster can be detected and reverted.
- Application and infrastructure configuration are separated from runtime state.
