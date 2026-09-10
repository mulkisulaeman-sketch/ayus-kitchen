# Ayus Kitchen API

Production-style REST API for a DevOps/GitOps portfolio.

## Endpoints

- GET `/`
- GET `/health`
- GET `/version`
- GET `/users`
- POST `/users`

## Local

```bash
npm install
cp .env.example .env
npm test
npm start
```

## Docker

```bash
docker build -t ayus-kitchen-api:local .
```

## Helm

```bash
helm lint deploy/helm/ayus-kitchen
helm template ayus-kitchen deploy/helm/ayus-kitchen
```

The PostgreSQL deployment included here is intentionally demo-only and uses `emptyDir`. For production, use managed PostgreSQL or persistent storage and external secret management.
