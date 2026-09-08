# BioCross API

Backend for the BioCross mobile app. Implements the full client contract from `src/api/types.ts`.

## Quick start (local SQLite — no Docker needed)

```bash
cd apps/api
npm install
npm run dev
```

- API: http://localhost:3001  
- Health: http://localhost:3001/health  
- Demo user: `demo@biocross.app` / `demo1234`  
- Data file: `./data/biocross.db` (Node 22 `node:sqlite`)

Smoke test (in another terminal):

```bash
npm run smoke
```

## Postgres (local Docker)

```bash
cd apps/api
docker compose up --build
```

Uses `DATABASE_URL=postgresql://biocross:biocross@db:5432/biocross`.

## Connect the mobile app

Root `.env` or EAS env:

```bash
EXPO_PUBLIC_API_MODE=remote
EXPO_PUBLIC_API_URL=http://localhost:3001
```

For a physical device, use your machine LAN IP instead of `localhost`.

## Deploy (Railway example)

1. Create a Railway project + **Postgres** plugin  
2. New service from `apps/api` directory  
3. Set env:
   - `DATABASE_URL` = Railway Postgres URL  
   - `JWT_SECRET` = long random string  
   - `PORT` = `3001` (or Railway-assigned)  
4. Deploy  
5. Point the app:
   ```bash
   EXPO_PUBLIC_API_MODE=remote
   EXPO_PUBLIC_API_URL=https://your-api.up.railway.app
   ```

Same pattern works on **Fly.io**, **Render**, or **Neon + any Node host**.

## Routes implemented

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | no |
| POST | `/auth/sign-in` | no |
| POST | `/auth/sign-up` | no |
| POST | `/auth/sign-out` | yes |
| GET | `/auth/me` | yes |
| POST | `/auth/forgot-password` | no |
| POST | `/auth/reset-password` | no |
| DELETE | `/auth/account` | yes |
| GET/PUT | `/profile` | yes |
| POST | `/profile/items` | yes |
| DELETE | `/profile/items/:id` | yes |
| POST | `/profile/items/:id/confirm` | yes |
| GET | `/checks` | yes |
| GET | `/checks/:id` | yes |
| POST | `/checks/analyze` | yes |
| GET | `/supplements/search?q=` | no* |
| GET | `/supplements/barcode/:code` | no* |
| GET | `/alerts` | yes |
| POST | `/alerts/:id/read` | yes |
| GET/PUT | `/preferences` | yes |
| GET | `/documents` | yes |
| POST | `/documents/upload` | yes |
| GET | `/documents/:id/extracted` | yes |
| POST | `/onboarding/complete` | yes |
| PUT | `/user` | yes |

\* Catalog lookups are public for simplicity in beta; lock down if needed.

## Password reset

`POST /auth/forgot-password` creates a token and **logs it** (no email yet).  
Wire Resend/SendGrid later; `POST /auth/reset-password` already consumes tokens.

## Analysis

Server-side `ruleset_v1` ingredient rules (yohimbe, synephrine, St. John's Wort, ashwagandha, ginkgo, kava). Results include `rulesetVersion` for auditability.
