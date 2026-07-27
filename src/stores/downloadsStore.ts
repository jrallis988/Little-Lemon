import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createId, extractDomain } from "@/lib/utils";
import type { DownloadItem } from "@/types";

type DownloadsState = {
  items: DownloadItem[];
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  enqueue: (input: { url: string; fileName?: string }) => DownloadItem;
  updateProgress: (id: string, progress: number, status?: DownloadItem["status"]) => void;
  markComplete: (id: string) => void;
  markFailed: (id: string) => void;
  clearCompleted: () => void;
  remove: (id: string) => void;
};

function fileNameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const last = pathname.split("/").filter(Boolean).pop();
    return last && last.includes(".") ? decodeURIComponent(last) : `${extractDomain(url)}.html`;
  } catch {
    return "download";
  }
}

export const useDownloadsStore = create<DownloadsState>()(
  persist(
    (set, get) => ({
      items: [],
      panelOpen: false,
      setPanelOpen: (open) => set({ panelOpen: open }),
      enqueue: ({ url, fileName }) => {
        const item: DownloadItem = {
          id: createId("dl"),
          fileName: fileName ?? fileNameFromUrl(url),
          url,
          status: "queued",
          progress: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ items: [item, ...state.items].slice(0, 100), panelOpen: true }));

        // Production desktop builds should replace this with native download events.
        // Until then, track an intentional download request and mark it complete after open.
        window.setTimeout(() => {
          get().updateProgress(item.id, 55, "downloading");
        }, 250);
        window.setTimeout(() => {
          get().markComplete(item.id);
        }, 900);

        return item;
      },
      updateProgress: (id, progress, status) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  progress: Math.max(0, Math.min(100, progress)),
                  status: status ?? item.status,
                }
              : item,
          ),
        })),
      markComplete: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, progress: 100, status: "complete" }
              : item,
          ),
        })),
      markFailed: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, status: "failed" } : item,
          ),
        })),
      clearCompleted: () =>
        set((state) => ({
          items: state.items.filter((item) => item.status !== "complete"),
        })),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: "surf.downloads.v1" },
  ),
);
