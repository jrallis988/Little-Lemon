export const networks = [
  {
    id: 'nickelodeon',
    name: 'Nickelodeon',
    blurb: 'Kid comedy, adventure, and after-school energy.',
    nowPlaying: 'The Loud House',
    gradient: 'linear-gradient(145deg, #ff6a00 0%, #c41e8a 55%, #5b1d8a 100%)',
  },
  {
    id: 'nick-jr',
    name: 'Nick Jr.',
    blurb: 'Preschool stories packed with heart and play.',
    nowPlaying: 'PAW Patrol',
    gradient: 'linear-gradient(145deg, #1ea7ff 0%, #5b4dff 50%, #7b2cff 100%)',
  },
  {
    id: 'nick-orbitz',
    name: 'Nick Orbitz',
    blurb: 'Cosmic races and sci-fi fun across the galaxy.',
    nowPlaying: 'Orbit Racers',
    gradient: 'linear-gradient(145deg, #00c9b1 0%, #1a8cff 55%, #3d5afe 100%)',
  },
  {
    id: 'nick-news',
    name: 'Nick News',
    blurb: 'Real stories explained for curious kids.',
    nowPlaying: 'Nick News Daily',
    gradient: 'linear-gradient(145deg, #ff3b4e 0%, #c41e8a 50%, #6b2cff 100%)',
  },
  {
    id: 'nick-at-nite',
    name: 'Nick at Nite',
    blurb: 'Late-night laughs and classic comfort TV.',
    nowPlaying: 'Friends Forever Block',
    gradient: 'linear-gradient(145deg, #2a1a5e 0%, #5b2d8a 50%, #ff6a00 100%)',
  },
]

export const networkStrip = [
  'Nickelodeon',
  'Nick Jr.',
  'Nick Orbitz',
  'Nick News',
  'Nick at Nite',
]

export const shows = [
  {
    id: 'loud-house',
    title: 'The Loud House',
    network: 'Nickelodeon',
    tag: 'Comedy',
    tone: 'linear-gradient(135deg, #ff8a3d, #ff3d7f)',
  },
  {
    id: 'spongebob',
    title: 'SpongeBob SquarePants',
    network: 'Nickelodeon',
    tag: 'Classic',
    tone: 'linear-gradient(135deg, #ffe566, #00a8e8)',
  },
  {
    id: 'really-loud-house',
    title: 'The Really Loud House',
    network: 'Nickelodeon',
    tag: 'Live action',
    tone: 'linear-gradient(135deg, #ff6a00, #7c3aed)',
  },
  {
    id: 'earthspark',
    title: 'Transformers: EarthSpark',
    network: 'Nickelodeon',
    tag: 'Action',
    tone: 'linear-gradient(135deg, #1ea7ff, #0b1b3a)',
  },
  {
    id: 'paw-patrol',
    title: 'PAW Patrol',
    network: 'Nick Jr.',
    tag: 'Preschool',
    tone: 'linear-gradient(135deg, #1ea7ff, #ffd400)',
  },
  {
    id: 'orbit-racers',
    title: 'Orbit Racers',
    network: 'Nick Orbitz',
    tag: 'Sci-fi',
    tone: 'linear-gradient(135deg, #00c9b1, #3d5afe)',
  },
  {
    id: 'nick-news-daily',
    title: 'Nick News Daily',
    network: 'Nick News',
    tag: 'News',
    tone: 'linear-gradient(135deg, #ff3b4e, #6b2cff)',
  },
  {
    id: 'tmnt',
    title: 'Teenage Mutant Ninja Turtles',
    network: 'Nickelodeon',
    tag: 'Action',
    tone: 'linear-gradient(135deg, #2ecc71, #1a4d2e)',
  },
]

export const scheduleBlocks = [
  {
    time: '3:00p',
    title: 'The Loud House',
    network: 'Nickelodeon',
    kind: 'Episode',
  },
  {
    time: '3:30p',
    title: 'SpongeBob SquarePants',
    network: 'Nickelodeon',
    kind: 'Episode',
  },
  {
    time: '4:00p',
    title: 'Kids Vote Town Hall',
    network: 'Nick News',
    kind: 'Live premiere',
  },
  {
    time: '4:30p',
    title: 'PAW Patrol',
    network: 'Nick Jr.',
    kind: 'Episode',
  },
  {
    time: '5:00p',
    title: 'Orbit Racers',
    network: 'Nick Orbitz',
    kind: 'New episode',
  },
  {
    time: '7:00p',
    title: 'Transformers: EarthSpark',
    network: 'Nickelodeon',
    kind: 'Primetime',
  },
  {
    time: '8:00p',
    title: 'Nick at Nite Classics',
    network: 'Nick at Nite',
    kind: 'Block',
  },
]

export const streamRows = [
  {
    id: 'continue',
    title: 'Continue watching',
    items: ['The Loud House', 'PAW Patrol', 'Orbit Racers'],
  },
  {
    id: 'premieres',
    title: 'Premieres & live',
    items: ['Kids Vote Town Hall', 'EarthSpark Season Kickoff', 'Nick News Daily'],
  },
  {
    id: 'equal-energy',
    title: 'Equal energy rails',
    items: ['Nick Jr. Playdate', 'Orbitz Race Night', 'Vault Rewind'],
  },
]

export const arcadeGames = [
  {
    id: 'slime-dash',
    title: 'Slime Dash',
    blurb: 'Bounce through green goo and rack up splat points.',
    accent: '#7CFF4A',
  },
  {
    id: 'orbit-lap',
    title: 'Orbit Lap',
    blurb: 'Race asteroids on the Nick Orbitz track.',
    accent: '#00C9B1',
  },
  {
    id: 'loud-house-labyrinth',
    title: 'Loud House Labyrinth',
    blurb: 'Find Lincoln before the sisters do.',
    accent: '#FF8A3D',
  },
  {
    id: 'paw-rescue',
    title: 'PAW Rescue Run',
    blurb: 'Help the pups clear Adventure Bay.',
    accent: '#1EA7FF',
  },
]

export const vaultItems = [
  {
    id: 'classic-spongebob',
    title: 'Classic SpongeBob',
    era: '1999–',
    blurb: 'Bikini Bottom essentials, always on tap.',
  },
  {
    id: 'rugrats-rewind',
    title: 'Rugrats Rewind',
    era: '1991–',
    blurb: 'Baby adventures from the original vault.',
  },
  {
    id: 'avatar-arc',
    title: 'Avatar: The Last Airbender',
    era: '2005–',
    blurb: 'Four nations. One destiny. Full saga.',
  },
  {
    id: 'i-carly',
    title: 'iCarly Vault',
    era: '2007–',
    blurb: 'Web show chaos and living-room laughs.',
  },
]

export const navItems = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/schedule', label: 'Schedule', icon: 'schedule' },
  { to: '/shows', label: 'Shows', icon: 'shows' },
  { to: '/stream', label: 'Stream', icon: 'stream' },
  { to: '/arcade', label: 'Arcade', icon: 'arcade' },
  { to: '/vault', label: 'Vault', icon: 'vault' },
]
