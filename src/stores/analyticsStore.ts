import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { todayKey } from "@/lib/utils";

export type AnalyticsDay = {
  date: string;
  learningMinutes: number;
  searches: number;
  blocked: number;
  sitesVisited: number;
};

type AnalyticsState = {
  learningMinutes: number;
  searches: number;
  blocked: number;
  sitesVisited: number;
  daily: AnalyticsDay[];
  recordLearningMinute: () => void;
  recordSearch: () => void;
  recordBlocked: () => void;
  recordSiteVisit: () => void;
};

function incrementDaily(
  daily: AnalyticsDay[],
  key: keyof Omit<AnalyticsDay, "date">,
): AnalyticsDay[] {
  const date = todayKey();
  const existing = daily.find((day) => day.date === date);
  if (!existing) {
    return [
      ...daily,
      {
        date,
        learningMinutes: key === "learningMinutes" ? 1 : 0,
        searches: key === "searches" ? 1 : 0,
        blocked: key === "blocked" ? 1 : 0,
        sitesVisited: key === "sitesVisited" ? 1 : 0,
      },
    ].slice(-30);
  }

  return daily.map((day) =>
    day.date === date ? { ...day, [key]: day[key] + 1 } : day,
  );
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      learningMinutes: 0,
      searches: 0,
      blocked: 0,
      sitesVisited: 0,
      daily: [],
      recordLearningMinute: () =>
        set((state) => ({
          learningMinutes: state.learningMinutes + 1,
          daily: incrementDaily(state.daily, "learningMinutes"),
        })),
      recordSearch: () =>
        set((state) => ({
          searches: state.searches + 1,
          daily: incrementDaily(state.daily, "searches"),
        })),
      recordBlocked: () =>
        set((state) => ({
          blocked: state.blocked + 1,
          daily: incrementDaily(state.daily, "blocked"),
        })),
      recordSiteVisit: () =>
        set((state) => ({
          sitesVisited: state.sitesVisited + 1,
          daily: incrementDaily(state.daily, "sitesVisited"),
        })),
    }),
    { name: STORAGE_KEYS.analytics },
  ),
);
