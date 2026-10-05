import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { SEED_LOGS, SEED_USERS, buildFeed } from '@/data/seed';
import { readJson, removeKey, storageKeys, writeJson } from '@/lib/storage';
import type { AlbumLog, FeedItem, ListenRating, User, UserId } from '@/types/models';

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
  isReady: boolean;
  logsForUser: (userId: UserId) => AlbumLog[];
  createLog: (input: CreateLogInput) => AlbumLog;
  clearUserLogs: () => Promise<void>;
};

const LogsContext = createContext<LogsContextValue | null>(null);

const SEED_LOG_IDS = new Set(SEED_LOGS.map((log) => log.id));

function usersWithSession(sessionUser: User | null): User[] {
  if (!sessionUser) return SEED_USERS;
  const others = SEED_USERS.filter((u) => u.id !== sessionUser.id);
  return [sessionUser, ...others];
}

function mergeWithSeed(userLogs: AlbumLog[]): AlbumLog[] {
  const byId = new Map<string, AlbumLog>();
  for (const log of SEED_LOGS) byId.set(log.id, log);
  for (const log of userLogs) byId.set(log.id, log);
  return Array.from(byId.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function LogsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { albums } = useCatalog();
  const [userLogs, setUserLogs] = useState<AlbumLog[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await readJson<AlbumLog[]>(storageKeys.userLogs);
      if (!cancelled) {
        if (Array.isArray(stored)) {
          setUserLogs(stored.filter((log) => log && !SEED_LOG_IDS.has(log.id)));
        }
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    void writeJson(storageKeys.userLogs, userLogs);
  }, [userLogs, isReady]);

  const logs = useMemo(() => mergeWithSeed(userLogs), [userLogs]);

  const feed = useMemo(
    () => buildFeed(logs, usersWithSession(user), albums),
    [logs, user, albums],
  );

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
    setUserLogs((prev) => [next, ...prev.filter((log) => log.id !== next.id)]);
    return next;
  }, []);

  const clearUserLogs = useCallback(async () => {
    setUserLogs([]);
    await removeKey(storageKeys.userLogs);
  }, []);

  const value = useMemo(
    () => ({ logs, feed, isReady, logsForUser, createLog, clearUserLogs }),
    [logs, feed, isReady, logsForUser, createLog, clearUserLogs],
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
