# Seascape Inn

Beachfront motel website for Seascape Inn at Plaice Cove, Hampton, NH — rooms, live RezStream rates, TripAdvisor guest notes, interactive map, FAQ, and booking inquiry.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Booking & rates

- Live booking calendar (embedded + new tab): [RezStream](https://guest.rezstream.com/search/seascape-inn)
- Seasonal ranges on the Rates section are a guide; exact prices come from RezStream
- Inquiry form posts through [Formsubmit](https://formsubmit.co) to `seascapeinn@hotmail.com`
  - The first submission may require confirming the email address once
- Optional Formspree / analytics:

```bash
cp .env.example .env
# REACT_APP_FORMSPREE_ID=
# REACT_APP_GA_MEASUREMENT_ID=
# REACT_APP_PLAUSIBLE_DOMAIN=
```

Analytics scripts load only after the visitor accepts analytics cookies.

## Launch checklist

### Important: do not overwrite the portfolio on `main`

Repo `main` is the **Artistic Fountain** portfolio site. This motel app lives on `cursor/beach-motel-website-1cb8` (or a dedicated `seascape` branch). Merging this PR into `main` will conflict and would replace the portfolio — **do not merge for publish**.

### Must do to go live (GitHub Pages from the motel branch)

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push (or re-run the workflow) on `cursor/beach-motel-website-1cb8` — CI builds, then deploys Pages from that branch only
3. Site URL: `https://jrallis988.github.io/Little-Lemon/`
4. Send one test inquiry and complete any Formsubmit confirmation email to `seascapeinn@hotmail.com`

Optional later: keep motel code on a long-lived `seascape` branch (workflow already deploys that name too) so you can rename away from the agent branch without touching `main`.

### Optional custom domain

If you control `seascapeinnhamptonnh.com` (or a subdomain):

1. Add a `CNAME` file in `public/` with the hostname
2. In GitHub Pages settings, set the custom domain and enable HTTPS
3. Add the DNS records GitHub shows
4. Update canonical / Open Graph URLs in `public/index.html` and `public/sitemap.xml`

### Verify with the inn

FAQ and policy copy uses soft language for breakfast, check-out, deposits, and cancellations. Confirm current front-desk practice and tighten wording once verified.

## Build

```bash
npm run build
```
