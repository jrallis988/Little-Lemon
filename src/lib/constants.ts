/** Central place for the temporary platform name — swap later without hunting strings. */
export const PLATFORM_NAME = "Vibe";
export const PLATFORM_TAGLINE = "Your profile. Your era. Your rules.";
export const PLATFORM_DESCRIPTION =
  "Vibe is a social space for teens 13–17. Build a page that actually feels like you — music, friends, photos, themes, and the little details feeds usually flatten.";
export const PLATFORM_AUDIENCE = "For teens ages 13–17";
export const AGE_MIN = 13;
export const AGE_MAX = 17;

export const USERNAME_MIN = 3;
export const USERNAME_MAX = 24;
export const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,24}$/;

export const FEATURED_FRIEND_OPTIONS = [4, 8, 12, 16] as const;

export const DEFAULT_MODULE_ORDER = [
  "about",
  "details",
  "music",
  "featured_friends",
  "photos",
  "blog",
  "comments",
] as const;

export const HEADING_FONTS = [
  "Outfit",
  "Georgia",
  "Courier New",
  "Impact",
  "Comic Sans MS",
  "Palatino Linotype",
  "Trebuchet MS",
] as const;

export const BODY_FONTS = [
  "Source Sans 3",
  "Georgia",
  "Verdana",
  "Tahoma",
  "Courier New",
  "Trebuchet MS",
  "Arial",
] as const;

export const PLACEHOLDER_AVATAR =
  "https://api.dicebear.com/7.x/shapes/svg?seed=vibe";

export const DEMO_PASSWORD = "demo1234";
