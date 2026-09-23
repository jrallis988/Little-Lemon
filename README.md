# Shift — AI Workforce Partners

Marketing site for **Shift** by Working Intelligence: a Marblism-inspired features experience focused on workforce operations — recruiting, scheduling, HR, onboarding, management coaching, and compliance.

## Stack

Static site: HTML, CSS, and vanilla JS.

## Develop

```bash
npm start
```

Opens a local static server at [http://localhost:3000](http://localhost:3000).

## Pages

- `index.html` — features / landing + waitlist
- `privacy.html` — privacy policy
- `terms.html` — terms of use
- `robots.txt` / `sitemap.xml` — SEO basics
- `images/og.png` — Open Graph share image

## Waitlist & analytics

- Waitlist submissions are validated client-side and stored in `localStorage` (`shift_waitlist_v1`) for this static demo. Wire the form to Formspree, Basin, or your API before production.
- First-party analytics live in `analytics.js` (events in `shift_analytics_v1`). Optional Plausible: set `window.SHIFT_ANALYTICS = { plausibleDomain: "your.domain" }` before the script.
