# Boston Children's Hospital — Redesign Architecture

Modular **Next.js (App Router) + Tailwind CSS** implementation of the BCH redesign prototype.

## Source of truth

The uploaded prototype (`prototypes/bch-redesign-v5.html`) consolidates:

- **Design system** tokens, buttons, badges, callouts, forms
- **Homepage** (hero, pathfinder, specialties, programs, ED strip)
- **Condition detail** (Pattern A — clinical reference)
- **Find a Doctor** (Pattern B — decision support)
- **Emergency**, **About**, and design-system reference pages

Separate files named `bch-redesign-v10`, `bch-find-a-doctor`, etc. were referenced in the brief; only the v5 multi-page HTML was available in this environment and is treated as the visual/structural source of truth. Program landing and site search modules are derived from homepage program cards + nav search patterns in that prototype.

## Architecture

```
src/
  app/                    # Routes
    page.tsx              # Homepage
    find-a-doctor/        # Doctor directory + filters
    conditions/[slug]/   # Condition clinical pages
    programs/[slug]/     # Program landing pages
    search/               # Site search results
    emergency/ about/ design-system/
  components/
    ui/                   # Button, Badge, Callout, Input, Icons
    layout/               # Header, Footer, PageHero, Breadcrumb
    home/ doctors/ conditions/ programs/ search/
  lib/
    data/                 # Mock doctors, conditions, programs, search index
    cn.ts
prototypes/               # Archived HTML prototype
```

### Design tokens

Extracted into `tailwind.config.ts` + CSS variables in `src/app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `blue` | `#003087` | Nav, primary CTAs |
| `ocean` | `#007DBA` | Links, h2/h3, interactive |
| `pink` | `#C14991` | Tagline only |
| `sky` | `#41B6E6` | Decorative accent |
| `emergency` | `#E30000` | Life-threatening context only |

Typography: Nunito Sans (Museo Sans spirit). Spacing: 8pt scale (`s1`–`s10`).

### Routing & interactive states

| From | To | Interaction |
|------|----|-------------|
| Header search | `/search` + overlay | Instant results + full results page |
| Find a Doctor CTA | `/find-a-doctor` | URL-synced specialty/location/language/availability/`q` filters |
| Doctor cards / search | `/find-a-doctor/[slug]` | Full profile (bio, education, related program/conditions) |
| Condition CTAs | `/find-a-doctor?specialty=…` or profile slug | Pre-filtered directory or direct profile |
| Program care team | doctor cards → profiles | Linked specialty filters + profiles |
| Homepage specialties/programs | `/conditions/…`, `/programs/…` | Deep links |
| ED wait | header + ED page | `aria-live` status updates |

### Accessibility

- Skip links to `#main` and `#site-nav`
- Keyboard mega menus (Enter/Space, ArrowDown, Escape + focus restore); hover still works
- Patient Portal disclosure with `aria-expanded` / dialog semantics
- Mobile nav focus trap, Escape, body scroll lock
- Search overlay focus trap + live result status
- Directory filter count uses `role="status"` / `aria-live`
- Page heroes use `<section aria-labelledby>`

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
