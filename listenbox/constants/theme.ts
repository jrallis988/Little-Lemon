/**
 * Listenbox visual system — "Needle Drop"
 * Cool slate paper, deep ink, acid lime accents. Vinyl-booth energy without dark-mode default.
 */
export const palette = {
  paper: '#E8EEF2',
  paperDeep: '#D5DEE8',
  paperWash: '#F4F7FA',
  ink: '#07151C',
  inkMuted: '#3A5160',
  inkFaint: '#7E93A3',
  accent: '#D6FF3A',
  accentDeep: '#B8E012',
  accentInk: '#101A05',
  signal: '#FF4D2E',
  star: '#F0A429',
  white: '#FFFFFF',
  ring: 'rgba(7, 21, 28, 0.08)',
  ringStrong: 'rgba(7, 21, 28, 0.16)',
  rule: 'rgba(7, 21, 28, 0.14)',
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
  sm: 4,
  md: 10,
  lg: 16,
  sleeve: 6,
} as const;

export const fonts = {
  display: 'Fraunces_700Bold',
  displayBlack: 'Fraunces_900Black',
  displaySoft: 'Fraunces_500Medium',
  displayItalic: 'Fraunces_600SemiBold_Italic',
  body: 'Figtree_400Regular',
  bodyMedium: 'Figtree_500Medium',
  bodyBold: 'Figtree_700Bold',
} as const;
