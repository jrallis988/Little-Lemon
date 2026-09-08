/**
 * RME visual tokens — navy/blue system matching the refined UI kit.
 */
export const colors = {
  navy: '#0B2C5F',
  navyDeep: '#071E42',
  blue: '#1E6BFF',
  blueSoft: '#E8F0FF',
  ink: '#111827',
  inkMuted: '#4B5563',
  inkSoft: '#9CA3AF',
  surface: '#F5F7FB',
  surfaceRaised: '#FFFFFF',
  mist: '#E5EAF2',
  accent: '#1E6BFF',
  accentDeep: '#1554CC',
  warning: '#D97706',
  danger: '#DC2626',
  success: '#059669',
  star: '#F59E0B',
  border: '#D7DEEA',
  tabBar: '#FFFFFF',
  tabInactive: '#9CA3AF',
  tabActive: '#1E6BFF',
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
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

/** Clean sans-serif only (kit uses unified sans stack) */
export const typography = {
  display: 'DMSans_700Bold',
  displaySemi: 'DMSans_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemi: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
} as const;
