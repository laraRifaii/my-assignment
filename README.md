# my-assignment

# Product Dashboard & API

## Overview

This project consists of:

* **Dashboard:** Next.js application for managing products.
* **API:** Node.js + Express REST API with JWT authentication and Zod validation.

---

# Prerequisites

Before running the project, ensure you have:

* Node.js (v18+ recommended)
* npm
* PM2 (optional)

```bash
npm install -g pm2
```

---

# Environment Variables

Create a `.env` file in the API project root:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

Create a `.env.local` file in the Next.js dashboard:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/
```

---

# Running the Dashboard

```bash
cd dashboard-nextjs
npm install
npm run dev
```

Dashboard will be available at `http://localhost:3000`

# Login Credentials  
```bash
Email: admin@example.com
Password: password123
---
```

# Running the API

```bash
cd api-nodejs
npm install
npm start
```

API will be available at `http://localhost:3001`

---

# Running the API with PM2

```bash
# Start the API
pm2 start ecosystem.config.js

# View running processes
pm2 list

# Restart only the API process
pm2 restart api-nodejs

# View logs
pm2 logs api-nodejs

 # Stop specific process id
pm2 stop 0            
```

---
## What to check if PM2 is restarting in a loop

1. **Check logs first** — `pm2 logs api-nodejs` — look for the actual crash error
2. **Missing env variables** — a missing `JWT_SECRET` or `PORT` will crash on startup
3. **Port already in use** — another process on `3001` will cause immediate exit
4. **Wrong script path** — verify `script` in `ecosystem.config.js` points to the correct entry file
5. **Node version mismatch** — run `node -v` and confirm it matches the required version

# API Endpoints

## Health Check

```http
GET /health
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/health"
```

**CMD:**
```cmd
curl http://localhost:3001/health
```

---

## Login

```http
POST /auth/login
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@example.com","password":"password123"}'
```

**CMD:**
```cmd
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"password123\"}"
```

Response:

```json
{
  "success": true,
  "token": "jwt-token"
}
```

---

## Get Products

```http
GET /api/products
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Headers @{ Authorization = "Bearer YOUR_JWT_TOKEN" }
```

**CMD:**
```cmd
curl http://localhost:3001/api/products -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Get Product By ID

```http
GET /api/products/:id
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products/1" -Headers @{ Authorization = "Bearer YOUR_JWT_TOKEN" }
```

**CMD:**
```cmd
curl http://localhost:3001/api/products/1 -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Create Product

```http
POST /api/products
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method POST -ContentType "application/json" -Headers @{ Authorization = "Bearer YOUR_JWT_TOKEN" } -Body '{"name":"Keyboard","price":100,"description":"New test product","status":"In Stock"}'
```

**CMD:**
```cmd
curl -X POST http://localhost:3001/api/products -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d "{\"name\":\"Keyboard\",\"price\":100,\"description\":\"New test product\",\"status\":\"In Stock\"}"
```

---

## Update Product

```http
PUT /api/products/:id
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products/1" -Method PUT -ContentType "application/json" -Headers @{ Authorization = "Bearer YOUR_JWT_TOKEN" } -Body '{"name":"Mechanical Keyboard","price":150,"status":"In Stock"}'
```

**CMD:**
```cmd
curl -X PUT http://localhost:3001/api/products/1 -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d "{\"name\":\"Mechanical Keyboard\",\"price\":150,\"status\":\"In Stock\"}"
```

---

# Assumptions

* Authentication is performed using JWT access tokens.
* A valid JWT token is required for protected product endpoints.
* Product IDs are unique.
* Product status is limited to predefined values (`"In Stock"`, `"Out of Stock"`).
* The dashboard and API run on separate ports during development.
* Environment variables are properly configured before startup.

---

# Security Notes

### JWT Authentication

Protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

### Input Validation

All incoming requests are validated using Zod schemas before reaching business logic.

### Password Protection

Passwords are never logged or returned in API responses.

### Request Logging

The request logger records HTTP method, route path, response status, and response time.
Sensitive information such as JWT tokens, authorization headers, passwords, and request bodies are never logged.

### Error Handling

A centralized error handler ensures consistent error responses, no stack traces exposed to clients, and validation errors returned in a structured format.

---

# Improvements Beyond Requirements


### 1. Reusable Product Form

Implemented a single reusable form component that handles both Create and Update flows, eliminating duplicated logic and improving maintainability.

### 2. Full CRUD — Delete Endpoint & Confirmation UI
Added `DELETE /api/products/:id` beyond the required endpoints, with a delete button and confirmation dialog on the dashboard to prevent accidental deletion.

### 3. PM2 Ops Diagnostics
Included a detailed checklist for diagnosing PM2 restart loops covering log inspection, missing environment variables, port conflicts, incorrect script paths, and Node version mismatches.

