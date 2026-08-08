/**
 * Minimalist, high-utility visual tokens.
 * High contrast ink on cool surface; lime accent for primary actions only.
 */
export const colors = {
  ink: '#0B1210',
  inkMuted: '#3A4A44',
  inkSoft: '#6A7A73',
  surface: '#F2F4F3',
  surfaceRaised: '#FFFFFF',
  mist: '#D9E2DD',
  accent: '#C8F031',
  accentDeep: '#8FB512',
  warning: '#D97706',
  danger: '#B42318',
  star: '#D97706',
  border: '#C5D0CA',
  tabBar: '#0B1210',
  tabInactive: '#8FA098',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  display: 'Fraunces_700Bold',
  displaySemi: 'Fraunces_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemi: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
} as const;
