import type { ProfileRow, TrackRow } from '@/lib/dbTypes';
import { DEMO_ARTISTS, DEMO_TRACKS } from '@/lib/demoData';
import {
  type CatalogSearchResult,
  type SearchFacet,
  searchCatalog as searchDemoCatalog,
} from '@/lib/searchCatalog';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { ArtistStatus, CatalogKind, Track, UserProfile } from '@/types/models';

export function profileRowToUser(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email ?? '',
    displayName: row.display_name,
    role: row.role,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    scene: row.scene,
    geography: row.geography,
    genreTags: row.genre_tags,
    lineupNote: row.lineup_note,
    sceneDescription: row.scene_description,
    activeYears: row.active_years,
    status: row.status,
    catalogKind: row.catalog_kind,
    spotifyArtistId: row.spotify_artist_id,
    musicBrainzArtistId: row.musicbrainz_artist_id,
    followerCount: row.follower_count,
    joinedAt: row.joined_at,
    createdAt: row.created_at,
  };
}

export function trackRowToTrack(
  row: TrackRow,
  artistName = 'Artist',
): Track {
  return {
    id: row.id,
    title: row.title,
    artistId: row.artist_id,
    artistName,
    downloadUrl: row.audio_url ?? '',
    artworkUrl: row.artwork_url,
    durationMs: row.duration_ms,
    downloadCount: row.download_count,
    repostCount: row.repost_count,
    scene: row.scene,
    geography: row.geography,
    releaseYear: row.release_year,
    spotifyTrackId: row.spotify_track_id,
    catalogKind: row.catalog_kind,
  };
}

function mergeArtists(primary: UserProfile[], secondary: UserProfile[]): UserProfile[] {
  const seen = new Set(primary.map((a) => a.id));
  const out = [...primary];
  for (const artist of secondary) {
    if (seen.has(artist.id)) continue;
    seen.add(artist.id);
    out.push(artist);
  }
  return out;
}

function mergeTracks(primary: Track[], secondary: Track[]): Track[] {
  const seen = new Set(primary.map((t) => t.id));
  const out = [...primary];
  for (const track of secondary) {
    if (seen.has(track.id)) continue;
    seen.add(track.id);
    out.push(track);
  }
  return out;
}

/**
 * Hybrid catalog search: live Postgres FTS when configured, always merged
 * with demo/seed so Find + Search stay useful before full sync.
 */
export async function searchCatalogHybrid(
  query: string,
  facet: SearchFacet = 'all',
  limit = 40,
): Promise<CatalogSearchResult & { source: 'hybrid' | 'demo' }> {
  const demo = searchDemoCatalog(query, facet, limit);
  const q = query.trim();
  if (!q || !isSupabaseConfigured) {
    return { ...demo, source: 'demo' };
  }

  try {
    const wantArtists = facet === 'all' || facet === 'artist' || facet === 'genre';
    const wantTracks = facet === 'all' || facet === 'song';

    let dbArtists: UserProfile[] = [];
    let dbTracks: Track[] = [];

    if (wantArtists) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist')
        .is('disabled_at', null)
        .or(
          `display_name.ilike.%${q}%,scene.ilike.%${q}%,geography.ilike.%${q}%,bio.ilike.%${q}%`,
        )
        .limit(limit);
      if (!error && data) {
        dbArtists = (data as ProfileRow[]).map(profileRowToUser);
      }
    }

    if (wantTracks) {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .is('disabled_at', null)
        .or(`title.ilike.%${q}%,scene.ilike.%${q}%,geography.ilike.%${q}%`)
        .limit(limit);
      if (!error && data) {
        const rows = data as TrackRow[];
        const artistIds = [...new Set(rows.map((r) => r.artist_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name')
          .in('id', artistIds);
        const names = new Map(
          (profiles ?? []).map((p) => [p.id, p.display_name as string]),
        );
        dbTracks = rows.map((row) =>
          trackRowToTrack(row, names.get(row.artist_id) ?? 'Artist'),
        );
      }
    }

    return {
      query: q,
      facet,
      artists: mergeArtists(dbArtists, demo.artists).slice(0, limit),
      tracks: mergeTracks(dbTracks, demo.tracks).slice(0, limit),
      genres: demo.genres,
      source: dbArtists.length || dbTracks.length ? 'hybrid' : 'demo',
    };
  } catch {
    return { ...demo, source: 'demo' };
  }
}

export type FindFilter = 'new' | 'unsigned' | 'joined' | 'all';

export type FindQuery = {
  filter: FindFilter;
  scene?: string | null;
  geography?: string | null;
  withinDays?: number;
  limit?: number;
};

function isBrandNew(artist: UserProfile, withinDays: number): boolean {
  if (!artist.joinedAt) return false;
  const joined = new Date(artist.joinedAt).getTime();
  if (Number.isNaN(joined)) return false;
  const age = Date.now() - joined;
  return age >= 0 && age <= withinDays * 24 * 60 * 60 * 1000;
}

function isUnsigned(artist: UserProfile): boolean {
  return (
    artist.catalogKind !== 'catalog' &&
    (artist.status === 'UNSIGNED' || artist.status === 'INDEPENDENT')
  );
}

/**
 * Find lane — prefer live artist profiles; fall back to demo emerging acts.
 */
export async function findArtists(query: FindQuery): Promise<{
  artists: UserProfile[];
  source: 'hybrid' | 'demo';
}> {
  const withinDays = query.withinDays ?? 60;
  const limit = query.limit ?? 40;
  const demoPool = DEMO_ARTISTS.filter((a) => a.catalogKind !== 'catalog');

  let live: UserProfile[] = [];
  if (isSupabaseConfigured) {
    try {
      let req = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist')
        .eq('catalog_kind', 'emerging')
        .is('disabled_at', null)
        .order('joined_at', { ascending: false })
        .limit(120);
      if (query.scene) req = req.eq('scene', query.scene);
      if (query.geography) req = req.eq('geography', query.geography);
      const { data, error } = await req;
      if (!error && data) live = (data as ProfileRow[]).map(profileRowToUser);
    } catch {
      live = [];
    }
  }

  const pool = mergeArtists(live, demoPool);

  const filtered = pool
    .filter((artist) => {
      if (query.filter === 'new' && !isBrandNew(artist, withinDays)) return false;
      if (query.filter === 'joined') {
        // Recently joined = joined in last 14 days (meaningful date, not hardcoded helper alone)
        if (!isBrandNew(artist, 14)) return false;
      }
      if (query.filter === 'unsigned' && !isUnsigned(artist)) return false;
      if (query.scene && artist.scene !== query.scene) return false;
      if (query.geography && artist.geography !== query.geography) return false;
      return artist.catalogKind !== 'catalog';
    })
    .sort((a, b) => (b.joinedAt ?? '').localeCompare(a.joinedAt ?? ''))
    .slice(0, limit);

  return {
    artists: filtered,
    source: live.length ? 'hybrid' : 'demo',
  };
}

export async function fetchArtistById(id: string): Promise<{
  artist: UserProfile | null;
  tracks: Track[];
  source: 'db' | 'demo' | 'none';
}> {
  const demoArtist = DEMO_ARTISTS.find((a) => a.id === id) ?? null;
  const demoTracks = DEMO_TRACKS.filter((t) => t.artistId === id);

  if (!isSupabaseConfigured) {
    return {
      artist: demoArtist,
      tracks: demoTracks,
      source: demoArtist ? 'demo' : 'none',
    };
  }

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('role', 'artist')
      .is('disabled_at', null)
      .maybeSingle();

    if (profile) {
      const artist = profileRowToUser(profile as ProfileRow);
      const { data: trackRows } = await supabase
        .from('tracks')
        .select('*')
        .eq('artist_id', id)
        .is('disabled_at', null)
        .order('created_at', { ascending: false });
      const tracks = ((trackRows as TrackRow[]) ?? []).map((row) =>
        trackRowToTrack(row, artist.displayName),
      );
      return {
        artist,
        tracks: tracks.length ? tracks : demoTracks,
        source: 'db',
      };
    }
  } catch {
    /* fall through */
  }

  return {
    artist: demoArtist,
    tracks: demoTracks,
    source: demoArtist ? 'demo' : 'none',
  };
}

export async function fetchTrackById(id: string): Promise<{
  track: Track | null;
  artist: UserProfile | null;
  source: 'db' | 'demo' | 'none';
}> {
  const demoTrack = DEMO_TRACKS.find((t) => t.id === id) ?? null;
  const demoArtist = demoTrack
    ? DEMO_ARTISTS.find((a) => a.id === demoTrack.artistId) ?? null
    : null;

  if (!isSupabaseConfigured) {
    return {
      track: demoTrack,
      artist: demoArtist,
      source: demoTrack ? 'demo' : 'none',
    };
  }

  try {
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('id', id)
      .is('disabled_at', null)
      .maybeSingle();
    if (data) {
      const row = data as TrackRow;
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', row.artist_id)
        .maybeSingle();
      const artist = profile
        ? profileRowToUser(profile as ProfileRow)
        : demoArtist;
      return {
        track: trackRowToTrack(row, artist?.displayName ?? 'Artist'),
        artist,
        source: 'db',
      };
    }
  } catch {
    /* fall through */
  }

  return {
    track: demoTrack,
    artist: demoArtist,
    source: demoTrack ? 'demo' : 'none',
  };
}

/** Manual metadata upsert helper for future Spotify/MusicBrainz sync jobs. */
export type CatalogArtistMetadata = {
  externalId: string;
  displayName: string;
  spotifyArtistId?: string | null;
  musicBrainzArtistId?: string | null;
  scene?: string | null;
  geography?: string | null;
  genreTags?: string[];
  avatarUrl?: string | null;
  bio?: string | null;
  status?: ArtistStatus | null;
};

export function describeCatalogSync(): string {
  return 'Catalog sync imports metadata only (names, IDs, artwork URLs, genres, release dates). Never imports or proxies Spotify audio.';
}

export type { CatalogKind };
