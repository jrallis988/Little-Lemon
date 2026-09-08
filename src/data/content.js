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
    emoji: '🐶',
    blurb: 'Pups save Adventure Bay before snack time.',
    activity: 'Badge hunt: find Chase, Skye, and Marshall on the page.',
  },
  {
    id: 'bluey',
    title: "Blue's Clues & You",
    emoji: '🐾',
    blurb: 'Think along, point along, play along.',
    activity: 'Clue board: tap three soft shapes to solve today’s puzzle.',
  },
  {
    id: 'bubble-guppies',
    title: 'Bubble Guppies',
    emoji: '🐠',
    blurb: 'Underwater preschool with a dance break.',
    activity: 'Bubble pop: mash the dance button for a fishy groove.',
  },
  {
    id: 'dora',
    title: 'Dora the Explorer',
    emoji: '🗺️',
    blurb: 'Maps, backpacks, and bilingual adventures.',
    activity: 'Map quest: pick the next stop — forest, river, or mountain.',
  },
]

export const nickJrBlocks = [
  { id: 'playtime', title: 'Playtime', copy: 'Soft buttons, big targets, zero beige.' },
  { id: 'stories', title: 'Stories', copy: 'Short tales with equal energy for every little viewer.' },
  { id: 'songs', title: 'Songs', copy: 'Sing-alongs that invite movement, not mute watching.' },
]

export const nickNewsStories = [
  {
    id: 'kids-vote',
    title: 'Kids Vote Town Hall',
    kicker: 'Live',
    blurb: 'Young reporters ask the questions grown-ups skip.',
    body: 'A studio full of kids, one big mic, and no “you’re too young for that.” Topics rotate weekly — school lunch, climate, and fairness on the playground.',
  },
  {
    id: 'slime-science',
    title: 'Why slime feels cold',
    kicker: 'Explainers',
    blurb: 'A gooey science story told for curious kids.',
    body: 'Slime is mostly water and polymer chains. When it sits on your hands, evaporation steals heat — so the goo feels colder than the room. Science, but sticky.',
  },
  {
    id: 'earth-day',
    title: 'Nick News Daily: Earth hour',
    kicker: 'Today',
    blurb: 'What kids can actually do this weekend.',
    body: 'Pick one action: a litter walk, a water-save challenge, or a backyard habitat sketch. Then share the result with a grown-up who will actually listen.',
  },
  {
    id: 'sports-desk',
    title: 'Kids Choice sports desk',
    kicker: 'Sports',
    blurb: 'Scores, underdogs, and slime-worthy plays.',
    body: 'Not just highlight reels — kid correspondents break down teamwork, trash talk (the funny kind), and why missing a shot still counts as trying.',
  },
]

export const weekenderEvents = [
  {
    id: 'slime-saturday',
    title: 'Slime Saturday',
    when: 'This Saturday · 10a–4p',
    blurb: 'Games, premieres, and a live slime drop.',
    detail: 'Morning arcade hours, noon Nicktoon shorts, 3p slime drop on the homepage ticker.',
  },
  {
    id: 'toon-marathon',
    title: 'Nicktoon Marathon',
    when: 'Sunday block',
    blurb: 'Back-to-back classics with new bumpers.',
    detail: 'SpongeBob → Jimmy → Fairly OddParents with host bumpers you can mash for stickers.',
  },
  {
    id: 'family-night',
    title: 'Family Premiere Night',
    when: 'Friday 7p',
    blurb: 'One new episode, then a vote-for-next poll.',
    detail: 'Watch together, then lock a vote for Saturday’s encore pick.',
  },
  {
    id: 'arcade-takeover',
    title: 'Arcade Takeover',
    when: 'All weekend',
    blurb: 'Bonus rooms unlocked for Weekender codes.',
    detail: 'Enter WEEKEND on Nicktane vibes — bonus cabinets stay open until Monday.',
  },
]

export const orbitzTrips = [
  {
    id: 'galaxy-resort',
    title: 'Orbitz Galaxy Resort',
    blurb: 'Family suites, cosmic pools, and kid-rate nights.',
    pack: ['Swimsuits', 'Glow stickers', 'Sunscreen', 'Snack stash'],
  },
  {
    id: 'partner-parks',
    title: 'Partner park weekends',
    blurb: 'Theme-park bundles with Nick character hours.',
    pack: ['Comfort shoes', 'Park map', 'Photo day sticker sheet'],
  },
  {
    id: 'cruise-lane',
    title: 'Family cruise lane',
    blurb: 'Sea days, slime labs, and no-boring-meeting decks.',
    pack: ['Cabin games', 'Rain jacket', 'Seasickness plan B'],
  },
  {
    id: 'staycation',
    title: 'Orbit Racers staycation kit',
    blurb: 'At-home race nights with printable track maps.',
    pack: ['Printer paper', 'Tape', 'Timer', 'Victory snack'],
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
  {
    id: 's1',
    title: 'Slime Kit',
    blurb: 'Green goo, officially unofficial.',
    detail: 'Two colors, one mixing tray, and a “do not eat” sticker kids ignore anyway.',
  },
  {
    id: 's2',
    title: 'Nick Magazine',
    blurb: 'Posters, comics, and codes.',
    detail: 'Fold-out character poster + a Nicktane code printed in invisible orange.',
  },
  {
    id: 's3',
    title: 'Pay-to-Play Tokens',
    blurb: 'Unlock premium arcade rooms.',
    detail: 'Cosmetic tokens for bonus cabinets — no loot boxes, just louder rooms.',
  },
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
    sections: [
      {
        heading: 'What this site is',
        paragraphs: [
          'A fan / portfolio redesign inspired by mid-2000s Nick.com: busy, colorful, and interactive on purpose.',
          'Streaming flattened kids’ products into content shelves. This project argues for mess, motion, and mashable UI again.',
        ],
      },
      {
        heading: 'What this site is not',
        paragraphs: [
          'Not affiliated with Paramount, Nickelodeon, or any official brand property.',
          'No real accounts, purchases, or live TV schedules — just a loud prototype of how kid-first web could feel.',
        ],
      },
    ],
  },
  press: {
    title: 'Press',
    eyebrow: 'Corporate',
    body: 'Media notes, stills, and slime-drop schedules for editors who still remember how to have fun.',
    sections: [
      {
        heading: 'Boilerplate',
        paragraphs: [
          'Nickelodeon (in this redesign’s thesis) is for kids — equal energy on TV and online.',
          'Quote the project as an unofficial conceptual redesign, not a Paramount product.',
        ],
      },
      {
        heading: 'Asset wishlist',
        paragraphs: [
          'Character strip stills, slime splat overlays, and arcade cabinet thumbs (coming in a later art pass).',
          'For now: screenshots of Home, Games, and Nick Jr. tell the story best.',
        ],
      },
    ],
  },
  jobs: {
    title: 'Jobs',
    eyebrow: 'Corporate',
    body: 'Come make messes on purpose: design, games, news for kids, and family travel stories.',
    sections: [
      {
        heading: 'Open pretend roles',
        paragraphs: [
          'Arcade Designer — invent cabinets kids smash for fifteen seconds and remember for years.',
          'Kids News Editor — explain hard topics without talking down.',
          'Family Travel Producer — Orbitz weekends that feel like adventures, not brochures.',
        ],
      },
      {
        heading: 'How to “apply”',
        paragraphs: [
          'This is a fan redesign — roles are set dressing. If you build kid-first product for real, keep the slime.',
        ],
      },
    ],
  },
  investors: {
    title: 'Investor Relations',
    eyebrow: 'Corporate',
    body: 'Placeholder for filings and brand-family notes. Not affiliated with Paramount Global.',
    sections: [
      {
        heading: 'Disclaimer',
        paragraphs: [
          'No securities, no filings, no investor materials live here.',
          'Included only to mirror classic corporate footer architecture from the Nick.com era.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    eyebrow: 'Support & Policies',
    body: 'Fan redesign for portfolio use. Do not treat this as an official Nickelodeon or Paramount property.',
    sections: [
      {
        heading: 'Use',
        paragraphs: [
          'Browse, click, smash buttons, and screenshot for portfolio critique.',
          'Do not present this site as an official Nickelodeon or Paramount experience.',
        ],
      },
      {
        heading: 'Content',
        paragraphs: [
          'Show names and references appear as cultural touchstones in an unofficial redesign.',
          'Interactive bits (polls, arcade, codes) store nothing on a server.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Support & Policies',
    body: 'No real accounts, no real data collection. Login boxes are set dressing from the classic Nick.com era.',
    sections: [
      {
        heading: 'What we store',
        paragraphs: [
          'Arcade high scores may live in your browser’s localStorage only.',
          'No analytics cookies, no email capture, no “See My Nick” backend.',
        ],
      },
      {
        heading: 'Kids',
        paragraphs: [
          'Designed as a kid-facing prototype. Grown-ups: supervise if that matters in your house.',
        ],
      },
    ],
  },
  parents: {
    title: 'Parent Guidelines',
    eyebrow: 'Support & Policies',
    body: 'Nick Jr. is built for preschool. Nick News is current events explained for kids. Weekenders and Orbitz are family programming and travel features.',
    sections: [
      {
        heading: 'Age bands (prototype)',
        paragraphs: [
          'Nick Jr. — preschool play, soft targets, short activities.',
          'Main Nick — games, shows, fan toys for school-age kids.',
          'Nick News — current events explained without condescension.',
        ],
      },
      {
        heading: 'What is real vs pretend',
        paragraphs: [
          'Login, shop checkout, and travel booking are set dressing.',
          'Arcade rounds and sticker walls work in-browser for fun only.',
        ],
      },
    ],
  },
  help: {
    title: 'Help Center',
    eyebrow: 'Support & Policies',
    body: 'Lost a Nicktane code? Try SLIME or NICK2004. Need preschool? Hit Nick Jr. Need news? Hit Nick News.',
    sections: [
      {
        heading: 'Quick answers',
        paragraphs: [
          'Nicktane codes: SLIME, NICK2004, GOO, ORBITZ — enter on the homepage.',
          'Games feel stuck? Close the arcade modal and open Play Now again.',
          'Video “playing”? It’s a fake progress bar — pick another clip to reset.',
        ],
      },
      {
        heading: 'Still stuck?',
        paragraphs: [
          'Reload the page. This is a static fan redesign with no support desk.',
        ],
      },
    ],
  },
  paramount: {
    title: 'Paramount',
    eyebrow: 'Brands & Partners',
    body: 'Partner brand tile only. This site is an unofficial fan redesign and is not affiliated with Paramount.',
    sections: [
      {
        heading: 'Brand handoff (conceptual)',
        paragraphs: [
          'In a real ecosystem, this tile would deep-link to Paramount destinations.',
          'Here it exists so the footer Brands column feels complete — and so the disclaimer stays loud.',
        ],
      },
    ],
  },
  global: {
    title: 'Global Sites',
    eyebrow: 'Brands & Partners',
    body: 'A directory stub for regional Nick destinations — same loud energy, local schedules.',
    sections: [
      {
        heading: 'Regions (demo links)',
        paragraphs: [
          'UK & Ireland · Latin America · Brasil · Asia · Australia — each would carry local schedules.',
          'This page is a directory sketch only; links stay on-site so the prototype never pretends to be official.',
        ],
      },
    ],
    links: [
      { label: 'Nick Jr. preschool', to: '/nick-jr' },
      { label: 'Nick News desk', to: '/nick-news' },
      { label: 'Weekenders calendar', to: '/weekenders' },
      { label: 'Orbitz travel', to: '/orbitz' },
    ],
  },
}
