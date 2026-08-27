# Playhouse Animation

2D kids animation portfolio — flat character shorts, educational stories, and playful worlds.

## Stack

Static HTML, CSS, and vanilla JS. Typography: Baloo 2 + Nunito.

## Pages

- `index.html` — hero, films, showreel, studio, process, contact
- `films/*.html` — detailed film pages (synopsis, art, credits, trailer modal)
- `studio/*.html` — educators, partners, and co-production case studies
- `privacy.html` / `terms.html`

## Develop

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

1. Replace stills in `images/work/` with your frames.
2. Add `data-youtube="ID"` or `data-vimeo="ID"` on any `[data-open-video]` button for real trailers/showreel.
3. Wire the contact form to Formspree (or similar) in `main.js`.
