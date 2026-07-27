import { create } from 'zustand';

import type { RatingValue } from '@/types/models';

type TasteState = {
  /** Track ids the current user has logged in this session (demo) */
  loggedIds: Record<string, true>;
  ratings: Record<string, RatingValue>;
  logTrack: (trackId: string) => void;
  unlogTrack: (trackId: string) => void;
  toggleLog: (trackId: string) => void;
  setRating: (trackId: string, rating: RatingValue) => void;
  isLogged: (trackId: string) => boolean;
};

/**
 * Local demo taste state — Letterboxd-style log + rate without a player.
 * Persists only for the session; wire to Supabase later.
 */
export const useTasteStore = create<TasteState>((set, get) => ({
  loggedIds: {},
  ratings: {},

  logTrack: (trackId) =>
    set((s) => ({
      loggedIds: { ...s.loggedIds, [trackId]: true },
    })),

  unlogTrack: (trackId) =>
    set((s) => {
      const next = { ...s.loggedIds };
      delete next[trackId];
      return { loggedIds: next };
    }),

  toggleLog: (trackId) => {
    if (get().loggedIds[trackId]) {
      get().unlogTrack(trackId);
    } else {
      get().logTrack(trackId);
    }
  },

  setRating: (trackId, rating) =>
    set((s) => ({
      ratings: { ...s.ratings, [trackId]: rating },
      loggedIds: { ...s.loggedIds, [trackId]: true },
    })),

  isLogged: (trackId) => Boolean(get().loggedIds[trackId]),
}));
