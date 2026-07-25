import type { Track, UserProfile, WaveformComment } from '@/types/models';

/** Placeholder editorial / discovery content for scaffolding UI */
export const DEMO_ARTISTS: UserProfile[] = [
  {
    id: 'artist-static-bloom',
    email: '',
    displayName: 'Static Bloom',
    role: 'artist',
    scene: 'Shoegaze',
    geography: 'Portland, OR',
    followerCount: 1284,
    bio: 'Tape-saturated guitars and parking-lot reverb.',
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
  },
];

export const DEMO_TRACKS: Track[] = [
  {
    id: 'track-snow-on-the-tape',
    title: 'Snow on the Tape',
    artistId: 'artist-static-bloom',
    artistName: 'Static Bloom',
    audioUrl: '',
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
    audioUrl: '',
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
    audioUrl: '',
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
    audioUrl: '',
    durationMs: 172000,
    downloadCount: 3201,
    repostCount: 419,
    scene: 'Hyperpop',
    geography: 'Los Angeles, CA',
  },
];

export const DEMO_COMMENTS: WaveformComment[] = [
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

export const SCENES = [
  'Punk',
  'Shoegaze',
  'Hyperpop',
  'Industrial',
  'Indie',
  'Hardcore',
  'Electronic',
  'Folk',
] as const;

export const GEOGRAPHIES = [
  'Manchester, NH',
  'Los Angeles, CA',
  'Portland, OR',
  'Detroit, MI',
  'Brooklyn, NY',
  'Austin, TX',
  'Chicago, IL',
] as const;
