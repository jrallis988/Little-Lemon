export const SIM_DISCLAIMER =
  'SIMULATED DATA — PACE is a fictional self-initiated portfolio project exploring a Spotify × running campaign concept. It is not an official Spotify launch. Performance figures are invented for demonstration.'

export const clientBrief = {
  client: 'Spotify',
  category: 'Music / Audio / Fitness Culture',
  campaign: 'PACE — Find Your Pace',
  opportunity:
    'Spotify is already part of many people’s running routines. Its role is primarily passive: Choose music → Press play → Run. The opportunity is to strengthen Spotify’s relationship with running culture without turning Spotify into a dedicated fitness-tracking platform.',
  objective:
    'Increase engagement with Spotify’s running and workout listening experiences by helping runners discover music that fits the way they run.',
  encourage: [
    'Running playlist engagement',
    'Music discovery',
    'Repeat listening',
    'Playlist saves',
    'Spotify engagement during workouts',
    'Social sharing',
    'User participation',
    'Return visits to Spotify',
  ],
}

export const coreIdea = {
  definition:
    'Spotify doesn’t need to track your run. Spotify gives your run its soundtrack.',
  insight:
    'Every runner has a pace—but pace isn’t only speed. Music plays a different role in each of those experiences.',
  meaning:
    'FIND YOUR PACE means discovering the relationship between how you run and how you listen.',
  filter:
    'Could Spotify realistically approve, produce, launch, and measure this—while staying music-first?',
}

export const problem = {
  title: 'The opportunity',
  passive: 'Choose music → Press play → Run.',
  statement:
    'Spotify may already be present during someone’s run, but the relationship is largely passive.',
  question:
    'How could Spotify play a more meaningful role in the running experience—through music?',
  whyItMatters:
    'PACE builds on an existing behavior (RUNNING → MUSIC → SPOTIFY) rather than manufacturing an unrelated connection or competing with Strava, Garmin, or Nike Run Club.',
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
  runningLayer: 'an existing cultural habit',
  connection:
    'Millions already run with music. PACE connects listening behavior to that habit so Spotify becomes a more intentional part of the run—without becoming a fitness tracker.',
  positioning:
    'Spotify doesn’t need to own GPS, coaching, or race prediction. Spotify owns the soundtrack of the run.',
}

export const paceStates = [
  {
    id: 'start',
    name: 'Start',
    title: 'Find Your Rhythm',
    description: 'Music that helps the runner begin moving and establish momentum.',
    visual: 'Open, controlled, spacious type. Electric blue energy.',
    music: 'Building BPM, familiar openers, warmup playlists.',
    color: 'Electric Blue',
  },
  {
    id: 'flow',
    name: 'Flow',
    title: 'Hold Your Pace',
    description: 'Music that supports rhythm and consistency.',
    visual: 'Rhythmic repeats, consistent cadence. Spotify green.',
    music: 'Matched tempo, sustained energy, steady playlists.',
    color: 'Spotify Green',
  },
  {
    id: 'push',
    name: 'Push',
    title: 'Pick It Up',
    description: 'Higher-energy music for increased intensity.',
    visual: 'Compressed, bold, faster type. Volt yellow.',
    music: 'Rising energy, denser edits, higher BPM.',
    color: 'Volt Yellow',
  },
  {
    id: 'beat',
    name: 'Beat',
    title: 'Go For It',
    description:
      'The music associated with the runner’s hardest effort, final push, or performance moment.',
    visual: 'Oversized, dense, explosive type. Signal orange.',
    music: 'Peak tracks, power songs, final-push energy.',
    color: 'Signal Orange',
  },
  {
    id: 'recover',
    name: 'Recover',
    title: 'Bring It Down',
    description: 'Lower-energy music for cooldown and recovery.',
    visual: 'Open, quiet, slower type. Pulse violet.',
    music: 'Lower BPM, longer breath, cooldown playlists.',
    color: 'Pulse Violet',
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
      'Your first mile already has a soundtrack. Find the songs that keep you moving.',
    creativeNote:
      'Warm START → FLOW creative. Soft CTAs. Music identity Cards over race language.',
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
      'FLOW and PUSH states. Playlist tips + identity Cards. Weekly listen-again CTAs.',
  },
  {
    id: 'racer',
    name: 'The Racer',
    tagline: 'Performance-focused athlete',
    description:
      'Obsessed with splits and PRs—but still chooses a power song. Music is a training tool as much as a soundtrack.',
    motivations: ['Power songs', 'Final push', 'Music intensity'],
    messaging:
      'Find the track that wins the session. Your power song earns its place.',
    creativeNote:
      'PUSH and BEAT states. Music-forward Cards. Challenge-led TikToks.',
  },
]

export const behavioralLoop = [
  {
    id: 'discover',
    name: 'Discover',
    detail: 'See a PACE challenge or story on social.',
  },
  {
    id: 'listen',
    name: 'Listen',
    detail: 'Open the PACE experience on Spotify.',
  },
  {
    id: 'run',
    name: 'Run',
    detail: 'Spotify recommends a running soundtrack.',
  },
  {
    id: 'discover-music',
    name: 'Discover music',
    detail: 'Find tracks and playlists that fit the run.',
  },
  {
    id: 'reveal',
    name: 'Reveal your pace',
    detail: 'Unlock a music-first PACE Card.',
  },
  {
    id: 'share',
    name: 'Share',
    detail: 'Post the Card—friends discover songs too.',
  },
  {
    id: 'again',
    name: 'Listen again',
    detail: 'Return to Spotify for the next run.',
  },
]

export const platformRoles = [
  {
    platform: 'TikTok' as const,
    purpose: 'Participation + Discovery',
    role: 'Short-form challenges and questions that make people move—and open Spotify.',
    examples: [
      '“What song makes you run faster?”',
      '“What’s your final-mile song?”',
      'Run one mile to this playlist',
      'BPM vs. mile experiments',
    ],
    notFor: 'Not a dump of polished brand films. Native experiments beat overproduced ads.',
  },
  {
    platform: 'Instagram' as const,
    purpose: 'Identity + Sharing',
    role: 'PACE Cards, runner identities, playlist graphics, artist/song sharing, Stories, and Reels.',
    examples: [
      'PACE Card grid',
      'Playlist cover Stories',
      'Power-track Reels',
      'Artist × runner carousels',
    ],
    notFor: 'Not generic workout stock without music. Identity and soundtrack own this surface.',
  },
  {
    platform: 'YouTube' as const,
    purpose: 'Storytelling',
    role: 'First 5Ks, routines, runner stories, music experiments, artist playlists, and how runners use music.',
    examples: [
      'Music diaries',
      'First 5K films',
      'Playlist experiment docs',
      'Shorts that feed long-form',
    ],
    notFor: 'Don’t compress every story into 15 seconds. Depth builds belief here.',
  },
  {
    platform: 'Spotify' as const,
    purpose: 'The Experience',
    role: 'Music discovery, running playlists, personalization, PACE activation, and results—every social path points here.',
    examples: [
      'PACE playlist hub',
      'Personalized recommendations',
      'PACE Card generation',
      'Listen-again return loops',
    ],
    notFor: 'Social is the invitation. Spotify is where listening actually happens.',
  },
]

export const pillars = [
  {
    id: 'Product' as const,
    name: 'Experience',
    description: 'PACE playlists, Cards, Spotify UI, and listening moments.',
    examples: [
      'PACE Card reveals',
      'Playlist artwork systems',
      'Mobile Spotify frames',
      'State-based playlists',
    ],
  },
  {
    id: 'Training' as const,
    name: 'Listening tips',
    description: 'BPM cues, playlist structure, and music-for-run education.',
    examples: [
      'Match BPM to easy pace',
      'START→FLOW warmup picks',
      'Push-interval playlists',
      'Recovery cooldown guides',
    ],
  },
  {
    id: 'People' as const,
    name: 'People',
    description: 'Runner stories and the music that carried them.',
    examples: [
      'First 5K with a power song',
      'Artist × runner films',
      'Community music profiles',
      'Final-push track diaries',
    ],
  },
  {
    id: 'Culture' as const,
    name: 'Culture',
    description: 'Challenges, humor, trends, and music discovery moments.',
    examples: [
      'What song makes you faster?',
      'Final-mile song polls',
      'Duet challenges',
      'Playlist taste memes',
    ],
  },
  {
    id: 'Community' as const,
    name: 'Community',
    description: 'Shared Cards, challenges, and participation that drives listens.',
    examples: [
      'City playlist challenges',
      'Card share cascades',
      'Friend power-song swaps',
      'Group-run playlist drops',
    ],
  },
]

export const calendar = [
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Mon', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Culture' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Duet your power song', title: 'What song makes you run faster?' },
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Wed', platform: 'Instagram' as const, format: 'Reel' as const, pillar: 'Culture' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Open Spotify', title: 'Your run already has a soundtrack' },
  { week: 1 as const, weekLabel: 'Week 1 — Discover', day: 'Fri', platform: 'YouTube' as const, format: 'Short' as const, pillar: 'People' as const, stage: 'Tease' as const, objective: 'Discover', cta: 'Watch the story', title: 'Before the first PACE playlist' },
  { week: 2 as const, weekLabel: 'Week 2 — Listen + Run', day: 'Mon', platform: 'Instagram' as const, format: 'Carousel' as const, pillar: 'Product' as const, stage: 'Reveal' as const, objective: 'Listen', cta: 'Open Spotify', title: 'Music for five run moments' },
  { week: 2 as const, weekLabel: 'Week 2 — Listen + Run', day: 'Mon', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'People' as const, stage: 'Reveal' as const, objective: 'Run', cta: 'Try a START playlist', title: 'I ran my first mile with this playlist' },
  { week: 2 as const, weekLabel: 'Week 2 — Listen + Run', day: 'Tue', platform: 'YouTube' as const, format: 'Video' as const, pillar: 'Product' as const, stage: 'Reveal' as const, objective: 'Listen', cta: 'See how it works', title: 'PACE: soundtrack, not tracker' },
  { week: 3 as const, weekLabel: 'Week 3 — Reveal + Share', day: 'Mon', platform: 'Instagram' as const, format: 'Reel' as const, pillar: 'Product' as const, stage: 'Educate' as const, objective: 'Reveal', cta: 'Save your Card', title: 'Your first music-first PACE Card' },
  { week: 3 as const, weekLabel: 'Week 3 — Reveal + Share', day: 'Tue', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Training' as const, stage: 'Educate' as const, objective: 'Discover music', cta: 'Match your BPM', title: 'Easy-pace BPM in 20 seconds' },
  { week: 3 as const, weekLabel: 'Week 3 — Reveal + Share', day: 'Thu', platform: 'YouTube' as const, format: 'Video' as const, pillar: 'People' as const, stage: 'Engage' as const, objective: 'Listen', cta: 'Watch full story', title: 'How music changed my 5K' },
  { week: 3 as const, weekLabel: 'Week 3 — Reveal + Share', day: 'Sat', platform: 'Instagram' as const, format: 'Story' as const, pillar: 'Community' as const, stage: 'Engage' as const, objective: 'Share', cta: 'Share your Card', title: 'Playlist challenge RSVP' },
  { week: 4 as const, weekLabel: 'Week 4 — Listen again', day: 'Mon', platform: 'Instagram' as const, format: 'Feed' as const, pillar: 'Product' as const, stage: 'Convert' as const, objective: 'Share', cta: 'Generate your Card', title: 'PACE Card identity series' },
  { week: 4 as const, weekLabel: 'Week 4 — Listen again', day: 'Wed', platform: 'TikTok' as const, format: 'TikTok' as const, pillar: 'Community' as const, stage: 'Engage' as const, objective: 'Share', cta: 'Join the challenge', title: 'Final-mile song challenge' },
  { week: 4 as const, weekLabel: 'Week 4 — Listen again', day: 'Fri', platform: 'YouTube' as const, format: 'Short' as const, pillar: 'Culture' as const, stage: 'Evergreen' as const, objective: 'Listen again', cta: 'Open Recover playlist', title: 'Recover playlist moment' },
]

export const paceCardExample = {
  name: 'Alex Rivera',
  personality: 'THE PACER',
  avgMusicBpm: '156',
  powerTrack: 'Blinding Lights — The Weeknd',
  topArtist: 'Fred again..',
  fastestFeeling: 'Losing It — Fisher',
  finalPush: 'Lose Yourself — Eminem',
  runningSound: 'Alternative · Electronic · Indie',
  topPlaylist: 'PACE: Flow State',
}

export const colorSystem = [
  { name: 'Black + White', role: 'Spotify foundation', swatch: '#1A1C1E' },
  { name: 'Spotify Green', role: 'Brand ownership / FLOW', swatch: '#1DB954' },
  { name: 'Electric Blue', role: 'START / preparation', swatch: '#2F6BFF' },
  { name: 'Volt Yellow', role: 'PUSH / increasing energy', swatch: '#C5FF3D' },
  { name: 'Signal Orange', role: 'BEAT / peak intensity', swatch: '#FF5A36' },
  { name: 'Pulse Violet', role: 'RECOVER / decompression', swatch: '#8B5CFF' },
]

export const typeSystem = [
  { state: 'START', feel: 'Open · Controlled · Spacious' },
  { state: 'FLOW', feel: 'Rhythmic · Repeated · Consistent' },
  { state: 'PUSH', feel: 'Compressed · Bold · Faster' },
  { state: 'BEAT', feel: 'Oversized · Dense · Explosive' },
  { state: 'RECOVER', feel: 'Open · Quiet · Slower' },
]

export const creativeExecutions = [
  {
    id: 'tt-challenge',
    channel: 'TikTok',
    format: 'Challenge',
    title: 'What song makes you run faster?',
    state: 'Push',
    note: 'Native hook → duet → open Spotify playlist.',
  },
  {
    id: 'tt-final',
    channel: 'TikTok',
    format: 'Challenge',
    title: 'What’s your final-mile song?',
    state: 'Beat',
    note: 'Music discovery wrapped in a BEAT-state dare.',
  },
  {
    id: 'ig-card',
    channel: 'Instagram',
    format: 'Feed / PACE Card',
    title: 'PACE Card share',
    state: 'Beat',
    note: 'Music identity asset—shareable soundtrack, not a race report.',
  },
  {
    id: 'ig-story',
    channel: 'Instagram',
    format: 'Stories',
    title: 'Playlist cover Stories',
    state: 'Flow',
    note: 'Album art + track stickers + Spotify CTA.',
  },
  {
    id: 'ig-reel',
    channel: 'Instagram',
    format: 'Reel',
    title: 'Five states, five soundtracks',
    state: 'Flow',
    note: 'Kinetic type + waveform + track titles.',
  },
  {
    id: 'ig-carousel',
    channel: 'Instagram',
    format: 'Carousel',
    title: 'How music fits the run',
    state: 'Start',
    note: 'Education that still looks like music identity.',
  },
  {
    id: 'yt-story',
    channel: 'YouTube',
    format: 'Long-form',
    title: 'First 5K: music diary',
    state: 'Beat',
    note: 'Story depth with playlist chapters.',
  },
  {
    id: 'yt-short',
    channel: 'YouTube',
    format: 'Short',
    title: 'Final-push song',
    state: 'Push',
    note: 'Bridge from discovery into longer films.',
  },
  {
    id: 'spotify-mobile',
    channel: 'Spotify',
    format: 'Mobile UI',
    title: 'PACE playlist hub',
    state: 'Flow',
    note: 'Where listening actually happens.',
  },
  {
    id: 'playlist-art',
    channel: 'Spotify',
    format: 'Playlist artwork',
    title: 'PUSH playlist system',
    state: 'Push',
    note: 'Energy color + waveform without needing the wordmark first.',
  },
  {
    id: 'paid-social',
    channel: 'Paid social',
    format: 'Ad',
    title: 'Find Your Pace — paid cut',
    state: 'Beat',
    note: 'Album art + power track + Spotify CTA.',
  },
  {
    id: 'ooh',
    channel: 'OOH / Digital',
    format: 'Poster',
    title: 'Soundtrack outdoor',
    state: 'Start',
    note: 'Track titles + green wordmark at city scale.',
  },
  {
    id: 'motion',
    channel: 'Motion',
    format: 'Frame sequence',
    title: 'State transition frames',
    state: 'Push',
    note: 'Typography accelerates with BPM and waveforms.',
  },
  {
    id: 'challenge-pack',
    channel: 'Community',
    format: 'Challenge kit',
    title: 'Run one mile to this playlist',
    state: 'Beat',
    note: 'Shareable rules + Card badge + playlist link.',
  },
]

export const abTests = [
  {
    id: 'test-01',
    name: 'TEST 01 — Instagram Creative',
    platform: 'Instagram' as const,
    hypothesis:
      'If the execution communicates running without music, engagement may stay high while Spotify conversion stays weak.',
    versionA: {
      label: 'Version A — Runner-focused',
      description: 'Strong runner photography. Minimal music cues. Soft brand CTA.',
      design: {
        Photography: 'Runner in motion only',
        Headline: 'Find Your Pace.',
        CTA: 'Learn more',
        Typography: 'Athletic, static',
        Format: 'Feed still',
        Music: 'None visible',
        'Pace state': 'FLOW implied',
      },
      metrics: {
        Reach: '186,000',
        Engagement: '11.4%',
        'Spotify CTR': '0.9%',
        'Playlist starts': '1,200',
      },
    },
    versionB: {
      label: 'Version B — Music-forward',
      description:
        'Same runner, plus album artwork, playlist messaging, Spotify UI fragment, and a listen CTA.',
      design: {
        Photography: 'Runner + album art overlay',
        Headline: 'Find the soundtrack for your run.',
        CTA: 'Open Spotify',
        Typography: 'Kinetic + track meta',
        Format: 'Feed still → Card crop',
        Music: 'Artwork, BPM, track title',
        'Pace state': 'FLOW → BEAT',
      },
      metrics: {
        Reach: '178,000',
        Engagement: '10.8%',
        'Spotify CTR': '2.4%',
        'Playlist starts': '4,100',
      },
    },
    chain:
      'VERSION A → strong engagement, weak Spotify conversion → insight: communicates running, not music → design change: album art, playlist message, Spotify UI, listen CTA → VERSION B → improved Spotify engagement.',
    conclusion:
      'Version B traded a little vanity engagement for materially stronger Spotify intent—the metric that matches the brief.',
    creativeDecision:
      'Lead social with music cues (artwork, track, playlist, UI). Running imagery supports; it does not replace the soundtrack.',
  },
  {
    id: 'test-02',
    name: 'TEST 02 — TikTok Hook',
    platform: 'TikTok' as const,
    hypothesis:
      'An outcome-led music hook will improve early retention versus a brand introduction.',
    versionA: {
      label: 'Version A — Brand intro',
      description: '“Meet PACE on Spotify.”',
      design: {
        'Video opening': 'Logo + product name',
        Messaging: 'Brand introduction',
        Editing: 'Polished, slow',
        'Content length': '18s',
        Music: 'Generic bed',
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
      label: 'Version B — Music proof hook',
      description: '“This was my final-mile song. Here’s my Card.”',
      design: {
        'Video opening': 'Track title + tension',
        Messaging: 'Personal soundtrack proof',
        Editing: 'Native jump cuts',
        'Content length': '22s',
        Music: 'Named power track',
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
      'VERSION A → weak 3s retention → insight: brand-first reads as an ad → design change: named track hook + Card payoff + native edit → VERSION B → retention, watch time, completion, and shares jump.',
    conclusion:
      'Audiences stay for a song story. Naming Spotify too early gets scrolled.',
    creativeDecision:
      'Open TikToks with a track or result—introduce PACE after the hook lands.',
  },
  {
    id: 'test-03',
    name: 'TEST 03 — YouTube Thumbnail',
    platform: 'YouTube' as const,
    hypothesis:
      'Athlete + album/Card packaging will lift CTR versus UI-only packaging.',
    versionA: {
      label: 'Version A — UI-focused',
      description: 'Centered Spotify session UI, bold wordmark.',
      design: {
        Photography: 'Product UI',
        Headline: 'PACE on Spotify',
        Typography: 'Heavy wordmark',
        Format: '16:9 thumbnail',
        Messaging: 'Feature-led',
        Music: 'UI only',
      },
      metrics: {
        Impressions: '210,000',
        CTR: '2.4%',
        Views: '5,040',
        'Watch time (hrs)': '610',
      },
    },
    versionB: {
      label: 'Version B — Runner + album art',
      description: 'Athlete mid-stride, album art fragment, Card type.',
      design: {
        Photography: 'Athlete + artwork',
        Headline: 'Find Your Pace',
        Typography: 'Human scale + track meta',
        Format: '16:9 thumbnail',
        Messaging: 'Soundtrack identity',
        Music: 'Album art visible',
      },
      metrics: {
        Impressions: '245,000',
        CTR: '3.6%',
        Views: '8,820',
        'Watch time (hrs)': '1,240',
      },
    },
    chain:
      'VERSION A → soft CTR → insight: UI doesn’t package curiosity → design change: face + album art + campaign line → VERSION B → higher CTR and more qualified watch time.',
    conclusion:
      'Faces and music artwork increased click willingness and delivered more watch time.',
    creativeDecision:
      'Default athlete + album/Card packaging for films and Shorts.',
  },
]

export const proposedKpis = [
  {
    group: 'Listening',
    items: ['Playlist starts', 'Playlist saves', 'Track saves', 'Repeat listening'],
  },
  {
    group: 'Participation',
    items: ['PACE participation', 'Card generation', 'Challenge joins', 'Completion rate'],
  },
  {
    group: 'Social → Spotify',
    items: ['Spotify click-through', 'Card shares', 'Video completion', 'Cost per engagement'],
  },
  {
    group: 'Discovery',
    items: ['Music discovery behavior', 'New artist follows', 'Return visits to Spotify'],
  },
]

export const objectives = [
  {
    stage: 'Discover',
    goal: 'Introduce FIND YOUR PACE as the relationship between how you run and how you listen.',
    creative: 'Challenges, teaser POVs, people-led motion, cultural music questions.',
    metrics: ['Reach', 'Impressions', 'Video views'],
  },
  {
    stage: 'Engage',
    goal: 'Get runners to interact with useful or identity-rich music content.',
    creative: 'Tips, challenges, Stories stickers, Card shares.',
    metrics: ['Comments', 'Shares', 'Saves', 'Engagement rate'],
  },
  {
    stage: 'Listen',
    goal: 'Move people into Spotify playlists, saves, and PACE participation.',
    creative: 'Playlist CTAs, Card films, Spotify UI, artist features.',
    metrics: ['Spotify CTR', 'Playlist starts', 'Playlist saves'],
  },
  {
    stage: 'Return',
    goal: 'Drive another listen—and another reason to come back to Spotify.',
    creative: 'Share loops, recover playlists, challenge rematches.',
    metrics: ['Repeat listening', 'Card shares', 'Return visits'],
  },
]

export const feedbackLoop = [
  { id: 'create', name: 'Create', detail: 'Ship a PACE execution for a state, audience, and platform.' },
  { id: 'test', name: 'Test', detail: 'A/B photography, hooks, CTAs, music cues, length, and pace-state treatment.' },
  { id: 'learn', name: 'Learn', detail: 'Read retention, saves, shares, and Spotify CTR against the brief.' },
  { id: 'change', name: 'Change', detail: 'Adjust the design system—especially music presence—not just the media buy.' },
  { id: 'retest', name: 'Retest', detail: 'Prove the next creative decision with audience behavior.' },
]

export const recommendations = [
  {
    title: 'Lead with soundtrack cues',
    evidence:
      'Runner-only creative engaged well but under-converted to Spotify; music-forward variants lifted CTR and playlist starts.',
    action: 'Put album art, track titles, BPM, and Spotify UI in the first frame.',
  },
  {
    title: 'Ship weekly listening tips',
    evidence:
      'BPM / playlist education led saves—utility extends lifespan past the feed.',
    action: 'Publish a cadence/BPM series mapped to START→RECOVER playlists.',
  },
  {
    title: 'Open TikTok with a named track',
    evidence:
      'Song-story hooks beat brand intros on retention, watch time, completion, and shares.',
    action: 'Standardize tension-first openings; name Spotify after the hook.',
  },
  {
    title: 'Package YouTube with athlete + artwork',
    evidence:
      'Athlete + album packaging lifted CTR and qualified watch time vs UI frames.',
    action: 'Default face + artwork fragment for films and Shorts.',
  },
  {
    title: 'Keep every path pointing to listening',
    evidence:
      'The brief succeeds only if social drives playlist starts, saves, and return visits.',
    action: 'Every CTA resolves into a playlist, Card, or listen-again loop—not a dead end.',
  },
]
