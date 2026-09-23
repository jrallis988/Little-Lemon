"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { useAuth } from "@/lib/auth/AuthProvider";
import {
  getMockSnapshot,
  subscribeMockStore,
} from "@/lib/mock/store";
import {
  fetchSocialData,
  getMockSocialData,
  usingMockSocial,
  type SocialData,
} from "@/lib/social/api";

const emptySocial: SocialData = {
  profiles: [],
  friendships: [],
  notifications: [],
  blockedIds: [],
  featuredFriends: {},
};

export function useSocialStore() {
  const { user, profile, usingMock } = useAuth();
  const mockSnap = useSyncExternalStore(
    subscribeMockStore,
    getMockSnapshot,
    getMockSnapshot
  );

  const [remote, setRemote] = useState<SocialData>(emptySocial);
  const [loading, setLoading] = useState(!usingMockSocial());
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(async () => {
    if (usingMockSocial() || !user || !profile) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSocialData(user.id, profile.id);
      setRemote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load social data.");
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  useEffect(() => {
    void refresh();
  }, [refresh, version]);

  const bump = useCallback(() => setVersion((value) => value + 1), []);

  if (usingMock || usingMockSocial()) {
    const data = getMockSocialData();
    // Keep mockSnap subscription live.
    void mockSnap;
    return {
      ...data,
      loading: false,
      error: null as string | null,
      refresh: async () => undefined,
      mutate: bump,
    };
  }

  return {
    ...remote,
    loading,
    error,
    refresh,
    mutate: bump,
  };
}
