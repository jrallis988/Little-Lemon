import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Search, Sun, UserRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AI_EMPLOYEES } from '@/data/employees';
import { useTheme } from '@/hooks/use-theme';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/utils/cn';

export function CommandPalette() {
  const open = useUiStore((state) => state.commandPaletteOpen);
  const setOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const setActiveTab = useUiStore((state) => state.setActiveTab);
  const createConversation = useWorkspaceStore((state) => state.createConversation);
  const conversations = useWorkspaceStore((state) => state.conversations);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const commands = useMemo(() => {
    const employeeCommands = AI_EMPLOYEES.map((employee) => ({
      id: `emp-${employee.id}`,
      label: `Open ${employee.name}`,
      hint: employee.jobTitle,
      icon: <UserRound className="h-4 w-4" />,
      run: () => {
        const existing = conversations.find((item) => item.employeeId === employee.id);
        if (!existing) createConversation(employee.id);
        navigate(`/app/${employee.slug}`);
        setActiveTab('chat');
      },
    }));

    return [
      ...employeeCommands,
      {
        id: 'theme-light',
        label: 'Switch to light mode',
        hint: 'Appearance',
        icon: <Sun className="h-4 w-4" />,
        run: () => setTheme('light'),
      },
      {
        id: 'theme-dark',
        label: 'Switch to dark mode',
        hint: 'Appearance',
        icon: <Moon className="h-4 w-4" />,
        run: () => setTheme('dark'),
      },
      {
        id: 'settings',
        label: 'Open settings',
        hint: 'Workspace',
        icon: <Search className="h-4 w-4" />,
        run: () => navigate('/app/settings'),
      },
    ].filter((command) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        command.label.toLowerCase().includes(q) ||
        command.hint.toLowerCase().includes(q)
      );
    });
  }, [conversations, createConversation, navigate, query, setActiveTab, setTheme]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/35 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-lift)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4">
              <Search className="h-4 w-4 text-[var(--text-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search employees, actions, settings…"
                className="h-12 w-full bg-transparent text-sm outline-none"
              />
              <kbd className="rounded-lg bg-[var(--color-panel)] px-2 py-1 text-[11px] text-[var(--text-muted)]">
                Esc
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {commands.map((command, index) => (
                <li key={command.id}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--color-panel)]',
                      index === 0 && 'bg-[var(--color-panel)]',
                    )}
                    onClick={() => {
                      command.run();
                      setOpen(false);
                    }}
                  >
                    <span className="text-[var(--text-muted)]">{command.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{command.label}</span>
                      <span className="block truncate text-xs text-[var(--text-muted)]">
                        {command.hint}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {commands.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">
                  No matches for “{query}”
                </li>
              )}
            </ul>
            <div className="border-t border-[var(--border-subtle)] px-4 py-2 text-[11px] text-[var(--text-muted)]">
              Theme: {theme} · Tip: ⌘/Ctrl + K
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
