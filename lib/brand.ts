/**
 * Brand design tokens — colors + type bibliography for the acquisition site.
 * Live CSS variables live in app/globals.css; this is the documented source of truth.
 *
 * Primary indigo + yellow sampled from in-club Black Card Spa TV screen.
 */

export const COLOR_PALETTE = [
  {
    token: "pf-purple",
    hex: "#180bb2",
    role: "TV indigo purple (primary fills, buttons, links)",
  },
  {
    token: "pf-yellow",
    hex: "#f3d012",
    role: "TV NEW yellow (logo ring, STRONG, prices, impact type)",
  },
  {
    token: "pf-ink",
    hex: "#000521",
    role: "Near-black body text",
  },
  {
    token: "pf-purple-bright",
    hex: "#2a18d4",
    role: "Brighter indigo fills / club gradients",
  },
  {
    token: "pf-purple-mid",
    hex: "#1a1299",
    role: "Mid indigo",
  },
  {
    token: "pf-purple-deep",
    hex: "#0e0690",
    role: "Deep indigo footer / overlays",
  },
  {
    token: "pf-purple-ink",
    hex: "#07044a",
    role: "Darkest indigo (phone frames, overlays)",
  },
  {
    token: "pf-purple-soft",
    hex: "#eef0ff",
    role: "Soft indigo fills",
  },
  {
    token: "pf-lavender",
    hex: "#8b8cff",
    role: "Light indigo accent",
  },
  {
    token: "pf-gold",
    hex: "#f3d012",
    role: "Aligned to TV yellow for gradients",
  },
  {
    token: "pf-mist",
    hex: "#f4f5ff",
    role: "Page / section background",
  },
  {
    token: "pf-line",
    hex: "#d8dbf5",
    role: "Borders / dividers",
  },
] as const;

export const GRADIENT_NOTES = [
  "Footer / clubs / Black Card → TV indigo depth",
  "App promo → #180bb2 → #f3d012 (indigo → spa yellow)",
  "Buttons → #0e0690 → #2a18d4",
] as const;

export const TYPE_BIBLIOGRAPHY = [
  {
    name: "Barlow Condensed",
    role: "Display / headlines",
    css: "font-display · pf-type-impact",
    weights: "600 · 700 · 800 · 900 · italic",
    usage:
      "In-club TV style: heavy italic uppercase. Hero (WE'RE ALL / STRONG / ON THIS PLANET™), section titles, membership plan names, spa / amenity impact lines.",
    sample: "NEW BLACK CARD SPA AMENITIES",
  },
  {
    name: "Open Sans",
    role: "Body / UI",
    css: "font-sans",
    weights: "400 · 500 · 600 · 700",
    usage:
      "Navigation, paragraphs, buttons, legal copy, card body text, and member-app chrome — matching PF digital body face.",
    sample:
      "The PF App has it all — Crowd Meter, on-demand workouts, and more. Ready to get movin’?",
  },
] as const;

export const PALETTE_TEXT_BOX = `PLANET FITNESS COLOR PALETTE
Sampled from in-club Black Card Spa TV · Defined in: app/globals.css

CORE BRAND (TV SCREEN)
  pf-purple / indigo   #180bb2   TV indigo fill (buttons, accents, links)
  pf-yellow            #f3d012   NEW yellow (logo ring, STRONG, impact type)
  pf-ink               #000521   Near-black body text

INDIGO SCALE
  pf-purple-bright   #2a18d4   Brighter fills / club gradients
  pf-purple-mid      #1a1299   Mid tone
  pf-purple-deep     #0e0690   Deep footer / overlays
  pf-purple-ink      #07044a   Darkest indigo
  pf-purple-soft     #eef0ff   Soft fills
  pf-lavender        #8b8cff   Light accent

SUPPORTING
  pf-gold   #f3d012   Aligned to TV yellow
  pf-mist   #f4f5ff   Page / section background
  pf-line   #d8dbf5   Borders / dividers

TYPE — IN-CLUB TV STYLE
  Display   Barlow Condensed italic 900  (pf-type-impact / pf-type-section)
  Body/UI   Open Sans`;
