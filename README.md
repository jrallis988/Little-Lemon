# James Rallis — Front-End Portfolio

Personal portfolio for **James Rallis**, Front-End Engineer & Multimedia Designer.

**Live site (GitHub Pages):** https://jrallis988.github.io/Little-Lemon/

## Scripts

- `npm start` — run locally at http://localhost:3000
- `npm run build` — production build
- `npm test` — run tests

## Deploy

### GitHub Pages

This repo includes `.github/workflows/deploy.yml`, which builds and deploys on push to `main` or `cursor/frontend-portfolio-d3d8`.

1. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` (or merge the portfolio PR) to trigger a deploy.
3. The site is served from `/Little-Lemon` with `PUBLIC_URL` set in the workflow.

`public/404.html` provides SPA fallback routing for direct links like `/about`.

### Vercel

1. Import the repo in [Vercel](https://vercel.com).
2. Use the default Create React App build settings (`npm run build`, output `build`).
3. `vercel.json` includes SPA rewrites so client-side routes work at the root domain.

No `homepage` field is set in `package.json` so Vercel builds with asset paths at `/`. GitHub Pages sets `PUBLIC_URL=/Little-Lemon` only in CI.

## Stack

React · React Router · Tailwind CSS · Formik/Yup
