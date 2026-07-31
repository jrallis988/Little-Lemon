# Deploy: staging → production

This app is a **care-discovery + intake** website. The portal remains preview-only — do not use it for real PHI.

## Quick commands

```bash
npm run go-live-check   # env readiness
npm run test
npm run test:e2e
npm run cms:export      # NDJSON for Sanity import
cd studio && npm install && npm run dev
```

## 1. Vercel

1. Import the GitHub repo into Vercel (Next.js preset).
2. Copy `.env.example` into Vercel Project → Settings → Environment Variables.
3. Deploy a Preview URL with `NEXT_PUBLIC_SITE_MODE=staging`.
4. After smoke tests, set production domain + `NEXT_PUBLIC_SITE_MODE=production`.

## 2. Intake (required)

Configure **at least one** durable channel:

| Method | Env | Notes |
|--------|-----|-------|
| Webhook | `INTAKE_WEBHOOK_URL` (+ optional secret) | Zapier / Make / n8n / CRM queue (retried) |
| Email | `RESEND_API_KEY`, `INTAKE_TO_EMAIL` | Resend HTTP API (retried) |
| Redis | `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Durable key/value store |

Local/dev also writes `.data/intake/` (gitignored). On Vercel, disk is ephemeral.

- Health: `GET /api/health`
- Staff inbox: set `INTAKE_OPS_SECRET`, open `/ops/intake`

## 3. CMS (Sanity)

1. Create a Sanity project.
2. Run Studio from `/studio` (see `studio/README.md`).
3. Export local catalog: `npm run cms:export > /tmp/bch-content.ndjson`
4. Import NDJSON into your dataset.
5. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (+ dataset/token) on Vercel.

Until configured, the app uses `src/content/data`.

## 4. Branding / authorization

- **Authorized official site:** `NEXT_PUBLIC_SITE_OFFICIAL=true`
- **Independent redesign / portfolio product:** keep `false` and set your own `NEXT_PUBLIC_SITE_NAME`

## 5. Monitoring & media

- `SENTRY_DSN` for error capture
- `NEXT_PUBLIC_ANALYTICS_ID` for analytics hooks
- Replace Unsplash stand-ins per `/media-policy` before official launch

## 6. Go-live checklist

- [ ] `npm run go-live-check` passes required checks
- [ ] Legal pages reviewed
- [ ] Intake channel verified with a real test submission
- [ ] Ops secret set
- [ ] Production domain + `SITE_MODE=production`
- [ ] Branding authorized or rebranded
- [ ] Portal remains preview-only
- [ ] CI green (lint, unit, Playwright e2e, Lighthouse a11y)

## 7. v1 scope

**Ship:** doctors, conditions, programs, locations, visit prep, billing/records, appointment + referral intake.

**Defer:** authenticated patient portal (SSO + HIPAA vendors).
