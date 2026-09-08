/**
 * FORGE ATHLETICS — Campaign Tokens
 * BUILT THROUGH WORK. — presentation layer for the campaign case study.
 */

export const brand = {
  name: 'FORGE ATHLETICS',
  tagline: 'BUILT THROUGH WORK.',
  campaign: 'BUILT THROUGH WORK.',
  platform: 'BUILT THROUGH ____',
} as const

/** Signature campaign color — strongest artificial color in the system */
export const forgeOrange = '#E85A1C'

export type ColorSpec = {
  name: string
  role: string
  hex: string
  rgb: string
  cmyk: string
  usage: string
}

export const primaryPalette: ColorSpec[] = [
  {
    name: 'Forge Orange',
    role: 'Signature',
    hex: forgeOrange,
    rgb: '232, 90, 28',
    cmyk: '0, 61, 88, 9',
    usage: 'Energy, work, emphasis, action — the recognizable signature',
  },
  {
    name: 'Forge Black',
    role: 'Foundation',
    hex: '#121212',
    rgb: '18, 18, 18',
    cmyk: '0, 0, 0, 93',
    usage: 'Strength, primary foundation, large fields, apparel',
  },
  {
    name: 'Bone',
    role: 'Neutral',
    hex: '#F0EDE6',
    rgb: '240, 237, 230',
    cmyk: '0, 1, 4, 6',
    usage: 'Editorial neutral, light grounds, print paper',
  },
  {
    name: 'Steel',
    role: 'Secondary',
    hex: '#6E7276',
    rgb: '110, 114, 118',
    cmyk: '7, 3, 0, 54',
    usage: 'Technical secondary — Work Code support, labels',
  },
]

export const secondaryPalette: ColorSpec[] = [
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
    usage: 'Subtle fills, soft dividers',
  },
]

export const accessibilityPairs = [
  { fg: 'Forge Black', bg: 'Bone', ratio: '16.4:1', pass: 'AAA' },
  { fg: 'Bone', bg: 'Forge Black', ratio: '16.4:1', pass: 'AAA' },
  { fg: 'Bone', bg: 'Forge Orange', ratio: '3.2:1', pass: 'AA large only' },
  { fg: 'Forge Orange', bg: 'Bone', ratio: '3.8:1', pass: 'AA large / UI' },
  { fg: 'Forge Orange', bg: 'Forge Black', ratio: '5.4:1', pass: 'AA' },
] as const

/** Expandable campaign messaging — each line is evidence, not a slogan */
export const campaignStatements = [
  {
    line: 'BUILT THROUGH 5:12 A.M.',
    evidence: 'Maya’s alarm. Empty track. Session 184 starts before the sun.',
  },
  {
    line: 'BUILT THROUGH 327 REPS.',
    evidence: 'Same session. Strength block after speed work. Counted, not estimated.',
  },
  {
    line: 'BUILT THROUGH THE LAST SET.',
    evidence: 'When form breaks and discipline doesn’t.',
  },
  {
    line: 'BUILT THROUGH FAILURE.',
    evidence: 'Missed blocks, false starts, times that don’t make the board.',
  },
  {
    line: 'BUILT THROUGH ONE MORE.',
    evidence: 'The rep after the plan ends.',
  },
  {
    line: 'BUILT THROUGH 1,000 MISSES.',
    evidence: 'Jordan’s shooting hour. Empty gym. No highlight reel.',
  },
  {
    line: 'BUILT THROUGH WORK.',
    evidence: 'The platform. Everything above is proof.',
  },
] as const

export type WorkCodeEntry = {
  label: string
  value: string
}

export type Athlete = {
  id: string
  name: string
  age: number
  sport: string
  role: string
  session: string
  time: string
  protocol: string
  duration: string
  goal: string
  day: string
  totalReps: string
  tone: string
  story: string
}

/** Primary campaign athlete — appears throughout */
export const maya: Athlete = {
  id: 'maya',
  name: 'MAYA',
  age: 19,
  sport: 'SPRINTER',
  role: 'Primary athlete',
  session: 'SESSION 184',
  time: '05:12 AM',
  protocol: '8 × 200 M',
  duration: '42 MINUTES',
  goal: '1 GOAL',
  day: 'DAY 064',
  totalReps: '12,481',
  tone: 'tone-maya',
  story:
    'Maya trains alone before the facility opens. Session 184 is speed, then strength. The clock starts at 5:12. The work doesn’t end when the stopwatch does.',
}

/** Second athlete — proves the idea scales across sports */
export const jordan: Athlete = {
  id: 'jordan',
  name: 'JORDAN',
  age: 22,
  sport: 'BASKETBALL',
  role: 'Second athlete',
  session: 'SESSION 091',
  time: '06:40 AM',
  protocol: '1,000 MISSES',
  duration: '68 MINUTES',
  goal: 'MAKE RATE ↑',
  day: 'DAY 112',
  totalReps: '94,200',
  tone: 'tone-jordan',
  story:
    'Jordan’s hour is empty-gym shooting. Misses are logged. Makes are secondary. The campaign line is literal: built through 1,000 misses.',
}

export const athletes = [maya, jordan] as const

export function workCodeFor(athlete: Athlete): WorkCodeEntry[] {
  return [
    { label: 'ATHLETE', value: `${athlete.name} / ${athlete.sport}` },
    { label: 'TIME', value: athlete.time },
    { label: 'SESSION', value: athlete.session },
    { label: 'PROTOCOL', value: athlete.protocol },
    { label: 'DAY', value: athlete.day },
  ]
}

export const mayaWorkCodeCompact = '05:12 AM / SESSION 184 / STRENGTH'
export const mayaTrackCode = '05:12 / SESSION 184 / TRACK'

export const photoRules = {
  do: [
    'Chalked hands',
    'Taped wrists and ankles',
    'Sweat',
    'Empty tracks and empty gyms',
    'Early mornings',
    'Failed attempts',
    'Recovery',
    'Repetition',
    'Worn equipment',
    'Athletes catching their breath',
    'Preparation',
    'Training alone',
    'Moments immediately before and after effort',
  ],
  dont: [
    'Podium celebrations',
    'Trophy poses',
    'Heroic flex portraits',
    'Confetti and fireworks',
    'Manufactured victory lighting',
  ],
  rule: 'NEVER PHOTOGRAPH THE PODIUM. PHOTOGRAPH WHAT BUILT IT.',
} as const

export const socialSequence = [
  { frame: '01', title: '5:12 AM', detail: 'Alarm. Dark. Keys.' },
  { frame: '02', title: 'ARRIVAL', detail: 'Maya at the facility gate.' },
  { frame: '03', title: 'REP 01', detail: 'First 200. Clock starts.' },
  { frame: '04', title: 'WORK', detail: 'Training footage — mid-session.' },
  { frame: '05', title: 'REP 327', detail: 'Strength block. Counted.' },
  { frame: '06', title: 'AFTER', detail: 'Exhausted. Alone. Still here.' },
  { frame: '07', title: 'BUILT THROUGH WORK.', detail: 'Close. Forge mark.' },
] as const
