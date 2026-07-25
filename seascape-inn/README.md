# Seascape Inn — Complete Website

Static multi-page marketing site for **Seascape Inn at Plaice Cove** in Hampton, NH.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Rooms & Rates | `rooms.html` |
| Amenities & Policies | `amenities.html` |
| Gallery (with lightbox) | `gallery.html` |
| Location & Directions | `location.html` |
| Contact | `contact.html` |
| Book / Inquiry | `book.html` |
| Privacy Policy | `privacy.html` |
| 404 | `404.html` |

Shared assets: `css/styles.css`, `js/main.js`, `images/favicon.svg`, `robots.txt`, `sitemap.xml`.

## Preview locally

```bash
npx --yes serve seascape-inn
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Booking flow

- **Call:** `(603) 926-1750` (primary)
- **Inquiry form:** `book.html` collects dates, guests, and room preference, then opens the guest’s email client with a pre-filled message to `seascapeinnhampton@gmail.com`

## Before production launch

1. Replace Unsplash placeholders with real property photos
2. Add your logo if you have one (`images/`)
3. Point the domain at this folder (Netlify, GitHub Pages, or any static host)
4. Optional: swap mailto forms for a form service (Formspree, Netlify Forms, etc.)
