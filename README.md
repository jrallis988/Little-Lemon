# Civic Bound

A multi-page React site for **Civic Bound** — a nonprofit, youth-centered community support network — combined with Whole Youth storytelling (belonging, education coaching, and mental wellbeing dialogue).

## What this combines

| Source | Contributions |
| --- | --- |
| **Civic Bound** | Hub locator, Find Your Track, volunteers, partners, leadership, stories, news |
| **Whole Youth** | Belong / Become / Balance pillars, wellbeing conversation, impact framing, serve / give / partner CTAs, photography |

## Site map

| Route | Page |
| --- | --- |
| `/` | Homepage marketing core |
| `/hubs` | Hub locator & space explorer |
| `/get-support` | Find Your Track navigator |
| `/stories` | Community voices |
| `/volunteers` | Volunteer framework |
| `/partners` | Village Network partners |
| `/leadership` | Youth Advisory Board |
| `/news` | Latest news |

## Scripts

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production build → build/
npx wrangler deploy --temporary   # Cloudflare Workers preview (after build)
```
