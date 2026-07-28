# River Valley Community College

A modern marketing site for [River Valley Community College](https://www.rivervalley.edu), built with React, React Router, and Tailwind CSS.

## Scripts

- `npm start` — run the development server
- `npm test` — run tests
- `npm run build` — create a production build

## Pages

- `/` — brand-forward home with happening strip
- `/programs` — filterable catalog (area, credential, campus, search)
- `/programs/:slug` — pathway details
- `/admissions` — steps + inquiry form
- `/financial-aid` — tuition rates + estimate calculator
- `/student-life` — supports and belonging
- `/about` — history, campuses, and maps

## Admissions form

1. Copy `.env.example` to `.env`
2. Set `REACT_APP_FORMSPREE_ID` to your Formspree form id
3. Restart `npm start`

Without Formspree, submissions open a mailto draft to admissions and save a local copy in the browser.
