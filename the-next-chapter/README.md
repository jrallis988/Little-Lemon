# The Next Chapter

**Fall 2026 Children's & Middle-Grade Reading Campaign**

A polished, responsive digital publishing experience built as the seasonal marketing platform for Harborlight Press's Fall 2026 collection.

## Campaign

- **Name:** The Next Chapter
- **Tagline:** Fall Into Your Next Story.
- **Season:** Fall 2026

## Phase 1 (Current)

- Project architecture (Next.js, React, TypeScript, Tailwind CSS)
- Global navigation and footer
- Typography and color design system
- Structured data model for 8 books
- Homepage with all required sections
- Fall Books catalog with working filters and search
- Complete book detail pages (dynamic route)
- Responsive layout across breakpoints

## Phase 2 (Planned)

- Find Their Next Book recommendation flow
- Fall Reading Week landing page
- Educator & Library Hub
- Newsletter editions (September, October, November)
- Print application concepts

## Develop

```bash
cd the-next-chapter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Campaign homepage |
| `/books` | Fall catalog with filters |
| `/books/[slug]` | Individual book detail |
| `/find-a-book` | Recommendation flow (Phase 2) |
| `/fall-reading-week` | Campaign event (Phase 2) |
| `/educators` | Educator resources (Phase 2) |
| `/newsletter` | Newsletter archive (Phase 2) |

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Custom fonts: Arcanite Slab, Goudy Heavyface, Source Serif 4
