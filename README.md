# Trump RX

**Trump RX** is a production Next.js prescription cash-discount platform:
medication search, pharmacy pricing, digital coupons, accounts, alerts,
membership billing, Smart Switch claim-path verification, and digital checkout.

## Stack

- **Next.js 15** (App Router) + **TypeScript (strict)**
- **Tailwind CSS v4** + **shadcn/ui**
- **Prisma** + **PostgreSQL** in production (SQLite allowed for local development only)
- **NextAuth / Auth.js** credentials (+ optional Google)
- Coupons via **JsBarcode**; membership via **Stripe**

## Getting started (local)

```bash
npm install
cp .env.example .env
# Set AUTH_SECRET (openssl rand -base64 32) and DATABASE_URL
npx prisma migrate deploy
# Optional local-only demo user:
# ALLOW_DEMO_SEED=true npm run db:seed
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create accounts via **Sign up** — there is no production auto-login or hardcoded
password bypass.

## Production requirements

- `DATABASE_URL=postgresql://…`
- `AUTH_SECRET` (≥32 chars) and absolute `AUTH_URL` / `NEXT_PUBLIC_APP_URL` (HTTPS)
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PLUS_PRICE_ID`
- Optional: external pricing, Smart Switch, telehealth/mail-order, Resend, Twilio

See `docs/LAUNCH.md` for the full launch checklist.

## Checks

```bash
npm run build
npm run lint
npm run test:smoke
```

## Important disclaimer

Trump RX is a **prescription discount provider, not insurance**. Cash-discount
prices can change and pharmacy participation varies. Trump RX is a **private
independent service** — not a government website, agency program, or official
federal benefit.
