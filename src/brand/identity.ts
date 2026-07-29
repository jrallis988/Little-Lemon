/**
 * Surf brand identity — derived from the official logo.
 * Palette: ocean blues + cyan + soft violet mesh, orange board accent, foam white type.
 */

export const BRAND_PALETTE = {
  deepBlue: "#234197",
  oceanBlue: "#288CC1",
  skyBlue: "#5F9ED1",
  violetGlow: "#8C6DE6",
  boardOrange: "#F7921E",
  boardCoral: "#F25C1D",
  foam: "#F3EFE6",
  white: "#FFFFFF",
} as const;

export const APP_NAME = "surf";
export const APP_NAME_DISPLAY = "Surf";

export const APP_TAGLINE = "Search first. Learn safely. Ride curiosity.";

/** Short brand biography used in-product */
export const APP_BIOGRAPHY =
  "Surf is a child-safe, search-first educational browser for families and schools. Kids ask questions, open trusted learning sources, and read without ads, feeds, or neon distractions — while parents keep the guardrails.";

export const APP_BIOGRAPHY_SHORT =
  "A calm search tool for curious kids — trusted sources only, parent-guided safety always.";

export const APP_POSITIONING = [
  "Search-first, never a content feed",
  "Trusted educational sources only",
  "Built for kids, credible for schools, clear for parents",
] as const;

/** In-product AI learning aide — never labeled as a homework machine */
export const MILO_NAME = "Ask Milo";
export const MILO_SHORT_NAME = "Milo";
export const MILO_TAGLINE =
  "Your learning aide — explains ideas, builds vocabulary, and points to trusted sources.";
