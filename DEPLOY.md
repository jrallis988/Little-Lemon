# Deploy COURTSIDE / Artistic Fountain portfolio

## Local

```bash
npm start
# Portfolio:  http://localhost:3000/
# COURTSIDE:  http://localhost:3000/courtside/
```

```bash
npm run build:courtside   # rebuilds published /courtside/
npm run dev:courtside     # Vite dev server for source in courtside-app/
```

## Go live (GitHub Pages)

### 1. Merge the PR

Merge [#55](https://github.com/jrallis988/Little-Lemon/pull/55) into `main`.

### 2. Enable Pages (one-time)

1. Open **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Save

The workflow at `.github/workflows/deploy-pages.yml` will run on every push to `main`.

### 3. Expected URLs

| Page | URL |
| --- | --- |
| Portfolio | `https://jrallis988.github.io/Little-Lemon/` |
| COURTSIDE | `https://jrallis988.github.io/Little-Lemon/courtside/` |

OG/share images are rewritten to absolute URLs during the Pages build.

### 4. Smoke-test after deploy

- [ ] Portfolio home loads
- [ ] COURTSIDE card opens `/courtside/`
- [ ] Photos load
- [ ] Thumbnail compare (Mobile / Actual size)
- [ ] Motion → **Play full sequence**
- [ ] Motion reel video plays (slot should show the MP4, not the placeholder)
- [ ] Mobile layout

## Custom domain (optional)

If you later point a domain at Pages, rebuild with:

```bash
COURTSIDE_SITE_URL=https://yourdomain.com/courtside npm run build:courtside
```

Or set that env var in the GitHub Actions workflow.
