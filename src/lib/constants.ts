export {
  APP_NAME_DISPLAY as APP_NAME,
  APP_TAGLINE,
  APP_BIOGRAPHY,
  APP_BIOGRAPHY_SHORT,
  APP_POSITIONING,
  BRAND_PALETTE,
} from "@/brand/identity";

export const STORAGE_KEYS = {
  profiles: "surf.profiles.v1",
  activeProfileId: "surf.activeProfileId.v1",
  parentControls: "surf.parentControls.v1",
  session: "surf.session.v1",
  history: "surf.history.v1",
  usage: "surf.usage.v1",
} as const;

export const DEFAULT_WHITELIST = [
  "kids.nationalgeographic.com",
  "www.si.edu",
  "si.edu",
  "pbskids.org",
  "www.pbskids.org",
  "spaceplace.nasa.gov",
  "www.loc.gov",
  "kids.britannica.com",
  "www.amnh.org",
  "education.nationalgeographic.org",
  "www.bbc.co.uk",
  "www.dkfindout.com",
] as const;

/** Default daily quota in minutes */
export const DEFAULT_DAILY_LIMIT_MINUTES = 60;

/** How long the Learning Mode frosted overlay stays full-screen before settling */
export const LEARNING_MODE_OVERLAY_MS = 2800;

/** Session timer tick interval */
export const SESSION_TICK_MS = 1000;

/** Max curated search results shown */
export const MAX_SEARCH_RESULTS = 8;
