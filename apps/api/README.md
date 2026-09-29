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

## Deploy (Railway)

From `apps/api` (uses `railway.toml` + `Dockerfile`):

1. Create a Railway project + **Postgres** plugin  
2. New service from `apps/api` directory  
3. Set env:
   - `DATABASE_URL` = Railway Postgres URL  
   - `JWT_SECRET` = long random string  
   - `RESEND_API_KEY` = Resend key (password-reset email)  
   - `EMAIL_FROM` = `BioCross <noreply@yourdomain.com>`  
   - `SENTRY_DSN` = optional  
   - `PORT` = `3001` (or Railway-assigned)  
4. Deploy  
5. Point the app:
   ```bash
   EXPO_PUBLIC_API_MODE=remote
   EXPO_PUBLIC_API_URL=https://your-api.up.railway.app
   ```

## Deploy (Fly.io)

```bash
cd apps/api
fly launch --config fly.toml
fly secrets set JWT_SECRET=... DATABASE_URL=... RESEND_API_KEY=...
fly deploy
```

Same pattern works on **Render** or **Neon + any Node host**.

## Routes implemented

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | no |
| POST | `/auth/sign-in` | no |
| POST | `/auth/sign-up` | no |
| POST | `/auth/refresh` | no |
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
| GET | `/supplements/:id` | no* |
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

`POST /auth/forgot-password` creates a one-hour token and emails a deep link
(`biocross://auth/reset-password?token=...`) via **Resend** when `RESEND_API_KEY` is set.
Without the key, the message (including the link) is logged for local testing.
`POST /auth/reset-password` consumes the token and revokes refresh tokens.

## Token refresh

Sign-in / sign-up persist opaque refresh tokens (30 days).  
`POST /auth/refresh` rotates them. Sign-out, password reset, and account delete revoke them.

## Analysis

Server-side `ruleset_v1` ingredient rules (yohimbe, synephrine, St. John's Wort, ashwagandha, ginkgo, kava). Results include `rulesetVersion` for auditability.
