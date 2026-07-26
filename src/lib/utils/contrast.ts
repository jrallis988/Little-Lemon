/** Relative luminance helpers for WCAG contrast checks on profile themes. */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function channelLuminance(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  );
}

export function contrastRatio(foreground: string, background: string): number | null {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  if (l1 === null || l2 === null) return null;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWcagAA(
  foreground: string,
  background: string,
  largeText = false
): boolean {
  const ratio = contrastRatio(foreground, background);
  if (ratio === null) return true;
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

export function contrastWarning(
  textColor: string,
  backgroundColor: string,
  linkColor?: string
): string | null {
  const textOk = meetsWcagAA(textColor, backgroundColor);
  const linkOk = linkColor
    ? meetsWcagAA(linkColor, backgroundColor)
    : true;
  if (!textOk && !linkOk) {
    return "Text and link colors may be hard to read on this background. Consider increasing contrast.";
  }
  if (!textOk) {
    return "Text color may be hard to read on this background. Consider a higher-contrast combination.";
  }
  if (!linkOk) {
    return "Link color may be hard to read on this background. Consider a higher-contrast combination.";
  }
  return null;
}
