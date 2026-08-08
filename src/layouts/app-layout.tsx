import { Menu } from 'lucide-react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { CommandPalette } from '@/features/command-palette/command-palette';
import { NotificationsDrawer } from '@/features/notifications/notifications-drawer';
import { MobileSidebar } from '@/features/sidebar/mobile-sidebar';
import { Sidebar } from '@/features/sidebar/sidebar';
import { OfflineBanner } from '@/features/offline/offline-banner';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useTheme } from '@/hooks/use-theme';
import { useUiStore } from '@/store/ui-store';

export function AppLayout() {
  useTheme();
  useKeyboardShortcuts();
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setSidebarOpen(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [setSidebarOpen]);

  return (
    <div className="flex h-full min-h-0">
      <Sidebar />
      <MobileSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="font-display text-sm font-semibold">Working Intelligence</span>
        </div>
        <OfflineBanner />
        <main className="min-h-0 flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
      <CommandPalette />
      <NotificationsDrawer />
    </div>
  );
}
