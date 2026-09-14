# Infrastructure

## Proxmox

The Kubernetes environment runs on Proxmox VE.

| Component | Address |
|---|---|
| Proxmox | 192.168.95.244 |
| K3s Master | 192.168.95.107 |
| K3s Worker 1 | 192.168.95.108 |
| K3s Worker 2 | 192.168.95.109 |
| VPN / Jump Host | 10.8.0.15 |

## Kubernetes

K3s is used as the Kubernetes distribution.

Check cluster nodes:

```bash
kubectl get nodes -o wide
```
## Infrastructure Architecture

```text
Proxmox VE
|
+-- K3s Master
|   +-- Kubernetes Control Plane
|
+-- K3s Worker 1
|   +-- Application workloads
|
+-- K3s Worker 2
|   +-- Application workloads
|
+-- VPN / Jump Host
    +-- SSH access to the private network
