import type { RefObject } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Home,
  Menu,
  RefreshCw,
  Star,
} from "lucide-react";
import { AddressBar } from "@/components/browser/AddressBar";
import { BrowserMenu } from "@/components/browser/BrowserMenu";
import { Button } from "@/components/ui/button";
import {
  browserGoBack,
  browserGoForward,
  browserReload,
  isTauriRuntime,
} from "@/services/browserBridge";
import { useBookmarksStore } from "@/stores/bookmarksStore";
import { useBrowserStore } from "@/stores/browserStore";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { cn } from "@/lib/utils";
import type { BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
  addressRef: RefObject<HTMLInputElement>;
  menuOpen: boolean;
  aiOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  onAiOpenChange: (open: boolean) => void;
};

export function NavBar({
  activeTab,
  addressRef,
  menuOpen,
  aiOpen,
  onMenuOpenChange,
  onAiOpenChange,
}: Props) {
  const { openReactTab } = useBrowserActions();
  const updateTab = useBrowserStore((state) => state.updateTab);
  const toggleBookmarkForTab = useBookmarksStore(
    (state) => state.toggleBookmarkForTab,
  );
  const isBookmarked = useBookmarksStore((state) => state.isBookmarked);
  const bookmarked = activeTab?.url ? isBookmarked(activeTab.url) : false;
  const canUseNativeHistory = Boolean(activeTab?.kind === "web" && isTauriRuntime());

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back"
          disabled={!canUseNativeHistory}
          onClick={() => activeTab && void browserGoBack(activeTab.id)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Forward"
          disabled={!canUseNativeHistory}
          onClick={() => activeTab && void browserGoForward(activeTab.id)}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Reload"
          onClick={() => {
            if (!activeTab) return;
            if (activeTab.kind === "web" && isTauriRuntime()) {
              void browserReload(activeTab.id);
              return;
            }
            window.location.reload();
          }}
        >
          <RefreshCw className={cn("h-4 w-4", activeTab?.isLoading && "animate-spin")} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home"
          onClick={() => openReactTab("newtab", "New Tab", "/")}
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>

      <AddressBar ref={addressRef} activeTab={activeTab} />

      <Button
        variant="ghost"
        size="icon"
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark page"}
        disabled={!activeTab || activeTab.url === "/"}
        onClick={() => {
          if (!activeTab) return;
          toggleBookmarkForTab(activeTab);
          updateTab(activeTab.id, { favicon: activeTab.favicon });
        }}
      >
        <Star
          className={cn(
            "h-4 w-4",
            bookmarked && "fill-orange text-orange",
          )}
        />
      </Button>
      <Button
        variant={aiOpen ? "secondary" : "ghost"}
        size="icon"
        aria-label="AI assistant"
        onClick={() => onAiOpenChange(!aiOpen)}
      >
        <Bot className="h-4 w-4" />
      </Button>
      <div className="relative">
        <Button
          variant={menuOpen ? "secondary" : "ghost"}
          size="icon"
          aria-label="Browser menu"
          onClick={() => onMenuOpenChange(!menuOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        {menuOpen && <BrowserMenu onClose={() => onMenuOpenChange(false)} />}
      </div>
    </div>
  );
}
