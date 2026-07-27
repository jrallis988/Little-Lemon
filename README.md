# Planet Fitness — Acquisition Website

Minimalist public site focused on **club discovery**, **transparent local pricing**, and a **frictionless join funnel**. Member utilities (check-in, crowd meter, workouts, digital keytag) belong in the mobile app.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Radix UI / shadcn-style primitives

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s in place

1. **Club finder** — full-viewport search with live open/closed from weekly schedules, amenities, and keyboard listbox nav
2. **Local pricing** — Classic vs Black Card dues vary by club; national matrix + confirmed local rates
3. **Join funnel** — `/join` multi-step (club/plan → identity → payment → done) with fees visible every step
4. **App hand-off banner** — existing members → PF app
5. **Club feed API** — `GET /api/clubs?q=` (swap for CMS later)
6. **Funnel analytics** — `club_search`, `club_select`, `plan_select`, `join_step`, `join_complete` via `window.dataLayer`
