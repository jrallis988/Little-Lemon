# Little-Lemon workspace

These are **portfolio case studies**, not live production sites. They are meant to show design, UX, and front-end craft — they do not replace official systems (NHTI, NH DMV, client portals, etc.).

| Project | How to run | Notes |
| --- | --- | --- |
| **NHTI redesign** (React) | `npm install && npm start` | Conceptual marketing site for NHTI – Concord's Community College |
| **Artistic Fountain** (static) | `npm run start:portfolio` | Design studio portfolio at repo-root `index.html` |
| **NH DMV case study** | open `nh-dmv/` via the portfolio server | Civic UX concept under `nh-dmv/` |

---

# NHTI – Concord's Community College (case study)

Conceptual redesign of NHTI’s marketing site. Goal: stronger brand presence, clearer student pathways, and a campus-feel homepage — without cloning the live `nhti.edu` layout.

Official catalog, Lynx portal, and application systems stay as outbound links. Inquiry form can save locally for demo (optional FormSubmit if you ever want email delivery).

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` / `npm run start:nhti` — NHTI React demo
- `npm run start:portfolio` — static portfolio + NH DMV pages
- `npm run build` — NHTI production build
- `npm test` — NHTI test runner
- `npm run sync:nhti` — optional refresh of catalog + news snapshots

## What this piece demonstrates

- Brand system (maroon / gold, seal, Lynx athletics)
- Multi-page marketing IA: Academics search, Admissions, Campus Life, Residence, Athletics, Workforce
- Conversion chrome for a college site (Apply in header, CTA bands, inquiry form)
- Compact institutional footer, 404, social preview image

## Optional demo wiring

Copy `.env.example` only if you want email delivery or analytics in a hosted demo:

```bash
REACT_APP_FORM_EMAIL=you@example.com
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Without those, the site still runs; inquiries store locally in the browser.

## Pages

Home, Academics, Admissions, Financial Aid, Campus Life, Residence Life, Athletics, Workforce, Events, News, About, Contact, 404

---

# Artistic Fountain

Independent design venture portfolio — digital media, graphic design, visual identity, and creative media projects. See `STATUS.md` for the portfolio status report.

```bash
npm run start:portfolio
```
