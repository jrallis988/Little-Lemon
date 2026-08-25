export const brand = {
  name: 'PULSE SPORTS',
  line: 'FEEL EVERY SECOND.',
  short: 'PULSE',
} as const

export const caseNav = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'identity', label: 'Identity' },
  { id: 'principles', label: 'Principles' },
  { id: 'style-frames', label: 'Style Frames' },
  { id: 'logo-motion', label: 'Logo Motion' },
  { id: 'intro', label: 'Intro' },
  { id: 'typography', label: 'Typography' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'statistics', label: 'Statistics' },
  { id: 'score', label: 'Score' },
  { id: 'broadcast', label: 'Broadcast' },
  { id: 'social', label: 'Social' },
  { id: 'storyboard', label: 'Storyboard' },
  { id: 'production', label: 'Production' },
  { id: 'library', label: 'Library' },
  { id: 'system', label: 'System' },
] as const

export const motionPrinciples = [
  {
    id: 'speed',
    title: 'SPEED',
    summary: 'Entries land before the moment cools.',
    detail:
      'Primary graphics resolve in 0.25–0.45s. Logo bumps and score updates prefer 0.15–0.3s. Social opens can stretch to 0.6s when the still needs weight.',
  },
  {
    id: 'easing',
    title: 'EASING',
    summary: 'Accelerate into impact. Settle without bounce.',
    detail:
      'Use sharp ease-out for entrances. Ease-in only for exits. Avoid elastic and cartoon overshoot — sports media needs authority, not playfulness.',
  },
  {
    id: 'direction',
    title: 'DIRECTION',
    summary: 'Motion travels with the play.',
    detail:
      'Horizontal wipes follow field flow. Vertical crops punch emphasis. Diagonal accents are reserved for breaking moments and replay stings.',
  },
  {
    id: 'scale',
    title: 'SCALE',
    summary: 'Scale sells urgency — then gets out of the way.',
    detail:
      'Type may enter oversized and settle to readable size within 2–4 frames. Persistent UI (score bugs, lower thirds) never scales during live play.',
  },
  {
    id: 'transitions',
    title: 'TRANSITIONS',
    summary: 'Connect scenes. Never compete with footage.',
    detail:
      'Replay transitions stay under 1s. Graphic language (bars, frames, symbol) bridges cuts. The sport always remains the hero.',
  },
  {
    id: 'duration',
    title: 'DURATION',
    summary: 'Hold long enough to read. Leave before fatigue.',
    detail:
      'Lower thirds: 3–5s. Athlete cards: 3–5s. Stats callouts: 2–4s. Breaking packages may extend, but each beat still lands fast.',
  },
  {
    id: 'typography',
    title: 'TYPOGRAPHY',
    summary: 'Type is a graphic athlete — strong, clipped, timed.',
    detail:
      'Condensed display for impact words. Tabular numerals for scores and clocks. Never animate letter spacing into illegibility. Crop for energy; preserve word recognition.',
  },
] as const

export const styleFrames = [
  {
    id: 'sf-01',
    title: 'Network Open',
    caption: 'Athlete crop + time stamp + signal bar',
    tone: 'sprint',
  },
  {
    id: 'sf-02',
    title: 'Logo Resolve',
    caption: 'Symbol locks. Wordmark snaps. Tagline holds.',
    tone: 'logo',
  },
  {
    id: 'sf-03',
    title: 'Athlete Intro',
    caption: 'Name / number / position hierarchy',
    tone: 'marcus',
  },
  {
    id: 'sf-04',
    title: 'Live Score',
    caption: 'Restrained bug. Instant read.',
    tone: 'court',
  },
  {
    id: 'sf-05',
    title: 'Matchup Card',
    caption: 'Team A vs Team B — pregame stack',
    tone: 'soccer',
  },
  {
    id: 'sf-06',
    title: 'Breaking',
    caption: 'Headline sting without cable-news chrome',
    tone: 'crowd',
  },
  {
    id: 'sf-07',
    title: 'Social 9:16',
    caption: 'Vertical composition rebuilt for thumb-stop',
    tone: 'sprint',
  },
  {
    id: 'sf-08',
    title: 'End Card',
    caption: 'Brand hold. One action.',
    tone: 'logo',
  },
] as const

export const storyboardBeats = [
  { step: '01', title: 'CONCEPT', note: 'Feel every second — time as tension.' },
  { step: '02', title: 'STORYBOARD', note: 'Beat map for the 6s network intro.' },
  { step: '03', title: 'STYLE FRAMES', note: 'Static moments that already feel finished.' },
  { step: '04', title: 'ANIMATIC', note: 'Timing pass with temp audio hits.' },
  { step: '05', title: 'MOTION', note: 'AE build — keys, mattes, text animators.' },
  { step: '06', title: 'FINAL', note: 'Premiere assembly + export package.' },
] as const

export const assetLibrary = [
  { id: 'logo', label: 'Logo Animation', group: 'Brand' },
  { id: 'intro', label: 'Network Intro', group: 'Brand' },
  { id: 'outro', label: 'Outro / End Card', group: 'Brand' },
  { id: 'lower', label: 'Lower Thirds', group: 'Broadcast' },
  { id: 'athlete', label: 'Athlete Card', group: 'Broadcast' },
  { id: 'stats', label: 'Statistics', group: 'Broadcast' },
  { id: 'score', label: 'Score System', group: 'Broadcast' },
  { id: 'matchup', label: 'Matchup Package', group: 'Broadcast' },
  { id: 'replay', label: 'Replay Transitions', group: 'Edit' },
  { id: 'transition', label: 'Graphic Wipe', group: 'Edit' },
  { id: 'breaking', label: 'Breaking News', group: 'Editorial' },
  { id: 'social', label: 'Social Graphics', group: 'Social' },
  { id: 'endcard', label: 'Social End Card', group: 'Social' },
] as const

export const aeTechniques = [
  'Keyframes',
  'Graph Editor',
  'Custom Easing',
  'Masks',
  'Track Mattes',
  'Shape Layers',
  'Text Animators',
  'Pre-compositions',
  'Adjustment Layers',
  'Motion Blur',
  'Parenting',
  'Null Objects',
] as const

export const premiereUses = [
  'Footage editing',
  'Sequence timing',
  'Audio hits & beds',
  'Motion graphic integration',
  'Social / broadcast exports',
] as const
