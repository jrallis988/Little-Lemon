import type { BrowserTab } from "@/types";

export type BlockedNavigationPayload = {
  tab_id: string;
  url: string;
  reason: string;
  domain: string;
  timestamp: string;
};

export type NewTabCreatedPayload = {
  tab_id: string;
  opener_tab_id: string;
  url: string;
  timestamp: string;
};

export type PageContext = {
  tabId: string;
  title: string;
  url: string;
};

type Unlisten = () => void;

export function isTauriRuntime(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      // Tauri injects this marker before React starts.
      "__TAURI_INTERNALS__" in window,
  );
}

async function invokeBrowserCommand<T>(
  command: string,
  args?: Record<string, unknown>,
): Promise<T> {
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(command, args);
}

export function browserCreateTab(args: {
  tabId: string;
  url: string;
  chromeHeight: number;
}): Promise<void> {
  return invokeBrowserCommand("browser_create_tab", {
    tab_id: args.tabId,
    url: args.url,
    chrome_height: args.chromeHeight,
  });
}

export function browserNavigate(args: {
  tabId: string;
  url: string;
}): Promise<void> {
  return invokeBrowserCommand("browser_navigate", {
    tab_id: args.tabId,
    url: args.url,
  });
}

export function browserCloseTab(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_close_tab", { tab_id: tabId });
}

export function browserShowTab(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_show_tab", { tab_id: tabId });
}

export function browserHideTab(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_hide_tab", { tab_id: tabId });
}

export function browserReload(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_reload", { tab_id: tabId });
}

export function browserGoBack(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_go_back", { tab_id: tabId });
}

export function browserGoForward(tabId: string): Promise<void> {
  return invokeBrowserCommand("browser_go_forward", { tab_id: tabId });
}

export function browserSetChromeHeight(chromeHeight: number): Promise<void> {
  return invokeBrowserCommand("browser_set_chrome_height", {
    chrome_height: chromeHeight,
  });
}

export async function listenBlockedNavigation(
  handler: (payload: BlockedNavigationPayload) => void,
): Promise<Unlisten> {
  if (!isTauriRuntime()) return () => undefined;
  const { listen } = await import("@tauri-apps/api/event");
  return listen<BlockedNavigationPayload>("surf-navigation-blocked", (event) =>
    handler(event.payload),
  );
}

export async function listenNativeNewTab(
  handler: (payload: NewTabCreatedPayload) => void,
): Promise<Unlisten> {
  if (!isTauriRuntime()) return () => undefined;
  const { listen } = await import("@tauri-apps/api/event");
  return listen<NewTabCreatedPayload>("surf-new-tab-created", (event) =>
    handler(event.payload),
  );
}

export function pageContextFromTab(tab: BrowserTab | null): PageContext | null {
  if (!tab || (tab.kind !== "web" && tab.kind !== "blocked")) return null;
  return {
    tabId: tab.id,
    title: tab.title,
    url: tab.url,
  };
}
