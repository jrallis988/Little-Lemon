import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  browserCreateTab,
  browserNavigate,
  isTauriRuntime,
} from "@/services/browserBridge";
import { ROUTES } from "@/routes/paths";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useBrowserStore } from "@/stores/browserStore";
import { useHistoryStore } from "@/stores/historyStore";
import { useProfileStore } from "@/stores/profileStore";
import { useSearchStore } from "@/stores/searchStore";
import type { BrowserTab, EducationalSearchResult, TabKind } from "@/types";
import { extractDomain } from "@/lib/utils";

function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function looksLikeUrl(value: string): boolean {
  const trimmed = value.trim();
  return (
    /^https?:\/\//i.test(trimmed) ||
    /^localhost(:\d+)?/i.test(trimmed) ||
    /^[^\s]+\.[^\s]{2,}/.test(trimmed)
  );
}

function routeForKind(kind: TabKind): string {
  switch (kind) {
    case "explore":
      return ROUTES.explore;
    case "profile":
      return ROUTES.profile;
    case "parent":
      return ROUTES.parent;
    case "projects":
      return ROUTES.projects;
    case "settings":
      return ROUTES.settings;
    case "search":
      return ROUTES.search;
    case "blocked":
      return ROUTES.blocked;
    case "newtab":
    case "web":
    default:
      return ROUTES.home;
  }
}

export function useBrowserActions() {
  const navigate = useNavigate();
  const activeProfileId = useProfileStore((state) => state.activeProfileId);

  const openNewTab = useCallback(() => {
    useBrowserStore.getState().createTab({
      kind: "newtab",
      title: "New Tab",
      url: ROUTES.home,
    });
    navigate(ROUTES.home);
  }, [navigate]);

  const openReactTab = useCallback(
    (kind: Exclude<TabKind, "web" | "blocked">, title: string, url?: string) => {
      const path = url ?? routeForKind(kind);
      useBrowserStore.getState().ensureReactTab(kind, path, title);
      navigate(path);
    },
    [navigate],
  );

  const openSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      const path = `${ROUTES.search}?q=${encodeURIComponent(trimmed)}`;
      useBrowserStore.getState().ensureReactTab("search", path, trimmed);
      navigate(path);
      void useSearchStore.getState().search(trimmed);
    },
    [navigate],
  );

  const openWebUrl = useCallback(
    async (rawUrl: string, title = "Learning page", favicon?: string) => {
      const url = normalizeUrl(rawUrl);
      const browser = useBrowserStore.getState();
      const active = browser.getActiveTab();
      const tab: BrowserTab =
        active && !active.pinned
          ? active
          : browser.createTab({ kind: "web", title, url, favicon });

      browser.updateTab(tab.id, {
        kind: "web",
        title,
        url,
        favicon,
        isLoading: true,
      });

      try {
        if (isTauriRuntime()) {
          if (tab.nativeAttached) {
            await browserNavigate({ tabId: tab.id, url });
          } else {
            await browserCreateTab({
              tabId: tab.id,
              url,
              chromeHeight: browser.chromeHeight,
            });
          }
          browser.updateTab(tab.id, { nativeAttached: true });
        }

        useAnalyticsStore.getState().recordSiteVisit();
        useHistoryStore.getState().addEntry({
          profileId: activeProfileId ?? "unknown",
          title,
          url,
          domain: extractDomain(url),
          blocked: false,
        });
        browser.updateTab(tab.id, { isLoading: false, title, url });
      } catch (error) {
        browser.updateTab(tab.id, {
          kind: "blocked",
          title: "Blocked",
          url,
          isLoading: false,
          blockedReason:
            error instanceof Error
              ? error.message
              : "Navigation blocked by Surf.",
        });
      }
    },
    [activeProfileId],
  );

  const openSearchResult = useCallback(
    (result: EducationalSearchResult) =>
      openWebUrl(result.url, result.title, result.favicon_url),
    [openWebUrl],
  );

  return {
    openNewTab,
    openReactTab,
    openSearch,
    openWebUrl,
    openSearchResult,
    routeForKind,
  };
}
