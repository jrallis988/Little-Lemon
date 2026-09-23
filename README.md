# James Rallis — Screenwriter

Portfolio site for screenwriter James Rallis: East Coast features and pilots, loglines, and industry contact.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` when you want production URL or Formspree wiring.

## Go live

### Vercel (recommended)

1. Merge this branch to `main`.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set env vars:
   - `NEXT_PUBLIC_SITE_URL` → your Vercel or custom domain (e.g. `https://jamesrallis.com`)
   - Optional: `NEXT_PUBLIC_FORMSPREE_ID` → Formspree form id
4. Deploy. Add a custom domain in the Vercel project settings if you have one.

### Contact form

- **Default:** Submit opens the visitor’s mail app addressed to `writer.email` with the inquiry filled in.
- **Inbox delivery:** Create a free form at [formspree.io](https://formspree.io), then set `NEXT_PUBLIC_FORMSPREE_ID` to the form id (the `xyzabc` in `https://formspree.io/f/xyzabc`).

### Content

Edit `src/data/scripts.ts` for:

- Script titles, loglines, page counts, status
- Bio and themes
- Public email
- Optional `writer.links.imdb` / `writer.links.linkedin` (footer hides blank links)

### GitHub Pages (static)

```bash
GITHUB_PAGES=true npm run build
```

Serve the `out/` folder from the `gh-pages` branch (base path `/Little-Lemon`). Prefer Vercel for a clean root domain.

## Structure

```
src/
├── app/              # layout, page, styles
├── components/       # Navbar, Hero, Work, About, Contact, Footer
└── data/scripts.ts   # Writer profile + script slate
```
