import type { ArtistStatus, CatalogKind } from '@/types/models';

/** Row shapes matching Phase 2 Supabase schema. */

export type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string;
  role: 'listener' | 'artist';
  bio: string | null;
  avatar_url: string | null;
  header_url: string | null;
  scene: string | null;
  geography: string | null;
  genre_tags: string[] | null;
  lineup_note: string | null;
  scene_description: string | null;
  active_years: string | null;
  status: ArtistStatus | null;
  catalog_kind: CatalogKind;
  spotify_artist_id: string | null;
  musicbrainz_artist_id: string | null;
  follower_count: number;
  joined_at: string;
  disabled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ReleaseType = 'single' | 'ep' | 'album';

export type ReleaseRow = {
  id: string;
  artist_id: string;
  title: string;
  release_type: ReleaseType;
  release_date: string | null;
  artwork_url: string | null;
  artwork_path: string | null;
  notes: string | null;
  disabled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TrackRow = {
  id: string;
  artist_id: string;
  release_id: string | null;
  title: string;
  audio_url: string | null;
  audio_path: string | null;
  artwork_url: string | null;
  artwork_path: string | null;
  duration_ms: number;
  scene: string | null;
  geography: string | null;
  release_year: number | null;
  catalog_kind: CatalogKind;
  spotify_track_id: string | null;
  download_count: number;
  repost_count: number;
  copyright_confirmed_at: string | null;
  disabled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaAssetRow = {
  id: string;
  owner_id: string;
  kind: string;
  bucket: string;
  storage_path: string;
  mime_type: string;
  byte_size: number;
  public_url: string | null;
  track_id: string | null;
  release_id: string | null;
  disabled_at: string | null;
  created_at: string;
};

export type ArtistProfileUpdate = {
  displayName?: string;
  bio?: string | null;
  scene?: string | null;
  geography?: string | null;
  genreTags?: string[];
  lineupNote?: string | null;
  sceneDescription?: string | null;
  activeYears?: string | null;
  status?: ArtistStatus | null;
};
