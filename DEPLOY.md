# Deploy: demo → staging → production

This app is structured as a **care-discovery + intake** website. The portal remains a preview; do not use it for real PHI.

## 1. Vercel project

1. Import the GitHub repo into Vercel.
2. Framework preset: **Next.js**.
3. Set environment variables from `.env.example`.
4. Deploy a **Preview** URL first (`NEXT_PUBLIC_SITE_MODE=staging`).

## 2. Intake (required for real forms)

Choose at least one:

| Method | Env | Notes |
|--------|-----|-------|
| Webhook | `INTAKE_WEBHOOK_URL` (+ optional `INTAKE_WEBHOOK_SECRET`) | Zapier / Make / n8n / Slack / custom queue |
| Email | `RESEND_API_KEY`, `INTAKE_TO_EMAIL`, `INTAKE_FROM_EMAIL` | Uses Resend HTTP API |

Locally, submissions also write JSON to `.data/intake/` (gitignored).

Health check: `GET /api/health`

## 3. CMS (optional for v1)

1. Create a Sanity project.
2. Port schemas from `src/lib/cms/schemas.ts` into a Sanity Studio.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_API_READ_TOKEN`.
4. Until configured, the site uses local content in `src/content/data`.

## 4. Go-live checklist

- [ ] Legal pages reviewed (`/privacy`, `/terms`, `/accessibility`, `/non-discrimination`)
- [ ] Intake webhook or Resend verified with a test appointment
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain
- [ ] `NEXT_PUBLIC_SITE_MODE=production` (hides staging banner)
- [ ] Analytics ID set if needed
- [ ] Confirm branding/authorization status (official vs redesign portfolio)
- [ ] Portal preview kept non-PHI or removed from primary nav for v1
- [ ] CI green on the release branch

## 5. Recommended v1 scope

**Ship:** find a doctor, conditions, programs, locations, visit prep, billing/records info, appointment + referral intake.

**Defer:** authenticated MyChildren’s-style portal (needs SSO + HIPAA-capable vendors).
