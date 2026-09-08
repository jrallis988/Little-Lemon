const WATCHLIST_KEY = "dplus.watchlist";
const CONTINUE_KEY = "dplus.continue";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

export function loadWatchlist() {
  const list = readJson(WATCHLIST_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveWatchlist(ids) {
  writeJson(WATCHLIST_KEY, ids);
}

/** @returns {{ id: string, progress: number, updatedAt: number }[]} */
export function loadContinueWatching() {
  const list = readJson(CONTINUE_KEY, null);
  if (Array.isArray(list)) return list;
  return null;
}

export function saveContinueWatching(entries) {
  writeJson(CONTINUE_KEY, entries);
}

export function clearLibraryStorage() {
  try {
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(CONTINUE_KEY);
  } catch {
    // ignore
  }
}
