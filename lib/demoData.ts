import type {
  ActivityItem,
  DiaryEntry,
  Review,
  TasteList,
  Track,
  TrackComment,
  UserProfile,
} from '@/types/models';

/** Placeholder editorial / discovery content for scaffolding UI */
export const DEMO_ARTISTS: UserProfile[] = [
  {
    id: 'artist-amber-circuit',
    email: '',
    displayName: 'Amber Circuit',
    role: 'artist',
    scene: 'Electronic',
    geography: 'Chicago, IL',
    followerCount: 734,
    bio: 'Modular hiss and late-night bus routes.',
    activeYears: '2019–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Electronic', 'Ambient'],
    sceneDescription: 'Midwest modular / warehouse afterhours.',
  },
  {
    id: 'artist-blackout-relay',
    email: '',
    displayName: 'Blackout Relay',
    role: 'artist',
    scene: 'Hardcore',
    geography: 'Brooklyn, NY',
    followerCount: 980,
    bio: 'Basement PA, blown cones, no encore.',
    activeYears: '2016–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Hardcore', 'Punk'],
    sceneDescription: 'DIY hardcore circuit, Northeast corridor.',
  },
  {
    id: 'artist-chrome-petal',
    email: '',
    displayName: 'Chrome Petal',
    role: 'artist',
    scene: 'Hyperpop',
    geography: 'Los Angeles, CA',
    followerCount: 2103,
    bio: 'Glitch sugar and freeway neon.',
    activeYears: '2021–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Hyperpop', 'Electronic'],
    sceneDescription: 'LA bedroom hyperpop / net-label orbit.',
  },
  {
    id: 'artist-drift-kiln',
    email: '',
    displayName: 'Drift Kiln',
    role: 'artist',
    scene: 'Folk',
    geography: 'Asheville, NC',
    followerCount: 312,
    bio: 'Porch mics, tape hiss, mountain dusk.',
    activeYears: '2014–2024',
    status: 'INACTIVE',
    genreTags: ['Folk', 'Indie'],
    sceneDescription: 'Appalachian folk / living-room sessions.',
  },
  {
    id: 'artist-fault-line-choir',
    email: '',
    displayName: 'Fault Line Choir',
    role: 'artist',
    scene: 'Indie',
    geography: 'Oakland, CA',
    followerCount: 540,
    bio: 'Four voices, one cracked PA.',
    activeYears: '2018–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Indie', 'Post-Punk'],
    sceneDescription: 'Bay Area warehouse indie.',
  },
  {
    id: 'artist-lot-lights',
    email: '',
    displayName: 'Lot Lights',
    role: 'artist',
    scene: 'Indie',
    geography: 'Austin, TX',
    followerCount: 611,
    bio: 'Parking-lot anthems with cracked amps.',
    activeYears: '2017–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Indie', 'Rock'],
    sceneDescription: 'Texas parking-lot rock / SXSW periphery.',
  },
  {
    id: 'artist-north-exit',
    email: '',
    displayName: 'North Exit',
    role: 'artist',
    scene: 'Punk',
    geography: 'Manchester, NH',
    followerCount: 456,
    bio: 'Three chords, one van, zero patience.',
    activeYears: '2015–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Punk', 'Hardcore'],
    sceneDescription: 'New England basement punk.',
  },
  {
    id: 'artist-oxide-room',
    email: '',
    displayName: 'Oxide Room',
    role: 'artist',
    scene: 'Industrial',
    geography: 'Pittsburgh, PA',
    followerCount: 401,
    bio: 'Rust belt rhythms, factory reverb.',
    activeYears: '2012–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Industrial', 'Electronic'],
    sceneDescription: 'Rust-belt industrial / club leftovers.',
  },
  {
    id: 'artist-signal-decay',
    email: '',
    displayName: 'Signal Decay',
    role: 'artist',
    scene: 'Industrial',
    geography: 'Detroit, MI',
    followerCount: 892,
    bio: 'Broken machines, late shifts, warehouse floors.',
    activeYears: '2010–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Industrial', 'Electronic'],
    sceneDescription: 'Detroit warehouse industrial.',
  },
  {
    id: 'artist-static-bloom',
    email: '',
    displayName: 'Static Bloom',
    role: 'artist',
    scene: 'Shoegaze',
    geography: 'Portland, OR',
    followerCount: 1284,
    bio: 'Tape-saturated guitars and parking-lot reverb.',
    activeYears: '2018–PRESENT',
    status: 'INDEPENDENT',
    genreTags: ['Shoegaze', 'Indie'],
    sceneDescription: 'Pacific Northwest shoegaze / DIY tape scene.',
  },
  {
    id: 'artist-volt-garden',
    email: '',
    displayName: 'Volt Garden',
    role: 'artist',
    scene: 'Electronic',
    geography: 'Montreal, QC',
    followerCount: 688,
    bio: 'Greenhouse synths under sodium lamps.',
    activeYears: '2020–PRESENT',
    status: 'LABEL',
    genreTags: ['Electronic', 'Synth'],
    sceneDescription: 'Montreal synth / coldwave adjacent.',
  },
  {
    id: 'artist-wire-hymnal',
    email: '',
    displayName: 'Wire Hymnal',
    role: 'artist',
    scene: 'Post-Punk',
    geography: 'Philadelphia, PA',
    followerCount: 523,
    bio: 'Cathedral delay, alleyway drums.',
    activeYears: '2013–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Post-Punk', 'Indie'],
    sceneDescription: 'Philly post-punk / church-basement circuit.',
  },
  {
    id: 'artist-zinc-parade',
    email: '',
    displayName: 'Zinc Parade',
    role: 'artist',
    scene: 'Punk',
    geography: 'Columbus, OH',
    followerCount: 290,
    bio: 'Marching drums, zinc-plated riffs.',
    activeYears: '2019–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Punk', 'Garage'],
    sceneDescription: 'Midwest garage punk / house-show network.',
  },
];

export const DEMO_TRACKS: Track[] = [
  {
    id: 'track-snow-on-the-tape',
    title: 'Snow on the Tape',
    artistId: 'artist-static-bloom',
    artistName: 'Static Bloom',
    downloadUrl: '',
    durationMs: 214000,
    downloadCount: 1842,
    repostCount: 211,
    scene: 'Shoegaze',
    geography: 'Portland, OR',
  },
  {
    id: 'track-shift-change',
    title: 'Shift Change',
    artistId: 'artist-signal-decay',
    artistName: 'Signal Decay',
    downloadUrl: '',
    durationMs: 198000,
    downloadCount: 967,
    repostCount: 88,
    scene: 'Industrial',
    geography: 'Detroit, MI',
  },
  {
    id: 'track-exit-ramp',
    title: 'Exit Ramp',
    artistId: 'artist-north-exit',
    artistName: 'North Exit',
    downloadUrl: '',
    durationMs: 156000,
    downloadCount: 540,
    repostCount: 73,
    scene: 'Punk',
    geography: 'Manchester, NH',
  },
  {
    id: 'track-pixel-bruise',
    title: 'Pixel Bruise',
    artistId: 'artist-chrome-petal',
    artistName: 'Chrome Petal',
    downloadUrl: '',
    durationMs: 172000,
    downloadCount: 3201,
    repostCount: 419,
    scene: 'Hyperpop',
    geography: 'Los Angeles, CA',
  },
  {
    id: 'track-bus-route-7',
    title: 'Bus Route 7',
    artistId: 'artist-amber-circuit',
    artistName: 'Amber Circuit',
    downloadUrl: '',
    durationMs: 188000,
    downloadCount: 1204,
    repostCount: 156,
    scene: 'Electronic',
    geography: 'Chicago, IL',
  },
  {
    id: 'track-sodium-glow',
    title: 'Sodium Glow',
    artistId: 'artist-lot-lights',
    artistName: 'Lot Lights',
    downloadUrl: '',
    durationMs: 201000,
    downloadCount: 802,
    repostCount: 94,
    scene: 'Indie',
    geography: 'Austin, TX',
  },
  {
    id: 'track-blown-cone',
    title: 'Blown Cone',
    artistId: 'artist-blackout-relay',
    artistName: 'Blackout Relay',
    downloadUrl: '',
    durationMs: 142000,
    downloadCount: 1102,
    repostCount: 201,
    scene: 'Hardcore',
    geography: 'Brooklyn, NY',
  },
  {
    id: 'track-porch-mic',
    title: 'Porch Mic',
    artistId: 'artist-drift-kiln',
    artistName: 'Drift Kiln',
    downloadUrl: '',
    durationMs: 226000,
    downloadCount: 388,
    repostCount: 41,
    scene: 'Folk',
    geography: 'Asheville, NC',
  },
];

export type FeaturedSpotlight = {
  trackId: string;
  headline: string;
  statusBlurb: string;
  badge: string;
};

export const FEATURED_SPOTLIGHT: FeaturedSpotlight = {
  trackId: 'track-snow-on-the-tape',
  headline: 'STATIC BLOOM',
  statusBlurb:
    'ORIGIN: PORTLAND, OR // GENRE: SHOEGAZE // YEARS: 2018–PRESENT // STATUS: INDEPENDENT',
  badge: 'FEATURED ARTIST',
};

/** PureVolume mosaic tiles — image-forward featured grid */
export type FeatureTile = {
  id: string;
  artistId: string;
  trackId?: string;
  title: string;
  subtitle: string;
  size: 'hero' | 'secondary' | 'small' | 'promo';
  tone: 'ash' | 'rust' | 'slate' | 'ember' | 'ink' | 'steel';
};

export const FEATURE_TILES: FeatureTile[] = [
  {
    id: 'tile-static-bloom',
    artistId: 'artist-static-bloom',
    trackId: 'track-snow-on-the-tape',
    title: 'Static Bloom',
    subtitle: "Featured — 'Snow on the Tape'",
    size: 'hero',
    tone: 'ash',
  },
  {
    id: 'tile-chrome-petal',
    artistId: 'artist-chrome-petal',
    trackId: 'track-pixel-bruise',
    title: 'Chrome Petal',
    subtitle: 'The SV Q&A — Hyperpop in LA',
    size: 'secondary',
    tone: 'ember',
  },
  {
    id: 'tile-blackout',
    artistId: 'artist-blackout-relay',
    trackId: 'track-blown-cone',
    title: 'Blackout Relay',
    subtitle: 'Basement hardcore feature',
    size: 'small',
    tone: 'ink',
  },
  {
    id: 'tile-signal',
    artistId: 'artist-signal-decay',
    trackId: 'track-shift-change',
    title: 'Signal Decay',
    subtitle: 'From Detroit, MI',
    size: 'small',
    tone: 'steel',
  },
  {
    id: 'tile-north',
    artistId: 'artist-north-exit',
    trackId: 'track-exit-ramp',
    title: 'North Exit',
    subtitle: 'Punk bands in NH',
    size: 'small',
    tone: 'rust',
  },
  {
    id: 'tile-promo',
    artistId: 'artist-lot-lights',
    trackId: 'track-sodium-glow',
    title: 'Archive Picks 2026',
    subtitle: 'Human-curated · No algorithm',
    size: 'promo',
    tone: 'slate',
  },
];

export const EVERYBODY_LISTENING = [
  'track-pixel-bruise',
  'track-snow-on-the-tape',
  'track-blown-cone',
  'track-bus-route-7',
  'track-shift-change',
  'track-sodium-glow',
] as const;

export const EDITORS_PICKS = [
  'track-pixel-bruise',
  'track-shift-change',
  'track-bus-route-7',
] as const;

export const TRENDING_TRACKS = [
  'track-pixel-bruise',
  'track-snow-on-the-tape',
  'track-bus-route-7',
  'track-sodium-glow',
] as const;

export const RECENTLY_FEATURED = [
  'track-exit-ramp',
  'track-sodium-glow',
  'track-shift-change',
] as const;

export const DEMO_COMMENTS: TrackComment[] = [
  {
    id: 'c1',
    trackId: 'track-snow-on-the-tape',
    userId: 'u1',
    displayName: 'tapehead',
    body: 'that swell hits like a dying CRT',
    timestampMs: 42000,
    createdAt: '2026-07-20T12:00:00Z',
  },
  {
    id: 'c2',
    trackId: 'track-snow-on-the-tape',
    userId: 'u2',
    displayName: 'lot_lizard',
    body: 'downloaded for the rainy drive home',
    timestampMs: 98000,
    createdAt: '2026-07-21T09:30:00Z',
  },
];

/** Listener profiles — taste archive owners (Letterboxd “members”) */
export const DEMO_LISTENERS: UserProfile[] = [
  {
    id: 'listener-mira',
    email: 'mira@example.com',
    displayName: 'mira_tape',
    role: 'listener',
    bio: 'Basement shows + rainy drives. Logging what sticks.',
    geography: 'Portland, OR',
    followerCount: 128,
  },
  {
    id: 'listener-jon',
    email: 'jon@example.com',
    displayName: 'jon_exit',
    role: 'listener',
    bio: 'Punk first, then whatever’s left on the USB.',
    geography: 'Manchester, NH',
    followerCount: 64,
  },
  {
    id: 'listener-kai',
    email: 'kai@example.com',
    displayName: 'kai_sodium',
    role: 'listener',
    bio: 'Lists > algorithms.',
    geography: 'Austin, TX',
    followerCount: 211,
  },
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-snow-on-the-tape',
    rating: 4.5,
    body: 'Feels like the last bus home in February. Not background music — you sit with it.',
    createdAt: '2026-07-22T18:00:00Z',
    likeCount: 24,
  },
  {
    id: 'rev-2',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    trackId: 'track-exit-ramp',
    rating: 4,
    body: 'Two minutes of pure New England hallway energy. Logged after the Manchester show.',
    createdAt: '2026-07-23T11:20:00Z',
    likeCount: 11,
  },
  {
    id: 'rev-3',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    trackId: 'track-pixel-bruise',
    rating: 3.5,
    body: 'Glitchy sugar rush. Great for a night drive list — not sure it survives a second week.',
    createdAt: '2026-07-24T09:10:00Z',
    likeCount: 8,
  },
  {
    id: 'rev-4',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-blown-cone',
    rating: 5,
    body: 'Maximum volume or don’t bother. Instant diary staple.',
    createdAt: '2026-07-25T21:00:00Z',
    likeCount: 41,
  },
];

export const DEMO_DIARY: DiaryEntry[] = [
  {
    id: 'diary-1',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-snow-on-the-tape',
    loggedOn: '2026-07-22',
    rating: 4.5,
    reviewId: 'rev-1',
  },
  {
    id: 'diary-2',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    trackId: 'track-exit-ramp',
    loggedOn: '2026-07-23',
    rating: 4,
    reviewId: 'rev-2',
  },
  {
    id: 'diary-3',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    trackId: 'track-pixel-bruise',
    loggedOn: '2026-07-24',
    rating: 3.5,
    reviewId: 'rev-3',
  },
  {
    id: 'diary-4',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-blown-cone',
    loggedOn: '2026-07-25',
    rating: 5,
    reviewId: 'rev-4',
  },
  {
    id: 'diary-5',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    trackId: 'track-bus-route-7',
    loggedOn: '2026-07-26',
    rating: 3,
    note: 'Solid commute track.',
  },
  {
    id: 'diary-6',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    trackId: 'track-sodium-glow',
    loggedOn: '2026-07-26',
    rating: 4,
  },
];

export const DEMO_LISTS: TasteList[] = [
  {
    id: 'list-rain',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    title: 'Rainy drive home',
    description: 'Shoegaze and sodium lights. Windows fogged.',
    trackIds: [
      'track-snow-on-the-tape',
      'track-sodium-glow',
      'track-porch-mic',
      'track-bus-route-7',
    ],
    createdAt: '2026-07-10T12:00:00Z',
    ranked: true,
  },
  {
    id: 'list-basement',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    title: 'Basement bills worth the cover',
    description: 'Hardcore / punk that still hits after the ringing stops.',
    trackIds: [
      'track-blown-cone',
      'track-exit-ramp',
      'track-shift-change',
    ],
    createdAt: '2026-07-12T15:00:00Z',
    ranked: false,
  },
  {
    id: 'list-usb',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    title: 'USB leftovers 2026',
    description: 'Whatever survived the end-of-year wipe.',
    trackIds: [
      'track-pixel-bruise',
      'track-snow-on-the-tape',
      'track-sodium-glow',
      'track-shift-change',
      'track-bus-route-7',
    ],
    createdAt: '2026-07-18T08:00:00Z',
    ranked: true,
  },
];

/** Chronological social feed — people logging / reviewing / listing */
export const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    kind: 'reviewed',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-blown-cone',
    createdAt: '2026-07-25T21:05:00Z',
    rating: 5,
    excerpt: 'Maximum volume or don’t bother. Instant diary staple.',
  },
  {
    id: 'act-2',
    kind: 'logged',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    trackId: 'track-sodium-glow',
    createdAt: '2026-07-26T10:00:00Z',
    rating: 4,
  },
  {
    id: 'act-3',
    kind: 'logged',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    trackId: 'track-bus-route-7',
    createdAt: '2026-07-26T08:30:00Z',
    rating: 3,
    excerpt: 'Solid commute track.',
  },
  {
    id: 'act-4',
    kind: 'reviewed',
    userId: 'listener-kai',
    displayName: 'kai_sodium',
    trackId: 'track-pixel-bruise',
    createdAt: '2026-07-24T09:15:00Z',
    rating: 3.5,
    excerpt:
      'Glitchy sugar rush. Great for a night drive list — not sure it survives a second week.',
  },
  {
    id: 'act-5',
    kind: 'listed',
    userId: 'listener-mira',
    displayName: 'mira_tape',
    trackId: 'track-snow-on-the-tape',
    createdAt: '2026-07-22T19:00:00Z',
    listTitle: 'Rainy drive home',
    rating: 4.5,
  },
  {
    id: 'act-6',
    kind: 'reviewed',
    userId: 'listener-jon',
    displayName: 'jon_exit',
    trackId: 'track-exit-ramp',
    createdAt: '2026-07-23T11:25:00Z',
    rating: 4,
    excerpt:
      'Two minutes of pure New England hallway energy. Logged after the Manchester show.',
  },
];

export function reviewsForTrack(trackId: string): Review[] {
  return DEMO_REVIEWS.filter((r) => r.trackId === trackId).sort(
    (a, b) => b.likeCount - a.likeCount,
  );
}

export function popularReviews(limit = 4): Review[] {
  return [...DEMO_REVIEWS]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, limit);
}

export function diaryForUser(userId: string): DiaryEntry[] {
  return DEMO_DIARY.filter((d) => d.userId === userId).sort((a, b) =>
    b.loggedOn.localeCompare(a.loggedOn),
  );
}

export function listsForUser(userId: string): TasteList[] {
  return DEMO_LISTS.filter((l) => l.userId === userId);
}

export const SCENES = [
  'Punk',
  'Shoegaze',
  'Hyperpop',
  'Industrial',
  'Indie',
  'Hardcore',
  'Electronic',
  'Folk',
  'Post-Punk',
] as const;

export const GEOGRAPHIES = [
  'Manchester, NH',
  'Los Angeles, CA',
  'Portland, OR',
  'Detroit, MI',
  'Brooklyn, NY',
  'Austin, TX',
  'Chicago, IL',
  'Asheville, NC',
  'Oakland, CA',
  'Pittsburgh, PA',
  'Montreal, QC',
  'Philadelphia, PA',
  'Columbus, OH',
] as const;

export const ALPHA_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function getTrackById(id: string): Track | undefined {
  return DEMO_TRACKS.find((t) => t.id === id);
}

export function getArtistById(id: string): UserProfile | undefined {
  return DEMO_ARTISTS.find((a) => a.id === id);
}

export function tracksByDownloads(): Track[] {
  return [...DEMO_TRACKS].sort((a, b) => b.downloadCount - a.downloadCount);
}

export function tracksByReposts(): Track[] {
  return [...DEMO_TRACKS].sort((a, b) => b.repostCount - a.repostCount);
}

export function totalDownloadsForArtist(artistId: string): number {
  return DEMO_TRACKS.filter((t) => t.artistId === artistId).reduce(
    (sum, t) => sum + t.downloadCount,
    0,
  );
}

export function artistInitial(name: string): string {
  const ch = name.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(ch) ? ch : '#';
}

export type AlphaGroup = {
  letter: string;
  artists: UserProfile[];
};

export function groupArtistsAlphabetically(
  artists: UserProfile[] = DEMO_ARTISTS,
): AlphaGroup[] {
  const sorted = [...artists].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }),
  );
  const map = new Map<string, UserProfile[]>();
  for (const artist of sorted) {
    const letter = artistInitial(artist.displayName);
    const bucket = map.get(letter) ?? [];
    bucket.push(artist);
    map.set(letter, bucket);
  }
  return Array.from(map.entries()).map(([letter, group]) => ({
    letter,
    artists: group,
  }));
}
