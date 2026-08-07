# Planet Fitness — Acquisition Website

Public site focused on **club discovery**, **transparent local pricing**, and a **join funnel**. Member utilities (check-in, Crowd Meter, workouts, digital keytag) belong in the mobile app.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Radix UI / shadcn-style primitives

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s in place

1. **Club finder** — search, geolocation distance sorting, open/closed hours, amenities
2. **Club pages** — `/gyms/[slug]` with local rates + JSON-LD
3. **Memberships** — Classic vs Black Card matrix + local dues
4. **Join funnel** — `/join` with legal consents, payment authorize, persisted membership IDs
5. **Membership API** — `POST /api/memberships`, `GET /api/memberships/:id` (stored in `.data/`)
6. **Payments** — Stripe when `STRIPE_SECRET_KEY` is set; otherwise test authorization (Luhn-validated). Full PAN is never stored—only brand + last4.
7. **SEO** — Open Graph, sitemap, robots, metadataBase
8. **Consent + analytics** — cookie banner; GTM loads after Accept when `NEXT_PUBLIC_GTM_ID` is set
9. **Error states** — `error.tsx`, `not-found.tsx`, `loading.tsx`, security headers

## Payments

| Mode | When | Behavior |
|------|------|----------|
| Test | No `STRIPE_SECRET_KEY` | Authorizes locally, creates membership, no processor charge |
| Stripe | `STRIPE_SECRET_KEY` set | Creates a Stripe PaymentIntent and stores membership |

Use Stripe test card `4242 4242 4242 4242` for local QA.

## Clubs inventory

Seed clubs live in `lib/clubs.ts` (multi-city). Swap for a live CMS/API via `CLUBS_API_URL` / feed adapter when ready. Phones use `555` exchange numbers for demo safety.
