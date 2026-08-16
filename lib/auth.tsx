"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { comics, currentUserId, DEMO_PASSWORD } from "@/lib/mock/data";
import type { Comic } from "@/lib/types";

const STORAGE_KEY = "greenroom.auth";

type AuthContextValue = {
  user: Comic | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  signup: (displayName: string, username: string) => { ok: true } | { ok: false; error: string };
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Comic | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { userId: string };
        const found = comics.find((c) => c.id === parsed.userId) ?? null;
        setUser(found);
      }
    } catch {
      setUser(null);
    }
    setReady(true);
  }, []);

  const persist = useCallback((comic: Comic | null) => {
    setUser(comic);
    if (comic) localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: comic.id }));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      if (password !== DEMO_PASSWORD) {
        return { ok: false as const, error: "Wrong password. Demo password is demo1234." };
      }
      const comic =
        comics.find((c) => `${c.username}@greenroom.app` === normalized) ||
        comics.find((c) => c.username === normalized) ||
        comics.find((c) => c.id === currentUserId);
      if (!comic) return { ok: false as const, error: "No comic found for that email." };
      persist(comic);
      return { ok: true as const };
    },
    [persist],
  );

  const signup = useCallback(
    (displayName: string, username: string) => {
      const clean = username.trim().toLowerCase().replace(/[^a-z0-9._]/g, "");
      if (!displayName.trim() || clean.length < 3) {
        return { ok: false as const, error: "Need a stage name and a username (3+ chars)." };
      }
      // Demo: land on Maya Kill as the seeded account
      const comic = comics.find((c) => c.id === currentUserId)!;
      persist(comic);
      return { ok: true as const };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, ready, login, logout, signup }),
    [user, ready, login, logout, signup],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
