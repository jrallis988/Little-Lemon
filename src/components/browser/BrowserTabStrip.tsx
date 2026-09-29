import { useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  titleForPath,
  useBrowserTabsStore,
} from "@/stores/browserTabsStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { cn } from "@/lib/utils";

/** Browser-tab chrome that stays synced to the active Surf route. */
export function BrowserTabStrip() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = useBrowserTabsStore((s) => s.tabs);
  const activeTabId = useBrowserTabsStore((s) => s.activeTabId);
  const setActiveTab = useBrowserTabsStore((s) => s.setActiveTab);
  const closeTab = useBrowserTabsStore((s) => s.closeTab);
  const openTab = useBrowserTabsStore((s) => s.openTab);
  const syncActiveTab = useBrowserTabsStore((s) => s.syncActiveTab);
  const articleTitle = useNavigationStore((s) => s.activeArticle?.title);
  const query = useNavigationStore((s) => s.query);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    const base = titleForPath(location.pathname, location.search);
    let title = base.title;
    if (base.kind === "article" && articleTitle) {
      title = articleTitle.length > 22 ? `${articleTitle.slice(0, 20)}…` : articleTitle;
    }
    if (base.kind === "search" && query) {
      title = query.length > 22 ? `${query.slice(0, 20)}…` : query;
    }
    syncActiveTab({ title, url: path, kind: base.kind });
  }, [
    location.pathname,
    location.search,
    articleTitle,
    query,
    syncActiveTab,
  ]);

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-white/40 bg-white/50 px-3 py-1.5">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            className={cn(
              "group flex max-w-[12rem] items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium",
              active
                ? "bg-white text-navy shadow-soft"
                : "text-slate hover:bg-white/70",
            )}
          >
            <button
              type="button"
              className="truncate"
              onClick={() => {
                setActiveTab(tab.id);
                navigate(tab.url);
              }}
            >
              {tab.title}
            </button>
            {tabs.length > 1 && (
              <button
                type="button"
                className="rounded-md p-0.5 opacity-60 hover:bg-cream hover:opacity-100"
                aria-label={`Close ${tab.title}`}
                onClick={() => {
                  const wasActive = tab.id === activeTabId;
                  closeTab(tab.id);
                  if (wasActive) {
                    const next = useBrowserTabsStore
                      .getState()
                      .tabs.find(
                        (item) =>
                          item.id === useBrowserTabsStore.getState().activeTabId,
                      );
                    navigate(next?.url ?? "/");
                  }
                }}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        );
      })}
      <button
        type="button"
        className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-xl text-slate hover:bg-white hover:text-navy"
        aria-label="New tab"
        onClick={() => {
          openTab({ title: "Home", url: "/", kind: "home" });
          navigate("/");
        }}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
