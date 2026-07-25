/**
 * StaticVolume visual system
 * Warm off-black, CRT phosphor accents, physical typography — never pure #000.
 * Portal chrome borrows PureVolume's crisp bordered boxes & toolbar blocks.
 */
export const colors = {
  background: '#161311',
  backgroundElevated: '#1E1A16',
  surface: '#241F1A',
  surfaceRaised: '#2E2822',
  /** Classic portal hairline (~#333) */
  border: '#333333',
  borderSubtle: '#2A2520',
  /** High-contrast rule for boxed modules */
  borderStrong: '#4A4036',

  text: '#EDE6DC',
  textMuted: '#A89F93',
  textDim: '#6E665C',

  /** CRT amber / PureVolume-era accent orange */
  phosphor: '#E0A45A',
  phosphorDim: '#B07E3E',
  accentLine: '#E08A3C',
  /** Warm copper for download / engagement signals */
  copper: '#C4784A',
  copperDim: '#8F5635',
  /** Soft snow highlight for static overlays */
  snow: 'rgba(237, 230, 220, 0.06)',
  scanline: 'rgba(0, 0, 0, 0.22)',
  aberrationRed: 'rgba(220, 80, 60, 0.08)',
  aberrationCyan: 'rgba(60, 180, 200, 0.06)',

  /** Classic portal toolbar strip */
  toolbar: '#1A1612',
  toolbarActive: '#2A2218',
  toolbarEdge: '#333333',

  danger: '#C45A4A',
  success: '#8A9A6A',
  transparent: 'transparent',
} as const;

export const typography = {
  brand: {
    fontFamily: 'SpaceMono',
    fontSize: 28,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  headline: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
    letterSpacing: 0.15,
    lineHeight: 18,
  },
  caption: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  monoTiny: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
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
  /** PureVolume portal chrome — sharp corners only */
  none: 0,
  sm: 0,
  md: 0,
  media: 0,
} as const;

/** Shared 1px portal box chrome */
export const portalBox = {
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: colors.backgroundElevated,
  borderRadius: 0,
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radii,
} as const;

export type Theme = typeof theme;
