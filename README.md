# Artistic Fountain

Independent design venture portfolio — digital media, graphic design, visual identity, and creative media projects.

## Dual-track separation

| Track | Home | Houses |
| --- | --- | --- |
| **Creative** | Artistic Fountain (this repo) | Visual media, graphic identity, conceptual design, client design services |
| **Engineering** | Developer portfolio (separate) | Back-end systems, Python/FastAPI, AI/RAG applications |

See `STATUS.md` for the full status report.

## Stack

Static site: HTML, CSS, and vanilla JS (built in Cursor). Custom typefaces (Arcanite Slab, Goudy Heavyface) plus Inter for body copy.

## Pages

- `index.html` — home (hero, designer, services, portfolio, blog, contact)
- `weight-watchers-63.html` — WW63 case study splash (links to interactive app in `ww63/`)
- `ww63/` — Weight Watchers 63 interactive Vite/React prototype (deploy Root Directory: `ww63`)
- `nh-dmv/` — conceptual redesign of the New Hampshire DMV website (civic UX case study)
- `services/` — detail pages for each service offering
- `blog/` — blog index and post pages (content can be drafted in Blaze AI)
- `privacy.html` — privacy policy
- `terms.html` — terms & conditions
- `resume.pdf` — downloadable resume

## Case studies

| Project | Entry | Run |
| --- | --- | --- |
| **Weight Watchers 63** | `weight-watchers-63.html` | `cd ww63 && npm install && npm run dev` |
| **NH DMV** | `nh-dmv/index.html` | Open static HTML |

Deploy WW63 permanently: Vercel/Netlify with **Root Directory = `ww63`**, set `VITE_SITE_URL`.

## Develop

```bash
npm start
```

Opens a local static server at [http://localhost:3000](http://localhost:3000).

Or open `index.html` directly in a browser.

## Structure

```
.
├── index.html
├── privacy.html
├── terms.html
├── styles.css
├── STATUS.md
├── favicon.svg
├── resume.pdf
├── services/
├── blog/
├── images/
└── *.otf          # brand fonts
```
