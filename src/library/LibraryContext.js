import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getShow, shows } from "../data/content";
import {
  loadContinueWatching,
  loadWatchlist,
  saveContinueWatching,
  saveWatchlist,
} from "./storage";

const LibraryContext = createContext(null);

function seedContinueFromCatalog() {
  return shows
    .filter((s) => typeof s.progress === "number" && s.progress > 0)
    .map((s, index) => ({
      id: s.id,
      progress: s.progress,
      updatedAt: Date.now() - index * 1000,
    }));
}

export function LibraryProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => loadWatchlist());
  const [continueWatching, setContinueWatching] = useState(() => {
    const stored = loadContinueWatching();
    if (stored) return stored;
    const seeded = seedContinueFromCatalog();
    saveContinueWatching(seeded);
    return seeded;
  });

  const isInWatchlist = useCallback((id) => watchlist.includes(id), [watchlist]);

  const toggleWatchlist = useCallback((id) => {
    setWatchlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const markProgress = useCallback((id, progress = 0.35) => {
    const clamped = Math.min(0.95, Math.max(0.05, progress));
    setContinueWatching((prev) => {
      const without = prev.filter((e) => e.id !== id);
      const next = [{ id, progress: clamped, updatedAt: Date.now() }, ...without].slice(0, 12);
      saveContinueWatching(next);
      return next;
    });
  }, []);

  const removeFromContinue = useCallback((id) => {
    setContinueWatching((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveContinueWatching(next);
      return next;
    });
  }, []);

  const getProgress = useCallback(
    (id) => continueWatching.find((e) => e.id === id)?.progress ?? null,
    [continueWatching]
  );

  const continueShows = useMemo(() => {
    return continueWatching
      .map((entry) => {
        const show = getShow(entry.id);
        if (!show) return null;
        return { ...show, progress: entry.progress };
      })
      .filter(Boolean);
  }, [continueWatching]);

  const watchlistShows = useMemo(() => {
    return watchlist.map((id) => getShow(id)).filter(Boolean);
  }, [watchlist]);

  const value = useMemo(
    () => ({
      watchlist,
      watchlistShows,
      continueShows,
      isInWatchlist,
      toggleWatchlist,
      markProgress,
      removeFromContinue,
      getProgress,
    }),
    [
      watchlist,
      watchlistShows,
      continueShows,
      isInWatchlist,
      toggleWatchlist,
      markProgress,
      removeFromContinue,
      getProgress,
    ]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error("useLibrary must be used within LibraryProvider");
  }
  return ctx;
}
