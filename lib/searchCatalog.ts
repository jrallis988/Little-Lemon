import {
  DEMO_ARTISTS,
  DEMO_TRACKS,
  SCENES,
} from '@/lib/demoData';
import type { Track, UserProfile } from '@/types/models';

export type SearchFacet = 'all' | 'artist' | 'song' | 'genre';

export type GenreHit = {
  genre: string;
  artistCount: number;
  trackCount: number;
};

export type CatalogSearchResult = {
  query: string;
  facet: SearchFacet;
  artists: UserProfile[];
  tracks: Track[];
  genres: GenreHit[];
};

function norm(s: string): string {
  return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
}

function matches(haystack: string, needle: string): boolean {
  return norm(haystack).includes(norm(needle));
}

/**
 * Multi-facet catalog search — artist / song / genre.
 * Seed covers emerging + contemporary catalog; Spotify sync fills the rest.
 */
export function searchCatalog(
  query: string,
  facet: SearchFacet = 'all',
  limit = 40,
): CatalogSearchResult {
  const q = query.trim();
  if (!q) {
    return { query: q, facet, artists: [], tracks: [], genres: [] };
  }

  const artists =
    facet === 'song' || facet === 'genre'
      ? []
      : DEMO_ARTISTS.filter((artist) => {
          const blob = [
            artist.displayName,
            artist.scene,
            artist.geography,
            artist.bio,
            artist.lineupNote,
            ...(artist.genreTags ?? []),
          ]
            .filter(Boolean)
            .join(' ');
          return matches(blob, q);
        })
          .sort((a, b) => {
            const aName = norm(a.displayName).startsWith(norm(q)) ? 0 : 1;
            const bName = norm(b.displayName).startsWith(norm(q)) ? 0 : 1;
            if (aName !== bName) return aName - bName;
            return (b.followerCount ?? 0) - (a.followerCount ?? 0);
          })
          .slice(0, limit);

  const tracks =
    facet === 'artist' || facet === 'genre'
      ? []
      : DEMO_TRACKS.filter((track) => {
          const blob = [
            track.title,
            track.artistName,
            track.scene,
            track.geography,
            track.releaseYear?.toString(),
          ]
            .filter(Boolean)
            .join(' ');
          return matches(blob, q);
        })
          .sort((a, b) => b.downloadCount - a.downloadCount)
          .slice(0, limit);

  const genres =
    facet === 'artist' || facet === 'song'
      ? []
      : SCENES.filter((genre) => matches(genre, q))
          .map((genre) => ({
            genre,
            artistCount: DEMO_ARTISTS.filter(
              (a) =>
                a.scene === genre ||
                a.genreTags?.some((t) => matches(t, genre)),
            ).length,
            trackCount: DEMO_TRACKS.filter((t) => t.scene === genre).length,
          }))
          .filter((g) => g.artistCount > 0 || g.trackCount > 0)
          .slice(0, limit);

  // Genre facet with exact/partial scene match also lists artists in that genre
  const genreArtists =
    facet === 'genre' && q
      ? DEMO_ARTISTS.filter(
          (a) =>
            matches(a.scene ?? '', q) ||
            a.genreTags?.some((t) => matches(t, q)),
        )
          .sort((a, b) => (b.followerCount ?? 0) - (a.followerCount ?? 0))
          .slice(0, limit)
      : [];

  return {
    query: q,
    facet,
    artists: facet === 'genre' ? genreArtists : artists,
    tracks,
    genres,
  };
}

export function artistsInGenre(genre: string): UserProfile[] {
  return DEMO_ARTISTS.filter(
    (a) =>
      a.scene === genre ||
      a.genreTags?.some((t) => norm(t) === norm(genre)),
  ).sort((a, b) => (b.followerCount ?? 0) - (a.followerCount ?? 0));
}

export function tracksInGenre(genre: string): Track[] {
  return DEMO_TRACKS.filter((t) => t.scene === genre).sort(
    (a, b) => b.downloadCount - a.downloadCount,
  );
}
