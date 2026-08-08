import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-media-query';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

export function NotificationsDrawer() {
  const isMobile = useIsMobile();
  const open = useUiStore((state) => state.notificationsOpen);
  const setOpen = useUiStore((state) => state.setNotificationsOpen);
  const notifications = useWorkspaceStore((state) => state.notifications);
  const markNotificationRead = useWorkspaceStore((state) => state.markNotificationRead);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={cn(
              'fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l',
              isMobile
                ? 'mobile-shell border-white/10 bg-black text-white'
                : 'surface-glass border-[var(--border-subtle)]',
            )}
            aria-label="Notifications"
          >
            <div
              className={cn(
                'flex items-center justify-between px-4 py-4',
                isMobile ? 'border-b border-white/10' : 'border-b border-[var(--border-subtle)]',
              )}
            >
              <h2 className="font-display text-lg font-semibold">Notifications</h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className={isMobile ? 'text-white/70 hover:bg-white/10 hover:text-white' : undefined}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto p-3">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  to={notification.href ?? '/app'}
                  onClick={() => {
                    markNotificationRead(notification.id);
                    setOpen(false);
                  }}
                  className={cn(
                    'block rounded-2xl px-4 py-3 transition-colors',
                    isMobile
                      ? cn(
                          'mobile-card hover:bg-white/[0.08]',
                          !notification.read && 'bg-white/[0.06]',
                        )
                      : cn(
                          'border border-[var(--border-subtle)] hover:bg-[var(--color-panel)]',
                          !notification.read && 'bg-[var(--color-brand-soft)]/40',
                        ),
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <span
                      className={cn(
                        'shrink-0 text-[11px]',
                        isMobile ? 'text-white/40' : 'text-[var(--text-muted)]',
                      )}
                    >
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      isMobile ? 'text-white/55' : 'text-[var(--text-secondary)]',
                    )}
                  >
                    {notification.body}
                  </p>
                </Link>
              ))}
              {notifications.length === 0 && (
                <p
                  className={cn(
                    'px-2 py-8 text-center text-sm',
                    isMobile ? 'text-white/45' : 'text-[var(--text-muted)]',
                  )}
                >
                  You’re all caught up.
                </p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
