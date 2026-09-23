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
import {
  getSupabaseSession,
  subscribeSupabaseAuth,
  supabaseCompleteOnboarding,
  supabaseLogin,
  supabaseLogout,
  supabaseSignup,
  supabaseUpdateProfile,
} from "@/lib/supabase/auth-api";

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
    birthdate?: string;
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
  return { user, profile };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const usingMock = !isSupabaseConfigured();
  const mockSession = useMockSession();

  const [remoteUser, setRemoteUser] = useState<UserAccount | null>(null);
  const [remoteProfile, setRemoteProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (usingMock) {
      setLoading(false);
      return;
    }

    let active = true;
    (async () => {
      try {
        const session = await getSupabaseSession();
        if (!active) return;
        setRemoteUser(session?.user ?? null);
        setRemoteProfile(session?.profile ?? null);
      } catch {
        if (!active) return;
        setRemoteUser(null);
        setRemoteProfile(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    const unsubscribe = subscribeSupabaseAuth((session) => {
      setRemoteUser(session?.user ?? null);
      setRemoteProfile(session?.profile ?? null);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [usingMock]);

  const user = usingMock ? mockSession.user : remoteUser;
  const profile = usingMock ? mockSession.profile : remoteProfile;

  const refresh = useCallback(() => {
    setTick((t) => t + 1);
    if (usingMock) return;
    void getSupabaseSession()
      .then((session) => {
        setRemoteUser(session?.user ?? null);
        setRemoteProfile(session?.profile ?? null);
      })
      .catch(() => {
        setRemoteUser(null);
        setRemoteProfile(null);
      });
  }, [usingMock]);

  const login = useCallback(
    async (email: string, password: string) => {
      if (usingMock) {
        mockApi.login(email, password);
        return;
      }
      const session = await supabaseLogin(email, password);
      setRemoteUser(session.user);
      setRemoteProfile(session.profile);
    },
    [usingMock]
  );

  const signup = useCallback(
    async (input: {
      email: string;
      password: string;
      username: string;
      displayName: string;
      birthdate?: string;
    }) => {
      if (usingMock) {
        mockApi.signup(input);
        if (input.birthdate) {
          const userId = mockApi.getSessionUserId();
          if (userId) {
            mockApi.updateProfile(userId, {
              birthdate: input.birthdate,
              showAge: true,
            });
          }
        }
        return;
      }
      const session = await supabaseSignup(input);
      setRemoteUser(session.user);
      if (input.birthdate) {
        const next = await supabaseUpdateProfile(session.user.id, {
          birthdate: input.birthdate,
          showAge: true,
        });
        setRemoteProfile(next);
      } else {
        setRemoteProfile(session.profile);
      }
    },
    [usingMock]
  );

  const logout = useCallback(async () => {
    if (usingMock) {
      mockApi.logout();
      return;
    }
    await supabaseLogout();
    setRemoteUser(null);
    setRemoteProfile(null);
  }, [usingMock]);

  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!user) throw new Error("Not signed in");
      if (usingMock) {
        return mockApi.updateProfile(user.id, patch);
      }
      const next = await supabaseUpdateProfile(user.id, patch);
      setRemoteProfile(next);
      return next;
    },
    [user, usingMock]
  );

  const completeOnboarding = useCallback(
    async (
      data: Partial<Profile> & { themePreset?: Profile["theme"]["preset"] }
    ) => {
      if (!user) throw new Error("Not signed in");
      if (usingMock) {
        return mockApi.completeOnboarding(user.id, data);
      }
      const next = await supabaseCompleteOnboarding(user.id, data);
      setRemoteProfile(next);
      return next;
    },
    [user, usingMock]
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
