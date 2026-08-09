import { create } from "zustand";
import { createId } from "@/lib/utils";

export type BrowserTab = {
  id: string;
  title: string;
  url: string;
  kind: "home" | "search" | "article" | "projects" | "custom";
};

type TabsState = {
  tabs: BrowserTab[];
  activeTabId: string;
  openTab: (tab: Omit<BrowserTab, "id">) => string;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  renameTab: (id: string, title: string) => void;
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
}));
