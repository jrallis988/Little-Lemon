# Boston Children's Hospital — Care Platform (portfolio)

Conceptual **Next.js + Tailwind + Radix + Zustand** care-discovery case study. This is a portfolio piece, not a live hospital website, patient portal, or payment product.

Homepage marketing copy, awards (U.S. News Honor Roll **2026–2027**, Newsweek **2027**), hero media, rankings ticker, construction alert, and “Latest from Boston Children’s” columns were synced to [childrenshospital.org](https://www.childrenshospital.org) as of September 2026. Full care-platform routes and catalog remain intact.

## Catalog (local)

~28 providers · ~22 conditions · ~12 programs · ~7 locations · ~14 trials

## Platform pages retained

Home, Find a Doctor (+ profiles), Conditions, Programs, Locations, Appointments, Emergency, Patients & Families (visit prep / billing / records), MyChildren’s portal preview, Professionals (refer / second opinion), Research, About (+ leadership / history / community), International, Español, 中文, Search, legal/SEO, ops intake inbox, design system.

## v1 capabilities

- Public care catalog + appointment / referral form prototypes
- Legal/SEO pages and a portfolio case-study banner
- Demo portal at `/portal` (no real login, PHI, or bill pay)
- Sanity Studio scaffolding, tests, and Lighthouse CI as craft evidence

**Out of scope for a portfolio piece:** real MyChart/Epic billing, SSO, or HIPAA production.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
npm run go-live-check
npm run test && npm run test:e2e
```

## Note

Independent conceptual redesign for portfolio review.
