/**
 * StaticVolume — Analog Archive theme
 * CRT warm off-blacks, muted amber phosphor, charcoal portal rules.
 */
export const colors = {
  /** Deep CRT monitor backing */
  background: '#121212',
  backgroundElevated: '#181818',
  surface: '#1C1C1C',
  surfaceRaised: '#222222',

  /** Dark charcoal box separation */
  border: '#333333',
  borderSubtle: '#2A2A2A',
  borderStrong: '#3D3D3D',

  text: '#E8E0D0',
  textMuted: '#A09078',
  textDim: '#6A6054',

  /** Muted amber / orange — active, highlights, callouts */
  phosphor: '#FFB000',
  phosphorDim: '#E58300',
  accentLine: '#E58300',
  copper: '#E58300',
  copperDim: '#B06800',

  snow: 'rgba(255, 176, 0, 0.04)',
  scanline: 'rgba(0, 0, 0, 0.28)',
  aberrationRed: 'rgba(220, 80, 60, 0.07)',
  aberrationCyan: 'rgba(60, 180, 200, 0.05)',

  toolbar: '#181818',
  toolbarActive: '#222222',
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
  audioBar: 64,
  tabBar: 56,
} as const;

export const radii = {
  none: 0,
  sm: 0,
  md: 0,
  media: 0,
} as const;

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
