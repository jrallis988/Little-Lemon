import { colors as lightColors } from './tokens';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = typeof lightColors;

export const darkColors = {
  brand: {
    blue: '#0055FF',
    blueDark: '#0041C4',
    blueLight: '#1A2744',
    blueMuted: '#2A3F66',
    navy: '#0A1128',
    navyMuted: '#3A4560',
  },
  semantic: {
    low: '#1B8A4A',
    lowBg: '#0F2A1A',
    lowBorder: '#A8DFBE',
    caution: '#C47A00',
    cautionBg: '#2A1F0A',
    cautionBorder: '#F0C978',
    high: '#D92D20',
    highBg: '#2A1210',
    highBorder: '#F3B0AB',
    info: '#0055FF',
    infoBg: '#1A2744',
    infoBorder: '#B3D0FF',
    unknown: '#5B6478',
    unknownBg: '#21262D',
  },
  surface: {
    background: '#0D1117',
    card: '#161B22',
    elevated: '#1C2128',
    overlay: 'rgba(0, 0, 0, 0.65)',
    border: '#30363D',
    borderStrong: '#484F58',
    input: '#21262D',
  },
  text: {
    primary: '#F0F3F8',
    secondary: '#9BA3B4',
    tertiary: '#6E7681',
    inverse: '#0A1128',
    link: '#4D8AFF',
    danger: '#FF6B6B',
  },
  status: lightColors.status,
} as unknown as ThemeColors;

export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === 'dark' ? darkColors : lightColors;
}
