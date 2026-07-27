import type { ReactNode } from "react";
import { Bookmark, Download, History, Printer, Search, Settings, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useBookmarksStore } from "@/stores/bookmarksStore";
import { useHistoryStore } from "@/stores/historyStore";

type Props = {
  onClose: () => void;
};

export function BrowserMenu({ onClose }: Props) {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const history = useHistoryStore((state) => state.entries);
  const { openReactTab, openWebUrl } = useBrowserActions();

  return (
    <aside className="absolute right-0 top-12 z-50 w-80 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass">
      <div className="space-y-2">
        <MenuButton
          icon={<History className="h-4 w-4" />}
          label="History"
          onClick={() => undefined}
        />
        <div className="max-h-28 overflow-auto rounded-2xl bg-cream/70 p-2">
          {history.length === 0 ? (
            <p className="px-2 py-1 text-xs text-slate">No browsing history yet.</p>
          ) : (
            history.slice(0, 4).map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="block w-full truncate rounded-xl px-2 py-1 text-left text-xs text-navy hover:bg-white"
                onClick={() => {
                  void openWebUrl(entry.url, entry.title);
                  onClose();
                }}
              >
                {entry.title}
              </button>
            ))
          )}
        </div>

        <MenuButton
          icon={<Bookmark className="h-4 w-4" />}
          label="Bookmarks"
          onClick={() => undefined}
        />
        <div className="max-h-28 overflow-auto rounded-2xl bg-cream/70 p-2">
          {bookmarks.length === 0 ? (
            <p className="px-2 py-1 text-xs text-slate">No bookmarks saved yet.</p>
          ) : (
            bookmarks.slice(0, 4).map((bookmark) => (
              <button
                key={bookmark.id}
                type="button"
                className="block w-full truncate rounded-xl px-2 py-1 text-left text-xs text-navy hover:bg-white"
                onClick={() => {
                  void openWebUrl(bookmark.url, bookmark.title, bookmark.favicon);
                  onClose();
                }}
              >
                {bookmark.title}
              </button>
            ))
          )}
        </div>

        <MenuButton
          icon={<Download className="h-4 w-4" />}
          label="Downloads"
          detail="No downloads in this build"
          onClick={() => undefined}
        />
        <MenuButton
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          onClick={() => {
            openReactTab("settings", "Settings", "/settings");
            onClose();
          }}
        />
        <MenuButton
          icon={<Search className="h-4 w-4" />}
          label="Projects"
          onClick={() => {
            openReactTab("projects", "Projects", "/projects");
            onClose();
          }}
        />
        <MenuButton
          icon={<Settings className="h-4 w-4" />}
          label="Parent dashboard"
          onClick={() => {
            openReactTab("parent", "Parent", "/parent");
            onClose();
          }}
        />
        <MenuButton
          icon={<ZoomIn className="h-4 w-4" />}
          label="Zoom"
          detail="Keyboard zoom stubs are ready"
          onClick={() => undefined}
        />
        <MenuButton
          icon={<Search className="h-4 w-4" />}
          label="Find"
          detail="Use the page find shortcut in native content"
          onClick={() => undefined}
        />
        <MenuButton
          icon={<Printer className="h-4 w-4" />}
          label="Print"
          onClick={() => {
            window.print();
            onClose();
          }}
        />
      </div>
    </aside>
  );
}

function MenuButton({
  icon,
  label,
  detail,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="h-auto w-full justify-start gap-3 rounded-2xl px-3 py-2 text-left"
      onClick={onClick}
    >
      <span className="text-ocean">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-navy">{label}</span>
        {detail && <span className="block text-xs text-slate">{detail}</span>}
      </span>
    </Button>
  );
}
