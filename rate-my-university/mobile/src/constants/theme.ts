export const colors = {
  navy: '#0B1F33',
  ink: '#142433',
  slate: '#3D5163',
  mist: '#E8EEF3',
  paper: '#F7FAFC',
  accent: '#C45C26',
  accentSoft: '#F3D9C8',
  success: '#2F6B4F',
  border: '#D5DEE7',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typography = {
  brand: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  title: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '700' as const,
  },
  body: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '500' as const,
  },
} as const;

/** Multi-metric rating definitions mirrored from the API. */
export const RATING_METRICS: Record<string, { key: string; label: string }[]> = {
  professor: [
    { key: 'clarity', label: 'Clarity' },
    { key: 'helpfulness', label: 'Helpfulness' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'would_recommend', label: 'Would recommend' },
  ],
  advisor: [
    { key: 'clarity', label: 'Clarity' },
    { key: 'helpfulness', label: 'Helpfulness' },
    { key: 'availability', label: 'Availability' },
    { key: 'would_recommend', label: 'Would recommend' },
  ],
  course: [
    { key: 'workload', label: 'Workload' },
    { key: 'interest', label: 'Interest' },
    { key: 'organization', label: 'Organization' },
    { key: 'grading_fairness', label: 'Grading fairness' },
  ],
  dorm: [
    { key: 'cleanliness', label: 'Cleanliness' },
    { key: 'location', label: 'Location' },
    { key: 'community', label: 'Community' },
    { key: 'value', label: 'Value' },
  ],
  university: [
    { key: 'academics', label: 'Academics' },
    { key: 'campus_life', label: 'Campus life' },
    { key: 'resources', label: 'Resources' },
    { key: 'overall', label: 'Overall' },
  ],
};
