/**
 * Brand design tokens — colors + type bibliography for the acquisition site.
 * Live CSS variables live in app/globals.css; this is the documented source of truth.
 */

export const COLOR_PALETTE = [
  {
    token: "pf-purple",
    hex: "#5f259f",
    role: "Primary brand purple (buttons, accents, links)",
  },
  {
    token: "pf-yellow",
    hex: "#ffce08",
    role: "Brand yellow (logo ring, JFZ highlights, prices)",
  },
  {
    token: "pf-ink",
    hex: "#000521",
    role: "Near-black body text",
  },
  {
    token: "pf-purple-bright",
    hex: "#6d20ab",
    role: "Brighter fills / club gradients",
  },
  {
    token: "pf-purple-mid",
    hex: "#592c82",
    role: "Mid tone",
  },
  {
    token: "pf-purple-deep",
    hex: "#3d0958",
    role: "Deep footer / overlays",
  },
  {
    token: "pf-purple-ink",
    hex: "#140024",
    role: "Darkest purple (phone frames, overlays)",
  },
  {
    token: "pf-purple-soft",
    hex: "#f3f0f8",
    role: "Soft lavender fills",
  },
  {
    token: "pf-lavender",
    hex: "#b294ff",
    role: "Light accent",
  },
  {
    token: "pf-gold",
    hex: "#ffb81c",
    role: "Warm gold in app gradient",
  },
  {
    token: "pf-mist",
    hex: "#f7f4fb",
    role: "Page / section background",
  },
  {
    token: "pf-line",
    hex: "#e4d9f0",
    role: "Borders / dividers",
  },
] as const;

export const GRADIENT_NOTES = [
  "Footer / clubs / Black Card → purple depth",
  "App promo → #5f259f → #ffb81c (purple → gold)",
  "Buttons → #4a148c → #6d20ab",
] as const;

export const TYPE_BIBLIOGRAPHY = [
  {
    name: "Barlow Condensed",
    role: "Display / headlines",
    css: "font-display",
    weights: "500 · 600 · 700",
    usage:
      "Hero taglines, section titles, membership plan names, uppercase marketing headlines (e.g. A PLACE WHERE EVERYONE FEELS WELCOME).",
    sample: "A PLACE WHERE EVERYONE FEELS WELCOME",
  },
  {
    name: "Source Sans 3",
    role: "Body / UI",
    css: "font-sans",
    weights: "400 · 500 · 600 · 700",
    usage:
      "Navigation, paragraphs, buttons, legal copy, card body text, and member-app chrome.",
    sample:
      "The PF App has it all — Crowd Meter, on-demand workouts, and more. Ready to get movin’?",
  },
] as const;

export const PALETTE_TEXT_BOX = `PLANET FITNESS COLOR PALETTE
Defined in: app/globals.css  ·  Tailwind tokens: pf-*

CORE BRAND
  pf-purple     #5f259f   Primary brand purple (buttons, accents, links)
  pf-yellow     #ffce08   Brand yellow (logo ring, JFZ highlights, prices)
  pf-ink        #000521   Near-black body text

PURPLE SCALE
  pf-purple-bright   #6d20ab   Brighter fills / club gradients
  pf-purple-mid      #592c82   Mid tone
  pf-purple-deep     #3d0958   Deep footer / overlays
  pf-purple-ink      #140024   Darkest purple (phone frames, overlays)
  pf-purple-soft     #f3f0f8   Soft lavender fills
  pf-lavender        #b294ff   Light accent

SUPPORTING
  pf-gold   #ffb81c   Warm gold in app gradient
  pf-mist   #f7f4fb   Page / section background
  pf-line   #e4d9f0   Borders / dividers

GRADIENTS
  Footer / clubs / Black Card   purple depth
  App promo                     #5f259f → #ffb81c (purple → gold)
  Buttons                       #4a148c → #6d20ab

TYPE BIBLIOGRAPHY
  Display   Barlow Condensed  (font-display)  weights 500–700
  Body/UI   Source Sans 3     (font-sans)     weights 400–700`;
