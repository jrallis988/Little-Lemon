# Go live — Little Lemon

The site is **code-complete**. Publishing needs one click from you (the agent cannot enable hosting on this repo).

## Option A — GitHub Pages (already wired)

Workflow: `.github/workflows/deploy-pages.yml` (builds successfully; **publish is skipped** until Pages is on).

1. Open **https://github.com/jrallis988/Little-Lemon/settings/pages**
2. Set **Source → GitHub Actions**
3. Re-run: https://github.com/jrallis988/Little-Lemon/actions/workflows/deploy-pages.yml  
4. Site: `https://jrallis988.github.io/Little-Lemon/`

**Conflict:** Seascape / beach-motel also deploy to the same Pages site. Pause those workflows if you want Little Lemon to stay live.

## Option B — Netlify (drop-in)

`netlify.toml` is included. In Netlify: **Add new site → Import from Git** → this repo → branch `cursor/little-lemon-multi-index-bc64`. Build uses the included command; publish dir `dist`.

Or: `npm i -g netlify-cli && netlify deploy --prod`

## Option C — Vercel (drop-in)

`vercel.json` is included. In Vercel: **Import** this repo → branch `cursor/little-lemon-multi-index-bc64` → Framework **Other** → output root `.`

Or: `npx vercel --prod`

## After the site is public

### Activate Formsubmit (one-time)
1. Open the live site and submit a test **Reserve** or newsletter signup  
2. In `jjrallis@unh.edu`, open Formsubmit’s email and click **Activate**  
3. Submit once more to confirm delivery  

Change the inbox in `app.js` (`FORM_ACTION`).

### Optional
- Replace Capstone demo phone / address / hours  
- Custom domain  
- Analytics  

## Local preview
```bash
npm start
```
Open http://localhost:3000 — try `/layouts.html`, `/reserve.html`, `/order.html`.
