import type {
  ActivityItem,
  DiaryEntry,
  Review,
  TasteList,
  Track,
  TrackComment,
  UserProfile,
} from '@/types/models';
import { CATALOG_ARTISTS, CATALOG_TRACKS } from '@/lib/catalogSeed';

/** Placeholder editorial / discovery content for scaffolding UI */
export const DEMO_ARTISTS: UserProfile[] = [
  ...CATALOG_ARTISTS,
  {
    id: 'artist-couch-static',
    email: '',
    displayName: 'Couch Static',
    role: 'artist',
    scene: 'Indie',
    geography: 'Providence, RI',
    followerCount: 38,
    bio: 'Recorded in a living room between shifts.',
    activeYears: '2026–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Indie', 'Lo-fi'],
    sceneDescription: 'Brand-new Providence living-room band.',
    lineupNote: 'Four roommates. One couch. First songs online this month.',
    joinedAt: '2026-07-08',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artist-secondhand-van',
    email: '',
    displayName: 'Secondhand Van',
    role: 'artist',
    scene: 'Punk',
    geography: 'Richmond, VA',
    followerCount: 61,
    bio: 'Borrowed gear, borrowed van, real songs.',
    activeYears: '2026–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Punk', 'Garage'],
    sceneDescription: 'Fresh Richmond house-show punk.',
    lineupNote: 'A group of friends who booked their first basement show last weekend.',
    joinedAt: '2026-07-14',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artist-hallway-radio',
    email: '',
    displayName: 'Hallway Radio',
    role: 'artist',
    scene: 'Shoegaze',
    geography: 'Seattle, WA',
    followerCount: 44,
    bio: 'Demos taped in a shared apartment hallway.',
    activeYears: '2026–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Shoegaze', 'Dream Pop'],
    sceneDescription: 'New Seattle apartment-scene shoegaze.',
    lineupNote: 'Two friends + a neighbor on drums. Nobody signed. Yet.',
    joinedAt: '2026-07-18',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1514320291840-3092126d9b2a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artist-night-shift-kids',
    email: '',
    displayName: 'Night Shift Kids',
    role: 'artist',
    scene: 'Electronic',
    geography: 'Minneapolis, MN',
    followerCount: 27,
    bio: 'After-close synths from a diner parking lot.',
    activeYears: '2026–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Electronic', 'Synth'],
    sceneDescription: 'Just-uploaded Minneapolis bedroom electronic.',
    lineupNote: 'College friends making tracks after closing shifts.',
    joinedAt: '2026-07-21',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artist-split-lip-sunday',
    email: '',
    displayName: 'Split Lip Sunday',
    role: 'artist',
    scene: 'Hardcore',
    geography: 'Cleveland, OH',
    followerCount: 73,
    bio: 'First EP burned to USB sticks at practice.',
    activeYears: '2025–PRESENT',
    status: 'UNSIGNED',
    genreTags: ['Hardcore', 'Punk'],
    sceneDescription: 'Cleveland DIY — still playing living rooms.',
    lineupNote: 'High-school friends who never got a label call. Good.',
    joinedAt: '2026-06-29',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1459749411175-04bf529e0013?auto=format&fit=crop&w=800&q=80',
  },

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
    lineupNote: 'Modular night crew from Chicago warehouses.',
    joinedAt: '2024-03-12',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Basement hardcore — same four kids since high school.',
    joinedAt: '2023-11-02',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'One laptop, one roommate, LA freeways at 2am.',
    joinedAt: '2024-08-19',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Porch sessions with whoever’s in town.',
    joinedAt: '2022-05-01',
    catalogKind: 'emerging',
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
    lineupNote: 'Four voices, one cracked PA, Oakland warehouse nights.',
    joinedAt: '2025-01-14',
    catalogKind: 'emerging',
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
    lineupNote: 'Parking-lot rock with friends who still share a van.',
    joinedAt: '2024-06-22',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Three friends from Manchester, NH. One practice space.',
    joinedAt: '2025-09-03',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Rust-belt industrial duo out of a Pittsburgh loft.',
    joinedAt: '2023-04-18',
    catalogKind: 'emerging',
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
    lineupNote: 'Late-shift warehouse crew, Detroit.',
    joinedAt: '2022-12-09',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Tape-saturated Portland duo — still unsigned energy.',
    joinedAt: '2024-01-28',
    catalogKind: 'emerging',
    avatarUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
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
    lineupNote: 'Montreal synth project that snuck onto a small label.',
    joinedAt: '2023-07-30',
    catalogKind: 'emerging',
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
    lineupNote: 'Philly post-punk friends who book their own church basements.',
    joinedAt: '2024-10-11',
    catalogKind: 'emerging',
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
    lineupNote: 'Midwest house-show punk. Friends first, band second.',
    joinedAt: '2025-11-20',
    catalogKind: 'emerging',
  },
];

export const DEMO_TRACKS: Track[] = [
  ...CATALOG_TRACKS,
  {
    id: 'track-living-room-static',
    title: 'Living Room Static',
    artistId: 'artist-couch-static',
    artistName: 'Couch Static',
    downloadUrl: '',
    durationMs: 168000,
    downloadCount: 42,
    repostCount: 9,
    scene: 'Indie',
    geography: 'Providence, RI',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'track-borrowed-cables',
    title: 'Borrowed Cables',
    artistId: 'artist-secondhand-van',
    artistName: 'Secondhand Van',
    downloadUrl: '',
    durationMs: 131000,
    downloadCount: 67,
    repostCount: 14,
    scene: 'Punk',
    geography: 'Richmond, VA',
    artworkUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'track-apartment-reverb',
    title: 'Apartment Reverb',
    artistId: 'artist-hallway-radio',
    artistName: 'Hallway Radio',
    downloadUrl: '',
    durationMs: 203000,
    downloadCount: 51,
    repostCount: 11,
    scene: 'Shoegaze',
    geography: 'Seattle, WA',
    artworkUrl: 'https://images.unsplash.com/photo-1514320291840-3092126d9b2a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'track-after-close',
    title: 'After Close',
    artistId: 'artist-night-shift-kids',
    artistName: 'Night Shift Kids',
    downloadUrl: '',
    durationMs: 194000,
    downloadCount: 33,
    repostCount: 6,
    scene: 'Electronic',
    geography: 'Minneapolis, MN',
    artworkUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'track-usb-first-ep',
    title: 'USB First EP',
    artistId: 'artist-split-lip-sunday',
    artistName: 'Split Lip Sunday',
    downloadUrl: '',
    durationMs: 118000,
    downloadCount: 88,
    repostCount: 19,
    scene: 'Hardcore',
    geography: 'Cleveland, OH',
    artworkUrl: 'https://images.unsplash.com/photo-1459749411175-04bf529e0013?auto=format&fit=crop&w=800&q=80',
  },

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
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
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
    artworkUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
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
    artistId: 'artist-couch-static',
    trackId: 'track-living-room-static',
    title: 'Just Found',
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
  'Pop',
  'Alt-Pop',
  'Pop-Punk',
  'Hip-Hop',
  'R&B',
  'Indie',
  'Punk',
  'Hardcore',
  'Metalcore',
  'Metal',
  'Shoegaze',
  'Hyperpop',
  'Electronic',
  'Psych',
  'Folk',
  'Comedy',
  'Industrial',
  'Post-Punk',
  'Dance-Pop',
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
  'Providence, RI',
  'Richmond, VA',
  'Seattle, WA',
  'Minneapolis, MN',
  'Cleveland, OH',
  'London, UK',
  'Toronto, ON',
  'Nashville, TN',
  'Sheffield, UK',
  'Perth, AU',
  'Hollywood, CA',
  'Franklin, TN',
  'Baltimore, MD',
  'New York, NY',
] as const;

export const ALPHA_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');


/** Artists who feel like a YouTube stumble — unsigned / independent, often brand-new. */
export function isDiscoverableFind(artist: UserProfile): boolean {
  if (artist.catalogKind === 'catalog') return false;
  return artist.status === 'UNSIGNED' || artist.status === 'INDEPENDENT';
}

export function catalogArtists(): UserProfile[] {
  return DEMO_ARTISTS.filter((a) => a.catalogKind === 'catalog');
}

export function emergingArtists(): UserProfile[] {
  return DEMO_ARTISTS.filter((a) => a.catalogKind !== 'catalog');
}

export function isBrandNew(artist: UserProfile, withinDays = 60): boolean {
  if (!artist.joinedAt) return false;
  const joined = new Date(artist.joinedAt).getTime();
  const cutoff = Date.now() - withinDays * 24 * 60 * 60 * 1000;
  return joined >= cutoff;
}

export function unsignedArtists(): UserProfile[] {
  return DEMO_ARTISTS.filter((a) => a.status === 'UNSIGNED');
}

/** Newest joiners first — the “random new band” discovery rail. */
export function justFoundArtists(limit = 8): UserProfile[] {
  return [...DEMO_ARTISTS]
    .filter(isDiscoverableFind)
    .sort((a, b) => (b.joinedAt ?? '').localeCompare(a.joinedAt ?? ''))
    .slice(0, limit);
}

export function brandNewArtists(limit = 8): UserProfile[] {
  return justFoundArtists(40).filter((a) => isBrandNew(a)).slice(0, limit);
}

export function firstTrackForArtist(artistId: string): Track | undefined {
  return DEMO_TRACKS.find((t) => t.artistId === artistId);
}

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
