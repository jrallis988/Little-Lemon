/**
 * BioCross design tokens
 * Semantic colors: green=safe/low, amber=caution, red=high risk, blue=info/actions
 */

export const colors = {
  brand: {
    blue: '#0055FF',
    blueDark: '#0041C4',
    blueLight: '#E8F1FF',
    blueMuted: '#B3D0FF',
    navy: '#0A1128',
    navyMuted: '#3A4560',
  },
  semantic: {
    low: '#1B8A4A',
    lowBg: '#E8F7EE',
    lowBorder: '#A8DFBE',
    caution: '#C47A00',
    cautionBg: '#FFF6E5',
    cautionBorder: '#F0C978',
    high: '#D92D20',
    highBg: '#FDECEC',
    highBorder: '#F3B0AB',
    info: '#0055FF',
    infoBg: '#E8F1FF',
    infoBorder: '#B3D0FF',
    unknown: '#5B6478',
    unknownBg: '#F2F4F7',
  },
  surface: {
    background: '#F7F9FC',
    card: '#FFFFFF',
    elevated: '#FFFFFF',
    overlay: 'rgba(10, 17, 40, 0.55)',
    border: '#E4E8F0',
    borderStrong: '#CDD4E0',
    input: '#FFFFFF',
  },
  text: {
    primary: '#0A1128',
    secondary: '#5B6478',
    tertiary: '#8B93A7',
    inverse: '#FFFFFF',
    link: '#0055FF',
    danger: '#D92D20',
  },
  status: {
    success: '#1B8A4A',
    warning: '#C47A00',
    error: '#D92D20',
  },
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
  full: 9999,
} as const;

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  size: {
    xs: 12,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 26,
    hero: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.55,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: '#0A1128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#0A1128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  nav: {
    shadowColor: '#0A1128',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const touchTargets = {
  min: 44,
  comfortable: 48,
} as const;

export const tokens = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
  touchTargets,
} as const;

export type RiskLevel = 'low' | 'caution' | 'high' | 'unknown' | 'info';

export function riskColors(level: RiskLevel) {
  switch (level) {
    case 'low':
      return {
        fg: colors.semantic.low,
        bg: colors.semantic.lowBg,
        border: colors.semantic.lowBorder,
        label: 'Low Risk',
      };
    case 'caution':
      return {
        fg: colors.semantic.caution,
        bg: colors.semantic.cautionBg,
        border: colors.semantic.cautionBorder,
        label: 'Use Caution',
      };
    case 'high':
      return {
        fg: colors.semantic.high,
        bg: colors.semantic.highBg,
        border: colors.semantic.highBorder,
        label: 'High Risk',
      };
    case 'unknown':
      return {
        fg: colors.semantic.unknown,
        bg: colors.semantic.unknownBg,
        border: colors.surface.borderStrong,
        label: 'Unable to Determine',
      };
    case 'info':
    default:
      return {
        fg: colors.semantic.info,
        bg: colors.semantic.infoBg,
        border: colors.semantic.infoBorder,
        label: 'Informational',
      };
  }
}
