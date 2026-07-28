# Trump RX

**Trump RX** is a Next.js prescription cash-discount app with medication
search, local pharmacy pricing, issued coupons, accounts, alerts, and optional
membership.

## What this improves

- **Broader catalog feel** — brand *and* generic search, not a short deal list
- **Local pharmacy matrix** — compare CVS, Walgreens, Walmart, Costco, independents by price and distance
- **30 / 90-day supply toggles** with clear savings tips
- **Show-to-pharmacist coupon** with large barcode + BIN / PCN / Group / Member ID
- **Account profile** — server-backed saved meds, pharmacies, coupons, and alerts
- **Accessibility-first** UI for patients, caregivers, and seniors

## Stack

- **Next.js 15** (App Router) + **TypeScript (strict)**
- **Tailwind CSS v4** + **shadcn/ui**
- **Prisma** + SQLite (swap the datasource for a production database)
- **NextAuth** credentials sessions
- Scannable coupons via **JsBarcode**

## Getting started

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If `.env` does not already contain one, set `AUTH_SECRET` to a strong random
value before starting the app. For example, generate one with
`openssl rand -base64 32`.

The seed creates this development account:

- Email: `demo@trumprx.app`
- Password: `password123`

When changing the Prisma schema during development, create a new migration with
`npx prisma migrate dev --name describe-your-change`.

## Optional integrations

- Stripe is optional. Set `STRIPE_SECRET_KEY`,
  `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PLUS_PRICE_ID` to enable subscription
  checkout. Without Stripe, the checkout route activates Plus locally for 30
  days so development flows remain testable.
- An external pricing provider is optional. Set `PRICING_PROVIDER="external"`,
  `PRICING_API_URL`, and optionally `PRICING_API_KEY`. The built-in network
  pricing service is used by default and as the fallback.

## Checks

```bash
npm run build
npm run lint
```

## Project layout

```
src/
  app/                 # Pages and API routes
  components/
    search/            # Autocomplete drug search
    pricing/           # Comparison matrix + savings tips
    pharmacy/          # Location picker + store cards
    coupon/            # Scannable coupon modal
    layout/            # Header, footer, disclaimer banner
    ui/                # shadcn primitives
  lib/
    types.ts           # Domain TypeScript interfaces
    pricing.ts         # Client-safe currency formatting
    pricing-service.ts # Server catalog, pharmacy, and pricing operations
    store/             # Client location preferences
```

## Important disclaimer

Trump RX is a **prescription discount provider, not insurance**. Cash-discount
prices can change and pharmacy participation varies. It is not affiliated with
or endorsed by the United States government or TrumpRx.gov unless expressly
stated under a valid license or authorization.
