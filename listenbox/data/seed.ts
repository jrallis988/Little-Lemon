import type { Album, AlbumLog, FeedItem, User } from '@/types/models';

export const DEMO_USER: User = {
  id: 'user-you',
  email: 'you@listenbox.app',
  displayName: 'You',
  handle: 'you',
  avatarColor: '#0B1F2A',
};

export const SEED_USERS: User[] = [
  DEMO_USER,
  {
    id: 'user-mira',
    email: 'mira@example.com',
    displayName: 'Mira Chen',
    handle: 'mira',
    avatarColor: '#1B4332',
  },
  {
    id: 'user-jonah',
    email: 'jonah@example.com',
    displayName: 'Jonah Reed',
    handle: 'jonah',
    avatarColor: '#3D2B1F',
  },
  {
    id: 'user-ada',
    email: 'ada@example.com',
    displayName: 'Ada Okonkwo',
    handle: 'ada',
    avatarColor: '#1D3557',
  },
];

export const SEED_ALBUMS: Album[] = [
  {
    id: 'album-blonde',
    title: 'Blonde',
    artist: 'Frank Ocean',
    year: 2016,
    coverColor: '#E8D5C4',
    genre: 'R&B',
  },
  {
    id: 'album-ok-computer',
    title: 'OK Computer',
    artist: 'Radiohead',
    year: 1997,
    coverColor: '#C5D5E4',
    genre: 'Art rock',
  },
  {
    id: 'album-to-pimp',
    title: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    year: 2015,
    coverColor: '#F2C94C',
    genre: 'Hip-hop',
  },
  {
    id: 'album-blue',
    title: 'Blue',
    artist: 'Joni Mitchell',
    year: 1971,
    coverColor: '#4A90A4',
    genre: 'Folk',
  },
  {
    id: 'album-discovery',
    title: 'Discovery',
    artist: 'Daft Punk',
    year: 2001,
    coverColor: '#E85A4F',
    genre: 'Electronic',
  },
  {
    id: 'album-rumours',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    year: 1977,
    coverColor: '#F5E6D3',
    genre: 'Soft rock',
  },
  {
    id: 'album-unknown',
    title: 'Unknown Pleasures',
    artist: 'Joy Division',
    year: 1979,
    coverColor: '#111111',
    genre: 'Post-punk',
  },
  {
    id: 'album-channel',
    title: 'Channel Orange',
    artist: 'Frank Ocean',
    year: 2012,
    coverColor: '#F4A261',
    genre: 'R&B',
  },
];

const now = Date.now();

export const SEED_LOGS: AlbumLog[] = [
  {
    id: 'log-1',
    userId: 'user-mira',
    albumId: 'album-blonde',
    listenedOn: new Date(now - 1000 * 60 * 45).toISOString().slice(0, 10),
    rating: 5,
    review: 'Still the album I measure everything else against. Soft, sharp, endless.',
    liked: true,
    createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'log-2',
    userId: 'user-jonah',
    albumId: 'album-ok-computer',
    listenedOn: new Date(now - 1000 * 60 * 60 * 3).toISOString().slice(0, 10),
    rating: 4.5,
    review: 'Late-night re-listen. The paranoia holds up better than my sleep schedule.',
    liked: true,
    createdAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'log-3',
    userId: 'user-ada',
    albumId: 'album-to-pimp',
    listenedOn: new Date(now - 1000 * 60 * 60 * 8).toISOString().slice(0, 10),
    rating: 5,
    review: 'Front to back. No skips. The brass on Wesley’s Theory still hits like a parade.',
    liked: true,
    createdAt: new Date(now - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'log-4',
    userId: 'user-mira',
    albumId: 'album-blue',
    listenedOn: new Date(now - 1000 * 60 * 60 * 26).toISOString().slice(0, 10),
    rating: 4.5,
    review: 'Rainy Sunday record. River feels like a conversation you were meant to overhear.',
    liked: true,
    createdAt: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'log-5',
    userId: 'user-jonah',
    albumId: 'album-discovery',
    listenedOn: new Date(now - 1000 * 60 * 60 * 30).toISOString().slice(0, 10),
    rating: 4,
    liked: false,
    createdAt: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
  },
];

export function buildFeed(logs: AlbumLog[], users = SEED_USERS, albums = SEED_ALBUMS): FeedItem[] {
  const usersById = Object.fromEntries(users.map((u) => [u.id, u]));
  const albumsById = Object.fromEntries(albums.map((a) => [a.id, a]));

  return logs
    .map((log) => {
      const user = usersById[log.userId];
      const album = albumsById[log.albumId];
      if (!user || !album) return null;
      return { log, user, album };
    })
    .filter((item): item is FeedItem => item !== null)
    .sort((a, b) => b.log.createdAt.localeCompare(a.log.createdAt));
}

export function getAlbumById(id: string): Album | undefined {
  return SEED_ALBUMS.find((a) => a.id === id);
}
