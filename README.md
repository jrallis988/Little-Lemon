# Trump RX

An improved **Trump RX** web experience for transparent prescription pricing, local pharmacy coupon discovery, and frictionless savings — designed as a better, broader alternative to the boutique-style catalog experience of the current site.

## What this improves

- **Broader catalog feel** — brand *and* generic search, not a short deal list
- **Local pharmacy matrix** — compare CVS, Walgreens, Walmart, Costco, independents by price and distance
- **30 / 90-day supply toggles** with clear savings tips
- **Show-to-pharmacist coupon** with large barcode + BIN / PCN / Group / Member ID
- **Optional local profile** — saved meds and alerts without forced account walls
- **Accessibility-first** UI for patients, caregivers, and seniors

## Stack

- **Next.js 15** (App Router) + **TypeScript (strict)**
- **Tailwind CSS v4** + **shadcn/ui**
- Local-first profile via **Zustand**
- Scannable coupons via **JsBarcode**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run lint
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

Trump RX (this demo) is a **prescription discount provider concept, not insurance**. Demo prices and BIN/PCN values are illustrative for product development — not live claims adjudication or an official government service.
