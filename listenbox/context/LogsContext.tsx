import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { SEED_LOGS, buildFeed } from '@/data/seed';
import type { AlbumLog, FeedItem, ListenRating, UserId } from '@/types/models';

type CreateLogInput = {
  userId: UserId;
  albumId: string;
  listenedOn: string;
  rating?: ListenRating;
  review?: string;
  liked: boolean;
};

type LogsContextValue = {
  logs: AlbumLog[];
  feed: FeedItem[];
  logsForUser: (userId: UserId) => AlbumLog[];
  createLog: (input: CreateLogInput) => AlbumLog;
};

const LogsContext = createContext<LogsContextValue | null>(null);

export function LogsProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<AlbumLog[]>(SEED_LOGS);

  const feed = useMemo(() => buildFeed(logs), [logs]);

  const logsForUser = useCallback(
    (userId: UserId) =>
      logs
        .filter((log) => log.userId === userId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [logs],
  );

  const createLog = useCallback((input: CreateLogInput) => {
    const next: AlbumLog = {
      id: `log-${Date.now()}`,
      userId: input.userId,
      albumId: input.albumId,
      listenedOn: input.listenedOn,
      rating: input.rating,
      review: input.review?.trim() || undefined,
      liked: input.liked,
      createdAt: new Date().toISOString(),
    };
    setLogs((prev) => [next, ...prev]);
    return next;
  }, []);

  const value = useMemo(
    () => ({ logs, feed, logsForUser, createLog }),
    [logs, feed, logsForUser, createLog],
  );

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
}

export function useLogs(): LogsContextValue {
  const ctx = useContext(LogsContext);
  if (!ctx) {
    throw new Error('useLogs must be used within LogsProvider');
  }
  return ctx;
}
