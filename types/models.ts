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

/** Half-star scale like Letterboxd (0.5–5). */
export type RatingValue = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

/**
 * Diary log — “I heard this” with an optional date.
 * StaticVolume’s Letterboxd-style listener action (not streaming play).
 */
export type DiaryEntry = {
  id: string;
  userId: string;
  displayName: string;
  trackId: string;
  loggedOn: string;
  rating?: RatingValue | null;
  reviewId?: string | null;
  /** Optional one-line note when there’s no full review */
  note?: string | null;
};

export type Review = {
  id: string;
  userId: string;
  displayName: string;
  trackId: string;
  rating: RatingValue;
  body: string;
  createdAt: string;
  likeCount: number;
};

export type TasteList = {
  id: string;
  userId: string;
  displayName: string;
  title: string;
  description: string;
  trackIds: string[];
  createdAt: string;
  ranked: boolean;
};

export type ActivityKind = 'logged' | 'reviewed' | 'listed';

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  userId: string;
  displayName: string;
  trackId: string;
  createdAt: string;
  rating?: RatingValue | null;
  excerpt?: string | null;
  listTitle?: string | null;
};
