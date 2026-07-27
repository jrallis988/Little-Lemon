import { create } from "zustand";
import type { BrowserTab, TabKind } from "@/types";
import { createId } from "@/lib/utils";

const DEFAULT_CHROME_HEIGHT = 124;

function createNewTab(): BrowserTab {
  return {
    id: createId("tab"),
    kind: "newtab",
    title: "New Tab",
    url: "/",
    canGoBack: false,
    canGoForward: false,
    nativeAttached: false,
  };
}

type BrowserState = {
  tabs: BrowserTab[];
  activeTabId: string;
  chromeHeight: number;
  createTab: (patch?: Partial<BrowserTab>) => BrowserTab;
  closeTab: (tabId: string) => BrowserTab | null;
  switchTab: (tabId: string) => void;
  updateTab: (tabId: string, patch: Partial<BrowserTab>) => void;
  setChromeHeight: (chromeHeight: number) => void;
  reorderTabs: (orderedIds: string[]) => void;
  togglePinTab: (tabId: string) => void;
  getActiveTab: () => BrowserTab | null;
  findTab: (tabId: string) => BrowserTab | null;
  ensureReactTab: (kind: Exclude<TabKind, "web" | "blocked">, url: string, title: string) => void;
};

const initialTab = createNewTab();

export const useBrowserStore = create<BrowserState>((set, get) => ({
  tabs: [initialTab],
  activeTabId: initialTab.id,
  chromeHeight: DEFAULT_CHROME_HEIGHT,
  createTab: (patch) => {
    const tab: BrowserTab = {
      ...createNewTab(),
      ...patch,
      id: patch?.id ?? createId("tab"),
    };
    set((state) => ({
      tabs: [...state.tabs, tab],
      activeTabId: tab.id,
    }));
    return tab;
  },
  closeTab: (tabId) => {
    const { tabs, activeTabId } = get();
    if (tabs.length <= 1) {
      const replacement = createNewTab();
      set({ tabs: [replacement], activeTabId: replacement.id });
      return replacement;
    }

    const closingIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (closingIndex === -1) return null;

    const nextTabs = tabs.filter((tab) => tab.id !== tabId);
    let nextActiveId = activeTabId;
    if (activeTabId === tabId) {
      nextActiveId =
        nextTabs[Math.max(0, closingIndex - 1)]?.id ?? nextTabs[0]?.id ?? "";
    }
    set({ tabs: nextTabs, activeTabId: nextActiveId });
    return nextTabs.find((tab) => tab.id === nextActiveId) ?? null;
  },
  switchTab: (tabId) => {
    if (get().tabs.some((tab) => tab.id === tabId)) {
      set({ activeTabId: tabId });
    }
  },
  updateTab: (tabId, patch) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, ...patch } : tab,
      ),
    })),
  setChromeHeight: (chromeHeight) =>
    set({ chromeHeight: Math.max(0, Math.round(chromeHeight)) }),
  reorderTabs: (orderedIds) =>
    set((state) => {
      const byId = new Map(state.tabs.map((tab) => [tab.id, tab]));
      const ordered = orderedIds
        .map((id) => byId.get(id))
        .filter((tab): tab is BrowserTab => Boolean(tab));
      const missing = state.tabs.filter((tab) => !orderedIds.includes(tab.id));
      return { tabs: [...ordered, ...missing] };
    }),
  togglePinTab: (tabId) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, pinned: !tab.pinned } : tab,
      ),
    })),
  getActiveTab: () => {
    const { tabs, activeTabId } = get();
    return tabs.find((tab) => tab.id === activeTabId) ?? null;
  },
  findTab: (tabId) => get().tabs.find((tab) => tab.id === tabId) ?? null,
  ensureReactTab: (kind, url, title) => {
    const active = get().getActiveTab();
    if (active && active.kind !== "web") {
      get().updateTab(active.id, { kind, url, title });
      return;
    }
    get().createTab({ kind, url, title });
  },
}));
