import type { ProfileTheme, ProfileThemePreset } from "./types";

type ThemePresetConfig = Omit<
  ProfileTheme,
  "id" | "profileId" | "updatedAt"
> & { label: string; description: string };

const baseModules = [
  "about",
  "details",
  "interests",
  "music",
  "photos",
  "blog",
  "friends",
  "comments",
] as const;

export const THEME_PRESETS: Record<ProfileThemePreset, ThemePresetConfig> = {
  "classic-blue": {
    label: "Classic Blue",
    description: "Friendly navy cards with bright accents",
    preset: "classic-blue",
    backgroundColor: "#dce6f2",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    primaryColor: "#1f4d8f",
    secondaryColor: "#3d73c0",
    textColor: "#15253a",
    linkColor: "#1a4d9c",
    headingFont: "Georgia, serif",
    bodyFont: "Verdana, Geneva, sans-serif",
    borderStyle: "solid",
    cardTransparency: 0.96,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "compact",
    cursorEffect: false,
    stickers: [],
    displayMode: "retro",
  },
  midnight: {
    label: "Midnight",
    description: "Deep night sky with soft moonlight text",
    preset: "midnight",
    backgroundColor: "#0b1020",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    primaryColor: "#6ea8ff",
    secondaryColor: "#2a3a6a",
    textColor: "#e8eefc",
    linkColor: "#9ec1ff",
    headingFont: "'Trebuchet MS', sans-serif",
    bodyFont: "Verdana, Geneva, sans-serif",
    borderStyle: "solid",
    cardTransparency: 0.88,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "expanded",
    cursorEffect: true,
    stickers: ["★", "☾"],
    displayMode: "modern",
  },
  bubblegum: {
    label: "Bubblegum",
    description: "Candy pinks and playful rounded energy",
    preset: "bubblegum",
    backgroundColor: "#ffe4f1",
    backgroundRepeat: "repeat",
    backgroundPosition: "0 0",
    primaryColor: "#d63384",
    secondaryColor: "#ff8fc8",
    textColor: "#4a1834",
    linkColor: "#b01263",
    headingFont: "Comic Sans MS, cursive",
    bodyFont: "Tahoma, Geneva, sans-serif",
    borderStyle: "dashed",
    cardTransparency: 0.94,
    layout: "stacked",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "vinyl",
    cursorEffect: true,
    stickers: ["♡", "✦", "♪"],
    displayMode: "retro",
  },
  grunge: {
    label: "Grunge",
    description: "Worn charcoal with mustard highlights",
    preset: "grunge",
    backgroundColor: "#2b2a26",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    primaryColor: "#c4a35a",
    secondaryColor: "#5c574e",
    textColor: "#f0e6d2",
    linkColor: "#e0c27a",
    headingFont: "Impact, Haettenschweiler, sans-serif",
    bodyFont: "Courier New, monospace",
    borderStyle: "double",
    cardTransparency: 0.85,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "expanded",
    cursorEffect: false,
    stickers: [],
    displayMode: "retro",
  },
  "pop-star": {
    label: "Pop Star",
    description: "Stage-light gold on electric magenta",
    preset: "pop-star",
    backgroundColor: "#2a0a2e",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    primaryColor: "#ff4fd8",
    secondaryColor: "#ffd166",
    textColor: "#fff5fb",
    linkColor: "#ffd166",
    headingFont: "'Arial Black', Gadget, sans-serif",
    bodyFont: "Tahoma, Geneva, sans-serif",
    borderStyle: "solid",
    cardTransparency: 0.9,
    layout: "wide",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "vinyl",
    cursorEffect: true,
    stickers: ["★", "♪", "✧"],
    displayMode: "retro",
  },
  indie: {
    label: "Indie",
    description: "Warm paper tones and soft teal accents",
    preset: "indie",
    backgroundColor: "#f3efe6",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    primaryColor: "#2f6f6a",
    secondaryColor: "#c4b49a",
    textColor: "#2c241b",
    linkColor: "#1f5854",
    headingFont: "Georgia, serif",
    bodyFont: "Georgia, serif",
    borderStyle: "solid",
    cardTransparency: 0.97,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "compact",
    cursorEffect: false,
    stickers: [],
    displayMode: "modern",
  },
  goth: {
    label: "Goth",
    description: "Velvet black with crimson details",
    preset: "goth",
    backgroundColor: "#12080d",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    primaryColor: "#a11d3a",
    secondaryColor: "#3a1522",
    textColor: "#e8d7dc",
    linkColor: "#d64a68",
    headingFont: "'Palatino Linotype', Palatino, serif",
    bodyFont: "Georgia, serif",
    borderStyle: "double",
    cardTransparency: 0.9,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "expanded",
    cursorEffect: true,
    stickers: ["†", "♠"],
    displayMode: "retro",
  },
  y2k: {
    label: "Y2K",
    description: "Chrome cyan, lilac haze, early-web sparkle",
    preset: "y2k",
    backgroundColor: "#d9f3ff",
    backgroundRepeat: "repeat",
    backgroundPosition: "0 0",
    primaryColor: "#6b4eff",
    secondaryColor: "#39d0ff",
    textColor: "#1b1740",
    linkColor: "#4a2fd6",
    headingFont: "'Trebuchet MS', sans-serif",
    bodyFont: "Verdana, Geneva, sans-serif",
    borderStyle: "dashed",
    cardTransparency: 0.92,
    layout: "stacked",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "vinyl",
    cursorEffect: true,
    stickers: ["✿", "★", "◎"],
    displayMode: "retro",
  },
  minimal: {
    label: "Minimal",
    description: "Quiet whitespace with crisp navy type",
    preset: "minimal",
    backgroundColor: "#f7f8fa",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    primaryColor: "#1f3552",
    secondaryColor: "#8a96a8",
    textColor: "#15253a",
    linkColor: "#2b5a9e",
    headingFont: "system-ui, sans-serif",
    bodyFont: "system-ui, sans-serif",
    borderStyle: "solid",
    cardTransparency: 1,
    layout: "wide",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "compact",
    cursorEffect: false,
    stickers: [],
    displayMode: "modern",
  },
  custom: {
    label: "Custom",
    description: "Start from classic blue and make it yours",
    preset: "custom",
    backgroundColor: "#dce6f2",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    primaryColor: "#1f4d8f",
    secondaryColor: "#3d73c0",
    textColor: "#15253a",
    linkColor: "#1a4d9c",
    headingFont: "Georgia, serif",
    bodyFont: "Verdana, Geneva, sans-serif",
    borderStyle: "solid",
    cardTransparency: 0.96,
    layout: "classic",
    moduleOrder: [...baseModules],
    musicPlayerStyle: "compact",
    cursorEffect: false,
    stickers: [],
    displayMode: "modern",
  },
};

export function createThemeFromPreset(
  preset: ProfileThemePreset,
  profileId: string
): ProfileTheme {
  const { label: _l, description: _d, ...config } = THEME_PRESETS[preset];
  return {
    ...config,
    id: `theme-${profileId}`,
    profileId,
    updatedAt: new Date().toISOString(),
  };
}

/** Strip unsafe values from theme customization (no JS / executable CSS). */
export function sanitizeTheme(input: Partial<ProfileTheme>): Partial<ProfileTheme> {
  const safeColor = (v?: string) =>
    v && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v : undefined;
  const safeUrl = (v?: string) => {
    if (!v) return undefined;
    try {
      const u = new URL(v);
      if (u.protocol === "https:" || u.protocol === "http:") return u.toString();
    } catch {
      /* ignore */
    }
    return undefined;
  };
  const safeFont = (v?: string) =>
    v && /^[a-zA-Z0-9\s,'\-"]{1,80}$/.test(v) ? v : undefined;

  return {
    ...input,
    backgroundColor: safeColor(input.backgroundColor) ?? input.backgroundColor,
    primaryColor: safeColor(input.primaryColor) ?? input.primaryColor,
    secondaryColor: safeColor(input.secondaryColor) ?? input.secondaryColor,
    textColor: safeColor(input.textColor) ?? input.textColor,
    linkColor: safeColor(input.linkColor) ?? input.linkColor,
    backgroundImage: safeUrl(input.backgroundImage),
    headerImage: safeUrl(input.headerImage),
    headingFont: safeFont(input.headingFont) ?? input.headingFont,
    bodyFont: safeFont(input.bodyFont) ?? input.bodyFont,
    backgroundPosition:
      input.backgroundPosition &&
      /^[a-zA-Z0-9%\s.]{1,40}$/.test(input.backgroundPosition)
        ? input.backgroundPosition
        : input.backgroundPosition,
    stickers: (input.stickers || []).filter((s) => s.length <= 4).slice(0, 8),
    cardTransparency: Math.min(
      1,
      Math.max(0.4, Number(input.cardTransparency ?? 0.96))
    ),
  };
}

export function themeToCssVars(theme: ProfileTheme): React.CSSProperties {
  return {
    ["--mp-bg" as string]: theme.backgroundColor,
    ["--mp-bg-image" as string]: theme.backgroundImage
      ? `url(${theme.backgroundImage})`
      : "none",
    ["--mp-bg-repeat" as string]: theme.backgroundRepeat,
    ["--mp-bg-position" as string]: theme.backgroundPosition,
    ["--mp-primary" as string]: theme.primaryColor,
    ["--mp-secondary" as string]: theme.secondaryColor,
    ["--mp-text" as string]: theme.textColor,
    ["--mp-link" as string]: theme.linkColor,
    ["--mp-heading-font" as string]: theme.headingFont,
    ["--mp-body-font" as string]: theme.bodyFont,
    ["--mp-card-alpha" as string]: String(theme.cardTransparency),
    ["--mp-border-style" as string]: theme.borderStyle,
  };
}
