import type { Album } from '@/types/models';

const USER_AGENT = 'Listenbox/0.1.0 (https://github.com/jrallis988/Little-Lemon; listenbox@local.dev)';
const MB_BASE = 'https://musicbrainz.org/ws/2';
const COVER_BASE = 'https://coverartarchive.org/release-group';

/** Stable palette for searched albums without local seed colors. */
const COVER_COLORS = [
  '#E8D5C4',
  '#C5D5E4',
  '#F2C94C',
  '#4A90A4',
  '#E85A4F',
  '#F5E6D3',
  '#B8C5D6',
  '#F4A261',
];

type MbArtistCredit = { name?: string; artist?: { name?: string } };
type MbReleaseGroup = {
  id: string;
  title?: string;
  'first-release-date'?: string;
  'primary-type'?: string;
  'artist-credit'?: MbArtistCredit[];
  tags?: { name: string; count: number }[];
};

type MbSearchResponse = {
  'release-groups'?: MbReleaseGroup[];
};

function artistName(credit: MbArtistCredit[] | undefined): string {
  if (!credit?.length) return 'Unknown artist';
  return credit
    .map((c) => c.name || c.artist?.name || '')
    .filter(Boolean)
    .join(', ');
}

function yearFromDate(date?: string): number {
  if (!date) return 0;
  const y = Number.parseInt(date.slice(0, 4), 10);
  return Number.isFinite(y) ? y : 0;
}

function colorForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % COVER_COLORS.length;
  }
  return COVER_COLORS[hash] ?? COVER_COLORS[0];
}

function genreFromTags(tags?: { name: string; count: number }[]): string {
  if (!tags?.length) return 'Album';
  const sorted = [...tags].sort((a, b) => b.count - a.count);
  return sorted[0]?.name ?? 'Album';
}

export function coverArtUrl(mbid: string, size: 250 | 500 = 250): string {
  return `${COVER_BASE}/${mbid}/front-${size}`;
}

export function releaseGroupToAlbum(rg: MbReleaseGroup): Album {
  return {
    id: `mb-${rg.id}`,
    musicBrainzId: rg.id,
    title: rg.title?.trim() || 'Untitled',
    artist: artistName(rg['artist-credit']),
    year: yearFromDate(rg['first-release-date']),
    coverColor: colorForId(rg.id),
    genre: rg['primary-type'] || genreFromTags(rg.tags) || 'Album',
    coverUrl: coverArtUrl(rg.id),
  };
}

/**
 * Search MusicBrainz release groups (albums/EPs).
 * Respects MusicBrainz etiquette: identify the app via User-Agent.
 */
export async function searchAlbums(query: string, limit = 8): Promise<Album[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Free-text Lucene query ranks title/artist matches better than field ORs.
  const params = new URLSearchParams({
    query: trimmed,
    fmt: 'json',
    limit: String(Math.max(limit, 12)),
  });

  const res = await fetch(`${MB_BASE}/release-group/?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  });

  if (!res.ok) {
    throw new Error(`MusicBrainz search failed (${res.status})`);
  }

  const data = (await res.json()) as MbSearchResponse;
  const groups = data['release-groups'] ?? [];

  // Prefer full albums, then EPs; drop noise like bootlegs when possible.
  const rank = (rg: MbReleaseGroup) => {
    const type = rg['primary-type'] ?? '';
    if (type === 'Album') return 0;
    if (type === 'EP') return 1;
    if (type === 'Single') return 2;
    return 3;
  };

  return [...groups]
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit)
    .map(releaseGroupToAlbum);
}
