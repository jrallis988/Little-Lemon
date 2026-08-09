import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBrowserTabsStore } from "@/stores/browserTabsStore";
import { cn } from "@/lib/utils";

/** Lightweight browser-tab chrome (SPA shell scaffolding toward native tabs). */
export function BrowserTabStrip() {
  const navigate = useNavigate();
  const tabs = useBrowserTabsStore((s) => s.tabs);
  const activeTabId = useBrowserTabsStore((s) => s.activeTabId);
  const setActiveTab = useBrowserTabsStore((s) => s.setActiveTab);
  const closeTab = useBrowserTabsStore((s) => s.closeTab);
  const openTab = useBrowserTabsStore((s) => s.openTab);

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-white/40 bg-white/50 px-3 py-1.5">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            className={cn(
              "group flex max-w-[11rem] items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium",
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
                onClick={() => closeTab(tab.id)}
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
