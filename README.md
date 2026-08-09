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

Forms send to **jjrallis@unh.edu** by default (FormSubmit.co).  
Confirm the first FormSubmit email once. Override with `VITE_CONTACT_EMAIL` / repo secret.

## Launch checklist

See **[LAUNCH.md](./LAUNCH.md)** — merge PR → enable Pages → open the live URL.

Hero image path: `public/images/campus-sunset.jpg` (+ `.webp`). Replace those files with your sunset + seal photo anytime.

## Notes

- Age gate stores consent in `localStorage` (focus trap included)
- Images ship as WebP with JPG fallback
- Hours match smuttynose.com Backyard listing (Wed–Thu 3–8, Fri–Sun noon–8)
