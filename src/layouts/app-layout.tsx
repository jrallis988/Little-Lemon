import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { CommandPalette } from '@/features/command-palette/command-palette';
import { BottomNav } from '@/features/mobile/bottom-nav';
import { NotificationsDrawer } from '@/features/notifications/notifications-drawer';
import { MobileSidebar } from '@/features/sidebar/mobile-sidebar';
import { Sidebar } from '@/features/sidebar/sidebar';
import { OfflineBanner } from '@/features/offline/offline-banner';
import { useIsMobile } from '@/hooks/use-media-query';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useTheme } from '@/hooks/use-theme';
import { useUiStore } from '@/store/ui-store';
import { cn } from '@/utils/cn';

export function AppLayout() {
  useTheme();
  useKeyboardShortcuts();
  const isMobile = useIsMobile();
  const location = useLocation();
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  const isEmployeeChat =
    /^\/app\/(?!settings$|team$|intelligence$|tasks$)[a-z0-9-]+$/i.test(
      location.pathname,
    );

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setSidebarOpen(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [setSidebarOpen]);

  return (
    <div className={cn('flex h-full min-h-0', isMobile && 'mobile-shell bg-black text-white')}>
      {!isMobile && <Sidebar />}
      {!isMobile && <MobileSidebar />}
      <div className="flex min-w-0 flex-1 flex-col">
        {!isMobile && <OfflineBanner />}
        <main className="min-h-0 flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        {isMobile && !isEmployeeChat && <BottomNav />}
      </div>
      <CommandPalette />
      <NotificationsDrawer />
    </div>
  );
}
