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

### Must do to go live

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Merge PR `#14` into `main` (deploy job only runs on `main`)
3. Site URL: `https://jrallis988.github.io/Little-Lemon/`
4. Send one test inquiry and complete any Formsubmit confirmation email to `seascapeinn@hotmail.com`

### Optional custom domain

If you control `seascapeinnhamptonnh.com` (or a subdomain):

1. Add a `CNAME` file in `public/` with the hostname
2. In GitHub Pages settings, set the custom domain and enable HTTPS
3. Add the DNS records GitHub shows
4. Update canonical / Open Graph URLs in `public/index.html` and `public/sitemap.xml`

### Verify with the inn

Confirm breakfast offerings, check-out time, and deposit rules against current front-desk policy. FAQ wording asks guests to confirm on their reservation when details may vary.

## Build

```bash
npm run build
```
