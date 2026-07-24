# Rallis Portfolio

Graphic design & digital media portfolio — Next.js App Router, Tailwind CSS, editorial gallery system.

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** — utility-first layout, custom design tokens
- **Geist Sans / Geist Mono** — neo-grotesque + technical monospace

## Develop

```bash
npm install
npm run dev
```

## Structure

```
src/
  app/
    layout.tsx      # Root layout, fonts, shell
    page.tsx        # Home (incremental sections)
    globals.css     # Tokens + base components
  components/
    layout/
      Navigation.tsx
  lib/
    site.ts         # Site config / nav / social
```
