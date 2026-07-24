# ClearDose

Transparent prescription pricing and pharmacy coupons — a GoodRx-inspired web platform built for patients, caregivers, and seniors navigating high medication costs.

## Stack

- **Next.js 15** (App Router) + **TypeScript (strict)**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- Local-first profile via **Zustand** (optional saved meds / alerts)
- Scannable coupons via **JsBarcode**

## Core pillars

1. **Intelligent drug search & pricing matrix** — autocomplete, dosage/quantity/30–90 day toggles, pharmacy comparison table
2. **Location-based pharmacy finder** — ZIP / geolocation, distance sorting, store cards with hours & coupon acceptance
3. **Show-to-pharmacist coupon UX** — large barcode, BIN / PCN / Group / Member ID
4. **Trust & compliance** — discount-provider disclaimers, privacy-first local storage defaults

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project layout

```
src/
  app/                 # Routes: /, /search, /pharmacies, /profile, /privacy
  components/
    search/            # Autocomplete drug search
    pricing/           # Comparison matrix + savings tips
    pharmacy/          # Location picker + store cards
    coupon/            # Scannable coupon modal
    layout/            # Header, footer, disclaimer banner
    ui/                # shadcn primitives
  lib/
    types.ts           # Domain TypeScript interfaces
    pricing.ts         # Search, distance, offer generation
    data/              # Demo drugs & pharmacies
    store/             # Profile + location state
```

## Important disclaimer

ClearDose is a **prescription discount provider, not insurance**. Demo prices and BIN/PCN values are illustrative for product development — not live claims adjudication.
