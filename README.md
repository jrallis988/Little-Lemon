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

Repo `main` is the **Artistic Fountain** portfolio. This motel app lives on `cursor/beach-motel-website-1cb8` (or a dedicated `seascape` branch). **Do not merge this PR into `main` to publish.**

### 1) Enable GitHub Pages

1. Open [Settings → Pages](https://github.com/jrallis988/Little-Lemon/settings/pages)
2. Set **Source: GitHub Actions**
3. Re-run the **CI and GitHub Pages** workflow on this branch  
   Preview URL until DNS is cut over: `https://jrallis988.github.io/Little-Lemon/`

### 2) Custom domain (optional but wired)

This repo includes `public/CNAME` for `seascapeinnhamptonnh.com`.

1. In Pages settings, enter custom domain `seascapeinnhamptonnh.com` and enable HTTPS
2. At your DNS host, point the domain at GitHub Pages (A/ALIAS/CNAME records GitHub shows)
3. Only flip DNS when you are ready to replace the current WordPress site on that hostname

Canonical / Open Graph / sitemap URLs already target `https://seascapeinnhamptonnh.com/`.

### 3) Confirm inquiry email

Send a test booking inquiry and approve Formsubmit for `seascapeinn@hotmail.com`.

### 4) Optional analytics / Formspree

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
