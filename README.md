# NHTI – Concord's Community College

Redesigned marketing website for NHTI (React). It keeps real program, campus, and admissions information while improving clarity, brand presence, and student pathways.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` — development server
- `npm run build` — production build
- `npm test` — test runner
- `node scripts/sync-nhti-content.mjs` — refresh catalog + news snapshots from nhti.edu / catalog.nhti.edu

## Admissions form delivery

Inquiry submissions post to [FormSubmit](https://formsubmit.co) by default.

```bash
# optional overrides
REACT_APP_FORM_EMAIL=you@example.com
# or a full endpoint:
REACT_APP_FORM_ENDPOINT=https://formsubmit.co/ajax/you@example.com
```

On first live submit, FormSubmit may ask you to confirm the inbox.

## Deploy

- **Vercel:** connected repo uses `vercel.json` SPA rewrites
- **Netlify:** `netlify.toml` publish `build` with SPA redirect

## Pages

Home, Academics (search/filter + detail), Admissions (inquiry + checklists), Campus Life, Events, News, About
