import { STORAGE_KEYS } from "@/lib/constants";

type StorageBackend = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

const memoryFallback = new Map<string, string>();

function getBackend(): StorageBackend {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    // Private mode / blocked storage
  }

  return {
    getItem: (key) => memoryFallback.get(key) ?? null,
    setItem: (key, value) => {
      memoryFallback.set(key, value);
    },
    removeItem: (key) => {
      memoryFallback.delete(key);
    },
  };
}

export function loadJson<T>(key: string, fallback: T): T {
  const backend = getBackend();
  const raw = backend.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  getBackend().setItem(key, JSON.stringify(value));
}

export function removeKey(key: string): void {
  getBackend().removeItem(key);
}

export function clearSurfStorage(): void {
  Object.values(STORAGE_KEYS).forEach(removeKey);
}
