import { Outlet } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { BlockedSiteScreen } from "@/screens/BlockedSiteScreen";
import { isTauriRuntime } from "@/services/browserBridge";
import type { BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
};

export function ContentArea({ activeTab }: Props) {
  if (!activeTab) return null;

  if (activeTab.kind === "blocked") {
    return (
      <div className="relative min-h-[calc(100vh-8rem)] overflow-auto">
        <BlockedSiteScreen />
      </div>
    );
  }

  if (activeTab.kind === "web") {
    if (isTauriRuntime()) {
      return (
        <div
          className="min-h-[calc(100vh-8rem)]"
          aria-label="Native Surf web content area"
        />
      );
    }

    return (
      <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-white">
        <div className="flex items-center gap-2 border-b border-orange/30 bg-orange/10 px-4 py-2 text-xs font-semibold text-navy">
          <ExternalLink className="h-4 w-4" />
          TEMPORARY web-preview fallback: this iframe is only for non-Tauri Vite
          preview and does not replace native Surf webviews.
        </div>
        <iframe
          key={activeTab.url}
          title={activeTab.title}
          src={activeTab.url}
          className="min-h-[calc(100vh-10.5rem)] flex-1 border-0 bg-white"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-6xl px-5 py-8">
      <Outlet />
    </main>
  );
}
