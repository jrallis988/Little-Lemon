export const brand = {
  line: 'BUILT FOR THE SHIFT.',
  short: 'THE SHIFT',
} as const

export const caseNav = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'insight', label: 'Insight' },
  { id: 'idea', label: 'Idea' },
  { id: 'art', label: 'Art Direction' },
  { id: 'motion-lang', label: 'Motion' },
  { id: 'hero-film', label: 'Hero Film' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'performance', label: 'Performance' },
  { id: 'product', label: 'Product' },
  { id: 'athlete-product', label: 'Athlete × Product' },
  { id: 'social', label: 'Social' },
  { id: 'applications', label: 'Applications' },
  { id: 'storyboard', label: 'Storyboard' },
  { id: 'development', label: 'AE Process' },
  { id: 'templates', label: 'Templates' },
  { id: 'library', label: 'Library' },
  { id: 'system', label: 'System' },
] as const

export const motionModes = [
  {
    id: 'accelerate',
    title: 'ACCELERATE',
    summary: 'Forward drive. Compressed timing. Speed climbs.',
    detail: 'Increasing animation velocity, short ease-outs, forward wipe energy.',
  },
  {
    id: 'cut',
    title: 'CUT',
    summary: 'Abrupt direction change. Edge pressure.',
    detail: 'Hard directional shifts, sharp transitions, clipped type entries.',
  },
  {
    id: 'release',
    title: 'RELEASE',
    summary: 'Separation, expansion, trajectory.',
    detail: 'Elements leave the frame with path energy — stick flex to puck flight.',
  },
  {
    id: 'impact',
    title: 'IMPACT',
    summary: 'Compression, collision, overlap.',
    detail: 'Brief squash, layered hits, protective gear callouts.',
  },
  {
    id: 'control',
    title: 'CONTROL',
    summary: 'Deliberate tracking. Precision over flash.',
    detail: 'Slower follow, locked framing, edge-hold graphics.',
  },
  {
    id: 'reset',
    title: 'RESET',
    summary: 'Stillness before the next burst.',
    detail: 'Space, hold frames, quieter type — the bench breath between shifts.',
  },
] as const

export const heroBeats = [
  { t: '0–4s', title: 'ENTER', note: 'Quiet anticipation. Player steps onto ice.' },
  { t: '4–10s', title: 'ACCELERATE', note: 'Skate performance. Explosive first strides.' },
  { t: '10–15s', title: 'CUT', note: 'Edge control. Direction shifts mid-shift.' },
  { t: '15–20s', title: 'CONTACT', note: 'Protection. Collision answered by gear.' },
  { t: '20–26s', title: 'RELEASE', note: 'Stick / shot. Trajectory opens.' },
  { t: '26–30s', title: 'RESOLVE', note: 'Performance moment → BUILT FOR THE SHIFT.' },
] as const

export const cutdowns = [
  { id: '30', label: ':30 Master', note: 'Full shift rhythm' },
  { id: '15', label: ':15 Cutdown', note: 'Accelerate → Release → Line' },
  { id: '06', label: ':06 Cutdown', note: 'Impact sting + end card' },
  { id: '916', label: '9:16', note: 'Reels / TikTok / Shorts' },
  { id: '11', label: '1:1', note: 'Feed / paid' },
  { id: '45', label: '4:5', note: 'Instagram feed' },
  { id: '169', label: '16:9', note: 'YouTube / web / OLV' },
] as const

export const storyboardBeats = [
  { step: '01', title: 'CONCEPT', note: 'Every shift demands something different.' },
  { step: '02', title: 'STORYBOARD', note: 'Athlete → action → product beats.' },
  { step: '03', title: 'STYLE FRAMES', note: 'Still frames that already sell performance.' },
  { step: '04', title: 'ANIMATIC', note: 'Timing to shift rhythm + temp audio.' },
  { step: '05', title: 'MOTION', note: 'AE: keys, mattes, track, expressions.' },
  { step: '06', title: 'FINAL', note: 'Cutdowns, formats, delivery package.' },
] as const

export const aeTechniques = [
  'Keyframes',
  'Graph Editor',
  'Pre-compositions',
  'Masks / Track Mattes',
  'Motion Tracking',
  'Shape Layers',
  'Text Animators',
  'Expressions',
  'Null Parenting',
  'Motion Blur',
  'Adjustment Layers',
  'Template Structure',
] as const

export const templateFields = [
  { field: 'ATHLETE', note: 'Replaceable name / number / portrait' },
  { field: 'FOOTAGE', note: 'Drop-in plate or tracked clip' },
  { field: 'PRODUCT', note: 'Skate / stick / helmet / glove' },
  { field: 'STATISTIC', note: 'Editable performance value' },
  { field: 'COPY', note: 'Attribute + benefit lines' },
  { field: 'FORMAT', note: '16:9 · 9:16 · 1:1 · 4:5' },
] as const

export const assetLibrary = [
  { id: 'athlete-intro', label: 'Athlete Introduction', group: 'Story' },
  { id: 'product-reveal', label: 'Product Reveal', group: 'Product' },
  { id: 'perf-stat', label: 'Performance Statistic', group: 'Data' },
  { id: 'product-callout', label: 'Product Callout', group: 'Product' },
  { id: 'kinetic-type', label: 'Kinetic Typography', group: 'Type' },
  { id: 'transitions', label: 'Transitions', group: 'Edit' },
  { id: 'social-open', label: 'Social Opener', group: 'Social' },
  { id: 'social-close', label: 'Social Closer', group: 'Social' },
  { id: 'end-card', label: 'End Card', group: 'Brand' },
  { id: 'sting', label: 'Campaign Sting', group: 'Brand' },
] as const

export const applications = [
  { id: 'hero', title: 'Hero Film', note: ':30 master + cutdowns' },
  { id: 'social', title: 'Social Video', note: 'Organic + paid family' },
  { id: 'athlete', title: 'Athlete Content', note: 'Stories & posts' },
  { id: 'product', title: 'Product Video', note: 'Macro + tech callouts' },
  { id: 'paid', title: 'Paid Social', note: ':06 / :15 placements' },
  { id: 'web', title: 'Web', note: 'Landing / PDP modules' },
  { id: 'display', title: 'Digital Display', note: 'Responsive boards' },
  { id: 'retail', title: 'Retail Motion', note: 'In-store loops' },
  { id: 'arena', title: 'Event / Arena', note: 'Boards & stings' },
  { id: 'keyart', title: 'Static Key Art', note: 'From motion frames' },
] as const

export const socialFamily = [
  'Instagram Reels',
  'Instagram Stories',
  'TikTok',
  'YouTube Shorts',
  'Athlete Posts',
  'Product Posts',
  'Performance Moments',
  'Launch Teasers',
  'Paid Social',
] as const
