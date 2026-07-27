# Walgreens RX

Modern, accessible redesign prototype branded **Walgreens RX**, built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS**, and **shadcn/ui**.

## Core pillars

1. **Pharmacy & Health Dashboard** — prescription refill flows, Received → Filling → Ready tracking, caregiver profile switching
2. **Intelligent Navigation & Search** — predictive mega-menu and smart search that separates clinical, pharmacy, and retail intents
3. **Frictionless Commerce** — health/beauty filters, myWalgreens rewards, guest / member / quick-pay checkout

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Interactive prototype flows

- **Shop → product → cart → checkout:** Product detail pages, header badge, place order confirmation
- **Pharmacy refill:** Select prescriptions and refill — trackers advance Received → Filling → Ready
- **Search:** Enter submits to `/shop?q=…` or opens the highlighted suggestion
- **Filters:** `/shop?category=skincare` (and category checkboxes) sync with the URL
- **More surfaces:** `/deals`, `/photo`, `/stores`

## Scripts

- `npm run dev` — development server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright smoke tests

## Project structure

```
src/
  app/                  # App Router pages
  components/
    layout/             # Header, mega-menu, smart search, footer
    pharmacy/           # Dashboard, tracker, profile switcher
    shop/               # Product grid, detail, filters, rewards
    checkout/           # Guest / member / quick-pay funnel
    home/               # Landing sections
    ui/                 # shadcn/ui primitives
  lib/
    brand.ts            # Walgreens RX naming
    types/              # Domain TypeScript interfaces
    data/               # Mock catalog, landing, stores
    store/              # Cart + pharmacy client state
```

This is a design/engineering prototype and is not affiliated with Walgreens Boots Alliance.
