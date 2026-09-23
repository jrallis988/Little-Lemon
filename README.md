# Little-Lemon workspace

This repository currently holds a few related projects:

| Project | How to run | Notes |
| --- | --- | --- |
| **NHTI redesign** (React) | `npm install && npm start` | Marketing site for NHTI – Concord's Community College |
| **Artistic Fountain** (static) | `npm run start:portfolio` | Design studio portfolio at repo-root `index.html` |
| **NH DMV case study** | open `nh-dmv/` via the portfolio server | Civic UX concept under `nh-dmv/` |

---

# NHTI – Concord's Community College

Redesigned marketing website for NHTI (React). It keeps real program, campus, and admissions information while improving clarity, brand presence, and student pathways.

## Run locally (NHTI)

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` / `npm run start:nhti` — NHTI React development server
- `npm run start:portfolio` — static portfolio + NH DMV pages
- `npm run build` — NHTI production build
- `npm test` — NHTI test runner
- `node scripts/sync-nhti-content.mjs` — refresh catalog + news snapshots from nhti.edu / catalog.nhti.edu

## Admissions form delivery

Inquiry submissions post to [FormSubmit](https://formsubmit.co) by default.

```bash
cp .env.example .env
# edit REACT_APP_FORM_EMAIL if needed
```

Or set in your host’s environment:

```bash
REACT_APP_FORM_EMAIL=NHTIadmissions@ccsnh.edu
# or a full endpoint:
REACT_APP_FORM_ENDPOINT=https://formsubmit.co/ajax/NHTIadmissions@ccsnh.edu
```

**Go-live checklist for the form**

1. Set `REACT_APP_FORM_EMAIL` (or `REACT_APP_FORM_ENDPOINT`) in production.
2. Deploy, then submit one real inquiry from `/admissions`.
3. Confirm the FormSubmit activation email for that inbox (required once).
4. Verify the success state says the inquiry was submitted to Admissions (not the local demo note).

## Deploy (NHTI)

- **Vercel:** connected repo uses `vercel.json` SPA rewrites
- **Netlify:** `netlify.toml` publish `build` with SPA redirect

Before public launch:

1. Update `public/sitemap.xml` host if this is not yet on `www.nhti.edu`
2. Confirm `public/robots.txt` points at your live sitemap
3. Click through 404 (`/this-page-does-not-exist`), Apply, and admissions form on mobile
4. Re-run `node scripts/sync-nhti-content.mjs` so programs/news/events are fresh

## NHTI pages

Home, Academics (search/filter + detail), Admissions (inquiry + checklists), Financial Aid, Campus Life, Residence Life, Athletics, Workforce, Events, News, About, Contact, 404

---

# Artistic Fountain

Independent design venture portfolio — digital media, graphic design, visual identity, and creative media projects. See `STATUS.md` for the portfolio status report.

```bash
npm run start:portfolio
```
