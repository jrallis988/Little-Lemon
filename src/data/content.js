export const characters = [
  { id: 'spongebob', name: 'SpongeBob', color: '#ffe566', emoji: '🧽' },
  { id: 'jimmy', name: 'Jimmy Neutron', color: '#7ec8ff', emoji: '🧠' },
  { id: 'timmy', name: 'Fairly OddParents', color: '#ff9ad5', emoji: '⭐' },
  { id: 'arnold', name: 'Hey Arnold!', color: '#ffb347', emoji: '🏈' },
  { id: 'tommy', name: 'Rugrats', color: '#b4f06a', emoji: '👶' },
  { id: 'catscratch', name: 'Catscratch', color: '#c4a1ff', emoji: '🐱' },
  { id: 'avatar', name: 'Avatar', color: '#5ad0ff', emoji: '🌀' },
  { id: 'drake', name: 'Drake & Josh', color: '#ff7a59', emoji: '🎥' },
  { id: 'icarly', name: 'iCarly', color: '#ff5ea8', emoji: '📱' },
  { id: 'danny', name: 'Danny Phantom', color: '#7bffb2', emoji: '👻' },
  { id: 'invader', name: 'Invader Zim', color: '#9dff4a', emoji: '👽' },
  { id: 'loud', name: 'The Loud House', color: '#ff8a3d', emoji: '🏠' },
]

export const topTabs = [
  { to: '/', label: 'Home', tone: 'home', end: true },
  { to: '/games', label: 'Games', tone: 'games' },
  { to: '/shows', label: 'Shows', tone: 'shows' },
  { to: '/video', label: 'Video', tone: 'video' },
  { to: '/fan', label: 'Your World', tone: 'world' },
  { to: '/more', label: 'More', tone: 'more' },
]

export const sideLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/games', label: 'Games' },
  { to: '/video', label: 'Video' },
  { to: '/shows', label: 'Shows' },
  { to: '/nick-jr', label: 'Nick Jr.' },
  { to: '/nick-news', label: 'Nick News' },
  { to: '/fan', label: 'Fan' },
  { to: '/more', label: 'Shop' },
]

export const games = [
  {
    id: 'slime-dash',
    title: 'Slime Dash',
    show: 'Nick Classic',
    blurb: 'Bounce through goo and rack up splat points.',
    accent: '#7CFF4A',
  },
  {
    id: 'orbit-lap',
    title: 'Bikini Bottom Dash',
    show: 'SpongeBob',
    blurb: 'Race jellyfish before Squidward wakes up.',
    accent: '#FFE566',
  },
  {
    id: 'fun-house',
    title: "Jimmy's Fun House",
    show: 'Jimmy Neutron',
    blurb: 'Hack gadgets and dodge giant bugs.',
    accent: '#7EC8FF',
  },
  {
    id: 'catapult',
    title: 'Cat-a-pult',
    show: 'Catscratch',
    blurb: 'Launch Waffle across the backyard.',
    accent: '#C4A1FF',
  },
  {
    id: 'avatar-bender',
    title: 'Element Trainer',
    show: 'Avatar',
    blurb: 'Master water, earth, fire, and air drills.',
    accent: '#5AD0FF',
  },
  {
    id: 'loud-labyrinth',
    title: 'Loud House Labyrinth',
    show: 'The Loud House',
    blurb: 'Find Lincoln before the sisters do.',
    accent: '#FF8A3D',
  },
]

export const shows = [
  {
    id: 'spongebob',
    title: 'SpongeBob SquarePants',
    tag: 'Nicktoon',
    blurb: 'Best day ever in Bikini Bottom.',
    tone: 'linear-gradient(135deg, #ffe566, #00a8e8)',
  },
  {
    id: 'jimmy',
    title: 'The Adventures of Jimmy Neutron',
    tag: 'Nicktoon',
    blurb: 'Boy genius. Big inventions. Bigger messes.',
    tone: 'linear-gradient(135deg, #7ec8ff, #ff7a59)',
  },
  {
    id: 'catscratch',
    title: 'Catscratch',
    tag: 'Nicktoon',
    blurb: 'Three cats. One mansion. Zero chill.',
    tone: 'linear-gradient(135deg, #c4a1ff, #7cff4a)',
  },
  {
    id: 'avatar',
    title: 'Avatar: The Last Airbender',
    tag: 'Action',
    blurb: 'Four nations. One destiny.',
    tone: 'linear-gradient(135deg, #5ad0ff, #1a4d2e)',
  },
  {
    id: 'drake',
    title: 'Drake & Josh',
    tag: 'Live action',
    blurb: 'Stepbrothers. Mega schemes.',
    tone: 'linear-gradient(135deg, #ff7a59, #7ec8ff)',
  },
  {
    id: 'unfabulous',
    title: 'Unfabulous',
    tag: 'Live action',
    blurb: 'Middle school, songs, and survival.',
    tone: 'linear-gradient(135deg, #ff9ad5, #7b5cff)',
  },
  {
    id: 'icarly',
    title: 'iCarly',
    tag: 'Live action',
    blurb: 'Web show chaos from the loft.',
    tone: 'linear-gradient(135deg, #ff5ea8, #ffe566)',
  },
  {
    id: 'hey-arnold',
    title: 'Hey Arnold!',
    tag: 'Classic',
    blurb: 'City kids with football-head heart.',
    tone: 'linear-gradient(135deg, #ffb347, #6ec6ff)',
  },
]

export const nickJrShows = [
  {
    id: 'paw-patrol',
    title: 'PAW Patrol',
    blurb: 'Pups save Adventure Bay before snack time.',
  },
  {
    id: 'bluey',
    title: 'Blue’s Clues & You',
    blurb: 'Think along, point along, play along.',
  },
  {
    id: 'bubble-guppies',
    title: 'Bubble Guppies',
    blurb: 'Underwater preschool with a dance break.',
  },
  {
    id: 'dora',
    title: 'Dora the Explorer',
    blurb: 'Maps, backpacks, and bilingual adventures.',
  },
]

export const nickNewsStories = [
  {
    id: 'kids-vote',
    title: 'Kids Vote Town Hall',
    kicker: 'Live',
    blurb: 'Young reporters ask the questions grown-ups skip.',
  },
  {
    id: 'slime-science',
    title: 'Why slime feels cold',
    kicker: 'Explainers',
    blurb: 'A gooey science story told for curious kids.',
  },
  {
    id: 'earth-day',
    title: 'Nick News Daily: Earth hour',
    kicker: 'Today',
    blurb: 'What kids can actually do this weekend.',
  },
  {
    id: 'sports-desk',
    title: 'Kids Choice sports desk',
    kicker: 'Sports',
    blurb: 'Scores, underdogs, and slime-worthy plays.',
  },
]

export const weekenderEvents = [
  {
    id: 'slime-saturday',
    title: 'Slime Saturday',
    when: 'This Saturday · 10a–4p',
    blurb: 'Games, premieres, and a live slime drop.',
  },
  {
    id: 'toon-marathon',
    title: 'Nicktoon Marathon',
    when: 'Sunday block',
    blurb: 'Back-to-back classics with new bumpers.',
  },
  {
    id: 'family-night',
    title: 'Family Premiere Night',
    when: 'Friday 7p',
    blurb: 'One new episode, then a vote-for-next poll.',
  },
  {
    id: 'arcade-takeover',
    title: 'Arcade Takeover',
    when: 'All weekend',
    blurb: 'Bonus rooms unlocked for Weekender codes.',
  },
]

export const orbitzTrips = [
  {
    id: 'galaxy-resort',
    title: 'Orbitz Galaxy Resort',
    blurb: 'Family suites, cosmic pools, and kid-rate nights.',
  },
  {
    id: 'partner-parks',
    title: 'Partner park weekends',
    blurb: 'Theme-park bundles with Nick character hours.',
  },
  {
    id: 'cruise-lane',
    title: 'Family cruise lane',
    blurb: 'Sea days, slime labs, and no-boring-meeting decks.',
  },
  {
    id: 'staycation',
    title: 'Orbit Racers staycation kit',
    blurb: 'At-home race nights with printable track maps.',
  },
]

export const videos = [
  { id: 'v1', title: 'SpongeBob: Band Geeks clip', length: '2:14' },
  { id: 'v2', title: 'Drake & Josh: Megan prank reel', length: '1:48' },
  { id: 'v3', title: 'Avatar: Appa flies!', length: '1:22' },
  { id: 'v4', title: 'Catscratch: Play Now trailer', length: '0:45' },
]

export const poll = {
  question: 'Best ice cream flavor for a slime float?',
  options: ['Vanilla', 'Chocolate', 'Slime Swirl', 'Orange Soda Scoop'],
}

export const latelyRows = [
  {
    id: 'games',
    label: 'Games',
    tone: 'games',
    to: '/games',
    items: ['Bikini Bottom Dash', "Jimmy's Fun House", 'Cat-a-pult'],
  },
  {
    id: 'news',
    label: 'Nick News',
    tone: 'news',
    to: '/nick-news',
    items: ['Kids Vote Town Hall', 'Nick News Daily'],
  },
  {
    id: 'weblab',
    label: 'Web Lab',
    tone: 'video',
    to: '/video',
    items: ['Build-a-Splat', 'Sticker Lab', 'Messy Mixer'],
  },
  {
    id: 'world',
    label: 'Your World',
    tone: 'world',
    to: '/fan',
    items: ['Fan Art Wall', 'Daily Poll', 'See My Nick'],
  },
]

export const shopBits = [
  { id: 's1', title: 'Slime Kit', blurb: 'Green goo, officially unofficial.' },
  { id: 's2', title: 'Nick Magazine', blurb: 'Posters, comics, and codes.' },
  { id: 's3', title: 'Pay-to-Play Tokens', blurb: 'Unlock premium arcade rooms.' },
]

export const footerColumns = [
  {
    title: 'Corporate',
    links: [
      { to: '/about', label: 'About Nickelodeon' },
      { to: '/press', label: 'Press' },
      { to: '/jobs', label: 'Jobs' },
      { to: '/investors', label: 'Investor Relations' },
    ],
  },
  {
    title: 'Support & Policies',
    links: [
      { to: '/terms', label: 'Terms of Use' },
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/parents', label: 'Parent Guidelines' },
      { to: '/help', label: 'Help Center' },
    ],
  },
  {
    title: 'Brands & Partners',
    links: [
      { to: '/nick-jr', label: 'Nick Jr.' },
      { to: '/paramount', label: 'Paramount' },
      { to: '/weekenders', label: 'Nick Weekenders' },
      { to: '/global', label: 'Global Sites' },
    ],
  },
]

export const infoPages = {
  about: {
    title: 'About Nickelodeon',
    eyebrow: 'Corporate',
    body: 'Kids first — on TV and on the web. This unofficial redesign treats Nickelodeon as a playground, not a beige streaming shelf.',
  },
  press: {
    title: 'Press',
    eyebrow: 'Corporate',
    body: 'Media notes, stills, and slime-drop schedules for editors who still remember how to have fun.',
  },
  jobs: {
    title: 'Jobs',
    eyebrow: 'Corporate',
    body: 'Come make messes on purpose: design, games, news for kids, and family travel stories.',
  },
  investors: {
    title: 'Investor Relations',
    eyebrow: 'Corporate',
    body: 'Placeholder for filings and brand-family notes. Not affiliated with Paramount Global.',
  },
  terms: {
    title: 'Terms of Use',
    eyebrow: 'Support & Policies',
    body: 'Fan redesign for portfolio use. Do not treat this as an official Nickelodeon or Paramount property.',
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Support & Policies',
    body: 'No real accounts, no real data collection. Login boxes are set dressing from the classic Nick.com era.',
  },
  parents: {
    title: 'Parent Guidelines',
    eyebrow: 'Support & Policies',
    body: 'Nick Jr. is built for preschool. Nick News is current events explained for kids. Weekenders and Orbitz are family programming and travel features.',
  },
  help: {
    title: 'Help Center',
    eyebrow: 'Support & Policies',
    body: 'Lost a Nicktane code? Try SLIME or NICK2004. Need preschool? Hit Nick Jr. Need news? Hit Nick News.',
  },
  paramount: {
    title: 'Paramount',
    eyebrow: 'Brands & Partners',
    body: 'Partner brand tile only. This site is an unofficial fan redesign and is not affiliated with Paramount.',
  },
  global: {
    title: 'Global Sites',
    eyebrow: 'Brands & Partners',
    body: 'A directory stub for regional Nick destinations — same loud energy, local schedules.',
  },
}
