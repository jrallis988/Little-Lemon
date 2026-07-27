import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiAssistantPanel } from "@/components/browser/AiAssistantPanel";
import { ContentArea } from "@/components/browser/ContentArea";
import { NavBar } from "@/components/browser/NavBar";
import { TabBar } from "@/components/browser/TabBar";
import { LearningModeOverlay } from "@/components/learning/LearningModeOverlay";
import { BreakScreen } from "@/screens/BreakScreen";
import {
  browserCloseTab,
  browserGoBack,
  browserGoForward,
  browserReload,
  browserSetChromeHeight,
  browserShowTab,
  browserHideTab,
  isTauriRuntime,
  listenBlockedNavigation,
  listenNativeNewTab,
  setParentAllowlist,
} from "@/services/browserBridge";
import { ROUTES } from "@/routes/paths";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useSessionTimer } from "@/hooks/useSessionTimer";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useBrowserStore } from "@/stores/browserStore";
import { useHistoryStore } from "@/stores/historyStore";
import { useParentStore, useProfileStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";
import type { BrowserTab } from "@/types";

function routeTitle(pathname: string): { title: string; kind: BrowserTab["kind"] } {
  if (pathname.startsWith(ROUTES.explore)) return { title: "Explore", kind: "explore" };
  if (pathname === ROUTES.profile) return { title: "Profile", kind: "profile" };
  if (pathname === ROUTES.parent) return { title: "Parent", kind: "parent" };
  if (pathname === ROUTES.projects) return { title: "Projects", kind: "projects" };
  if (pathname === ROUTES.settings) return { title: "Settings", kind: "settings" };
  if (pathname === ROUTES.search) return { title: "Search", kind: "search" };
  return { title: "New Tab", kind: "newtab" };
}

export function BrowserShell() {
  useAccessibility();
  useSessionTimer();

  const navigate = useNavigate();
  const location = useLocation();
  const chromeRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const previousActiveId = useRef<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const tabs = useBrowserStore((state) => state.tabs);
  const activeTabId = useBrowserStore((state) => state.activeTabId);
  const setChromeHeight = useBrowserStore((state) => state.setChromeHeight);
  const closeTab = useBrowserStore((state) => state.closeTab);
  const createTab = useBrowserStore((state) => state.createTab);
  const switchTab = useBrowserStore((state) => state.switchTab);
  const activeProfileId = useProfileStore((state) => state.activeProfileId);
  const parentWhitelist = useParentStore((state) => state.controls.whitelist);
  const limitReached = useSessionStore((state) => state.limitReached);
  const { openNewTab } = useBrowserActions();

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? null,
    [activeTabId, tabs],
  );

  useEffect(() => {
    if (!isTauriRuntime()) return;
    void setParentAllowlist(parentWhitelist);
  }, [parentWhitelist]);

  useEffect(() => {
    const node = chromeRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(entry.contentRect.height);
      setChromeHeight(height);
      if (isTauriRuntime()) {
        void browserSetChromeHeight(height);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [setChromeHeight]);

  useEffect(() => {
    let cleanupBlocked: (() => void) | undefined;
    let cleanupNewTab: (() => void) | undefined;

    void listenBlockedNavigation((payload) => {
      const state = useBrowserStore.getState();
      const existing = state.findTab(payload.tab_id);
      if (existing) {
        state.updateTab(payload.tab_id, {
          kind: "blocked",
          title: "Blocked",
          url: payload.url,
          blockedReason: payload.reason,
          blockedDomain: payload.domain,
          isLoading: false,
        });
        state.switchTab(payload.tab_id);
      } else {
        state.createTab({
          id: payload.tab_id,
          kind: "blocked",
          title: "Blocked",
          url: payload.url,
          blockedReason: payload.reason,
          blockedDomain: payload.domain,
        });
      }
      useAnalyticsStore.getState().recordBlocked();
      useHistoryStore.getState().addEntry({
        profileId: activeProfileId ?? "unknown",
        title: "Blocked navigation",
        url: payload.url || "about:blocked",
        domain: payload.domain,
        blocked: true,
      });
    }).then((unlisten) => {
      cleanupBlocked = unlisten;
    });

    void listenNativeNewTab((payload) => {
      createTab({
        id: payload.tab_id,
        kind: "web",
        title: payload.url,
        url: payload.url,
        nativeAttached: true,
      });
      switchTab(payload.tab_id);
    }).then((unlisten) => {
      cleanupNewTab = unlisten;
    });

    return () => {
      cleanupBlocked?.();
      cleanupNewTab?.();
    };
  }, [activeProfileId, createTab, switchTab]);

  useEffect(() => {
    const previousId = previousActiveId.current;
    previousActiveId.current = activeTab?.id ?? null;
    if (!isTauriRuntime() || !activeTab) return;

    const previous = previousId
      ? tabs.find((tab) => tab.id === previousId)
      : null;
    if (previous?.nativeAttached && previous.id !== activeTab.id) {
      void browserHideTab(previous.id);
    }
    if (activeTab.nativeAttached && activeTab.kind === "web") {
      void browserShowTab(activeTab.id);
    }
  }, [activeTab, tabs]);

  useEffect(() => {
    if (!activeTab || activeTab.kind === "web" || activeTab.kind === "blocked") {
      return;
    }
    if (location.pathname + location.search !== activeTab.url) {
      navigate(activeTab.url);
    }
  }, [activeTab, location.pathname, location.search, navigate]);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = useBrowserStore.getState().getActiveTab();
    if (!active || active.kind === "web" || active.kind === "blocked") return;
    const { title, kind } = routeTitle(currentPath);
    const searchTitle =
      kind === "search"
        ? new URLSearchParams(location.search).get("q") || "Search"
        : title;
    useBrowserStore.getState().updateTab(active.id, {
      kind,
      title: searchTitle,
      url: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod || event.altKey) return;

      const active = useBrowserStore.getState().getActiveTab();
      const key = event.key.toLowerCase();
      if (key === "t") {
        event.preventDefault();
        openNewTab();
      } else if (key === "w") {
        event.preventDefault();
        if (!active) return;
        if (active.nativeAttached && isTauriRuntime()) void browserCloseTab(active.id);
        closeTab(active.id);
      } else if (key === "r") {
        event.preventDefault();
        if (active?.kind === "web" && isTauriRuntime()) void browserReload(active.id);
      } else if (key === "l") {
        event.preventDefault();
        addressRef.current?.select();
      } else if (event.key === "[") {
        event.preventDefault();
        if (active?.kind === "web" && isTauriRuntime()) void browserGoBack(active.id);
      } else if (event.key === "]") {
        event.preventDefault();
        if (active?.kind === "web" && isTauriRuntime()) void browserGoForward(active.id);
      } else if (/^[1-9]$/.test(event.key)) {
        event.preventDefault();
        const index = Number(event.key) - 1;
        const tab = useBrowserStore.getState().tabs[index];
        if (tab) useBrowserStore.getState().switchTab(tab.id);
      } else if (event.key === "0" || key === "+" || key === "-" || key === "=") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeTab, openNewTab]);

  if (limitReached) {
    return (
      <>
        <BreakScreen />
        <LearningModeOverlay />
      </>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background/70">
      <div
        ref={chromeRef}
        className="sticky top-0 z-30 border-b border-white/60 bg-cream/90 shadow-soft backdrop-blur-xl"
      >
        <TabBar />
        <NavBar
          activeTab={activeTab}
          addressRef={addressRef}
          menuOpen={menuOpen}
          aiOpen={aiOpen}
          onMenuOpenChange={setMenuOpen}
          onAiOpenChange={setAiOpen}
        />
      </div>

      <ContentArea activeTab={activeTab} />
      {aiOpen && (
        <AiAssistantPanel
          activeTab={activeTab}
          onClose={() => setAiOpen(false)}
        />
      )}
      <LearningModeOverlay />
    </div>
  );
}
