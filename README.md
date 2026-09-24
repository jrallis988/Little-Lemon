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
- `forge-athletics/` — FORGE ATHLETICS brand identity case study (React + TypeScript)
- `nh-dmv/` — conceptual redesign of the New Hampshire DMV website (civic UX case study)
- `services/` — detail pages for each service offering
- `blog/` — blog index and post pages (content can be drafted in Blaze AI)
- `privacy.html` — privacy policy
- `terms.html` — terms & conditions
- `resume.pdf` — downloadable resume

## Develop

```bash
npm start
```

Opens a local static server at [http://localhost:3000](http://localhost:3000).

FORGE case study (Vite):

```bash
cd forge-athletics && npm install && npm run dev
```

Build the FORGE presentation for static hosting:

```bash
cd forge-athletics && npm run build
```

Then open [http://localhost:3000/forge-athletics/presentation/](http://localhost:3000/forge-athletics/presentation/).

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
├── forge-athletics/   # Brand identity case study (React/TS)
├── services/
├── blog/
├── images/
└── *.otf          # brand fonts
```
