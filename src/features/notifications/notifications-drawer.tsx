import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

export function NotificationsDrawer() {
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
            className="fixed inset-0 z-40 bg-black/25"
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
            className="surface-glass fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--border-subtle)]"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-4">
              <h2 className="font-display text-lg font-semibold">Notifications</h2>
              <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setOpen(false)}>
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
                    'block rounded-2xl border border-[var(--border-subtle)] px-4 py-3 transition-colors hover:bg-[var(--color-panel)]',
                    !notification.read && 'bg-[var(--color-brand-soft)]/40',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <span className="shrink-0 text-[11px] text-[var(--text-muted)]">
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{notification.body}</p>
                </Link>
              ))}
              {notifications.length === 0 && (
                <p className="px-2 py-8 text-center text-sm text-[var(--text-muted)]">
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
