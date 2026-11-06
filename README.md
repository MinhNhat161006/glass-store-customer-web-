# GlassStore Customer Web

React/Vite customer application. Use the backend repository's README for the complete environment, canonical MySQL dataset and shared Windows launcher.

## Standard local environment

| Component | Address |
|---|---|
| Customer web | http://127.0.0.1:5173 |
| Internal portal | http://127.0.0.1:5174/login |
| API Gateway | http://127.0.0.1:8080 |
| MySQL used by backend | 127.0.0.1:3306 |

Use Node.js 20 or newer. Keep package-lock.json and install with npm ci. Frontend does not connect directly to MySQL.

## Shared startup

Expected folder layout:

```text
GlassStore/
  backend/
  frontend/
    customer-web/
    internal-portal/
```

Prepare backend/.env and the database once, as described in backend/README.md. From backend run START_GLASSSTORE.bat to build and launch five backend services and both sites. Use CHECK_GLASSSTORE.bat for readiness and STOP_GLASSSTORE.bat to stop launcher-owned applications.

## Run this frontend independently

```powershell
npm ci
npm run dev
```

Vite binds to 127.0.0.1:5173 with strictPort. If the port is occupied, it fails instead of silently switching ports. The backend/gateway must already be running.

.env.example documents optional frontend configuration. Normal local requests use a relative /api path proxied to http://127.0.0.1:8080:

```text
VITE_API_BASE_URL=
VITE_PROXY_TARGET=http://127.0.0.1:8080
VITE_PORT=5173
```

Do not put database passwords or JWT_SECRET into VITE variables. Do not commit personal .env files. Old .env.local direct API URLs can bypass the proxy; remove or update them before using the shared launcher. Environment changes require restarting Vite.

## Development accounts and data

The canonical backend SQL provides customer / customer@gmail.com with password 123456 for local development. Existing machines may have additional/custom accounts; database setup does not overwrite them. The web uses email login. Staff accounts belong in the internal portal.

Use real catalog SKUs, stored order IDs and backend responses. A successfully created online order is not automatically paid, and customer-provided prescription measurements are not an approved clinical prescription. Provider-dependent features must not be represented by fake success messages.

## Verification

```powershell
node --test src/api/checkoutApi.test.js src/components/purchaseUtils.test.js
npm run build
```

An API 401 requires checking the login session. A 502 requires checking gateway/backend health. Browser storage is separate for localhost and 127.0.0.1; use the same host consistently.