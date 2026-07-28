# River Valley Community College

A modern marketing site for [River Valley Community College](https://www.rivervalley.edu), built with React, React Router, and Tailwind CSS.

## Scripts

- `npm start` — run the development server
- `npm test` — run tests
- `npm run build` — create a production build

## Pages

- `/` — brand-forward home with happening strip
- `/programs` — filterable catalog (area, credential, campus, search)
- `/programs/:slug` — pathway details + official catalog links
- `/admissions` — steps, inquiry form, team, and portal links
- `/financial-aid` — FAFSA code, aid steps, tuition rates + calculator
- `/student-life` — supports, success resources, and CCSNH portals
- `/about` — history, campuses, and maps

## Admissions form (Formspree)

1. Copy `.env.example` to `.env`
2. Create a form at [formspree.io](https://formspree.io) and set `REACT_APP_FORMSPREE_ID` to the form id
3. Restart `npm start`

Without Formspree, submissions open a mailto draft to admissions and save a local copy in the browser.

## Official links used on the site

- Apply: https://www.rivervalley.edu/admissions/welcome/
- My RVCC: https://myrvcc.rivervalley.edu
- CCSNH Online Resources: https://www.ccsnh.edu/online-resources/
- Catalog: https://catalog.rivervalley.edu/
- FAFSA school code: **007560**
