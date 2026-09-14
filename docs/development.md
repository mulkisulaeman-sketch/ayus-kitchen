# Development

## Requirements

The following tools are required for local development:

- WSL2
- Node.js 22+
- npm
- Docker
- Git
- kubectl

## Repository

The project is located at:

```text
/home/mulki/projects/ayus-kitchen
```

Change to the project directory:

```bash
cd /home/mulki/projects/ayus-kitchen
```

## Install Dependencies

Install Node.js dependencies:

```bash
npm install
```

## Run the Backend

Start the backend application:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

## Backend Endpoints

| Endpoint | Purpose |
|---|---|
| `/health` | Application and database health |
| `/version` | Application version |
| `/users` | User API |

## Smoke Test

The smoke test can be executed against the local backend:

```bash
API_URL=http://localhost:3000 node tests/smoke-test.js
```

The smoke test verifies that the API is responding correctly.

## Frontend

The frontend is a static web application served by NGINX.

The frontend communicates with the backend using a relative API path:

```javascript
const API_BASE = "/api";
```

Using a relative path allows the same frontend build to work through the Kubernetes ingress without hard-coded localhost addresses.

## Local Development Flow

```text
Developer
   |
   v
npm install
   |
   v
npm start
   |
   v
Backend :3000
   |
   v
Smoke Test
```

## Useful Commands

Check Node.js version:

```bash
node --version
```

Check npm version:

```bash
npm --version
```

Run smoke test:

```bash
API_URL=http://localhost:3000 node tests/smoke-test.js
```

Check Git status:

```bash
git status
```
