# Boston Children's Hospital — Redesign Architecture

Production-oriented **Next.js (App Router) + Tailwind CSS + Radix UI + Zustand** platform evolving from the BCH redesign prototype toward a scalable hospital content & portal shell.

## Source of truth

The uploaded prototype (`prototypes/bch-redesign-v5.html`) consolidates:

- **Design system** tokens, buttons, badges, callouts, forms
- **Homepage** (hero, pathfinder, specialties, programs, ED strip)
- **Condition detail** (Pattern A — clinical reference)
- **Find a Doctor** (Pattern B — decision support)
- **Emergency**, **About**, and design-system reference pages

Separate files named `bch-redesign-v10`, `bch-find-a-doctor`, etc. were referenced in the brief; only the v5 multi-page HTML was available and is treated as the visual/structural source of truth.

## Production stack direction

| Layer | Choice | Role |
|-------|--------|------|
| Frontend | Next.js App Router | Hybrid SSG/SSR for SEO across catalog pages |
| Styling / a11y primitives | Tailwind + Radix UI | Tokens + accessible menus/dialogs/filters |
| Content | CMS-shaped schemas (local TS → Sanity/Strapi later) | Conditions, programs, providers, locations, trials |
| Client state | Zustand (persisted) | Appointment wizard + portal sandbox session |
| Delivery | Vercel-ready | Edge-friendly static + dynamic routes |

## Architecture

```
src/
  app/
    page.tsx                 # Homepage
    find-a-doctor/           # Directory + [slug] profiles
    conditions/              # A–Z index + [slug] clinical pages
    programs/                # Index + [slug] landings
    locations/               # Campus hub
    appointments/request/    # Multi-step appointment wizard
    portal/                  # MyChildren’s sandbox
    professionals/ research/ patients-families/
    search/ emergency/ about/ design-system/
  components/
    ui/ layout/ home/ doctors/ conditions/ programs/
    search/ appointments/ portal/
  content/
    types/                   # Sanity-ready document schemas
    data/                    # Local catalog (conditions, programs, providers, …)
  lib/
    content/                 # contentApi + relational resolve + legacy adapters
    data/                    # Thin re-exports for existing UI
    a11y.ts
  store/                     # Zustand appointment + portal stores
prototypes/                  # Archived HTML prototype
```

### Content catalog (Phase 1)

Unified models for `Condition`, `Program`, `Provider`, `Location`, `Department`, and `ClinicalTrial`. Program pages resolve related doctors, trials, and parent departments via `contentApi`. A–Z indices live at `/conditions` and `/programs`.

### Transactional & portal (Phase 2)

- **`/appointments/request`** — care need → insurance → location/telehealth → contact → mock ticket ID (Zustand + persist)
- **`/portal`** — MyChildren’s sandbox (sign-in, results, messages, visits, refills)

### Resource hubs (Phase 3)

- `/professionals` — refer-a-patient, directory, CME links
- `/research` — labs, trials finder, publications
- `/patients-families` — visit prep, parking, billing, records
- `/locations` — Longwood, Waltham, Needham, Lexington, Peabody

### Design tokens

| Token | Value | Use |
|-------|-------|-----|
| `blue` | `#003087` | Nav, primary CTAs |
| `ocean` | `#007DBA` | Links, h2/h3, interactive |
| `pink` | `#C14991` | Tagline only |
| `sky` | `#41B6E6` | Decorative accent |
| `emergency` | `#E30000` | Life-threatening context only |

Typography: Nunito Sans. Spacing: 8pt scale (`s1`–`s10`).

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Note

This is a **portfolio redesign prototype**, not an official Boston Children's Hospital website.
