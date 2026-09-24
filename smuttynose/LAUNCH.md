# Go live in 3 clicks

The brewery app lives in **`smuttynose/`** so it coexists with the Artistic Fountain portfolio at the repo root.

## 1. Merge the PR

Open: https://github.com/jrallis988/Little-Lemon/pull/12  

Click **Merge pull request** → **Confirm merge**.

## 2. Turn on GitHub Pages

1. Open: https://github.com/jrallis988/Little-Lemon/settings/pages  
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**  
3. Save

The deploy workflow publishes:
- Portfolio at https://jrallis988.github.io/Little-Lemon/
- Brewery at https://jrallis988.github.io/Little-Lemon/smuttynose/

## 3. Open the live brewery URL

https://jrallis988.github.io/Little-Lemon/smuttynose/

Screen gallery: https://jrallis988.github.io/Little-Lemon/smuttynose/screens.html

---

## Develop locally

```bash
cd smuttynose
npm install
npm run dev
```

## Environment (optional)

Copy `smuttynose/.env.example` → `smuttynose/.env`, or add GitHub Actions **secrets**:

| Variable | Purpose |
|----------|---------|
| `VITE_CONTACT_EMAIL` | FormSubmit inbox (confirm first email once) |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible analytics |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `VITE_SITE_URL` | Canonical URL (default includes `/smuttynose`) |

---

## Optional upgrades after launch

### Sunset + seal hero photo
Replace in `smuttynose/public/images/`:

- `campus-sunset.jpg`
- `campus-sunset.webp`

### Form inbox
Contact + newsletter demo forms send to **jjrallis@unh.edu** via FormSubmit unless `VITE_CONTACT_EMAIL` is set.  
Confirm the one-time activation email from FormSubmit.

### Refresh screen previews

```bash
cd smuttynose
npm run build && npm run preview -- --host 127.0.0.1 --port 4173
# In another terminal:
PREVIEW_URL=http://127.0.0.1:4173/ npm run screenshots
```
