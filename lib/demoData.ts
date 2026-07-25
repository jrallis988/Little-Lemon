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
  {
    id: 'artist-amber-circuit',
    email: '',
    displayName: 'Amber Circuit',
    role: 'artist',
    scene: 'Electronic',
    geography: 'Chicago, IL',
    followerCount: 734,
    bio: 'Modular hiss and late-night bus routes.',
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
  {
    id: 'track-bus-route-7',
    title: 'Bus Route 7',
    artistId: 'artist-amber-circuit',
    artistName: 'Amber Circuit',
    audioUrl: '',
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
    audioUrl: '',
    durationMs: 201000,
    downloadCount: 802,
    repostCount: 94,
    scene: 'Indie',
    geography: 'Austin, TX',
  },
];

export type FeaturedSpotlight = {
  trackId: string;
  headline: string;
  statusBlurb: string;
  badge: string;
};

/** PureVolume-style editorial hero rotation */
export const FEATURED_SPOTLIGHT: FeaturedSpotlight = {
  trackId: 'track-snow-on-the-tape',
  headline: 'STATIC BLOOM',
  statusBlurb:
    'This week’s cover transmission — tape-saturated shoegaze from Portland. Download counts are the signal. Play counts stay with the artist.',
  badge: 'FEATURED ARTIST',
};

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
