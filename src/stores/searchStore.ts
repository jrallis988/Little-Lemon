import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_SEARCH_RESULTS, STORAGE_KEYS } from "@/lib/constants";
import { educationalSearch } from "@/services/educationalSearch";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import type { EducationalSearchResult } from "@/types";

type SearchStatus = "idle" | "loading" | "success" | "error";

type SearchState = {
  query: string;
  results: EducationalSearchResult[];
  status: SearchStatus;
  errorMessage: string | null;
  recentSearches: string[];
  setQuery: (query: string) => void;
  clearResults: () => void;
  search: (query: string, limit?: number) => Promise<void>;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: "",
      results: [],
      status: "idle",
      errorMessage: null,
      recentSearches: [],
      setQuery: (query) => set({ query }),
      clearResults: () =>
        set({ results: [], status: "idle", errorMessage: null }),
      search: async (query, limit = MAX_SEARCH_RESULTS) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        set({ query: trimmed, status: "loading", errorMessage: null });
        try {
          const results = await educationalSearch(trimmed, limit);
          useAnalyticsStore.getState().recordSearch();
          set((state) => ({
            results,
            status: "success",
            errorMessage: null,
            recentSearches: [
              trimmed,
              ...state.recentSearches.filter(
                (entry) => entry.toLowerCase() !== trimmed.toLowerCase(),
              ),
            ].slice(0, 8),
          }));
        } catch (error) {
          set({
            results: [],
            status: "error",
            errorMessage:
              error instanceof Error
                ? error.message
                : "Search failed. Please try again.",
          });
        }
      },
    }),
    {
      name: STORAGE_KEYS.search,
      partialize: (state) => ({
        query: state.query,
        recentSearches: state.recentSearches,
      }),
    },
  ),
);
