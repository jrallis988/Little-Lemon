import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { createId, extractDomain } from "@/lib/utils";
import type { Bookmark, BrowserTab } from "@/types";

type BookmarksState = {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt" | "domain"> & {
    domain?: string;
  }) => void;
  removeBookmark: (url: string) => void;
  toggleBookmarkForTab: (tab: BrowserTab) => void;
  isBookmarked: (url: string) => boolean;
};

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => {
          if (state.bookmarks.some((item) => item.url === bookmark.url)) {
            return state;
          }
          return {
            bookmarks: [
              {
                ...bookmark,
                id: createId("bookmark"),
                domain: bookmark.domain ?? extractDomain(bookmark.url),
                createdAt: new Date().toISOString(),
              },
              ...state.bookmarks,
            ],
          };
        }),
      removeBookmark: (url) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.url !== url),
        })),
      toggleBookmarkForTab: (tab) => {
        if (!tab.url || tab.url === "/") return;
        if (get().isBookmarked(tab.url)) {
          get().removeBookmark(tab.url);
          return;
        }
        get().addBookmark({
          title: tab.title || tab.url,
          url: tab.url,
          favicon: tab.favicon,
        });
      },
      isBookmarked: (url) =>
        get().bookmarks.some((bookmark) => bookmark.url === url),
    }),
    { name: STORAGE_KEYS.bookmarks },
  ),
);
