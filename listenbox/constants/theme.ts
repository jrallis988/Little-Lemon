/**
 * Listenbox visual system — cool paper journal with ink navy + chartreuse.
 * Intentionally not purple-gradient, cream-terracotta, or broadsheet.
 */
export const palette = {
  paper: '#EEF1F4',
  paperDeep: '#E2E8EF',
  ink: '#0B1F2A',
  inkMuted: '#3D5463',
  inkFaint: '#8A9BAA',
  accent: '#C8F135',
  accentInk: '#14210A',
  danger: '#C23B22',
  star: '#E8A317',
  white: '#FFFFFF',
  overlay: 'rgba(11, 31, 42, 0.06)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;

export const fonts = {
  display: 'Fraunces_700Bold',
  displaySoft: 'Fraunces_500Medium',
  body: 'Figtree_400Regular',
  bodyMedium: 'Figtree_500Medium',
  bodyBold: 'Figtree_700Bold',
} as const;
