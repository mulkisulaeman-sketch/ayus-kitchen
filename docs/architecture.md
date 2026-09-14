# Architecture

## Overview

Ayus Kitchen is a simple web application deployed on a K3s Kubernetes cluster using a GitOps workflow.

The application consists of:

- Frontend: static web application served by NGINX
- Backend: Node.js + Express API
- Database: PostgreSQL
- Ingress: NGINX Ingress Controller
- GitOps: ArgoCD
- Observability: Grafana, Loki, and Alloy

## Request Flow

Browser
   |
   v
NGINX Ingress
   |
   +---- / ------------------> Frontend Service
   |
   +---- /api/* -------------> Backend Service
                                  |
                                  v
                              PostgreSQL

## Kubernetes Architecture

K3s Cluster
|
+-- argocd
|   +-- ArgoCD Server
|   +-- Application Controller
|   +-- Repo Server
|
+-- ayus-kitchen-dev
|   +-- Frontend
|   +-- Backend
|   +-- PostgreSQL
|
+-- ingress-nginx
|   +-- NGINX Ingress Controller
|
+-- observability
    +-- Grafana
    +-- Loki
    +-- Alloy

## Application Namespace

The development environment is deployed in:

ayus-kitchen-dev

ArgoCD itself runs in:

argocd

Observability components run in:

observability
