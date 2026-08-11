# Seascape Inn

Beachfront motel website for Seascape Inn at Plaice Cove, Hampton, NH — rooms, live RezStream rates, TripAdvisor guest notes, interactive map, FAQ, and booking inquiry.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

Optional env (copy and fill what you need):

```bash
cp .env.example .env
# REACT_APP_FORMSPREE_ID=xxxxxxxx        # optional Formspree instead of Formsubmit
# REACT_APP_GA_MEASUREMENT_ID=G-XXXX     # optional Google Analytics 4
# REACT_APP_PLAUSIBLE_DOMAIN=seascapeinnhamptonnh.com
```

Analytics scripts load only after the visitor accepts analytics cookies.

## Booking & rates

- Live booking calendar: [RezStream](https://guest.rezstream.com/search/seascape-inn)
- Seasonal ranges are a guide; exact prices come from RezStream
- Inquiry form defaults to [Formsubmit](https://formsubmit.co) → `seascapeinn@hotmail.com`
  - Send one real test inquiry from the live site
  - Complete Formsubmit’s confirmation email the first time

## Launch checklist

### Important: do not overwrite the portfolio on `main`

Repo `main` is the **Artistic Fountain** portfolio. This motel app lives on `cursor/beach-motel-website-1cb8` (or a dedicated `seascape` branch). **Do not merge PR #14 into `main` to publish.**

| # | Item | Status |
| --- | --- | --- |
| 1 | GitHub Pages | **You:** enable Pages → Source **GitHub Actions** ([settings/pages](https://github.com/jrallis988/Little-Lemon/settings/pages)). Workflow already deploys this motel branch. |
| 2 | Form → `seascapeinn@hotmail.com` | **Wired.** **You:** activate Formsubmit from the first email, then send a live test inquiry. |
| 3 | Domain `seascapeinnhamptonnh.com` | **CNAME in repo.** **You:** point DNS A/CNAME at GitHub Pages, then set Custom domain in Pages settings. |
| 4 | Cookie consent banner | **Done** — Accept / Decline / Manage; preference saved in `localStorage`. |
| 5 | Unique room interiors | **Partial** — Queen, Two Doubles, Economy have distinct heroes. Junior Suite still needs dedicated suite photos from you. |

### 1) Enable GitHub Pages

1. Open [Settings → Pages](https://github.com/jrallis988/Little-Lemon/settings/pages)
2. Set **Source: GitHub Actions** (not “Deploy from a branch” / not `main`)
3. Re-run the **CI and GitHub Pages** workflow on `cursor/beach-motel-website-1cb8`  
   Preview URL until DNS is cut over: `https://jrallis988.github.io/Little-Lemon/`

### 2) Custom domain

This repo includes `public/CNAME` for `seascapeinnhamptonnh.com`.

1. In Pages settings, enter custom domain `seascapeinnhamptonnh.com` and enable HTTPS
2. At your DNS host, point the domain at GitHub Pages:
   - `www` CNAME → `jrallis988.github.io`
   - Apex A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Only flip DNS when you are ready to replace the current site on that hostname

Canonical / Open Graph / sitemap URLs already target `https://seascapeinnhamptonnh.com/`.

### 3) Confirm inquiry email

1. Submit one test inquiry from the live site
2. Check `seascapeinn@hotmail.com` for Formsubmit’s activation email (first time) and click Confirm
3. Submit again and verify the inquiry arrives (including spam)

### 4) Cookie banner

Already implemented on first visit: **Accept**, **Decline**, and **Manage** (analytics optional). Choice is stored in browser `localStorage` so it does not show again.

### 5) Room photos

Send clearer Junior Suite / large-room interiors (JPEG/WebP) and we will wire unique galleries. Avoid mixing other room types into suite photos.

### 6) Optional analytics / Formspree

Add IDs in a local `.env` (or GitHub Actions secrets / repo Variables if you inject them at build time):

| Variable | Purpose |
| --- | --- |
| `REACT_APP_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `REACT_APP_PLAUSIBLE_DOMAIN` | Plausible (example value in `.env.example`) |
| `REACT_APP_FORMSPREE_ID` | Use Formspree instead of Formsubmit |

## Build

```bash
npm run build
```

Asset paths are relative (`homepage: "."`) so the build works on both the GitHub Pages project URL and the custom domain.
