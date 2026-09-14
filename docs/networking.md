# Networking

## Overview

Ayus Kitchen is exposed through the NGINX Ingress Controller using the local hostname `ayus-kitchen.local`.

The application uses a single host with path-based routing.

## Request Flow

```text
Browser
   |
   v
ayus-kitchen.local:8081
   |
   v
SSH Tunnel
   |
   v
K3s Node
   |
   v
NGINX Ingress
   |
   +---- / ------> Frontend Service
   |
   +---- /api ---> Backend Service
                         |
                         v
                     PostgreSQL
```

## Local Hostname

Add the following entry to the local hosts file:

```text
127.0.0.1 ayus-kitchen.local
```

On Windows, edit:

```text
C:\Windows\System32\drivers\etc\hosts
```

## SSH Tunnel

The Kubernetes node is accessed through the VPN jump host.

Example SSH tunnel:

```bash
ssh -N \
  -J bithealth@10.8.0.15 \
  -L 8081:192.168.95.109:30602 \
  bithealth@192.168.95.107
```

The tunnel exposes the Kubernetes service through local port `8081`.

## Ingress

The ingress host is:

```text
ayus-kitchen.local
```

API requests use the `/api` path:

```text
/api/health
/api/version
/api/users
```

The ingress rewrites `/api/*` requests before forwarding them to the backend service.

## Frontend API Configuration

The frontend uses a relative API path:

```javascript
const API_BASE = "/api";
```

This allows the frontend to communicate with the backend through the same hostname without hard-coding a backend IP or port.

## Network Test

Test the backend through the ingress:

```bash
curl -i \
  -H "Host: ayus-kitchen.local" \
  http://127.0.0.1:8081/api/health
```

Expected response:

```json
{"status":"ok","database":"up","version":"0.1.0"}
```

## Application Routes

| Route | Destination |
|---|---|
| `/` | Frontend |
| `/app.js` | Frontend JavaScript |
| `/api/health` | Backend health check |
| `/api/version` | Backend version |
| `/api/users` | Backend users API |
