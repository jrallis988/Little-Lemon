/** AMPLIFY campaign content — replace photo paths with final Photoshop/Illustrator exports */

export const brand = {
  name: 'AMPLIFY',
  year: '2026',
  campaign: 'TURN IT UP.',
  dates: 'Aug 14–16, 2026',
  location: 'Riverside Grounds · Portland, OR',
  handle: '@amplifyfest',
  ticketUrl: 'amplifyfest.com/tickets',
} as const

export const palette = [
  { name: 'Ink', hex: '#111111', role: 'Primary field, type' },
  { name: 'Paper', hex: '#EAE8E3', role: 'Surfaces, editorial ground' },
  { name: 'Signal', hex: '#FF3B1F', role: 'Campaign accent, CTAs' },
  { name: 'Volt', hex: '#D4FF00', role: 'Energy mark, highlights' },
  { name: 'Steel', hex: '#2C2C2C', role: 'Secondary panels' },
  { name: 'Mute', hex: '#7A7770', role: 'Meta, captions' },
] as const

export const typography = [
  {
    name: 'Bebas Neue',
    role: 'Display / wordmark',
    sample: 'AMPLIFY',
    usage: 'Festival name, campaign lines, oversized headlines',
  },
  {
    name: 'Instrument Serif',
    role: 'Editorial accent',
    sample: 'Turn it up.',
    usage: 'Pull quotes, moment captions, story sublines',
  },
  {
    name: 'IBM Plex Sans',
    role: 'UI / body',
    sample: 'Three days. One volume.',
    usage: 'Case study body, info carousels, captions',
  },
  {
    name: 'IBM Plex Mono',
    role: 'Meta / system',
    sample: 'FRI · MAIN STAGE',
    usage: 'Dates, stages, safe-area labels, data',
  },
] as const

export type FeedVariant =
  | 'announcement'
  | 'campaign'
  | 'artist'
  | 'headliner'
  | 'lineup'
  | 'tickets'
  | 'info'
  | 'countdown'
  | 'finale'

export interface FeedPost {
  id: string
  variant: FeedVariant
  title: string
  subtitle?: string
  meta?: string
  cta?: string
  tone: 'ink' | 'paper' | 'signal' | 'volt' | 'steel'
  photoSlot?: string
}

export const feedPosts: FeedPost[] = [
  {
    id: 'feed-01',
    variant: 'announcement',
    title: 'AMPLIFY',
    subtitle: '2026',
    meta: 'THREE DAYS · ONE VOLUME',
    tone: 'ink',
    photoSlot: 'crowd-wide',
  },
  {
    id: 'feed-02',
    variant: 'campaign',
    title: 'TURN IT UP.',
    subtitle: 'The campaign',
    meta: 'AUG 14–16',
    tone: 'signal',
  },
  {
    id: 'feed-03',
    variant: 'artist',
    title: 'NOVA REED',
    subtitle: 'Featured',
    meta: 'SAT · NORTH STAGE',
    tone: 'paper',
    photoSlot: 'artist-nova',
    cta: 'Save the set',
  },
  {
    id: 'feed-04',
    variant: 'headliner',
    title: 'ECHO PARK',
    subtitle: 'Headliner',
    meta: 'SAT · MAIN STAGE · 10:40P',
    tone: 'ink',
    photoSlot: 'artist-echo',
    cta: 'Get tickets',
  },
  {
    id: 'feed-05',
    variant: 'lineup',
    title: 'THE LINEUP',
    subtitle: '60+ artists',
    meta: 'FULL WEEKEND',
    tone: 'volt',
  },
  {
    id: 'feed-06',
    variant: 'tickets',
    title: 'TICKETS',
    subtitle: 'On sale now',
    meta: 'GA · VIP · WEEKEND',
    tone: 'paper',
    cta: 'amplifyfest.com',
  },
  {
    id: 'feed-07',
    variant: 'info',
    title: 'KNOW BEFORE YOU GO',
    subtitle: 'Map · Stages · Transit',
    meta: 'FESTIVAL GUIDE',
    tone: 'steel',
  },
  {
    id: 'feed-08',
    variant: 'countdown',
    title: '14 DAYS',
    subtitle: 'Until doors',
    meta: 'COUNTDOWN',
    tone: 'ink',
  },
  {
    id: 'feed-09',
    variant: 'finale',
    title: 'THIS WEEKEND',
    subtitle: 'TURN IT UP.',
    meta: 'AUG 14–16 · PORTLAND',
    tone: 'signal',
    cta: 'See you there',
  },
]

export type ArtistTier = 'headliner' | 'featured' | 'emerging'

export interface Artist {
  id: string
  name: string
  tier: ArtistTier
  day: 'Friday' | 'Saturday' | 'Sunday'
  stage: string
  time: string
  photoSlot: string
  genre: string
}

export const artists: Artist[] = [
  {
    id: 'echo-park',
    name: 'ECHO PARK',
    tier: 'headliner',
    day: 'Saturday',
    stage: 'Main Stage',
    time: '10:40 PM',
    photoSlot: 'artist-echo',
    genre: 'Alt / Rock',
  },
  {
    id: 'luna-static',
    name: 'LUNA STATIC',
    tier: 'headliner',
    day: 'Friday',
    stage: 'Main Stage',
    time: '10:20 PM',
    photoSlot: 'artist-luna',
    genre: 'Electronic / Pop',
  },
  {
    id: 'the-kilns',
    name: 'THE KILNS',
    tier: 'headliner',
    day: 'Sunday',
    stage: 'Main Stage',
    time: '9:50 PM',
    photoSlot: 'artist-kilns',
    genre: 'Indie',
  },
  {
    id: 'nova-reed',
    name: 'NOVA REED',
    tier: 'featured',
    day: 'Saturday',
    stage: 'North Stage',
    time: '7:15 PM',
    photoSlot: 'artist-nova',
    genre: 'Indie Pop',
  },
  {
    id: 'glass-room',
    name: 'GLASS ROOM',
    tier: 'featured',
    day: 'Friday',
    stage: 'River Stage',
    time: '6:40 PM',
    photoSlot: 'artist-glass',
    genre: 'Alt',
  },
  {
    id: 'marlowe',
    name: 'MARLOWE',
    tier: 'featured',
    day: 'Sunday',
    stage: 'North Stage',
    time: '5:30 PM',
    photoSlot: 'artist-marlowe',
    genre: 'Soul / Pop',
  },
  {
    id: 'byte-season',
    name: 'BYTE SEASON',
    tier: 'emerging',
    day: 'Friday',
    stage: 'Signal Tent',
    time: '3:10 PM',
    photoSlot: 'artist-byte',
    genre: 'Electronic',
  },
  {
    id: 'soft-alarm',
    name: 'SOFT ALARM',
    tier: 'emerging',
    day: 'Saturday',
    stage: 'Signal Tent',
    time: '2:45 PM',
    photoSlot: 'artist-soft',
    genre: 'Dream Pop',
  },
  {
    id: 'red-voltage',
    name: 'RED VOLTAGE',
    tier: 'emerging',
    day: 'Sunday',
    stage: 'River Stage',
    time: '1:20 PM',
    photoSlot: 'artist-red',
    genre: 'Punk / Alt',
  },
]

export interface CarouselSlide {
  id: string
  kicker?: string
  title: string
  body?: string
  list?: string[]
  footer?: string
  tone: 'ink' | 'paper' | 'signal' | 'volt' | 'steel'
  layout?: 'hero' | 'list' | 'split' | 'cta' | 'map' | 'grid'
}

export const lineupCarousel: CarouselSlide[] = [
  {
    id: 'lc-1',
    kicker: 'AMPLIFY 2026',
    title: 'THE LINEUP',
    body: 'Swipe for three days of volume.',
    footer: '1 / 8',
    tone: 'ink',
    layout: 'hero',
  },
  {
    id: 'lc-2',
    kicker: 'Friday',
    title: 'OPENING VOLUME',
    list: ['Luna Static', 'Glass Room', 'Byte Season', 'Velvet Wire', 'KNURL'],
    footer: 'Main · River · Signal',
    tone: 'paper',
    layout: 'list',
  },
  {
    id: 'lc-3',
    kicker: 'Saturday',
    title: 'PEAK HOURS',
    list: ['Echo Park', 'Nova Reed', 'Soft Alarm', 'Halo Static', 'PARALLAX'],
    footer: 'Main · North · Signal',
    tone: 'signal',
    layout: 'list',
  },
  {
    id: 'lc-4',
    kicker: 'Sunday',
    title: 'LAST CALL',
    list: ['The Kilns', 'Marlowe', 'Red Voltage', 'Field Notes', 'SLOW BURN'],
    footer: 'Main · North · River',
    tone: 'volt',
    layout: 'list',
  },
  {
    id: 'lc-5',
    kicker: 'Artists to watch',
    title: 'EARLY SIGNALS',
    list: ['Soft Alarm', 'Byte Season', 'Red Voltage', 'KNURL'],
    body: 'Emerging sets worth camping early for.',
    tone: 'steel',
    layout: 'split',
  },
  {
    id: 'lc-6',
    kicker: 'Experiences',
    title: 'MORE THAN SETS',
    list: ['Listening Lounge', 'Record Fair', 'Night Market', 'Film Capsule'],
    tone: 'paper',
    layout: 'grid',
  },
  {
    id: 'lc-7',
    kicker: 'Tickets',
    title: 'PICK YOUR PASS',
    list: ['GA Weekend — $189', 'VIP Weekend — $349', 'Single Day — $79'],
    footer: 'Payment plans available',
    tone: 'ink',
    layout: 'list',
  },
  {
    id: 'lc-8',
    kicker: 'AMPLIFY',
    title: 'TURN IT UP.',
    body: 'Aug 14–16 · Portland, OR',
    footer: 'amplifyfest.com/tickets',
    tone: 'signal',
    layout: 'cta',
  },
]

export const infoCarousel: CarouselSlide[] = [
  {
    id: 'ic-1',
    kicker: 'Festival Guide',
    title: 'EVERYTHING YOU NEED',
    body: 'Clear info. Less stress. More volume.',
    footer: '1 / 8',
    tone: 'paper',
    layout: 'hero',
  },
  {
    id: 'ic-2',
    kicker: 'When + Where',
    title: 'RIVERSIDE GROUNDS',
    list: ['Aug 14–16, 2026', 'Gates 12:00 PM daily', 'Portland, OR 97214'],
    tone: 'ink',
    layout: 'list',
  },
  {
    id: 'ic-3',
    kicker: 'Festival Map',
    title: 'FIND YOUR STAGE',
    body: 'Main · North · River · Signal Tent · Market Row',
    footer: '[Map artwork placeholder]',
    tone: 'steel',
    layout: 'map',
  },
  {
    id: 'ic-4',
    kicker: 'Stages',
    title: 'FOUR STAGES',
    list: ['Main Stage — headlines', 'North Stage — featured', 'River Stage — daytime', 'Signal Tent — emerging'],
    tone: 'volt',
    layout: 'list',
  },
  {
    id: 'ic-5',
    kicker: 'Food + Drink',
    title: 'EAT BETWEEN SETS',
    list: ['Local vendors', 'Vegetarian + vegan', 'Non-alcoholic bar', 'Water refill stations'],
    tone: 'paper',
    layout: 'list',
  },
  {
    id: 'ic-6',
    kicker: 'What to Bring',
    title: 'PACK SMART',
    list: ['Valid ID', 'Refillable bottle', 'Ear protection', 'Small bag (12×6×12)'],
    body: 'No glass. No drones. No outside alcohol.',
    tone: 'ink',
    layout: 'split',
  },
  {
    id: 'ic-7',
    kicker: 'Transportation',
    title: 'GET THERE',
    list: ['MAX Orange Line + shuttle', 'Bike valet at Gate B', 'Rideshare zone on SE Water', 'Limited on-site parking'],
    tone: 'steel',
    layout: 'list',
  },
  {
    id: 'ic-8',
    kicker: 'Important',
    title: 'STAY IN THE KNOW',
    list: ['Age policy: 18+', 'Accessibility desk at Gate A', 'Medical tents marked on map', 'Weather: outdoor venue'],
    footer: 'Full guide → amplifyfest.com/info',
    tone: 'signal',
    layout: 'cta',
  },
]

export interface StoryConcept {
  id: string
  title: string
  kicker: string
  body?: string
  cta?: string
  interactive?: string
  tone: 'ink' | 'paper' | 'signal' | 'volt' | 'steel'
  photoSlot?: string
}

export const stories: StoryConcept[] = [
  {
    id: 'st-1',
    title: 'Festival teaser',
    kicker: 'SOMETHING LOUD',
    body: 'Is coming.',
    tone: 'ink',
    photoSlot: 'crowd-night',
  },
  {
    id: 'st-2',
    title: 'Lineup countdown',
    kicker: 'LINEUP IN',
    body: '48:00:00',
    cta: 'Set a reminder',
    tone: 'volt',
  },
  {
    id: 'st-3',
    title: 'Lineup reveal',
    kicker: 'IT’S HERE',
    body: 'THE LINEUP',
    cta: 'Swipe up / link',
    tone: 'signal',
  },
  {
    id: 'st-4',
    title: 'Artist spotlight',
    kicker: 'SPOTLIGHT',
    body: 'NOVA REED',
    tone: 'paper',
    photoSlot: 'artist-nova',
    cta: 'Sat · North Stage',
  },
  {
    id: 'st-5',
    title: 'Ticket reminder',
    kicker: 'TICKETS',
    body: 'Weekend passes moving fast.',
    cta: 'Get yours',
    tone: 'ink',
  },
  {
    id: 'st-6',
    title: 'Poll / question',
    kicker: 'YOUR MOVE',
    body: 'Which day are you claiming?',
    interactive: 'Poll sticker zone',
    tone: 'steel',
  },
  {
    id: 'st-7',
    title: 'Festival countdown',
    kicker: 'DOORS IN',
    body: '7 DAYS',
    tone: 'volt',
  },
  {
    id: 'st-8',
    title: 'Event-day',
    kicker: 'TODAY',
    body: 'TURN IT UP.',
    cta: 'Gates at noon',
    tone: 'signal',
  },
]

export interface EngagementPiece {
  id: string
  format: string
  prompt: string
  why: string
  tone: 'ink' | 'paper' | 'signal' | 'volt' | 'steel'
}

export const engagement: EngagementPiece[] = [
  {
    id: 'eng-1',
    format: 'Poll',
    prompt: 'Main Stage or Signal Tent first?',
    why: 'Low-friction choice that reveals crowd preferences and seeds Story replies.',
    tone: 'volt',
  },
  {
    id: 'eng-2',
    format: 'Question',
    prompt: 'What song do you need live this year?',
    why: 'Open sticker answers create comment-ready UGC and playlist intel.',
    tone: 'paper',
  },
  {
    id: 'eng-3',
    format: 'Artist vs Artist',
    prompt: 'Echo Park or Luna Static — Saturday closer energy?',
    why: 'Friendly rivalry drives shares between fan communities.',
    tone: 'signal',
  },
  {
    id: 'eng-4',
    format: 'Favorite song',
    prompt: 'Drop your AMPLIFY anthem in the comments.',
    why: 'Comment threads boost reach and surface fan language for captions.',
    tone: 'ink',
  },
  {
    id: 'eng-5',
    format: 'Anticipation',
    prompt: 'First thing you’ll do when gates open?',
    why: 'Builds pre-event ritual and emotional ownership of the weekend.',
    tone: 'steel',
  },
  {
    id: 'eng-6',
    format: 'UGC prompt',
    prompt: 'Tag @amplifyfest with #TurnItUp for a chance at VIP upgrades.',
    why: 'Extends the campaign into the audience’s own cameras.',
    tone: 'signal',
  },
  {
    id: 'eng-7',
    format: 'Countdown',
    prompt: '14 days. What’s still on your must-see list?',
    why: 'Pairs urgency with discovery — converts lurkers into planners.',
    tone: 'volt',
  },
  {
    id: 'eng-8',
    format: 'Post-event',
    prompt: 'Send us your loudest frame from the weekend.',
    why: 'Closes the loop, fuels recap Reels, and rewards participation.',
    tone: 'paper',
  },
]

export interface CalendarWeek {
  week: string
  focus: string
  intent: string
  items: { day: string; type: string; title: string }[]
}

export const calendar: CalendarWeek[] = [
  {
    week: 'Week 1',
    focus: 'Awareness',
    intent: 'Establish AMPLIFY and the TURN IT UP. line before names drop.',
    items: [
      { day: 'Mon', type: 'Reel', title: '15s campaign hook' },
      { day: 'Tue', type: 'Story', title: 'Teaser + reminder sticker' },
      { day: 'Wed', type: 'Feed', title: 'Festival announcement' },
      { day: 'Fri', type: 'Carousel', title: 'What is AMPLIFY?' },
      { day: 'Sat', type: 'Story', title: 'Mood board / texture dump' },
    ],
  },
  {
    week: 'Week 2',
    focus: 'Artist Discovery',
    intent: 'Introduce hierarchy — headliners, featured, emerging — without flattening energy.',
    items: [
      { day: 'Mon', type: 'Feed', title: 'Headliner: Echo Park' },
      { day: 'Tue', type: 'Story', title: 'Artist spotlight + poll' },
      { day: 'Wed', type: 'Reel', title: 'Rapid artist cuts' },
      { day: 'Thu', type: 'Feed', title: 'Featured: Nova Reed' },
      { day: 'Sat', type: 'Carousel', title: 'Full lineup reveal' },
    ],
  },
  {
    week: 'Week 3',
    focus: 'Festival Education',
    intent: 'Reduce friction — map, transit, packing — so tickets feel actionable.',
    items: [
      { day: 'Mon', type: 'Carousel', title: 'Festival guide' },
      { day: 'Wed', type: 'Feed', title: 'Know before you go' },
      { day: 'Thu', type: 'Story', title: 'Q&A sticker' },
      { day: 'Fri', type: 'Reel', title: 'Motion type: LOUD/LIVE' },
      { day: 'Sun', type: 'Story', title: 'UGC prompt' },
    ],
  },
  {
    week: 'Week 4',
    focus: 'Conversion + Countdown',
    intent: 'Convert attention into tickets and on-site anticipation.',
    items: [
      { day: 'Mon', type: 'Feed', title: 'Ticket announcement' },
      { day: 'Tue', type: 'Story', title: 'Ticket reminder' },
      { day: 'Wed', type: 'Feed', title: 'Countdown graphic' },
      { day: 'Fri', type: 'Reel', title: 'Final CTA reel' },
      { day: 'Sat', type: 'Feed', title: 'This weekend / finale' },
    ],
  },
]

export const performanceMetrics = [
  { label: 'Reach', value: '182K', note: 'Simulated' },
  { label: 'Engagement rate', value: '6.4%', note: 'Simulated' },
  { label: 'Shares', value: '4.1K', note: 'Simulated' },
  { label: 'Saves', value: '9.8K', note: 'Simulated' },
  { label: 'Reel avg. watch', value: '9.2s', note: 'Simulated' },
  { label: 'Carousel completion', value: '61%', note: 'Simulated' },
  { label: 'Profile visits', value: '27K', note: 'Simulated' },
  { label: 'Ticket-link clicks', value: '6.3K', note: 'Simulated' },
] as const

export const assetLibrary = [
  { id: 'logo', label: 'Festival logo', kind: 'wordmark', note: 'Replace: Illustrator /logo.ai' },
  { id: 'campaign', label: 'Campaign wordmark', kind: 'turnitup', note: 'Replace: TURN IT UP. lockup' },
  { id: 'type', label: 'Typography', kind: 'type', note: 'Bebas · Instrument · Plex' },
  { id: 'color', label: 'Color system', kind: 'color', note: 'Ink · Paper · Signal · Volt' },
  { id: 'photo', label: 'Artist photography', kind: 'photo', note: 'Replace: /public/assets/photography' },
  { id: 'devices', label: 'Graphic devices', kind: 'devices', note: 'Bars · frames · crop masks' },
  { id: 'texture', label: 'Textures', kind: 'texture', note: 'Paper grain · halftone · hatch' },
  { id: 'templates', label: 'Templates', kind: 'template', note: 'Figma social frames' },
  { id: 'motion', label: 'Motion assets', kind: 'motion', note: 'AE comps · Lottie exports' },
  { id: 'cta', label: 'CTA treatments', kind: 'cta', note: 'Ticket · Save · Reminder' },
] as const
