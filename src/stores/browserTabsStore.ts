import { create } from "zustand";
import { createId } from "@/lib/utils";

export type BrowserTabKind =
  | "home"
  | "search"
  | "article"
  | "explore"
  | "projects"
  | "profile"
  | "parent"
  | "custom";

export type BrowserTab = {
  id: string;
  title: string;
  url: string;
  kind: BrowserTabKind;
};

type TabsState = {
  tabs: BrowserTab[];
  activeTabId: string;
  openTab: (tab: Omit<BrowserTab, "id">) => string;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  renameTab: (id: string, title: string) => void;
  /** Keep the active tab’s title/url in sync with the current route. */
  syncActiveTab: (patch: Partial<Pick<BrowserTab, "title" | "url" | "kind">>) => void;
  /** Open or focus a tab for this path (used when opening articles in a new tab). */
  openOrFocus: (tab: Omit<BrowserTab, "id">) => string;
};

const homeTab: BrowserTab = {
  id: "tab-home",
  title: "Home",
  url: "/",
  kind: "home",
};

export const useBrowserTabsStore = create<TabsState>((set, get) => ({
  tabs: [homeTab],
  activeTabId: homeTab.id,
  openTab: (tab) => {
    const id = createId("tab");
    set((state) => ({
      tabs: [...state.tabs, { ...tab, id }].slice(0, 8),
      activeTabId: id,
    }));
    return id;
  },
  openOrFocus: (tab) => {
    const existing = get().tabs.find(
      (item) => item.url === tab.url || (tab.kind === "article" && item.url === tab.url),
    );
    if (existing) {
      set({ activeTabId: existing.id });
      get().syncActiveTab({ title: tab.title, url: tab.url, kind: tab.kind });
      return existing.id;
    }
    return get().openTab(tab);
  },
  closeTab: (id) => {
    const { tabs, activeTabId } = get();
    if (tabs.length <= 1) return;
    const nextTabs = tabs.filter((tab) => tab.id !== id);
    const nextActive =
      activeTabId === id
        ? nextTabs[nextTabs.length - 1]?.id ?? homeTab.id
        : activeTabId;
    set({ tabs: nextTabs, activeTabId: nextActive });
  },
  setActiveTab: (id) => set({ activeTabId: id }),
  renameTab: (id, title) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { ...tab, title } : tab,
      ),
    })),
  syncActiveTab: (patch) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === state.activeTabId ? { ...tab, ...patch } : tab,
      ),
    })),
}));

export function titleForPath(pathname: string, search: string): {
  title: string;
  kind: BrowserTabKind;
} {
  if (pathname.startsWith("/search")) {
    const q = new URLSearchParams(search).get("q");
    return {
      title: q ? truncateTitle(q) : "Search",
      kind: "search",
    };
  }
  if (pathname.startsWith("/article")) {
    return { title: "Reader", kind: "article" };
  }
  if (pathname.startsWith("/explore")) {
    return { title: "Explore", kind: "explore" };
  }
  if (pathname.startsWith("/projects")) {
    return { title: "Projects", kind: "projects" };
  }
  if (pathname.startsWith("/profile")) {
    return { title: "Profile", kind: "profile" };
  }
  if (pathname.startsWith("/parent")) {
    return { title: "Parent", kind: "parent" };
  }
  return { title: "Home", kind: "home" };
}

function truncateTitle(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 22) return trimmed;
  return `${trimmed.slice(0, 20)}…`;
}
