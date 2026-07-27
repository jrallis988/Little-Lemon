import { Download, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDownloadsStore } from "@/stores/downloadsStore";
import { cn } from "@/lib/utils";

export function DownloadsPanel() {
  const open = useDownloadsStore((state) => state.panelOpen);
  const items = useDownloadsStore((state) => state.items);
  const setPanelOpen = useDownloadsStore((state) => state.setPanelOpen);
  const clearCompleted = useDownloadsStore((state) => state.clearCompleted);
  const remove = useDownloadsStore((state) => state.remove);

  if (!open) return null;

  return (
    <aside className="fixed bottom-20 right-4 z-50 w-[22rem] max-w-[calc(100vw-2rem)] rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass md:bottom-4">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-ocean" />
          <h2 className="font-display text-lg font-semibold text-navy">Downloads</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={clearCompleted}>
            Clear done
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close downloads"
            onClick={() => setPanelOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <ul className="max-h-72 space-y-2 overflow-auto">
        {items.length === 0 && (
          <li className="rounded-2xl bg-cream/70 px-3 py-4 text-sm text-slate">
            No downloads yet. Save PDFs or learning files from the page menu.
          </li>
        )}
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-border/70 bg-cream/50 px-3 py-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy">
                  {item.fileName}
                </p>
                <p className="truncate text-xs text-slate">{item.url}</p>
                <p className="mt-1 text-xs capitalize text-ocean">{item.status}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${item.fileName}`}
                onClick={() => remove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-soft">
              <div
                className={cn(
                  "h-full rounded-full bg-ocean transition-all",
                  item.status === "failed" && "bg-destructive",
                )}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
