/** Central place for the temporary platform name — swap later without hunting strings. */
export const PLATFORM_NAME = "MyPlace";
export const PLATFORM_TAGLINE = "Your profile should feel like your place.";
export const PLATFORM_DESCRIPTION =
  "Build a page that sounds like you, looks like you, and brings together the people, music, photos, and interests that matter to you.";

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
  "https://api.dicebear.com/7.x/shapes/svg?seed=myplace";

export const DEMO_PASSWORD = "demo1234";
