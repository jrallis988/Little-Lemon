import { create } from "zustand";
import type {
  AcademicSearchResponse,
  NavigationIntent,
  SanitizedArticle,
  SearchResult,
} from "@/types";

type NavigationState = {
  query: string;
  results: SearchResult[];
  academicResponse: AcademicSearchResponse | null;
  activeArticle: SanitizedArticle | null;
  blockedUrl: string | null;
  blockedReason: string | null;
  canGoBack: boolean;
  stack: NavigationIntent[];
  miloOpen: boolean;
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setAcademicResponse: (response: AcademicSearchResponse | null) => void;
  setActiveArticle: (article: SanitizedArticle | null) => void;
  setBlocked: (url: string, reason: string) => void;
  clearBlocked: () => void;
  pushIntent: (intent: NavigationIntent) => void;
  popIntent: () => NavigationIntent | null;
  setCanGoBack: (value: boolean) => void;
  setMiloOpen: (open: boolean) => void;
  toggleMilo: () => void;
};

export const useNavigationStore = create<NavigationState>((set, get) => ({
  query: "",
  results: [],
  academicResponse: null,
  activeArticle: null,
  blockedUrl: null,
  blockedReason: null,
  canGoBack: false,
  stack: [{ kind: "home" }],
  miloOpen: false,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setAcademicResponse: (academicResponse) => set({ academicResponse }),
  setActiveArticle: (article) => set({ activeArticle: article }),
  setBlocked: (url, reason) => set({ blockedUrl: url, blockedReason: reason }),
  clearBlocked: () => set({ blockedUrl: null, blockedReason: null }),
  pushIntent: (intent) =>
    set((state) => ({
      stack: [...state.stack, intent].slice(-40),
      canGoBack: true,
    })),
  popIntent: () => {
    const { stack } = get();
    if (stack.length <= 1) return null;
    const next = stack.slice(0, -1);
    const intent = next[next.length - 1] ?? null;
    set({ stack: next, canGoBack: next.length > 1 });
    return intent;
  },
  setCanGoBack: (value) => set({ canGoBack: value }),
  setMiloOpen: (miloOpen) => set({ miloOpen }),
  toggleMilo: () => set((state) => ({ miloOpen: !state.miloOpen })),
}));
