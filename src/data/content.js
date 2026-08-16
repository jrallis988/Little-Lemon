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
  { to: '/games', label: 'Games', tone: 'games' },
  { to: '/shows', label: 'Shows', tone: 'shows' },
  { to: '/music', label: 'Music', tone: 'music' },
  { to: '/video', label: 'Video', tone: 'video' },
  { to: '/fan', label: 'Your World', tone: 'world' },
  { to: '/more', label: 'More', tone: 'more' },
]

export const sideLinks = [
  { to: '/games', label: 'Games' },
  { to: '/music', label: 'Music' },
  { to: '/video', label: 'Video' },
  { to: '/shows', label: 'Shows' },
  { to: '/fan', label: 'Fan' },
  { to: '/more', label: 'Shop' },
  { to: '/more', label: 'Parents' },
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

export const videos = [
  { id: 'v1', title: 'SpongeBob: Band Geeks clip', length: '2:14' },
  { id: 'v2', title: 'Drake & Josh: Megan prank reel', length: '1:48' },
  { id: 'v3', title: 'Avatar: Appa flies!', length: '1:22' },
  { id: 'v4', title: 'Catscratch: Play Now trailer', length: '0:45' },
]

export const musicTracks = [
  { id: 'm1', title: 'Nick Radio Live', artist: 'Studio Set', vibe: 'Pop' },
  { id: 'm2', title: 'Jellyfish Jam', artist: 'Bikini Bottom Band', vibe: 'Dance' },
  { id: 'm3', title: 'Theme Remix Pack', artist: 'Nick Mix Desk', vibe: 'Remix' },
  { id: 'm4', title: 'Slime Song Sing-Along', artist: 'Kids Choice Crew', vibe: 'Party' },
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
    items: ['Bikini Bottom Dash', "Jimmy's Fun House", 'Cat-a-pult'],
  },
  {
    id: 'music',
    label: 'Music',
    tone: 'music',
    items: ['Nick Radio Live', 'Theme Remix Pack'],
  },
  {
    id: 'weblab',
    label: 'Web Lab',
    tone: 'video',
    items: ['Build-a-Splat', 'Sticker Lab', 'Messy Mixer'],
  },
  {
    id: 'world',
    label: 'Your World',
    tone: 'world',
    items: ['Fan Art Wall', 'Daily Poll', 'See My Nick'],
  },
]

export const shopBits = [
  { id: 's1', title: 'Slime Kit', blurb: 'Green goo, officially unofficial.' },
  { id: 's2', title: 'Nick Magazine', blurb: 'Posters, comics, and codes.' },
  { id: 's3', title: 'Pay-to-Play Tokens', blurb: 'Unlock premium arcade rooms.' },
]
