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

import { REWARDS } from "@/lib/data/catalog";
import type { AuthUser } from "@/lib/types";

const STORAGE_KEY = "walgreens-auth-v1";

/** Demo account for the prototype — not a real backend. */
export const DEMO_ACCOUNT = {
  email: "jordan.lee@email.com",
  password: "demo1234",
  user: {
    id: "user-demo",
    email: "jordan.lee@email.com",
    displayName: REWARDS.displayName,
    memberId: REWARDS.memberId,
    savedCardLast4: "4242",
  } satisfies AuthUser,
};

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
  register: (
    displayName: string,
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [hydrated, user]);

  const signIn = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (
      normalized === DEMO_ACCOUNT.email &&
      password === DEMO_ACCOUNT.password
    ) {
      setUser(DEMO_ACCOUNT.user);
      return { ok: true as const };
    }
    // Allow any registered-looking local account created this session
    try {
      const registry = window.localStorage.getItem("walgreens-users-v1");
      const users = registry
        ? (JSON.parse(registry) as Array<{
            email: string;
            password: string;
            user: AuthUser;
          }>)
        : [];
      const match = users.find(
        (entry) =>
          entry.email === normalized && entry.password === password,
      );
      if (match) {
        setUser(match.user);
        return { ok: true as const };
      }
    } catch {
      // ignore
    }
    return {
      ok: false as const,
      error: `Invalid email or password. Try ${DEMO_ACCOUNT.email} / ${DEMO_ACCOUNT.password}`,
    };
  }, []);

  const register = useCallback(
    (displayName: string, email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      if (!displayName.trim() || !normalized || password.length < 6) {
        return {
          ok: false as const,
          error: "Enter a name, email, and password (6+ characters).",
        };
      }
      const newUser: AuthUser = {
        id: `user-${Date.now().toString(36)}`,
        email: normalized,
        displayName: displayName.trim(),
        memberId: `WG-${Math.floor(1000000 + Math.random() * 9000000)}`,
        savedCardLast4: undefined,
      };
      try {
        const registry = window.localStorage.getItem("walgreens-users-v1");
        const users = registry
          ? (JSON.parse(registry) as Array<{
              email: string;
              password: string;
              user: AuthUser;
            }>)
          : [];
        if (
          users.some((entry) => entry.email === normalized) ||
          normalized === DEMO_ACCOUNT.email
        ) {
          return {
            ok: false as const,
            error: "An account with that email already exists. Sign in instead.",
          };
        }
        users.push({ email: normalized, password, user: newUser });
        window.localStorage.setItem("walgreens-users-v1", JSON.stringify(users));
      } catch {
        return { ok: false as const, error: "Could not create account." };
      }
      setUser(newUser);
      return { ok: true as const };
    },
    [],
  );

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, hydrated, signIn, signOut, register }),
    [hydrated, register, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
