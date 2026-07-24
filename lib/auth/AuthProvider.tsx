"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { Profile, UserAccount } from "@/lib/types";
import {
  getMockSnapshot,
  mockApi,
  subscribeMockStore,
} from "@/lib/mock/store";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthContextValue {
  user: UserAccount | null;
  profile: Profile | null;
  loading: boolean;
  usingMock: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: {
    email: string;
    password: string;
    username: string;
    displayName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => void;
  updateProfile: (patch: Partial<Profile>) => Promise<Profile>;
  completeOnboarding: (
    data: Partial<Profile> & { themePreset?: Profile["theme"]["preset"] }
  ) => Promise<Profile>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function useMockSession() {
  const snap = useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );
  const user = snap.sessionUserId
    ? snap.users.find((u) => u.id === snap.sessionUserId) || null
    : null;
  const profile = user
    ? snap.profiles.find((p) => p.userId === user.id) || null
    : null;
  return { user, profile, snap };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const usingMock = !isSupabaseConfigured();
  const { user, profile } = useMockSession();
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const login = useCallback(async (email: string, password: string) => {
    mockApi.login(email, password);
  }, []);

  const signup = useCallback(
    async (input: {
      email: string;
      password: string;
      username: string;
      displayName: string;
    }) => {
      mockApi.signup(input);
    },
    []
  );

  const logout = useCallback(async () => {
    mockApi.logout();
  }, []);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!user) throw new Error("Not signed in");
      return mockApi.updateProfile(user.id, patch);
    },
    [user]
  );

  const completeOnboarding = useCallback(
    async (
      data: Partial<Profile> & { themePreset?: Profile["theme"]["preset"] }
    ) => {
      if (!user) throw new Error("Not signed in");
      return mockApi.completeOnboarding(user.id, data);
    },
    [user]
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
      completeOnboarding,
    }),
    [
      user,
      profile,
      loading,
      usingMock,
      login,
      signup,
      logout,
      refresh,
      updateProfile,
      completeOnboarding,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
