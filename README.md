# Boston Children's Hospital — Care Platform

Production-oriented **Next.js + Tailwind + Radix + Zustand** care-discovery and intake website with Sanity Studio scaffolding.

> Default mode is staging. Follow [DEPLOY.md](./DEPLOY.md). Set `NEXT_PUBLIC_SITE_OFFICIAL=true` only with authorization.

## Catalog (local)

~28 providers · ~22 conditions · ~12 programs · ~7 locations · ~14 trials

## v1 capabilities

- Public care catalog + appointment / referral intake APIs
- Legal pages, SEO robots/sitemap, staging/official banners
- Staff inbox (`/ops/intake`), Upstash/webhook/Resend delivery
- Sanity Studio in `/studio` + `npm run cms:export`
- Monitoring hooks (`SENTRY_DSN`), Playwright + axe + Lighthouse CI

**Deferred:** authenticated patient portal (preview at `/portal` only).

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
npm run go-live-check
npm run test && npm run test:e2e
```

## Note

Independent redesign / staging platform unless officially authorized.
