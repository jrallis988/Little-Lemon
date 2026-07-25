export type AccountRole = 'listener' | 'artist';

export type ArtistStatus = 'INDEPENDENT' | 'UNSIGNED' | 'LABEL' | 'INACTIVE';

export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  role: AccountRole;
  bio?: string | null;
  avatarUrl?: string | null;
  scene?: string | null;
  geography?: string | null;
  followerCount?: number;
  createdAt?: string;
  /** Terminal archive fields */
  activeYears?: string | null;
  status?: ArtistStatus | null;
  genreTags?: string[] | null;
  sceneDescription?: string | null;
};

export type Track = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  audioUrl: string;
  artworkUrl?: string | null;
  durationMs: number;
  downloadCount: number;
  repostCount: number;
  scene?: string | null;
  geography?: string | null;
};

export type WaveformComment = {
  id: string;
  trackId: string;
  userId: string;
  displayName: string;
  body: string;
  /** Milliseconds into the track */
  timestampMs: number;
  createdAt: string;
};

export type ArtistWallPost = {
  id: string;
  artistId: string;
  body: string;
  imageUrl?: string | null;
  commentsEnabled: boolean;
  createdAt: string;
};
