import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { createId, extractDomain } from "@/lib/utils";
import type { HistoryEntry } from "@/types";

type HistoryState = {
  entries: HistoryEntry[];
  addEntry: (entry: Omit<HistoryEntry, "id" | "domain" | "visitedAt"> & {
    domain?: string;
    visitedAt?: string;
  }) => void;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: createId("hist"),
              domain: entry.domain ?? extractDomain(entry.url),
              visitedAt: entry.visitedAt ?? new Date().toISOString(),
            },
            ...state.entries,
          ].slice(0, 500),
        })),
      clear: () => set({ entries: [] }),
    }),
    { name: STORAGE_KEYS.history },
  ),
);
