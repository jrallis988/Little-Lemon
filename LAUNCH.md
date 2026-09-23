# Go live — Little Lemon

## What’s already done on this branch
- Eight homepage layouts + menu / about / reserve / order
- Images hosted locally under `images/` (no Unsplash hotlinks)
- Forms (reserve, newsletter, order) POST to **Formsubmit** → `jjrallis@unh.edu`
- `index.html` is the primary homepage (demo bar removed; other layouts still linked)
- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`

## What you still need to do

### 1. Enable GitHub Pages
1. Merge or keep using branch `cursor/little-lemon-multi-index-bc64`
2. **Settings → Pages → Source: GitHub Actions**
3. Re-run the **Deploy Little Lemon to GitHub Pages** workflow
4. Site URL (typical): `https://jrallis988.github.io/Little-Lemon/`

> Note: `main` is still the Artistic Fountain portfolio. This workflow deploys **only** from the Little Lemon branch so the two don’t collide.

### 2. Activate Formsubmit (one-time)
1. Submit a test reservation or newsletter signup on the live site
2. Open the confirmation email Formsubmit sends to `jjrallis@unh.edu` and click **Activate**
3. Submit one more live test to confirm delivery

To change the inbox, edit `FORMSUBMIT` in `app.js`.

### 3. Optional polish
- Replace Capstone demo phone / address / hours with real venue details
- Drop or keep alternate layouts (`index-two.html` … `index-eight.html`)
- Add a custom domain (CNAME + DNS) if you want something other than `*.github.io`
- Add analytics (Plausible / GA) if desired

## Local preview
```bash
npm start
```
Open http://localhost:3000
