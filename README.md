# James Rallis — Front-End Portfolio

Personal portfolio for **James Rallis**, Front-End Engineer & Multimedia Designer.

**Live site (GitHub Pages):** https://jrallis988.github.io/Little-Lemon/

## Scripts

- `npm start` — run locally at http://localhost:3000
- `npm run build` — production build
- `npm test` — run tests

## Deploy

### GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which publishes the production build to the `gh-pages` branch on push to `main`.

1. In the repo **Settings → Pages**, set **Source** to **Deploy from a branch**.
2. Choose branch **`gh-pages`** and folder **`/ (root)`**.
3. Merge to `main` to trigger a deploy.

Live URL: **https://jrallis988.github.io/Little-Lemon/**

`public/404.html` provides SPA fallback routing for direct links like `/about`.

CI runs separately via `.github/workflows/ci.yml` on pushes and pull requests.

### Vercel

1. Import the repo in [Vercel](https://vercel.com).
2. Use the default Create React App build settings (`npm run build`, output `build`).
3. `vercel.json` includes SPA rewrites so client-side routes work at the root domain.

No `homepage` field is set in `package.json` so Vercel builds with asset paths at `/`. GitHub Pages sets `PUBLIC_URL=/Little-Lemon` only in CI.

## Stack

React · React Router · Tailwind CSS · Formik/Yup
