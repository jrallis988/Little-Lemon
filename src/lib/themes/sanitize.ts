import type {
  BorderStyle,
  DisplayMode,
  MusicPlayerStyle,
  ProfileLayout,
  ProfileSticker,
  ProfileTheme,
} from "@/lib/types/database";
import { DEFAULT_MODULE_ORDER, HEADING_FONTS, BODY_FONTS } from "@/lib/constants";

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const SAFE_URL =
  /^(https?:\/\/[^\s]+|\/[^\s]*|data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+)?$/i;
const ALLOWED_MODULES = new Set(DEFAULT_MODULE_ORDER);

function sanitizeColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return HEX.test(trimmed) ? trimmed : fallback;
}

function sanitizeString(value: unknown, max = 200, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  // Strip tags, event handlers, and javascript: URLs
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/expression\s*\(/gi, "")
    .replace(/url\s*\(/gi, "")
    .slice(0, max);
}

function sanitizeUrl(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!SAFE_URL.test(trimmed)) return null;
  if (/javascript:|data:text|vbscript:/i.test(trimmed)) return null;
  return trimmed.slice(0, 500);
}

function sanitizeNumber(value: unknown, min: number, max: number, fallback: number) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function sanitizeEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function sanitizeStickers(value: unknown): ProfileSticker[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 12).map((s, i) => {
    const item = s as Partial<ProfileSticker>;
    return {
      id: sanitizeString(item.id, 40, `sticker-${i}`),
      emoji: sanitizeString(item.emoji, 8, "⭐").slice(0, 4),
      x: sanitizeNumber(item.x, 0, 100, 50),
      y: sanitizeNumber(item.y, 0, 100, 50),
      size: sanitizeNumber(item.size, 12, 48, 24),
    };
  });
}

function sanitizeModuleOrder(value: unknown): string[] {
  const defaults = [...DEFAULT_MODULE_ORDER];
  if (!Array.isArray(value)) return defaults;
  const cleaned = value
    .filter((k): k is string => typeof k === "string" && ALLOWED_MODULES.has(k as never))
    .filter((k, i, arr) => arr.indexOf(k) === i);
  for (const key of defaults) {
    if (!cleaned.includes(key)) cleaned.push(key);
  }
  return cleaned;
}

/** Sanitize theme input — never allow arbitrary JS, HTML, or unsafe CSS. */
export function sanitizeTheme(
  input: Partial<ProfileTheme>,
  current: ProfileTheme
): ProfileTheme {
  const headingFonts = HEADING_FONTS as readonly string[];
  const bodyFonts = BODY_FONTS as readonly string[];

  return {
    ...current,
    preset_name: sanitizeString(input.preset_name, 40, current.preset_name),
    background_color: sanitizeColor(input.background_color, current.background_color),
    background_image_url:
      input.background_image_url === null
        ? null
        : sanitizeUrl(input.background_image_url) ?? current.background_image_url,
    background_repeat: sanitizeEnum(
      input.background_repeat,
      ["no-repeat", "repeat", "repeat-x", "repeat-y"] as const,
      current.background_repeat
    ),
    background_position: sanitizeString(
      input.background_position,
      40,
      current.background_position
    ).replace(/[<>{}]/g, ""),
    primary_color: sanitizeColor(input.primary_color, current.primary_color),
    secondary_color: sanitizeColor(input.secondary_color, current.secondary_color),
    text_color: sanitizeColor(input.text_color, current.text_color),
    link_color: sanitizeColor(input.link_color, current.link_color),
    heading_font: sanitizeEnum(input.heading_font, headingFonts, current.heading_font),
    body_font: sanitizeEnum(input.body_font, bodyFonts, current.body_font),
    border_style: sanitizeEnum(
      input.border_style,
      ["solid", "dashed", "double", "none"] as BorderStyle[],
      current.border_style
    ),
    card_transparency: sanitizeNumber(
      input.card_transparency,
      0.4,
      1,
      current.card_transparency
    ),
    header_image_url:
      input.header_image_url === null
        ? null
        : sanitizeUrl(input.header_image_url) ?? current.header_image_url,
    layout: sanitizeEnum(
      input.layout,
      ["classic", "wide", "compact"] as ProfileLayout[],
      current.layout
    ),
    module_order: sanitizeModuleOrder(input.module_order ?? current.module_order),
    music_player_style: sanitizeEnum(
      input.music_player_style,
      ["classic", "compact", "card"] as MusicPlayerStyle[],
      current.music_player_style
    ),
    cursor_effect: Boolean(input.cursor_effect ?? current.cursor_effect),
    stickers: sanitizeStickers(input.stickers ?? current.stickers),
    display_mode: sanitizeEnum(
      input.display_mode,
      ["retro", "modern"] as DisplayMode[],
      current.display_mode
    ),
    published: Boolean(input.published ?? current.published),
    updated_at: new Date().toISOString(),
  };
}

/** Build safe inline CSS variables from a sanitized theme. */
export function themeToCssVars(theme: ProfileTheme): React.CSSProperties {
  const bgImage = theme.background_image_url
    ? `url("${theme.background_image_url.replace(/"/g, "")}")`
    : "none";

  return {
    ["--mp-bg" as string]: theme.background_color,
    ["--mp-primary" as string]: theme.primary_color,
    ["--mp-secondary" as string]: theme.secondary_color,
    ["--mp-text" as string]: theme.text_color,
    ["--mp-link" as string]: theme.link_color,
    ["--mp-heading-font" as string]: `"${theme.heading_font}", sans-serif`,
    ["--mp-body-font" as string]: `"${theme.body_font}", sans-serif`,
    ["--mp-card-alpha" as string]: String(theme.card_transparency),
    ["--mp-border-style" as string]: theme.border_style,
    backgroundColor: theme.background_color,
    backgroundImage: bgImage,
    backgroundRepeat: theme.background_repeat,
    backgroundPosition: theme.background_position,
    color: theme.text_color,
    fontFamily: `"${theme.body_font}", sans-serif`,
  };
}
