export const SIM_DISCLAIMER =
  'SIMULATED DATA — PACE is a fictional self-initiated portfolio project exploring a Spotify × running campaign. All performance figures are invented for demonstration.'

export const coreIdea = {
  definition:
    'PACE turns Spotify from something runners happen to listen to into something that actively participates in their run.',
  insight:
    'Every runner has a pace—but pace isn’t only speed. Music plays a different role in each of those experiences.',
  meaning:
    'FIND YOUR PACE means discovering the relationship between how you run and how you listen.',
}

export const problem = {
  title: 'The Problem',
  passive: 'Choose music → Press play → Run.',
  statement:
    'Spotify may already be present during someone’s run, but the relationship is largely passive.',
  question:
    'What if Spotify understood the kind of run you’re having—and made music part of the experience?',
  whyItMatters:
    'This gives the campaign a reason to exist beyond promoting workout playlists.',
}

export const whySpotify = {
  understands: [
    'Listening behavior',
    'Music preferences',
    'Tempo and energy',
    'Favorite artists and tracks',
    'Playlist behavior',
    'Personalization',
    'Music discovery',
  ],
  runningLayer: 'movement',
  connection:
    'PACE connects listening behavior + running behavior to create something neither piece of information provides on its own.',
  positioning:
    'Spotify doesn’t need to become another Strava, Garmin, or Nike Run Club. Spotify owns the soundtrack of the run.',
}

export const paceStates = [
  {
    id: 'start',
    name: 'Start',
    title: 'Find Your Rhythm',
    description: 'Warm up. Get moving. Establish cadence.',
    visual: 'Controlled spacing, steady type, rising motion.',
    music: 'Building BPM, familiar openers.',
  },
  {
    id: 'flow',
    name: 'Flow',
    title: 'Hold Your Pace',
    description: 'The runner settles into a consistent rhythm.',
    visual: 'Rhythmic repeats, route lines, even cadence marks.',
    music: 'Matched tempo, sustained energy.',
  },
  {
    id: 'push',
    name: 'Push',
    title: 'Pick It Up',
    description: 'Higher intensity. Faster movement. Higher-energy music.',
    visual: 'Compressed type, acceleration marks, tighter crops.',
    music: 'Rising energy, denser edits.',
  },
  {
    id: 'break',
    name: 'Break',
    title: 'Beat Your Pace',
    description: 'Personal records, challenges, races, and performance goals.',
    visual: 'Explosive contrast, stopwatch tension, split-time graphics.',
    music: 'Peak tracks, power songs.',
  },
  {
    id: 'recover',
    name: 'Recover',
    title: 'Bring It Down',
    description: 'Cooldown, recovery, and lower-intensity movement.',
    visual: 'Open space, slower motion, softer contrast.',
    music: 'Lower BPM, longer breath.',
  },
]

export const audiences = [
  {
    id: 'starter',
    name: 'The Starter',
    tagline: 'First miles, returning runners',
    description:
      'Building confidence through achievable progress. Music is companionship and courage more than competition.',
    motivations: ['Confidence', 'Consistency', 'Belonging'],
    messaging:
      'Your first mile already has a pace. Let Spotify help you find the soundtrack that keeps you moving.',
    creativeNote:
      'Warm START → FLOW creative. Soft CTAs. Milestone Cards over race language.',
  },
  {
    id: 'regular',
    name: 'The Regular',
    tagline: 'Runs several times a week',
    description:
      'Protecting consistency while chasing better sessions. Music shapes mood, cadence, and weekly rhythm.',
    motivations: ['Routine', 'Cadence', 'Playlist discovery'],
    messaging:
      'Dial in the miles you already run. Match the music to the kind of run you’re having.',
    creativeNote:
      'FLOW and PUSH states. Utility tips + identity Cards. Weekly loop CTAs.',
  },
  {
    id: 'racer',
    name: 'The Racer',
    tagline: 'Performance-focused athlete',
    description:
      'Obsessed with splits, PRs, and measurable improvement. Music is a training tool as much as a soundtrack.',
    motivations: ['Splits', 'Power songs', 'PRs'],
    messaging:
      'Find the pace that wins the session—then the race. Your power song earns its place.',
    creativeNote:
      'PUSH and BREAK states. Data-forward Cards. Challenge-led TikToks.',
  },
]

export const behavioralLoop = [
  {
    id: 'discover',
    name: 'Discover',
    detail: 'Meet FIND YOUR PACE through social, friends, or in-app.',
  },
  {
    id: 'run',
    name: 'Run',
    detail: 'Start a session with a PACE-aware listening experience.',
  },
  {
    id: 'listen',
    name: 'Listen',
    detail: 'Music adapts to START, FLOW, PUSH, BREAK, and RECOVER.',
  },
  {
    id: 'measure',
    name: 'Measure',
    detail: 'Capture pace, BPM, power songs, and session shape.',
  },
  {
    id: 'reveal',
    name: 'Reveal',
    detail: 'Unlock a personalized PACE Card / Profile.',
  },
  {
    id: 'share',
    name: 'Share',
    detail: 'Post the Card, challenge a friend, spark the next run.',
  },
  {
    id: 'again',
    name: 'Run again',
    detail: 'Participation creates another reason to return to Spotify.',
  },
]

export const platformRoles = [
  {
    platform: 'TikTok' as const,
    purpose: 'Challenge',
    role: 'Short-form running challenges, music discovery, pace experiments, and culture questions that make people move.',
    examples: [
      '“What song makes you run faster?”',
      'Pace-state duets',
      'BPM vs. mile challenge',
      'First-mile START clips',
    ],
    notFor:
      'Not a dump of polished brand films. Native experiments beat overproduced ads.',
  },
  {
    platform: 'Instagram' as const,
    purpose: 'Identity',
    role: 'PACE Cards, milestones, runner profiles, playlists, Stories, carousels, and shareable achievements.',
    examples: [
      'PACE Card grid',
      'Milestone Stories',
      'Playlist carousels',
      'Runner identity Reels',
    ],
    notFor:
      'Not generic workout stock. Identity and Card aesthetics own this surface.',
  },
  {
    platform: 'YouTube' as const,
    purpose: 'Stories',
    role: 'Longer runner stories, first 5Ks, marathon prep, training routines, and how music changes a run.',
    examples: [
      'Athlete music diaries',
      'First 5K films',
      'Training-with-BPM docs',
      'Shorts that feed long-form',
    ],
    notFor:
      'Don’t compress every story into 15 seconds. Depth builds belief here.',
  },
  {
    platform: 'Spotify' as const,
    purpose: 'Experience',
    role: 'The destination where runners actually Find Their Pace—sessions, playlists, Cards, and return loops.',
    examples: [
      'In-app PACE session',
      'Personalized playlists',
      'PACE Profile',
      'Share-to-social Cards',
    ],
    notFor:
      'Social is the invitation. Spotify is where the relationship becomes real.',
  },
]

export const pillars = [
  {
    id: 'Product' as const,
    name: 'Experience',
    description: 'PACE sessions, Cards, playlists, and in-app moments.',
    examples: [
      'PACE Card reveals',
      'Session state UI',
      'Playlist artwork systems',
      'Mobile Spotify frames',
    ],
  },
  {
    id: 'Training' as const,
    name: 'Training',
    description: 'Cadence, BPM, pacing cues, and run-structure education.',
    examples: [
      'Match BPM to easy pace',
      'START→FLOW warm-up tips',
      'Push-interval playlists',
      'Recovery cooldown guides',
    ],
  },
  {
    id: 'People' as const,
    name: 'People',
    description: 'Runner stories, athlete features, and music-run relationships.',
    examples: [
      'First 5K with a power song',
      'Marathon prep diaries',
      'Community runner profiles',
      'Artist × runner films',
    ],
  },
  {
    id: 'Culture' as const,
    name: 'Culture',
    description: 'Challenges, humor, trends, and music discovery moments.',
    examples: [
      'What song makes you faster?',
      'Pace-state memes',
      'Duet challenges',
      'Final-mile song polls',
    ],
  },
  {
    id: 'Community' as const,
    name: 'Community',
    description: 'Group runs, shared Cards, challenges, and participation.',
    examples: [
      'City pace challenges',
      'Card share cascades',
      'Group-run Stories',
      'Friend PR shoutouts',
    ],
  },
]

export const calendar = [
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Mon', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Culture' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Duet your power song', title: 'What song makes you run faster?' },
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Wed', platform: 'Instagram' as const, format: 'Reel' as const, pillar: 'Culture' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Follow for the drop', title: 'Pace isn’t only speed' },
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Fri', platform: 'YouTube' as const, format: 'Short' as const, pillar: 'People' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Watch the story', title: 'Before the first PACE session' },
  { week: 2 as const, weekLabel: 'Week 2 — Experience', day: 'Mon', platform: 'Instagram' as const, format: 'Carousel' as const, pillar: 'Product' as const, stage: 'Reveal' as const, objective: 'Listen', cta: 'Open Spotify', title: 'Meet the five pace states' },
  { week: 2 as const, weekLabel: 'Week 2 — Experience', day: 'Mon', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'People' as const, stage: 'Reveal' as const, objective: 'Run', cta: 'Try a START session', title: 'I ran my first mile with PACE' },
  { week: 2 as const, weekLabel: 'Week 2 — Experience', day: 'Tue', platform: 'YouTube' as const, format: 'Video' as const, pillar: 'Product' as const, stage: 'Reveal' as const, objective: 'Listen', cta: 'See how it works', title: 'PACE experience film' },
  { week: 3 as const, weekLabel: 'Week 3 — Measure + Reveal', day: 'Mon', platform: 'Instagram' as const, format: 'Reel' as const, pillar: 'Product' as const, stage: 'Educate' as const, objective: 'Reveal', cta: 'Save your Card', title: 'Your first PACE Card' },
  { week: 3 as const, weekLabel: 'Week 3 — Measure + Reveal', day: 'Tue', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Training' as const, stage: 'Educate' as const, objective: 'Measure', cta: 'Match your BPM', title: 'Easy pace in 20 seconds' },
  { week: 3 as const, weekLabel: 'Week 3 — Measure + Reveal', day: 'Thu', platform: 'YouTube' as const, format: 'Video' as const, pillar: 'People' as const, stage: 'Engage' as const, objective: 'Listen', cta: 'Watch full story', title: 'How music changed my 5K' },
  { week: 3 as const, weekLabel: 'Week 3 — Measure + Reveal', day: 'Sat', platform: 'Instagram' as const, format: 'Story' as const, pillar: 'Community' as const, stage: 'Engage' as const, objective: 'Share', cta: 'Share your Card', title: 'City pace challenge RSVP' },
  { week: 4 as const, weekLabel: 'Week 4 — Share + Return', day: 'Mon', platform: 'Instagram' as const, format: 'Feed' as const, pillar: 'Product' as const, stage: 'Convert' as const, objective: 'Share', cta: 'Generate your Card', title: 'PACE Card identity series' },
  { week: 4 as const, weekLabel: 'Week 4 — Share + Return', day: 'Wed', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Community' as const, stage: 'Engage' as const, objective: 'Share', cta: 'Join the challenge', title: 'Beat yesterday’s pace' },
  { week: 4 as const, weekLabel: 'Week 4 — Share + Return', day: 'Fri', platform: 'YouTube' as const, format: 'Short' as const, pillar: 'Culture' as const, stage: 'Evergreen' as const, objective: 'Run again', cta: 'Run again tonight', title: 'Recover playlist moment' },
]

export const paceCardExample = {
  name: 'Alex Rivera',
  fiveK: '28:42',
  avgPace: '9:14 / mile',
  avgBpm: '156',
  powerSong: 'Blinding Lights — The Weeknd',
  topArtist: 'Fred again..',
  finalMile: 'Lose Yourself — Eminem',
  personality: 'THE PACER',
}

export const creativeExecutions = [
  {
    id: 'tt-challenge',
    channel: 'TikTok',
    format: 'Challenge',
    title: 'What song makes you run faster?',
    state: 'Push',
    note: 'Native hook → duet invite → open Spotify.',
  },
  {
    id: 'tt-start',
    channel: 'TikTok',
    format: 'Pace experiment',
    title: 'START state in 12 seconds',
    state: 'Start',
    note: 'Controlled cadence marks + rising BPM.',
  },
  {
    id: 'ig-card',
    channel: 'Instagram',
    format: 'Feed / PACE Card',
    title: 'PACE Card share',
    state: 'Break',
    note: 'Identity asset: personal, measurable, shareable.',
  },
  {
    id: 'ig-story',
    channel: 'Instagram',
    format: 'Stories',
    title: 'Milestone Stories',
    state: 'Flow',
    note: 'Stickers for pace, BPM, and power song.',
  },
  {
    id: 'ig-reel',
    channel: 'Instagram',
    format: 'Reel',
    title: 'Five states, one run',
    state: 'Flow',
    note: 'Kinetic type shifts with each pace state.',
  },
  {
    id: 'ig-carousel',
    channel: 'Instagram',
    format: 'Carousel',
    title: 'How PACE reads your run',
    state: 'Start',
    note: 'Education that still looks like identity design.',
  },
  {
    id: 'yt-story',
    channel: 'YouTube',
    format: 'Long-form',
    title: 'First 5K: music diary',
    state: 'Break',
    note: 'Story depth that social can’t hold.',
  },
  {
    id: 'yt-short',
    channel: 'YouTube',
    format: 'Short',
    title: 'Final-mile song',
    state: 'Push',
    note: 'Bridge from discovery into longer films.',
  },
  {
    id: 'spotify-mobile',
    channel: 'Spotify',
    format: 'Mobile UI',
    title: 'In-run PACE session',
    state: 'Flow',
    note: 'Where listening + movement meet.',
  },
  {
    id: 'playlist-art',
    channel: 'Spotify',
    format: 'Playlist artwork',
    title: 'PUSH playlist system',
    state: 'Push',
    note: 'Visual language without needing the wordmark first.',
  },
  {
    id: 'paid-social',
    channel: 'Paid social',
    format: 'Ad',
    title: 'Find Your Pace — paid cut',
    state: 'Break',
    note: 'People-led hook, Card payoff, Spotify CTA.',
  },
  {
    id: 'ooh',
    channel: 'OOH / Digital',
    format: 'Poster',
    title: 'Mile-marker outdoor',
    state: 'Start',
    note: 'Route lines + split times at city scale.',
  },
  {
    id: 'motion',
    channel: 'Motion',
    format: 'Frame sequence',
    title: 'State transition frames',
    state: 'Push',
    note: 'Typography accelerates from START to BREAK.',
  },
  {
    id: 'challenge-pack',
    channel: 'Community',
    format: 'Challenge kit',
    title: 'Beat yesterday’s pace',
    state: 'Break',
    note: 'Shareable rules + Card badge.',
  },
]

export const creativeAssets = [
  {
    id: 'ig-announce',
    platform: 'Instagram' as const,
    format: 'Feed / Product announcement',
    title: 'PACE Is Here',
    pillar: 'Product' as const,
    approach: 'Product-led' as const,
    caption: 'Music that participates in your run.',
    objective: 'Consideration',
    audience: 'The Regular',
    result: 'Solid CTR; mid-pack engagement vs people-led peers.',
    insight: 'Clean experience stills convert browsers who already know the idea.',
    nextAction: 'Pair UI stills with runner-in-motion Card cutdowns.',
    accent: '#C5FF3D',
  },
  {
    id: 'ig-carousel',
    platform: 'Instagram' as const,
    format: 'Carousel',
    title: 'Five Pace States',
    pillar: 'Product' as const,
    approach: 'Product-led' as const,
    caption: 'START. FLOW. PUSH. BREAK. RECOVER.',
    objective: 'Consideration',
    audience: 'The Regular / The Racer',
    result: 'Above-average saves and strong mid-funnel CTR.',
    insight: 'State education works when each slide teaches one moment.',
    nextAction: 'Keep carousels for understanding; lead cold awareness with people.',
    accent: '#1A1C1E',
  },
  {
    id: 'ig-story-runner',
    platform: 'Instagram' as const,
    format: 'Runner story',
    title: 'Maya’s First 5K Card',
    pillar: 'People' as const,
    approach: 'People-led' as const,
    caption: 'She found her pace at mile three—and her power song.',
    objective: 'Engagement',
    audience: 'The Starter',
    result: 'High comments and completion; Card shares outperformed UI peers.',
    insight: 'Personal milestones create belonging faster than feature lists.',
    nextAction: 'Increase Card-led storytelling in evergreen.',
    accent: '#FF5A36',
  },
  {
    id: 'ig-reel',
    platform: 'Instagram' as const,
    format: 'Reel',
    title: 'Find Your Pace — Launch',
    pillar: 'People' as const,
    approach: 'People-led' as const,
    caption: 'Not faster. Not slower. Yours—with a soundtrack that keeps up.',
    objective: 'Awareness',
    audience: 'All',
    result: 'Top Instagram reach piece; strong 3s retention and shares.',
    insight: 'Campaign idea lands hardest when bodies + music carry the line.',
    nextAction: 'Lead launches with motion + line, not logo locks alone.',
    accent: '#C5FF3D',
  },
  {
    id: 'tt-pov',
    platform: 'TikTok' as const,
    format: 'POV run',
    title: 'POV: Pre-run playlist pick',
    pillar: 'Culture' as const,
    approach: 'People-led' as const,
    caption: 'The quiet before the first mile.',
    objective: 'Awareness',
    audience: 'The Regular',
    result: 'Strong discovery reach with trend-native framing.',
    insight: 'POV lowers friction and raises authenticity.',
    nextAction: 'Keep POV as a standing culture format.',
    accent: '#FF5A36',
  },
  {
    id: 'tt-test',
    platform: 'TikTok' as const,
    format: 'Product test',
    title: 'I ran 50 miles with PACE',
    pillar: 'People' as const,
    approach: 'People-led' as const,
    caption: 'Here’s what my Card looked like after.',
    objective: 'Awareness + Consideration',
    audience: 'The Racer / The Regular',
    result: 'Campaign’s highest TikTok reach; hook test winner.',
    insight: 'Outcome-first hooks beat brand introductions on retention.',
    nextAction: 'Standardize proof-led openings for product TikToks.',
    accent: '#C5FF3D',
  },
  {
    id: 'tt-tip',
    platform: 'TikTok' as const,
    format: 'Running tip',
    title: 'Match BPM to easy pace',
    pillar: 'Training' as const,
    approach: 'Educational' as const,
    caption: 'If you can sing the chorus, you’re in easy.',
    objective: 'Engagement',
    audience: 'The Starter / The Regular',
    result: 'Highest save volume among short-form tips.',
    insight: 'Utility content is bookmarked—it extends lifespan past the feed.',
    nextAction: 'Ship a weekly tip series with consistent visual system.',
    accent: '#2F6BFF',
  },
  {
    id: 'tt-community',
    platform: 'TikTok' as const,
    format: 'Community content',
    title: 'Pace Challenge',
    pillar: 'Community' as const,
    approach: 'Community' as const,
    caption: 'Post your Card. Tag a friend to beat it.',
    objective: 'Engagement',
    audience: 'All',
    result: 'Highest engagement rate in the simulated set; share-led growth.',
    insight: 'Participation prompts outperform passive brand posts.',
    nextAction: 'Build monthly challenges into the always-on calendar.',
    accent: '#FF5A36',
  },
  {
    id: 'yt-thumb',
    platform: 'YouTube' as const,
    format: 'Launch thumbnail',
    title: 'Experience film packaging',
    pillar: 'Product' as const,
    approach: 'Product-led' as const,
    caption: 'Thumbnail variants tested: UI vs athlete + Card.',
    objective: 'Awareness',
    audience: 'All',
    result: 'Athlete + Card thumbnail won CTR and qualified views.',
    insight: 'Faces and proof package long-form better than isolated UI.',
    nextAction: 'Default athlete + Card framing for films.',
    accent: '#1A1C1E',
  },
  {
    id: 'yt-athlete',
    platform: 'YouTube' as const,
    format: 'Athlete feature',
    title: 'Athlete music diary: Jordan',
    pillar: 'People' as const,
    approach: 'People-led' as const,
    caption: 'Training honesty over highlight reels—with the songs that held the block.',
    objective: 'Consideration',
    audience: 'The Racer',
    result: 'Strong watch time and mid-funnel Spotify clicks.',
    insight: 'Depth builds trust that short-form cannot.',
    nextAction: 'Alternate athlete diaries with training education monthly.',
    accent: '#2F6BFF',
  },
  {
    id: 'yt-training',
    platform: 'YouTube' as const,
    format: 'Training video',
    title: 'Build a weekly pace playlist plan',
    pillar: 'Training' as const,
    approach: 'Educational' as const,
    caption: 'Structure without burnout—music matched to each state.',
    objective: 'Consideration',
    audience: 'The Regular',
    result: 'Best YouTube completion among long-form education; high CTR.',
    insight: 'Educational long-form earns both attention and intent.',
    nextAction: 'Create a chaptered training playlist tied to pace states.',
    accent: '#C5FF3D',
  },
  {
    id: 'yt-short',
    platform: 'YouTube' as const,
    format: 'Short',
    title: 'Cadence + BPM tip',
    pillar: 'Training' as const,
    approach: 'Educational' as const,
    caption: 'One cue. Fifteen seconds. Better turnover.',
    objective: 'Engagement',
    audience: 'The Starter / The Regular',
    result: 'Efficient reach with above-average completion.',
    insight: 'Shorts bridge TikTok discovery into YouTube depth.',
    nextAction: 'Repurpose tip Shorts with platform-native end screens.',
    accent: '#FF5A36',
  },
]

export const abTests = [
  {
    id: 'test-01',
    name: 'TEST 01 — Instagram Creative',
    platform: 'Instagram' as const,
    hypothesis:
      'Runner + soundtrack storytelling will outperform isolated product/UI photography on engagement without harming CTR.',
    versionA: {
      label: 'Version A — UI / product-only',
      description: 'Polished PACE session UI on a minimal field. No runner. No Card.',
      design: {
        Photography: 'Isolated UI still',
        Headline: 'Meet PACE on Spotify',
        CTA: 'Learn more',
        Typography: 'Static, centered',
        Format: 'Feed still',
        'Pace state': 'None explicit',
      },
      metrics: {
        Reach: '128,000',
        Engagement: '7.1%',
        Saves: '2,800',
        CTR: '1.91%',
      },
    },
    versionB: {
      label: 'Version B — Runner + Card',
      description: 'Same idea, mid-stride at dawn with PACE Card overlay and power-song callout.',
      design: {
        Photography: 'Runner in motion',
        Headline: 'Find Your Pace.',
        CTA: 'Generate your Card',
        Typography: 'Kinetic, left-locked',
        Format: 'Feed still → Card crop',
        'Pace state': 'FLOW → BREAK',
      },
      metrics: {
        Reach: '186,000',
        Engagement: '11.4%',
        Saves: '4,600',
        CTR: '1.88%',
      },
    },
    chain:
      'VERSION A → lower engagement → insight: UI alone feels like an ad → design change: runner + Card + campaign line → VERSION B → stronger reach/engagement/saves with similar CTR.',
    conclusion:
      'Version B produced substantially stronger reach, engagement, and saves while maintaining similar CTR.',
    creativeDecision:
      'Future awareness creative leads with runners and Cards. Reserve isolated UI for consideration/convert.',
  },
  {
    id: 'test-02',
    name: 'TEST 02 — TikTok Hook',
    platform: 'TikTok' as const,
    hypothesis:
      'An outcome-led personal hook will improve early retention versus a brand introduction.',
    versionA: {
      label: 'Version A — Brand intro',
      description: '“Meet PACE on Spotify.”',
      design: {
        'Video opening': 'Logo + product name',
        Messaging: 'Brand introduction',
        Editing: 'Polished, slow',
        'Content length': '18s',
        'Pace state': 'Generic workout',
        'Platform treatment': 'Ad-like',
      },
      metrics: {
        '3s retention': '54%',
        'Avg watch time': '11.1s',
        'Completion rate': '31%',
        Shares: '6,400',
      },
    },
    versionB: {
      label: 'Version B — Proof hook',
      description: '“I ran 50 miles with these playlists. Here’s my Card.”',
      design: {
        'Video opening': 'Result + tension',
        Messaging: 'Personal proof',
        Editing: 'Native jump cuts',
        'Content length': '22s',
        'Pace state': 'PUSH → BREAK',
        'Platform treatment': 'Creator-native',
      },
      metrics: {
        '3s retention': '79%',
        'Avg watch time': '21.6s',
        'Completion rate': '49%',
        Shares: '28,400',
      },
    },
    chain:
      'VERSION A → weak 3s retention → insight: brand-first reads as an ad → design change: outcome hook + Card payoff + native edit → VERSION B → retention, watch time, completion, and shares jump.',
    conclusion:
      'Audiences stay when the first line promises a story or result. Naming Spotify too early gets scrolled.',
    creativeDecision:
      'Open TikToks with tension or mileage—introduce PACE after the hook lands.',
  },
  {
    id: 'test-03',
    name: 'TEST 03 — YouTube Thumbnail',
    platform: 'YouTube' as const,
    hypothesis:
      'Athlete + Card-focused thumbnails will lift CTR and qualified views versus UI-focused packaging.',
    versionA: {
      label: 'Version A — UI-focused',
      description: 'Centered session UI, bold wordmark, dark field.',
      design: {
        Photography: 'Product UI',
        Headline: 'PACE on Spotify',
        Typography: 'Heavy wordmark',
        Format: '16:9 thumbnail',
        Messaging: 'Feature-led',
        'Pace state': 'None',
      },
      metrics: {
        Impressions: '210,000',
        CTR: '2.4%',
        Views: '5,040',
        'Watch time (hrs)': '610',
      },
    },
    versionB: {
      label: 'Version B — Runner + Card',
      description: 'Athlete mid-stride, Card fragment, high-contrast face crop.',
      design: {
        Photography: 'Athlete face + motion',
        Headline: 'Find Your Pace',
        Typography: 'Human scale + Card type',
        Format: '16:9 thumbnail',
        Messaging: 'Identity-led',
        'Pace state': 'BREAK',
      },
      metrics: {
        Impressions: '245,000',
        CTR: '3.6%',
        Views: '8,820',
        'Watch time (hrs)': '1,240',
      },
    },
    chain:
      'VERSION A → soft CTR → insight: UI doesn’t package curiosity → design change: face + Card fragment + campaign line → VERSION B → higher CTR and more qualified watch time.',
    conclusion:
      'Human faces and Card proof increased click willingness and delivered more watch time—not just cheap clicks.',
    creativeDecision:
      'Continue athlete + Card YouTube thumbnails as the default packaging system.',
  },
]

export const objectives = [
  {
    stage: 'Discover',
    goal: 'Introduce FIND YOUR PACE as the relationship between how you run and how you listen.',
    creative: 'Challenges, teaser POVs, people-led motion, cultural questions.',
    metrics: ['Reach', 'Impressions', 'Video views'],
  },
  {
    stage: 'Engage',
    goal: 'Get runners to interact with useful or identity-rich content.',
    creative: 'Tips, challenges, Stories stickers, Card shares.',
    metrics: ['Comments', 'Shares', 'Saves', 'Engagement rate'],
  },
  {
    stage: 'Reveal',
    goal: 'Make the PACE Card feel personal, measurable, and worth opening Spotify for.',
    creative: 'Card films, state education, athlete diaries, playlist systems.',
    metrics: ['Profile visits', 'Spotify opens', 'Link clicks', 'CTR'],
  },
  {
    stage: 'Return',
    goal: 'Drive another run—and another reason to come back to Spotify.',
    creative: 'Challenges, share loops, recover playlists, event CTAs.',
    metrics: ['Session starts', 'Card shares', 'Challenge joins'],
  },
]

export const feedbackLoop = [
  { id: 'create', name: 'Create', detail: 'Ship a PACE execution for a state, audience, and platform.' },
  { id: 'test', name: 'Test', detail: 'A/B photography, hooks, CTAs, type, length, and pace-state treatment.' },
  { id: 'learn', name: 'Learn', detail: 'Read retention, saves, shares, and CTR against the objective.' },
  { id: 'change', name: 'Change', detail: 'Adjust the design system—not just the media buy.' },
  { id: 'retest', name: 'Retest', detail: 'Prove the next creative decision with audience behavior.' },
]

export const recommendations = [
  {
    title: 'Lead with people + Cards',
    evidence:
      'Runner + Card creative beat UI-only on reach, engagement, and saves while holding CTR.',
    action: 'Make Cards the hero identity asset across Instagram and paid.',
  },
  {
    title: 'Ship weekly educational short-form',
    evidence:
      'Training / BPM tips led saves—utility extends lifespan past the feed.',
    action: 'Publish a cadence/BPM series mapped to START→RECOVER.',
  },
  {
    title: 'Open TikTok with proof, not product',
    evidence:
      'Outcome hooks beat brand intros on 3s retention, watch time, completion, and shares.',
    action: 'Standardize tension-first openings; name Spotify after the hook.',
  },
  {
    title: 'Package YouTube with athlete + Card',
    evidence:
      'Athlete/Card thumbnails lifted CTR and qualified watch time vs UI frames.',
    action: 'Default face + Card fragment for films and Shorts packaging.',
  },
  {
    title: 'Treat Spotify as the experience destination',
    evidence:
      'Social drove discovery; return behavior depends on session + Card payoff in-app.',
    action: 'Every CTA should resolve into a run, a Card, or a playlist—not a dead end.',
  },
]
