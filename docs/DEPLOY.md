# Deploy Trump RX

## Quick paths

### Vercel + managed Postgres
1. Create a Postgres database (Neon, Supabase, Vercel Postgres).
2. In `prisma/schema.prisma`, set `provider = "postgresql"` before first prod migrate.
3. Set env: `DATABASE_URL`, `AUTH_SECRET` (≥32), `AUTH_URL`, `NEXT_PUBLIC_APP_URL` (HTTPS).
4. Deploy with `vercel.json` (framework: nextjs). Run `prisma migrate deploy` on release.
5. Add Stripe webhook → `/api/webhooks/stripe`.
6. Set `ADMIN_EMAILS` + Resend so chat alerts fire.

### Docker Compose (self-host)
```bash
# Switch Prisma datasource provider to postgresql first
docker compose up --build
```
Compose starts Postgres + the Next app on port 3000.

### Health / uptime
Point your monitor at `GET /api/health` (expect HTTP 200).

### Chat staffing
- Inbox: `/admin/messages`
- New visitor messages email `ADMIN_EMAILS` when Resend is configured
- Optional `ADMIN_SMS_TO` for Twilio SMS pings

### Observability
Set `SENTRY_DSN` to forward exceptions via `src/lib/observability.ts`.
