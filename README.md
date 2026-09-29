# Boston Children's Hospital — Care Platform

Production-oriented **Next.js + Tailwind + Radix + Zustand** care-discovery and intake website with Sanity Studio scaffolding.

> Default mode is staging. Follow [DEPLOY.md](./DEPLOY.md). Set `NEXT_PUBLIC_SITE_OFFICIAL=true` only with authorization.

Homepage marketing copy, awards (U.S. News Honor Roll **2026–2027**, Newsweek **2027**), hero media, rankings ticker, construction alert, and “Latest from Boston Children’s” columns were synced to [childrenshospital.org](https://www.childrenshospital.org) as of September 2026. Full care-platform routes and catalog remain intact.

## Catalog (local)

~28 providers · ~22 conditions · ~12 programs · ~7 locations · ~14 trials

## Platform pages retained

Home, Find a Doctor (+ profiles), Conditions, Programs, Locations, Appointments, Emergency, Patients & Families (visit prep / billing / records), MyChildren’s portal preview, Professionals (refer / second opinion), Research, About (+ leadership / history / community), International, Español, 中文, Search, legal/SEO, ops intake inbox, design system.

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
