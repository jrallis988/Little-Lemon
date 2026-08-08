import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WorkspaceTab } from '@/types';

type ThemeMode = 'light' | 'dark' | 'system';

interface UiState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  notificationsOpen: boolean;
  activeTab: WorkspaceTab;
  searchQuery: string;
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
  setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarOpen: true,
      commandPaletteOpen: false,
      notificationsOpen: false,
      activeTab: 'chat',
      searchQuery: '',
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
      setNotificationsOpen: (notificationsOpen) => set({ notificationsOpen }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
    }),
    {
      name: 'wi-ui',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
