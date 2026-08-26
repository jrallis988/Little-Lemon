export type PosterId =
  | 'hockey'
  | 'basketball'
  | 'running'
  | 'soccer'
  | 'tennis'
  | 'snowboard'

export interface MotionBehavior {
  action: string
  physics: string
  composition: string
  typography: string
  photography: string
  graphics: string
}

export interface Poster {
  id: PosterId
  number: string
  sport: string
  concept: string
  athlete: string
  location: string
  event: string
  stat: string
  statLabel: string
  image: string
  accent: string
  explore: string[]
  composition: string
  hierarchyNote: string
  motion: MotionBehavior
  dataMarks: { label: string; value: string }[]
}

export const motionLanguage: MotionBehavior[] = [
  {
    action: 'RELEASE',
    physics: 'Separation, expansion, trajectory',
    composition: 'Diagonal thrust. Elements leave a clear origin and travel outward.',
    typography: 'Words sit behind or beside the release vector — never blocking the exit path.',
    photography: 'Follow-through and stick/limb extension. Ice spray and residual motion.',
    graphics: 'Trajectory lines, origin dots, velocity callouts.',
  },
  {
    action: 'RISE',
    physics: 'Vertical movement and upward force',
    composition: 'Tall stacks. Negative space above. Eye travels floor → rim.',
    typography: 'Vertical setting, ascending scale, type climbing with the athlete.',
    photography: 'Low angle, hang time, silhouette against sky or arena light.',
    graphics: 'Height measures, lane geometry, apex markers.',
  },
  {
    action: 'DRIVE',
    physics: 'Horizontal acceleration and repetition',
    composition: 'Wide lateral sweep. Cropped edges. Information stretches with speed.',
    typography: 'Bleeding words, condensed tracking, numeric type as pace markers.',
    photography: 'Side angle, lane lean, sequential stride, motion blur optional.',
    graphics: 'Lane lines, timing ticks, split clocks.',
  },
  {
    action: 'STRIKE',
    physics: 'Sharp interruption and contact force',
    composition: 'Aggressive crop at contact. Asymmetry. Sudden stop in the frame.',
    typography: 'Hard edges, clipped letterforms, type interrupted by the athlete.',
    photography: 'Extreme close on contact — boot, ball, ice, racket.',
    graphics: 'Impact brackets, force arcs, field geometry as structure.',
  },
  {
    action: 'AIR',
    physics: 'Suspension, openness, scale',
    composition: 'Vast negative space. Athlete small against environment. Quiet hierarchy.',
    typography: 'Sparse placement. One word can sit small until the drop is felt.',
    photography: 'Wide environmental plates. Height readable only through context.',
    graphics: 'Altitude marks, drop lines, horizon rules.',
  },
  {
    action: 'IMPACT',
    physics: 'Compression, collision, overlapping force',
    composition: 'Layers collide. Type and photo occupy the same plane. Tight crop.',
    typography: 'Overlapping stacks, compressed tracking, numbers jammed into contact.',
    photography: 'Racket-to-ball, body collision, flash freeze at the hit.',
    graphics: 'Collision brackets, angle readouts, court-line compression.',
  },
]

export const posters: Poster[] = [
  {
    id: 'hockey',
    number: '01',
    sport: 'Hockey',
    concept: 'RELEASE',
    athlete: 'Marcus Hale',
    location: 'Montreal',
    event: 'Northern Ice Series',
    stat: '97 MPH',
    statLabel: 'Shot Velocity',
    image: '/velocity/dist/posters/hockey.jpg',
    accent: '#7eb8c9',
    explore: ['Stick movement', 'Ice texture', 'Directional lines', 'Puck trajectory', 'Large typography'],
    composition:
      'RELEASE / STRIKE energy — diagonal expansion from the stick. Type separates from the athlete along the shot path.',
    hierarchyNote: 'Trajectory leads. Concept word exits the frame. Stat tags the puck path.',
    motion: motionLanguage[0],
    dataMarks: [
      { label: 'Velocity', value: '97 MPH' },
      { label: 'Release angle', value: '18°' },
      { label: 'Distance', value: '42 ft' },
    ],
  },
  {
    id: 'basketball',
    number: '02',
    sport: 'Basketball',
    concept: 'RISE',
    athlete: 'Jordan Vale',
    location: 'Chicago',
    event: 'Court Campaign 24',
    stat: '42"',
    statLabel: 'Vertical Leap',
    image: '/velocity/dist/posters/basketball.jpg',
    accent: '#e87722',
    explore: ['Vertical composition', 'Height', 'Player silhouette', 'Court geometry', 'Oversized typography'],
    composition:
      'RISE / AIR — extreme vertical. Athlete climbs letterforms. Measurement line reads actual leap height.',
    hierarchyNote: 'Upward hierarchy only. Number and concept share the sky plane.',
    motion: motionLanguage[1],
    dataMarks: [
      { label: 'Vertical', value: '42"' },
      { label: 'Apex', value: '11.2 ft' },
      { label: 'Hang', value: '0.84s' },
    ],
  },
  {
    id: 'running',
    number: '03',
    sport: 'Running',
    concept: 'DRIVE',
    athlete: 'Elena Park',
    location: 'Berlin',
    event: 'Track Authority',
    stat: '00:09.81',
    statLabel: '100m Split',
    image: '/velocity/dist/posters/running.jpg',
    accent: '#c8102e',
    explore: ['Horizontal movement', 'Motion', 'Track markings', 'Timing/numbers', 'Cropped typography'],
    composition:
      'DRIVE / acceleration — lateral stretch. Cropped DRIVE bleeds the frame. Timing marks pace the sprint.',
    hierarchyNote: 'Left-to-right force. Numeric type equals photography in weight.',
    motion: motionLanguage[2],
    dataMarks: [
      { label: 'Split', value: '00:09.81' },
      { label: 'Stride', value: '2.4m' },
      { label: 'Cadence', value: '214 spm' },
    ],
  },
  {
    id: 'soccer',
    number: '04',
    sport: 'Soccer',
    concept: 'STRIKE',
    athlete: 'Diego Navarro',
    location: 'Madrid',
    event: 'Field Series',
    stat: '118 km/h',
    statLabel: 'Strike Speed',
    image: '/velocity/dist/posters/soccer.jpg',
    accent: '#2f6b4f',
    explore: ['Ball trajectory', 'Player movement', 'Field geometry', 'Directional composition'],
    composition:
      'STRIKE — contact-centered interruption. Aggressive crop on boot-to-ball. Trajectory exits hard.',
    hierarchyNote: 'Contact owns the optical center. Type frames without covering the hit.',
    motion: motionLanguage[3],
    dataMarks: [
      { label: 'Strike', value: '118 km/h' },
      { label: 'Spin', value: '2400 rpm' },
      { label: 'Contact', value: '0.012s' },
    ],
  },
  {
    id: 'tennis',
    number: '05',
    sport: 'Tennis',
    concept: 'IMPACT',
    athlete: 'Sofia Ren',
    location: 'Melbourne',
    event: 'Hard Court Edit',
    stat: '127 MPH',
    statLabel: 'Serve Speed',
    image: '/velocity/dist/posters/tennis.jpg',
    accent: '#d4e157',
    explore: ['Ball position', 'Racket movement', 'Court lines', 'Controlled negative space'],
    composition:
      'IMPACT — compression and overlap. Type and athlete collide in one plane. Court lines tighten.',
    hierarchyNote: 'Layers stack at the hit. Quiet field, loud collision.',
    motion: motionLanguage[5],
    dataMarks: [
      { label: 'Serve', value: '127 MPH' },
      { label: 'Angle', value: '7.4°' },
      { label: 'RPM', value: '3100' },
    ],
  },
  {
    id: 'snowboard',
    number: '06',
    sport: 'Snowboarding',
    concept: 'AIR',
    athlete: 'Kai Morrow',
    location: 'Aspen',
    event: 'Alpine Descent',
    stat: '28 ft',
    statLabel: 'Air Height',
    image: '/velocity/dist/posters/snowboard.jpg',
    accent: '#9bb5c8',
    explore: ['Scale', 'Environment', 'Negative space', 'Height', 'Dramatic photography'],
    composition:
      'AIR — suspension and openness. Athlete small in vast environment. Hierarchy almost disappears into scale.',
    hierarchyNote: 'Environment is the stage. AIR stays quiet until the drop registers.',
    motion: motionLanguage[4],
    dataMarks: [
      { label: 'Air', value: '28 ft' },
      { label: 'Drop', value: '3.2s' },
      { label: 'Grade', value: '38°' },
    ],
  },
]

export const moments = [
  'The release.',
  'The jump.',
  'The turn.',
  'The impact.',
  'The sprint.',
  'The finish.',
]

export const craftSkills = [
  'Photoshop compositing',
  'Illustrator graphics',
  'Typography',
  'Photography',
  'Art direction',
  'Image treatment',
  'Layout',
  'Visual hierarchy',
  'Color',
  'Texture',
  'Sports design',
  'Poster design',
  'Campaign consistency',
  'Print production',
  'Digital adaptation',
  'Motion design',
]

export const imperfectionToolkit = [
  { title: 'Motion blur', note: 'Selective — only where speed must be felt' },
  { title: 'Film grain', note: 'Print cohesion across the campaign' },
  { title: 'Flash freeze', note: 'Hard light at contact moments' },
  { title: 'Halftone', note: 'Editorial intensity, never wallpaper' },
  { title: 'Scan artifacts', note: 'Registration drift, edge dust' },
  { title: 'Coaching marks', note: 'Hand diagrams, tape, chalk' },
  { title: 'Scoreboard data', note: 'Raw LED numerals as graphics' },
  { title: 'Hard crops', note: 'Type and limbs intentionally cut' },
]

export const photoApproaches = [
  { title: 'Extreme crop', note: 'Hands, ice spray, chalk, tape' },
  { title: 'Sequential', note: 'Stride phases across a strip' },
  { title: 'Multiple exposure', note: 'Movement as layered stills' },
  { title: 'Silhouette', note: 'Body mechanics over portrait' },
  { title: 'Environment', note: 'Empty courts, arenas, alpine scale' },
  { title: 'Equipment', note: 'Cleat, stick, racket, board detail' },
  { title: 'Documentary', note: 'Locker room, prep, exhaustion' },
  { title: 'Directed flash', note: 'Campaign stills with hard light' },
]

export const humanEnergy = [
  { title: 'Preparation', note: 'Tape, chalk, focus before the open' },
  { title: 'Concentration', note: 'Eyes locked — the quiet before force' },
  { title: 'Contact grit', note: 'Sweat, ice spray, floor burn' },
  { title: 'Celebration', note: 'Rare — earned, never staged soft' },
  { title: 'Exhaustion', note: 'Post-split honesty' },
  { title: 'Empty venue', note: 'The arena waiting' },
]
