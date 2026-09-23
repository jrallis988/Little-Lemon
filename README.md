# Playhouse Animation

2D kids animation portfolio — flat character shorts, educational stories, and playful worlds.

## Stack

Static HTML, CSS, and vanilla JS. Typography: Baloo 2 + Nunito.

## Develop

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run check    # launch readiness
npm run sitemap  # rewrite sitemap from siteUrl / SITE_URL
```

## Go-live checklist

1. **Real media** — swap stills in `images/work/` and logo in `images/logo.png` (+ `.webp` if you regenerate)
2. **Videos** — set `showreelYoutube` / `showreelVimeo` in `config.js`
3. **Contact** — Formspree form → paste endpoint into `config.js` → `formEndpoint`
4. **Domain** — set `siteUrl` in `config.js`, then `npm run sitemap`
5. **Deploy** (pick one):

### A) CLI
```bash
npx wrangler login
npm run deploy
```

### B) GitHub → Cloudflare Pages
1. Create a Cloudflare API token (Pages edit) + note Account ID  
2. In GitHub repo settings → Secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Merge to `main` (workflow: `.github/workflows/deploy-pages.yml`)  
4. Attach your custom domain in the Cloudflare Pages project

## Pages

- `index.html` — home
- `films/*.html` — film details
- `studio/*.html` — educators / partners / co-production
- `privacy.html` / `terms.html` / `404.html`
