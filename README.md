# Whole Youth

A static nonprofit website that blends the spirit of three reference models:

- **Youth mental wellbeing & coalition dialogue** (Empower Our Future–style research and conversation)
- **Community belonging & programs** (YMCA-style hubs, camps, and healthy living)
- **Education service & student success** (City Year–style coaching, serve / give / partner)

## Stack

HTML, CSS, and vanilla JavaScript. Typography: Fraunces + Figtree.

## Pages

- `index.html` — home
- `about.html` — mission & research
- `programs.html` — program continuum
- `join.html` — serve, give, partner
- `privacy.html` — demo privacy note

## Develop

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Cloudflare)

```bash
mkdir -p dist/images
cp index.html about.html programs.html join.html privacy.html styles.css main.js favicon.svg dist/
cp images/* dist/images/
npx wrangler deploy
```

Unauthenticated preview (temporary account, claim within 60 minutes):

```bash
npx wrangler deploy --temporary
```
