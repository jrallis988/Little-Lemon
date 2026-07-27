import { useEffect, useState, type ReactNode } from "react";
import { BookmarkPlus, Copy, Download, ExternalLink, Highlighter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarksStore } from "@/stores/bookmarksStore";
import { useDownloadsStore } from "@/stores/downloadsStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { extractDomain } from "@/lib/utils";
import type { BrowserTab } from "@/types";

type MenuState = {
  x: number;
  y: number;
  selectedText: string;
} | null;

type Props = {
  activeTab: BrowserTab | null;
  children: ReactNode;
};

export function ContextMenuLayer({ activeTab, children }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);
  const toggleBookmarkForTab = useBookmarksStore((state) => state.toggleBookmarkForTab);
  const enqueue = useDownloadsStore((state) => state.enqueue);
  const addHighlightToActive = useProjectsStore((state) => state.addHighlightToActive);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className="relative min-h-0 flex-1"
      onContextMenu={(event) => {
        event.preventDefault();
        const selectedText = window.getSelection()?.toString().trim() ?? "";
        setMenu({
          x: event.clientX,
          y: event.clientY,
          selectedText,
        });
      }}
      onClick={() => setMenu(null)}
    >
      {children}
      {menu && (
        <div
          className="fixed z-[60] w-56 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-glass"
          style={{ left: menu.x, top: menu.y }}
          onClick={(event) => event.stopPropagation()}
        >
          <MenuItem
            icon={<ExternalLink className="h-4 w-4" />}
            label="Open link in new tab"
            disabled={!activeTab?.url}
            onClick={() => setMenu(null)}
          />
          <MenuItem
            icon={<Copy className="h-4 w-4" />}
            label="Copy"
            disabled={!menu.selectedText && !activeTab?.url}
            onClick={async () => {
              const value = menu.selectedText || activeTab?.url || "";
              if (value) await navigator.clipboard.writeText(value);
              setMenu(null);
            }}
          />
          <MenuItem
            icon={<BookmarkPlus className="h-4 w-4" />}
            label="Bookmark page"
            disabled={!activeTab}
            onClick={() => {
              if (activeTab) toggleBookmarkForTab(activeTab);
              setMenu(null);
            }}
          />
          <MenuItem
            icon={<Download className="h-4 w-4" />}
            label="Download page / file"
            disabled={!activeTab?.url || activeTab.url.startsWith("/")}
            onClick={() => {
              if (activeTab?.url) enqueue({ url: activeTab.url });
              setMenu(null);
            }}
          />
          <MenuItem
            icon={<Highlighter className="h-4 w-4" />}
            label="Highlight selection"
            disabled={!menu.selectedText || !activeTab}
            onClick={() => {
              if (!activeTab || !menu.selectedText) return;
              addHighlightToActive({
                pageUrl: activeTab.url,
                pageTitle: activeTab.title,
                text: menu.selectedText,
              });
              setMenu(null);
            }}
          />
          {activeTab?.url && (
            <p className="mt-2 truncate px-2 text-[10px] text-slate">
              {extractDomain(activeTab.url)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      disabled={disabled}
      className="h-9 w-full justify-start gap-2 rounded-xl px-2 text-sm"
      onClick={onClick}
    >
      <span className="text-ocean">{icon}</span>
      {label}
    </Button>
  );
}
