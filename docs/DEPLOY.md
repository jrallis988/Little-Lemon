# Deploy Trump RX

## 1. Bootstrap secrets

```bash
npm run setup:env
# Edit .env — set ADMIN_EMAILS, Resend, Stripe, partners
```

Open **`/admin/launch`** (sign in with an `ADMIN_EMAILS` account) for the live
checklist, connectivity probes, and legal toggles.

## 2. PostgreSQL

```bash
npm run db:use-postgres
# Set DATABASE_URL=postgresql://USER:PASS@HOST:5432/trumprx?sslmode=require
npx prisma migrate deploy
npm run db:seed   # optional
```

## 3. Hosting options

### Vercel + managed Postgres
1. Postgres (Neon / Supabase / Vercel Postgres)
2. Env: `DATABASE_URL`, `AUTH_SECRET` (≥32), `AUTH_URL`, `NEXT_PUBLIC_APP_URL` (HTTPS)
3. Deploy (`vercel.json`). Run migrate on release.
4. Stripe webhook → `/api/webhooks/stripe`
5. `ADMIN_EMAILS` + Resend for chat alerts

### Docker Compose
```bash
npm run db:use-postgres
docker compose up --build
```

## 4. Partners

See `docs/PARTNERS.md` for Switch / Pricing / Stripe contracts.
Use Launch Control probes to verify `/v1/health` endpoints.

## 5. Chat staffing
- Inbox: `/admin/messages`
- Notify: `ADMIN_EMAILS` (+ optional `ADMIN_SMS_TO`)
- Test from Launch Control → **Test chat email**

## 6. Legal
Track counsel review on `/admin/launch#legal` (Terms + Privacy pages).

## 7. Health / uptime
`GET /api/health` → expect HTTP 200. Optional `SENTRY_DSN`.
