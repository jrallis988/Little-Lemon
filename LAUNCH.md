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

---

## Optional upgrades after launch

### Sunset + seal hero photo
Replace these two files with your photo (same name):

- `public/images/campus-sunset.jpg`
- `public/images/campus-sunset.webp` (or run: `ffmpeg -i campus-sunset.jpg -c:v libwebp -quality 78 campus-sunset.webp`)

Commit + push to `main` — the hero updates automatically.

### Form inbox
Contact + newsletter already send to **jjrallis@unh.edu** via FormSubmit.  
Confirm the first email FormSubmit sends you (one-time).  
Override anytime with repo secret `VITE_CONTACT_EMAIL`.
