# Playhouse Animation

2D kids animation portfolio — flat character shorts, educational stories, and playful worlds.

## Stack

Static HTML, CSS, and vanilla JS. Typography: Baloo 2 + Nunito.

## Pages

- `index.html` — hero, films, showreel, studio, process, contact
- `films/*.html` — film detail pages
- `studio/*.html` — educators, partners, co-production
- `privacy.html` / `terms.html` / `404.html`

## Develop

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Go-live checklist

1. **Real media** — swap stills in `images/work/` and logo in `images/logo.png`
2. **Videos** — set `showreelYoutube` / `showreelVimeo` in `config.js`, or add `data-youtube` / `data-vimeo` on play buttons
3. **Contact** — create a [Formspree](https://formspree.io) form and paste the endpoint into `config.js` → `formEndpoint`
4. **Domain** — set `siteUrl` in `config.js` (e.g. `https://playhouseanimation.com`) for absolute social previews
5. **Deploy** — Cloudflare Pages:

```bash
npx wrangler pages deploy . --project-name playhouse-animation
```

Or connect this repo in the Cloudflare dashboard and set the output directory to `/`.
