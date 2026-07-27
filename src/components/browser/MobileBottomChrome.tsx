import { ArrowLeft, Home, Menu, Plus, RefreshCw, SquareStack } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  browserGoBack,
  browserReload,
  isTauriRuntime,
} from "@/services/browserBridge";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useBrowserStore } from "@/stores/browserStore";
import { cn } from "@/lib/utils";
import type { BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
  onOpenMenu: () => void;
  onOpenTabs: () => void;
};

/** Compact floating chrome for small screens — back, menu, address, tabs, new. */
export function MobileBottomChrome({ activeTab, onOpenMenu, onOpenTabs }: Props) {
  const { openNewTab, openReactTab } = useBrowserActions();
  const tabs = useBrowserStore((state) => state.tabs);
  const canNative = Boolean(activeTab?.kind === "web" && isTauriRuntime());

  return (
    <nav
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex items-center gap-1 rounded-full border border-white/50 bg-navy/90 px-2 py-2 text-foam shadow-glass backdrop-blur-xl md:hidden",
      )}
      aria-label="Mobile browser controls"
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-foam hover:bg-white/10"
        aria-label="Back"
        disabled={!canNative}
        onClick={() => activeTab && void browserGoBack(activeTab.id)}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-foam hover:bg-white/10"
        aria-label="Menu"
        onClick={onOpenMenu}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <button
        type="button"
        className="mx-1 flex min-w-0 flex-1 items-center justify-between gap-2 rounded-full bg-white/10 px-3 py-2 text-left"
        onClick={() => window.dispatchEvent(new Event("surf-focus-address"))}
        aria-label="Focus address bar"
      >
        <span className="truncate text-xs">
          {activeTab?.kind === "web"
            ? activeTab.url.replace(/^https?:\/\//, "")
            : activeTab?.title || "Search Surf"}
        </span>
        <RefreshCw
          className="h-3.5 w-3.5 shrink-0 opacity-80"
          onClick={(event) => {
            event.stopPropagation();
            if (activeTab?.kind === "web" && isTauriRuntime()) {
              void browserReload(activeTab.id);
            }
          }}
        />
      </button>
      <Button
        variant="ghost"
        size="icon"
        className="relative text-foam hover:bg-white/10"
        aria-label="Tabs"
        onClick={onOpenTabs}
      >
        <SquareStack className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
          {tabs.length}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-foam hover:bg-white/10"
        aria-label="Home"
        onClick={() => openReactTab("newtab", "New Tab", "/")}
      >
        <Home className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-foam hover:bg-white/10"
        aria-label="New tab"
        onClick={openNewTab}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </nav>
  );
}
