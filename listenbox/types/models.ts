/** Core domain models for Listenbox — Letterboxd for music. */

export type AlbumId = string;
export type UserId = string;
export type LogId = string;

export interface User {
  id: UserId;
  email: string;
  displayName: string;
  handle: string;
  avatarColor: string;
}

export interface Album {
  id: AlbumId;
  title: string;
  artist: string;
  year: number;
  /** Dominant cover color used as a stand-in until real art is wired up */
  coverColor: string;
  genre: string;
}

export type ListenRating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface AlbumLog {
  id: LogId;
  userId: UserId;
  albumId: AlbumId;
  /** ISO date the listener finished / logged the album */
  listenedOn: string;
  rating?: ListenRating;
  /** Short diary-style review; optional */
  review?: string;
  liked: boolean;
  createdAt: string;
}

/** Feed item joins a log with denormalized user + album for display. */
export interface FeedItem {
  log: AlbumLog;
  user: User;
  album: Album;
}
