# River Valley Community College — portfolio redesign

A concept marketing site for [River Valley Community College](https://www.rivervalley.edu). This is a **portfolio piece**, not the official college website and not a live production app.

**Stack:** React 18, React Router 6, Tailwind CSS.

## What this shows

A prospect-facing admissions front door: brand-first hero, filterable program catalog, tuition calculator, campus maps, and a current-student utility strip (EasyLogin · Register · Pay). Official Apply still points at the real RVCC application; inquiry form works as an in-browser demo.

## Pages

- `/` — home with happening strip
- `/programs` — filter by area, credential, campus, search
- `/programs/:slug` — pathway details + official catalog/program links
- `/admissions` — steps, demo inquiry form, team
- `/financial-aid` — FAFSA code 007560, aid steps, tuition calculator
- `/student-life` — supports + EasyLogin · Register · Pay
- `/about` — history, campuses, maps

## Scripts

- `npm start` — development server
- `npm test` — tests
- `npm run build` — production build

The inquiry form saves to `localStorage` so the demo can be clicked end-to-end without a backend. Optional: set `REACT_APP_FORMSPREE_ID` if you want live email delivery.

## Official sources

- Apply: https://www.rivervalley.edu/admissions/welcome/
- Catalog: https://catalog.rivervalley.edu/
- My RVCC: https://myrvcc.rivervalley.edu
- FAFSA school code: **007560**
