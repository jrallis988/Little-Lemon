# Shift — AI Workforce Partners

Marketing site for **Shift** by Working Intelligence: a Marblism-inspired features experience focused on workforce operations — recruiting, scheduling, HR, onboarding, management coaching, and compliance.

## Stack

Static site: HTML, CSS, and vanilla JS.

## Develop

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000).

## Deploy

- **Netlify:** connect the repo; `netlify.toml` publishes the root (Forms enabled on the waitlist).
- **Vercel:** import the repo; `vercel.json` sets headers/clean URLs.
- Set `formspreeEndpoint` in `config.js` to receive waitlist emails if you are not on Netlify Forms.

## Pages & sections

- `index.html` — landing (workforce, day, platform, integrations, proof, pricing, FAQ, waitlist)
- `privacy.html` / `terms.html`
- `robots.txt` / `sitemap.xml`
- `images/og.png` — Open Graph image

## Config

Edit `config.js`:

| Key | Purpose |
| --- | --- |
| `formspreeEndpoint` | Formspree URL for waitlist POSTs |
| `waitlistEmail` | Mailto fallback address |
| `mailtoFallback` | Open email draft when Formspree is unset/fails |
| `SHIFT_ANALYTICS.plausibleDomain` | Optional Plausible domain |
