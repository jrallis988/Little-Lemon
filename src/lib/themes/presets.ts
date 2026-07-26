import type { ProfileTheme } from "@/lib/types/database";
import { DEFAULT_MODULE_ORDER } from "@/lib/constants";

export type ThemePresetName =
  | "Classic"
  | "Midnight"
  | "Bubblegum"
  | "Grunge"
  | "Pop Star"
  | "Indie"
  | "Goth"
  | "Y2K"
  | "Minimal"
  | "Custom";

type ThemeDraft = Omit<
  ProfileTheme,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

const base: ThemeDraft = {
  preset_name: "Classic",
  background_color: "#F5F5F5",
  background_image_url: null,
  background_repeat: "no-repeat",
  background_position: "center top",
  primary_color: "#FF7A18",
  secondary_color: "#7B61FF",
  text_color: "#222222",
  link_color: "#7B61FF",
  heading_font: "Outfit",
  body_font: "Source Sans 3",
  border_style: "solid",
  card_transparency: 0.95,
  header_image_url: null,
  layout: "classic",
  module_order: [...DEFAULT_MODULE_ORDER],
  music_player_style: "classic",
  cursor_effect: false,
  stickers: [],
  display_mode: "modern",
  published: true,
};

export const THEME_PRESETS: Record<ThemePresetName, ThemeDraft> = {
  "Classic": { ...base },
  Midnight: {
    ...base,
    preset_name: "Midnight",
    background_color: "#0f172a",
    primary_color: "#38bdf8",
    secondary_color: "#1e293b",
    text_color: "#e2e8f0",
    link_color: "#7dd3fc",
    display_mode: "modern",
  },
  Bubblegum: {
    ...base,
    preset_name: "Bubblegum",
    background_color: "#ffe4f1",
    primary_color: "#db2777",
    secondary_color: "#f9a8d4",
    text_color: "#831843",
    link_color: "#be185d",
    heading_font: "Comic Sans MS",
    display_mode: "retro",
    stickers: [
      { id: "s1", emoji: "💖", x: 8, y: 12, size: 28 },
      { id: "s2", emoji: "⭐", x: 88, y: 18, size: 24 },
    ],
  },
  Grunge: {
    ...base,
    preset_name: "Grunge",
    background_color: "#1c1917",
    primary_color: "#a8a29e",
    secondary_color: "#44403c",
    text_color: "#fafaf9",
    link_color: "#d6d3d1",
    heading_font: "Impact",
    border_style: "dashed",
    display_mode: "retro",
  },
  "Pop Star": {
    ...base,
    preset_name: "Pop Star",
    background_color: "#fff7ed",
    primary_color: "#ea580c",
    secondary_color: "#fdba74",
    text_color: "#7c2d12",
    link_color: "#c2410c",
    heading_font: "Trebuchet MS",
    music_player_style: "card",
    stickers: [{ id: "s1", emoji: "🎤", x: 90, y: 8, size: 32 }],
  },
  Indie: {
    ...base,
    preset_name: "Indie",
    background_color: "#f5f0e8",
    primary_color: "#3f6212",
    secondary_color: "#a3b18a",
    text_color: "#1c1917",
    link_color: "#3f6212",
    heading_font: "Georgia",
    body_font: "Georgia",
    display_mode: "modern",
  },
  Goth: {
    ...base,
    preset_name: "Goth",
    background_color: "#0a0a0a",
    primary_color: "#9f1239",
    secondary_color: "#27272a",
    text_color: "#f4f4f5",
    link_color: "#fb7185",
    heading_font: "Palatino Linotype",
    border_style: "double",
    display_mode: "retro",
  },
  Y2K: {
    ...base,
    preset_name: "Y2K",
    background_color: "#ecfeff",
    primary_color: "#0891b2",
    secondary_color: "#a5f3fc",
    text_color: "#164e63",
    link_color: "#0e7490",
    heading_font: "Trebuchet MS",
    cursor_effect: true,
    display_mode: "retro",
    stickers: [
      { id: "s1", emoji: "💿", x: 5, y: 80, size: 26 },
      { id: "s2", emoji: "✨", x: 92, y: 70, size: 22 },
    ],
  },
  Minimal: {
    ...base,
    preset_name: "Minimal",
    background_color: "#f8fafc",
    primary_color: "#334155",
    secondary_color: "#cbd5e1",
    text_color: "#0f172a",
    link_color: "#334155",
    border_style: "none",
    card_transparency: 1,
    display_mode: "modern",
    music_player_style: "compact",
  },
  Custom: {
    ...base,
    preset_name: "Custom",
    published: false,
  },
};

export function createThemeForProfile(
  profileId: string,
  preset: ThemePresetName = "Classic"
): ProfileTheme {
  const now = new Date().toISOString();
  return {
    id: `theme-${profileId}`,
    profile_id: profileId,
    ...THEME_PRESETS[preset],
    created_at: now,
    updated_at: now,
  };
}
