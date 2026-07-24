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
import type { Profile, User } from "@/lib/types/database";
import {
  getProfileById,
  getSessionUserId,
  getStore,
  loginWithPassword,
  logout as mockLogout,
  setSessionUserId,
  signupAccount,
  updateProfile as mockUpdateProfile,
} from "@/lib/mock/store";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  usingMock: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (input: {
    email: string;
    password: string;
    username: string;
    display_name: string;
  }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refresh: () => void;
  updateProfile: (patch: Partial<Profile>) => Profile | null;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const usingMock = !isSupabaseConfigured();

  const refresh = useCallback(() => {
    const id = getSessionUserId();
    if (!id) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    const store = getStore();
    const u = store.users.find((x) => x.id === id) ?? null;
    const p = getProfileById(id) ?? null;
    setUser(u);
    setProfile(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Auto-login demo user in mock mode for smoother prototype browsing
    if (usingMock && !getSessionUserId()) {
      setSessionUserId("u1");
    }
    refresh();
  }, [refresh, usingMock]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = loginWithPassword(email, password);
      if (result.error) return { error: result.error };
      refresh();
      return {};
    },
    [refresh]
  );

  const signup = useCallback(
    async (input: {
      email: string;
      password: string;
      username: string;
      display_name: string;
    }) => {
      const result = signupAccount(input);
      if (result.error) return { error: result.error };
      refresh();
      return {};
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    mockLogout();
    setUser(null);
    setProfile(null);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => {
      if (!profile) return null;
      const next = mockUpdateProfile(profile.id, patch);
      setProfile(next);
      return next;
    },
    [profile]
  );

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      usingMock,
      login,
      signup,
      logout,
      refresh,
      updateProfile,
    }),
    [user, profile, loading, usingMock, login, signup, logout, refresh, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
