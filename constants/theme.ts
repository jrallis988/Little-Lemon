/**
 * StaticVolume visual system
 * Warm off-black, CRT phosphor accents, physical typography — never pure #000.
 */
export const colors = {
  background: '#161311',
  backgroundElevated: '#1E1A16',
  surface: '#241F1A',
  surfaceRaised: '#2E2822',
  border: '#3A342C',
  borderSubtle: '#2A2520',

  text: '#EDE6DC',
  textMuted: '#A89F93',
  textDim: '#6E665C',

  /** CRT amber phosphor — primary accent */
  phosphor: '#E0A45A',
  phosphorDim: '#B07E3E',
  /** Warm copper for download / engagement signals */
  copper: '#C4784A',
  copperDim: '#8F5635',
  /** Soft snow highlight for static overlays */
  snow: 'rgba(237, 230, 220, 0.06)',
  scanline: 'rgba(0, 0, 0, 0.22)',
  aberrationRed: 'rgba(220, 80, 60, 0.08)',
  aberrationCyan: 'rgba(60, 180, 200, 0.06)',

  danger: '#C45A4A',
  success: '#8A9A6A',
  transparent: 'transparent',
} as const;

export const typography = {
  brand: {
    fontFamily: 'SpaceMono',
    fontSize: 28,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
  },
  headline: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    letterSpacing: 1.5,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 16,
    letterSpacing: 1,
  },
  body: {
    fontFamily: 'SpaceMono',
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  caption: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.8,
  },
  monoTiny: {
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 1.2,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  /** Space reserved for the docked global audio bar + tab bar */
  audioBar: 64,
  tabBar: 56,
} as const;

export const radii = {
  none: 0,
  sm: 2,
  md: 4,
  /** Physical media / sleeve framing — keep tight, not pill-like */
  media: 3,
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radii,
} as const;

export type Theme = typeof theme;
