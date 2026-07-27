import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import type { SessionSnapshot } from "@/types";
import { useParentStore } from "@/stores/profileStore";
import { useAnalyticsStore } from "@/stores/analyticsStore";

type SessionState = SessionSnapshot & {
  startSession: (profileId: string) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  tick: () => void;
  resetForNewDay: () => void;
  showLearningMode: () => void;
  settleLearningMode: () => void;
  dismissLearningMode: () => void;
  remainingSeconds: () => number;
};

function createEmptySession(): SessionSnapshot {
  return {
    profileId: null,
    startedAt: null,
    elapsedSeconds: 0,
    isPaused: false,
    limitReached: false,
    learningModeVisible: false,
    learningModeSettled: false,
  };
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      ...createEmptySession(),
      startSession: (profileId) => {
        const parent = useParentStore.getState();
        set({
          profileId,
          startedAt: new Date().toISOString(),
          isPaused: false,
          limitReached: false,
          learningModeVisible: parent.controls.learningModeEnabled,
          learningModeSettled: false,
        });
      },
      pauseSession: () => set({ isPaused: true }),
      resumeSession: () => set({ isPaused: false }),
      tick: () => {
        const state = get();
        if (!state.profileId || state.isPaused || state.limitReached) return;

        const nextElapsed = state.elapsedSeconds + 1;
        const limitSeconds =
          useParentStore.getState().controls.dailyLimitMinutes * 60;
        const limitReached = nextElapsed >= limitSeconds;

        set({
          elapsedSeconds: nextElapsed,
          limitReached,
          isPaused: limitReached ? true : state.isPaused,
        });

        if (nextElapsed % 60 === 0) {
          useParentStore
            .getState()
            .recordUsageTick(state.profileId, nextElapsed);
          useAnalyticsStore.getState().recordLearningMinute();
        }
      },
      resetForNewDay: () =>
        set({
          elapsedSeconds: 0,
          limitReached: false,
          isPaused: false,
          startedAt: new Date().toISOString(),
        }),
      showLearningMode: () =>
        set({ learningModeVisible: true, learningModeSettled: false }),
      settleLearningMode: () => set({ learningModeSettled: true }),
      dismissLearningMode: () =>
        set({ learningModeVisible: false, learningModeSettled: true }),
      remainingSeconds: () => {
        const limitSeconds =
          useParentStore.getState().controls.dailyLimitMinutes * 60;
        return Math.max(0, limitSeconds - get().elapsedSeconds);
      },
    }),
    {
      name: STORAGE_KEYS.session,
      partialize: (state) => ({
        profileId: state.profileId,
        startedAt: state.startedAt,
        elapsedSeconds: state.elapsedSeconds,
        isPaused: state.isPaused,
        limitReached: state.limitReached,
      }),
    },
  ),
);
