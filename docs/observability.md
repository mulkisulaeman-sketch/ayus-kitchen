# Observability

## Overview

The Ayus Kitchen platform uses Grafana, Loki, and Alloy for observability.

| Component | Purpose |
|---|---|
| Grafana | Metrics and visualization |
| Loki | Centralized log storage |
| Alloy | Collect and forward logs |

## Architecture

```text
Kubernetes Workloads
        |
        v
      Alloy
        |
        v
       Loki
        |
        v
     Grafana
```

## Namespaces

Observability components run in:

```text
observability
```

Application workloads run in:

```text
ayus-kitchen-dev
```

## Check Observability Components

```bash
kubectl get pods -n observability
```

Check services:

```bash
kubectl get svc -n observability
```

## Grafana

Grafana can be accessed locally using port forwarding:

```bash
kubectl port-forward -n observability svc/grafana 3000:80
```

Open Grafana at:

```text
http://localhost:3000
```

## Loki

Loki is used as the centralized log storage backend.

Port forwarding:

```bash
kubectl port-forward -n observability svc/loki-gateway 3100:80
```

Loki is available locally at:

```text
http://localhost:3100
```

## Application Logs

Backend logs can be inspected directly from Kubernetes:

```bash
kubectl logs -n ayus-kitchen-dev deployment/ayus-kitchen-dev-ayus-kitchen
```

Follow backend logs:

```bash
kubectl logs -f -n ayus-kitchen-dev deployment/ayus-kitchen-dev-ayus-kitchen
```

## Observability Goals

The observability stack is intended to provide:

- Centralized Kubernetes logs
- Application error investigation
- Workload visibility
- Application health monitoring
- Historical log search through Grafana and Loki

## Troubleshooting

Check all observability pods:

```bash
kubectl get pods -n observability -o wide
```

Check recent events:

```bash
kubectl get events -n observability --sort-by=.lastTimestamp
```
