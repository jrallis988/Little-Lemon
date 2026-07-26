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
  /** Downloadable file URL (not for in-app streaming) */
  downloadUrl: string;
  artworkUrl?: string | null;
  durationMs: number;
  downloadCount: number;
  repostCount: number;
  scene?: string | null;
  geography?: string | null;
};

export type TrackComment = {
  id: string;
  trackId: string;
  userId: string;
  displayName: string;
  body: string;
  /** Optional reference offset in the track (ms); not used for playback UI */
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
