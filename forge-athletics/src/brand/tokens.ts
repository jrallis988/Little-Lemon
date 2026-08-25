/**
 * FORGE ATHLETICS — Brand Tokens
 * Specs for digital presentation of the identity system.
 * Production artwork is authored in Illustrator / InDesign / Photoshop.
 */

export const brand = {
  name: 'FORGE ATHLETICS',
  tagline: 'BUILT THROUGH WORK.',
  pillars: ['DISCIPLINE', 'PROGRESS', 'STRENGTH', 'PRECISION', 'WORK'] as const,
} as const

export type ColorSpec = {
  name: string
  role: string
  hex: string
  rgb: string
  cmyk: string
  usage: string
}

/** Primary palette — structural colors used across all applications */
export const primaryPalette: ColorSpec[] = [
  {
    name: 'Forge Black',
    role: 'Primary',
    hex: '#121212',
    rgb: '18, 18, 18',
    cmyk: '0, 0, 0, 93',
    usage: 'Primary logo, headlines, large fields, apparel dark grounds',
  },
  {
    name: 'Bone',
    role: 'Primary',
    hex: '#F0EDE6',
    rgb: '240, 237, 230',
    cmyk: '0, 1, 4, 6',
    usage: 'Light grounds, reversed logo field, print paper reference',
  },
  {
    name: 'Steel',
    role: 'Primary',
    hex: '#6E7276',
    rgb: '110, 114, 118',
    cmyk: '7, 3, 0, 54',
    usage: 'Secondary type, rules, utility labels, muted UI chrome',
  },
]

/** Secondary palette — accent and support; never replace primary structure */
export const secondaryPalette: ColorSpec[] = [
  {
    name: 'Iron Oxide',
    role: 'Accent',
    hex: '#A84828',
    rgb: '168, 72, 40',
    cmyk: '0, 57, 76, 34',
    usage: 'Campaign emphasis, CTAs, zone markers — sparingly',
  },
  {
    name: 'Graphite',
    role: 'Secondary',
    hex: '#2A2A2A',
    rgb: '42, 42, 42',
    cmyk: '0, 0, 0, 84',
    usage: 'Dark panels, photography overlays, facility walls',
  },
  {
    name: 'Mist',
    role: 'Secondary',
    hex: '#D4D0C8',
    rgb: '212, 208, 200',
    cmyk: '0, 2, 6, 17',
    usage: 'Subtle fills, training docs, soft dividers',
  },
  {
    name: 'Concrete',
    role: 'Secondary',
    hex: '#9A968E',
    rgb: '154, 150, 142',
    cmyk: '0, 3, 8, 40',
    usage: 'Captions, metadata, secondary rules',
  },
]

export const accessibilityPairs = [
  { fg: 'Forge Black', bg: 'Bone', ratio: '16.4:1', pass: 'AAA' },
  { fg: 'Bone', bg: 'Forge Black', ratio: '16.4:1', pass: 'AAA' },
  { fg: 'Forge Black', bg: 'Mist', ratio: '11.2:1', pass: 'AAA' },
  { fg: 'Bone', bg: 'Graphite', ratio: '13.1:1', pass: 'AAA' },
  { fg: 'Iron Oxide', bg: 'Bone', ratio: '5.1:1', pass: 'AA (large / UI)' },
  { fg: 'Steel', bg: 'Bone', ratio: '4.6:1', pass: 'AA (body caution)' },
] as const

export const typeScale = {
  display: {
    family: 'Barlow Condensed',
    weight: 700,
    size: 'clamp(3.5rem, 10vw, 7.5rem)',
    tracking: '0.04em',
    leading: 0.92,
    case: 'uppercase' as const,
    use: 'Campaign headlines, environmental statements',
  },
  headline: {
    family: 'Barlow Condensed',
    weight: 600,
    size: 'clamp(1.75rem, 4vw, 3rem)',
    tracking: '0.06em',
    leading: 1.05,
    case: 'uppercase' as const,
    use: 'Section titles, promotional blocks',
  },
  body: {
    family: 'IBM Plex Sans',
    weight: 400,
    size: '1.0625rem',
    tracking: '0',
    leading: 1.55,
    case: 'sentence' as const,
    use: 'Long-form communication, guidelines copy',
  },
  utility: {
    family: 'IBM Plex Mono',
    weight: 500,
    size: '0.75rem',
    tracking: '0.14em',
    leading: 1.4,
    case: 'uppercase' as const,
    use: 'Stats, labels, schedules, specs, captions',
  },
} as const

export const logoRules = {
  clearSpace: 'Equal to the height of the symbol’s vertical stem (1× stem)',
  minPrint: {
    symbol: '12 mm',
    wordmark: '28 mm wide',
    primaryHorizontal: '40 mm wide',
  },
  minDigital: {
    symbol: '24 px',
    wordmark: '96 px wide',
    primaryHorizontal: '140 px wide',
  },
} as const

export const voiceDo = [
  'Direct',
  'Focused',
  'Confident',
  'Motivating',
] as const

export const voiceDont = [
  'Aggressive',
  'Cheesy',
  'Overly inspirational',
] as const

export const voiceExamples = [
  { good: 'BUILT THROUGH WORK.', bad: 'Unleash the beast inside.' },
  { good: 'ONE MORE.', bad: 'No pain, no gain!' },
  { good: 'PROGRESS IS EARNED.', bad: 'Dream big. Crush goals.' },
  { good: 'SHOW UP. TRAIN. REPEAT.', bad: 'Be your best self every day.' },
] as const
