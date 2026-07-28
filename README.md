# Boston Children's Hospital — Redesign Architecture

Production-oriented **Next.js (App Router) + Tailwind CSS + Radix UI + Zustand** platform with CMS-shaped content (Sanity-ready) evolving from the BCH redesign prototype.

## Source of truth

Prototype archived at `prototypes/bch-redesign-v5.html`.

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js App Router |
| UI / a11y | Tailwind + Radix (NavigationMenu, Dialog, Select, Tabs) |
| Content | Local catalog + Sanity client scaffolding (`src/lib/cms`) |
| State | Zustand (appointment wizard + portal) |
| Quality | Vitest, jest-axe, Lighthouse CI workflow |

## Catalog scale (local content)

~17 providers · ~14 conditions · ~8 programs · ~7 locations · ~8 trials

## Key routes

- Care: `/find-a-doctor`, `/conditions`, `/programs`, `/locations/[slug]`, `/appointments/request`, `/emergency`
- Portal: `/portal`
- Patients: `/patients-families/*` (billing, visit prep, medical records)
- Professionals: `/professionals/refer`, `/professionals/second-opinion`
- Research: `/research` (searchable trials)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
```

Copy `.env.example` for Sanity + analytics env vars (optional; local content is the default).

## Note

Portfolio redesign prototype — not an official Boston Children's Hospital website.
