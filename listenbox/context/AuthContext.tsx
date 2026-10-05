import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { DEMO_USER } from '@/data/seed';
import { readJson, removeKey, storageKeys, writeJson } from '@/lib/storage';
import type { User } from '@/types/models';

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function handleFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 16) || 'listener';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await readJson<User>(storageKeys.authUser);
      if (!cancelled) {
        if (stored) setUser(stored);
        setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, displayName: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = displayName.trim() || 'Listener';
    const next: User = {
      ...DEMO_USER,
      email: trimmedEmail || DEMO_USER.email,
      displayName: trimmedName,
      handle: handleFromName(trimmedName),
    };
    await writeJson(storageKeys.authUser, next);
    setUser(next);
  }, []);

  const signOut = useCallback(async () => {
    await removeKey(storageKeys.authUser);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
