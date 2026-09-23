import { create } from 'zustand';

import {
  deleteLog,
  fetchMyTasteSnapshot,
  followTarget,
  recordDownload,
  recordRepost,
  removeRepost,
  TasteApiError,
  unfollowTarget,
  upsertLog,
  type FollowTargetKind,
} from '@/lib/tasteApi';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { RatingValue } from '@/types/models';

type TasteState = {
  loggedIds: Record<string, true>;
  ratings: Record<string, RatingValue>;
  downloadedIds: Record<string, true>;
  repostedIds: Record<string, true>;
  followingIds: Record<string, FollowTargetKind>;
  isHydrated: boolean;
  isSyncing: boolean;
  error: string | null;

  hydrate: () => Promise<void>;
  clear: () => void;
  logTrack: (trackId: string) => Promise<void>;
  unlogTrack: (trackId: string) => Promise<void>;
  toggleLog: (trackId: string) => Promise<void>;
  setRating: (trackId: string, rating: RatingValue) => Promise<void>;
  downloadTrack: (trackId: string) => Promise<void>;
  toggleRepost: (trackId: string) => Promise<void>;
  toggleFollow: (
    targetId: string,
    targetKind: FollowTargetKind,
  ) => Promise<void>;
  isLogged: (trackId: string) => boolean;
  isFollowing: (targetId: string) => boolean;
  clearError: () => void;
};

/**
 * Taste store — optimistic UI with Supabase as source of truth when configured.
 * Falls back to session-local state if signed out / offline schema missing.
 */
export const useTasteStore = create<TasteState>((set, get) => ({
  loggedIds: {},
  ratings: {},
  downloadedIds: {},
  repostedIds: {},
  followingIds: {},
  isHydrated: false,
  isSyncing: false,
  error: null,

  hydrate: async () => {
    if (!isSupabaseConfigured) {
      set({ isHydrated: true });
      return;
    }
    try {
      const snap = await fetchMyTasteSnapshot();
      set({
        ...snap,
        isHydrated: true,
        error: null,
      });
    } catch (err) {
      set({
        isHydrated: true,
        error: err instanceof Error ? err.message : 'Could not load taste.',
      });
    }
  },

  clear: () =>
    set({
      loggedIds: {},
      ratings: {},
      downloadedIds: {},
      repostedIds: {},
      followingIds: {},
      error: null,
    }),

  logTrack: async (trackId) => {
    const prev = get().loggedIds;
    set({
      loggedIds: { ...prev, [trackId]: true },
      error: null,
      isSyncing: true,
    });
    try {
      if (isSupabaseConfigured) {
        await upsertLog(trackId, get().ratings[trackId] ?? null);
      }
    } catch (err) {
      set({ loggedIds: prev, error: messageOf(err) });
    } finally {
      set({ isSyncing: false });
    }
  },

  unlogTrack: async (trackId) => {
    const prevLogged = get().loggedIds;
    const prevRatings = get().ratings;
    const nextLogged = { ...prevLogged };
    delete nextLogged[trackId];
    const nextRatings = { ...prevRatings };
    delete nextRatings[trackId];
    set({
      loggedIds: nextLogged,
      ratings: nextRatings,
      error: null,
      isSyncing: true,
    });
    try {
      if (isSupabaseConfigured) await deleteLog(trackId);
    } catch (err) {
      set({
        loggedIds: prevLogged,
        ratings: prevRatings,
        error: messageOf(err),
      });
    } finally {
      set({ isSyncing: false });
    }
  },

  toggleLog: async (trackId) => {
    if (get().loggedIds[trackId]) {
      await get().unlogTrack(trackId);
    } else {
      await get().logTrack(trackId);
    }
  },

  setRating: async (trackId, rating) => {
    const prevLogged = get().loggedIds;
    const prevRatings = get().ratings;
    set({
      ratings: { ...prevRatings, [trackId]: rating },
      loggedIds: { ...prevLogged, [trackId]: true },
      error: null,
      isSyncing: true,
    });
    try {
      if (isSupabaseConfigured) await upsertLog(trackId, rating);
    } catch (err) {
      set({
        loggedIds: prevLogged,
        ratings: prevRatings,
        error: messageOf(err),
      });
    } finally {
      set({ isSyncing: false });
    }
  },

  downloadTrack: async (trackId) => {
    const prev = get().downloadedIds;
    set({
      downloadedIds: { ...prev, [trackId]: true },
      error: null,
      isSyncing: true,
    });
    try {
      if (isSupabaseConfigured) await recordDownload(trackId);
    } catch (err) {
      set({ downloadedIds: prev, error: messageOf(err) });
      throw err;
    } finally {
      set({ isSyncing: false });
    }
  },

  toggleRepost: async (trackId) => {
    const prev = get().repostedIds;
    const was = Boolean(prev[trackId]);
    const next = { ...prev };
    if (was) delete next[trackId];
    else next[trackId] = true;
    set({ repostedIds: next, error: null, isSyncing: true });
    try {
      if (isSupabaseConfigured) {
        if (was) await removeRepost(trackId);
        else await recordRepost(trackId);
      }
    } catch (err) {
      set({ repostedIds: prev, error: messageOf(err) });
    } finally {
      set({ isSyncing: false });
    }
  },

  toggleFollow: async (targetId, targetKind) => {
    const prev = get().followingIds;
    const was = Boolean(prev[targetId]);
    const next = { ...prev };
    if (was) delete next[targetId];
    else next[targetId] = targetKind;
    set({ followingIds: next, error: null, isSyncing: true });
    try {
      if (isSupabaseConfigured) {
        if (was) await unfollowTarget(targetId);
        else await followTarget(targetId, targetKind);
      }
    } catch (err) {
      set({ followingIds: prev, error: messageOf(err) });
    } finally {
      set({ isSyncing: false });
    }
  },

  isLogged: (trackId) => Boolean(get().loggedIds[trackId]),
  isFollowing: (targetId) => Boolean(get().followingIds[targetId]),
  clearError: () => set({ error: null }),
}));

function messageOf(err: unknown): string {
  if (err instanceof TasteApiError) return err.message;
  if (err instanceof Error) return err.message;
  return 'Taste sync failed.';
}
