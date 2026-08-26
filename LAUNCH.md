# Go live in 3 clicks

The site code is ready. These steps are the only things left that need **your** GitHub account:

## 1. Merge the PR

Open: https://github.com/jrallis988/Little-Lemon/pull/12  

Click **Merge pull request** → **Confirm merge**.

## 2. Turn on GitHub Pages

1. Open: https://github.com/jrallis988/Little-Lemon/settings/pages  
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**  
3. Save

The `Deploy GitHub Pages` workflow will publish the site.

## 3. Open the live URL

https://jrallis988.github.io/Little-Lemon/

Screen gallery: https://jrallis988.github.io/Little-Lemon/screens.html

---

## Environment (optional)

Copy `.env.example` → `.env` locally, or add GitHub Actions **secrets** / **vars**:

| Variable | Purpose |
|----------|---------|
| `VITE_CONTACT_EMAIL` | FormSubmit inbox (confirm first email once) |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible analytics (e.g. `jrallis988.github.io`) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (alternative to Plausible) |
| `VITE_SITE_URL` | Canonical URL for OG tags on interior pages |

---

## Optional upgrades after launch

### Sunset + seal hero photo
Replace these two files with your photo (same name):

- `public/images/campus-sunset.jpg`
- `public/images/campus-sunset.webp` (or run: `ffmpeg -i campus-sunset.jpg -c:v libwebp -quality 78 campus-sunset.webp`)

Commit + push to `main` — the hero updates automatically.

### Form inbox
Contact + newsletter demo forms send to **jjrallis@unh.edu** via FormSubmit unless `VITE_CONTACT_EMAIL` is set.  
Confirm the one-time activation email from FormSubmit.  
Official brewery newsletter signup uses Toast on smuttynose.com (linked from the homepage).

### Refresh screen previews
After UI changes:

```bash
npm run build && npm run preview -- --host 127.0.0.1 --port 4173
npm run screenshots   # requires: npx playwright install chromium
```

Updates `public/previews/*.png` for `/screens.html`.
