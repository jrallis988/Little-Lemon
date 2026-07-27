# Walgreens Redesign

Modern, accessible redesign of the Walgreens experience built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS**, and **shadcn/ui**.

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

- **Shop → cart → checkout:** Add items; the header badge updates; place order to clear the cart and see confirmation
- **Pharmacy refill:** Select prescriptions and refill — trackers advance Received → Filling → Ready
- **Search:** Enter submits to `/shop?q=…` or opens the highlighted suggestion
- **Filters:** `/shop?category=skincare` (and category checkboxes) sync with the URL

## Scripts

- `npm run dev` — development server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Project structure

```
src/
  app/                  # App Router pages (home, pharmacy, shop, checkout)
  components/
    layout/             # Header, mega-menu, smart search, footer
    pharmacy/           # Dashboard, tracker, profile switcher
    shop/               # Product grid, filters, rewards
    checkout/           # Guest / member / quick-pay funnel
    home/               # Landing sections
    ui/                 # shadcn/ui primitives
  lib/
    types/              # Domain TypeScript interfaces
    data/               # Mock catalog & pharmacy data
    pharmacy.ts         # Status helpers & formatters
```

## Accessibility

- Skip link, semantic landmarks, labeled form controls
- Keyboard-friendly search combobox and navigation
- Visible focus styles; `prefers-reduced-motion` respected for animations
- Color contrast oriented toward WCAG 2.1 AA

This is a design/engineering prototype and is not affiliated with Walgreens Boots Alliance.
