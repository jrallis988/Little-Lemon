import { useEffect } from 'react';
import { useUiStore } from '@/store/ui-store';

export function useKeyboardShortcuts() {
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (meta && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
      if (event.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setCommandPaletteOpen, toggleSidebar]);
}
