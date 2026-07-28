# Seascape Inn

Beachfront motel website for Seascape Inn at Plaice Cove, Hampton, NH — rooms, live RezStream rates, TripAdvisor guest notes, interactive map, and booking inquiry.

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
- Optional Formspree override:

```bash
cp .env.example .env
# set REACT_APP_FORMSPREE_ID=your_form_id
```

## Launch checklist

### 1. Publish on GitHub Pages

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Merge PR into `main` (deploy job only runs on `main`)
3. Site URL: `https://jrallis988.github.io/Little-Lemon/`

Manual publish (optional):

```bash
npm install
npm run deploy
```

### 2. Point a custom domain (optional)

If you control `seascapeinnhamptonnh.com` (or a subdomain):

1. Add a `CNAME` file in `public/` with the hostname (e.g. `www.seascapeinnhamptonnh.com`)
2. In GitHub Pages settings, set the custom domain and enable HTTPS
3. At your DNS host, add the records GitHub shows (usually an `A`/`AAAA` or `CNAME`)
4. Update the canonical / Open Graph URLs in `public/index.html` and `public/sitemap.xml` to match

### 3. Confirm inquiry email

Send one test inquiry after go-live and complete any Formsubmit confirmation email to `seascapeinn@hotmail.com`.

## Build

```bash
npm run build
```
