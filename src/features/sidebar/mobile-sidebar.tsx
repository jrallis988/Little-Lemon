import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from '@/features/sidebar/sidebar';
import { useUiStore } from '@/store/ui-store';

export function MobileSidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-40 md:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <Sidebar variant="mobile" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
