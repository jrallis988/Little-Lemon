# Go live — Little Lemon

## Done on this branch
- Eight homepage layouts + `layouts.html` gallery
- Menu / about / reserve / order
- Images under `images/` (no Unsplash hotlinks)
- Forms → Formsubmit → `jjrallis@unh.edu`
- `index.html` is the production homepage
- Pages workflow: `.github/workflows/deploy-pages.yml`

## Blocked on you (cannot be done from the agent)

### 1. Enable GitHub Pages
The last deploy run **built successfully** but **skipped publishing** because Pages is not enabled:

1. Open https://github.com/jrallis988/Little-Lemon/settings/pages  
2. Set **Source → GitHub Actions**  
3. Re-run: https://github.com/jrallis988/Little-Lemon/actions/workflows/deploy-pages.yml  

Expected URL: `https://jrallis988.github.io/Little-Lemon/`

**Heads-up:** Other branches (e.g. Seascape / beach motel) also deploy to the same GitHub Pages site. Whichever workflow runs last wins the live URL. Pause or delete those workflows if you want Little Lemon to stay up.

### 2. Activate Formsubmit (one-time)
1. Submit a test reservation or newsletter signup on the live (or local) site  
2. Open the activation email at `jjrallis@unh.edu` and click **Activate**  
3. Submit one more test to confirm delivery  

Change the inbox anytime in `app.js` (`FORMSUBMIT`).

### 3. Optional
- Replace Capstone demo phone / address / hours  
- Custom domain  
- Analytics  

## Local preview
```bash
npm start
```
