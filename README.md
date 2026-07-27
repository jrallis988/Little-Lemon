# Seascape Inn

Beachfront motel website for Seascape Inn at Plaice Cove, Hampton, NH — rooms, live rate checker (RezStream), TripAdvisor guest notes, location, and booking.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Booking & rates

- Live booking: [RezStream](https://guest.rezstream.com/search/seascape-inn)
- On-site **Rates** section builds a dated link into that calendar
- Inquiry form falls back to email (`seascapeinn@hotmail.com`) or Formspree if configured

Optional Formspree:

```bash
cp .env.example .env
# set REACT_APP_FORMSPREE_ID=your_form_id
```

## Deploy

GitHub Pages workflow is in `.github/workflows/deploy-pages.yml`.

After Pages is enabled for the repo (Settings → Pages → Source: GitHub Actions), pushes to `main` or this branch can publish to:

`https://jrallis988.github.io/Little-Lemon/`

Manual publish (optional):

```bash
npm install
npm run deploy
```

## Build

```bash
npm run build
```
