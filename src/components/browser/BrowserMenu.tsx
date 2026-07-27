import type { ReactNode } from "react";
import {
  Bookmark,
  Download,
  FolderKanban,
  History,
  Printer,
  Search,
  Settings,
  Shield,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useBookmarksStore } from "@/stores/bookmarksStore";
import { useDownloadsStore } from "@/stores/downloadsStore";
import { useHistoryStore } from "@/stores/historyStore";

type Props = {
  onClose: () => void;
  onFind?: () => void;
};

export function BrowserMenu({ onClose, onFind }: Props) {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const history = useHistoryStore((state) => state.entries);
  const setDownloadsOpen = useDownloadsStore((state) => state.setPanelOpen);
  const { openReactTab, openWebUrl } = useBrowserActions();

  return (
    <aside className="absolute bottom-14 left-3 right-3 z-50 max-h-[70vh] overflow-auto rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass md:bottom-auto md:left-auto md:right-0 md:top-12 md:w-80">
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
          onClick={() => {
            setDownloadsOpen(true);
            onClose();
          }}
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
          icon={<FolderKanban className="h-4 w-4" />}
          label="Projects"
          onClick={() => {
            openReactTab("projects", "Projects", "/projects");
            onClose();
          }}
        />
        <MenuButton
          icon={<Shield className="h-4 w-4" />}
          label="Parent dashboard"
          onClick={() => {
            openReactTab("parent", "Parent", "/parent");
            onClose();
          }}
        />
        <MenuButton
          icon={<ZoomIn className="h-4 w-4" />}
          label="Zoom"
          detail="Use Ctrl/Cmd + and -"
          onClick={() => undefined}
        />
        <MenuButton
          icon={<Search className="h-4 w-4" />}
          label="Find in page"
          detail="Ctrl/Cmd + F"
          onClick={() => {
            onFind?.();
            onClose();
          }}
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
