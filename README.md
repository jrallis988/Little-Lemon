# River Valley Community College

A modern marketing site for [River Valley Community College](https://www.rivervalley.edu), built with React, React Router, and Tailwind CSS.

## Scripts

- `npm start` — run the development server
- `npm test` — run tests
- `npm run build` — create a production build

## Pages

- `/` — brand-forward home
- `/programs` — program areas with linked pathways
- `/programs/:slug` — program detail pages
- `/admissions` — application steps + inquiry form
- `/financial-aid` — aid steps and tuition snapshot
- `/student-life` — campus supports and belonging
- `/about` — history, campuses, and college snapshot

## Admissions form

Set `REACT_APP_FORMSPREE_ID` to your Formspree form id to send inquiries live.
Without it, submissions are saved to `localStorage` for local demos.
