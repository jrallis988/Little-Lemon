/**
 * StaticVolume — PureVolume portal theme
 * Light gray/white body, black header chrome, clean sans type, blue links.
 */
export const fonts = {
  sans: 'Barlow',
  sansBold: 'BarlowBold',
  condensed: 'BarlowCondensed',
  condensedBold: 'BarlowCondensedBold',
} as const;

export const colors = {
  /** Page canvas — classic PV white / light gray */
  background: '#FFFFFF',
  backgroundElevated: '#F0F0F0',
  surface: '#FFFFFF',
  surfaceRaised: '#E8E8E8',

  /** Thin portal rules */
  border: '#D0D0D0',
  borderSubtle: '#E4E4E4',
  borderStrong: '#B0B0B0',

  /** Near-black header / footer chrome */
  header: '#111111',
  headerText: '#FFFFFF',

  text: '#222222',
  textMuted: '#666666',
  textDim: '#999999',
  textOnDark: '#FFFFFF',

  /** Classic portal link / active blue (not amber) */
  link: '#1A6DB5',
  linkHover: '#155A96',
  /** Mapped aliases used across existing components */
  phosphor: '#1A6DB5',
  phosphorDim: '#155A96',
  accentLine: '#1A6DB5',
  copper: '#444444',
  copperDim: '#666666',

  snow: 'transparent',
  scanline: 'transparent',
  aberrationRed: 'transparent',
  aberrationCyan: 'transparent',

  toolbar: '#E6E6E6',
  toolbarActive: '#FFFFFF',
  toolbarEdge: '#CCCCCC',

  danger: '#C0392B',
  success: '#2E7D32',
  transparent: 'transparent',
} as const;

export const typography = {
  brand: {
    fontFamily: fonts.condensedBold,
    fontSize: 22,
    letterSpacing: 0.5,
    textTransform: 'lowercase' as const,
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    letterSpacing: 0,
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    letterSpacing: 0,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  monoTiny: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 0.3,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  tabBar: 56,
} as const;

export const radii = {
  none: 0,
  sm: 2,
  md: 3,
  media: 2,
} as const;

export const portalBox = {
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: colors.surface,
  borderRadius: 0,
} as const;

export const theme = {
  colors,
  fonts,
  typography,
  spacing,
  radii,
} as const;

export type Theme = typeof theme;
