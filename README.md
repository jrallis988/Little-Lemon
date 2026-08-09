# Smuttynose Brewing

Marketing site for **Smuttynose Brewing** (Hampton, NH) — Towle Farm campus, Backyard events, tap list, food, shop, Suds Club, contact, and newsletter.

**Live (after Pages is enabled):** https://jrallis988.github.io/Little-Lemon/

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- GitHub Pages deploy

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Keep content fresh (no redesign needed)

| File | What it controls |
|------|------------------|
| `public/data/taps.json` | On-tap board + classics |
| `public/data/events.json` | Weekly campus events |
| `public/images/` | Campus photos (JPG + WebP) |

Edit those JSON files and push — the site loads them at runtime.

## Working contact & newsletter

1. Copy `.env.example` → `.env`
2. Set `VITE_CONTACT_EMAIL` to your inbox
3. For GitHub Pages: add repo secret `VITE_CONTACT_EMAIL`, then redeploy
4. Confirm the first FormSubmit email once

Without that env var, contact falls back to mailto and newsletter saves locally.

## Launch checklist

1. Merge PR into `main`
2. Settings → Pages → Source: **GitHub Actions**
3. Optional: drop your sunset + seal photo at `public/images/campus-sunset.jpg` (+ `.webp`) and point the hero at `campus-sunset`

## Notes

- Age gate stores consent in `localStorage` (focus trap included)
- Images ship as WebP with JPG fallback
- Hours match smuttynose.com Backyard listing (Wed–Thu 3–8, Fri–Sun noon–8)
