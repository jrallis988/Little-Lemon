# The Next Chapter

**Fall 2026 Children's & Middle-Grade Reading Campaign**

A polished, responsive digital publishing experience — the seasonal marketing platform for Harborlight Press's Fall 2026 collection.

## Campaign

- **Name:** The Next Chapter
- **Tagline:** Fall Into Your Next Story.
- **Season:** Fall 2026

## What's built

- Editorial design system (Arcanite Slab, Goudy Heavyface, Source Serif 4)
- Illustrated cover system for 8 titles
- Homepage with cover-stack hero and seasonal sections
- Filterable Fall Books catalog
- Full book detail pages (bookstore + library CTAs)
- Find Their Next Book recommendation quiz
- Fall Reading Week event landing
- Educator & Library Hub + printable sample resource
- Newsletter archive (Sept / Oct / Nov) with reusable modules
- Campaign case study page (strategy, identity, ecosystem, print apps)
- Motion, active nav, reduced-motion support

## Develop

```bash
cd the-next-chapter
npm install
npm run dev
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Campaign homepage |
| `/books` | Fall catalog with filters |
| `/books/[slug]` | Individual book detail |
| `/find-a-book` | Recommendation quiz |
| `/fall-reading-week` | Campaign event landing |
| `/educators` | Educator & library resources |
| `/newsletter` | Newsletter archive |
| `/newsletter/[issue]` | Individual newsletter edition |
| `/campaign` | Case study & campaign system |
| `/resources/sample` | Printable sample guide |

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
