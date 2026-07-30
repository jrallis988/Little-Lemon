# Boston Children's Hospital — Care Platform

Production-oriented **Next.js (App Router) + Tailwind + Radix UI + Zustand** care-discovery and intake website.

> Staging by default. See [DEPLOY.md](./DEPLOY.md) to go live. This redesign is not an official Boston Children's Hospital production property unless separately authorized.

## What ships in v1

- Public catalog: doctors, conditions, programs, locations
- Appointment request intake (`POST /api/appointments/request`)
- Professional referral / second-opinion intake
- Patients & families operational pages
- Legal pages + staging banner
- Sanity-ready CMS client (local content fallback)
- Vitest + CI

**Deferred:** authenticated patient portal (preview only at `/portal`).

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run test        # unit + component
npm run test:e2e    # Playwright smoke (builds + starts server)
npm run build
```

Staff inbox (local/staging): set `INTAKE_OPS_SECRET` and open `/ops/intake`.

## Production wiring

| Concern | How |
|---------|-----|
| Hosting | Vercel (`vercel.json` security headers included) |
| Intake | `INTAKE_WEBHOOK_URL` and/or `RESEND_API_KEY` |
| CMS | Sanity env vars → `src/lib/cms` |
| Mode | `NEXT_PUBLIC_SITE_MODE=staging\|production` |
| Health | `GET /api/health` |

## Architecture

```
src/
  app/                 # Routes + API intake endpoints
  components/          # UI, layout, domain screens
  content/             # Local CMS-shaped catalog
  lib/cms/             # Sanity client + schemas
  lib/intake/          # Validation + delivery
  store/               # Client draft/portal preview state
```

## Note

Portfolio / staging redesign platform. Confirm branding/authorization before presenting as an official hospital website.
