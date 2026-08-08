import {
  Bell,
  MoreHorizontal,
  Phone,
  Search,
  Share2,
  Video,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusDot } from '@/components/ui/status-dot';
import type { AiEmployee, WorkspaceTab } from '@/types';
import { cn } from '@/utils/cn';
import { useUiStore } from '@/store/ui-store';

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: 'chat', label: 'Chat' },
  { id: 'files', label: 'Files' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'notes', label: 'Notes' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'posts', label: 'Posts' },
  { id: 'guidelines', label: 'Guidelines' },
];

interface WorkspaceHeaderProps {
  employee: AiEmployee;
}

export function WorkspaceHeader({ employee }: WorkspaceHeaderProps) {
  const activeTab = useUiStore((state) => state.activeTab);
  const setActiveTab = useUiStore((state) => state.setActiveTab);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const setNotificationsOpen = useUiStore((state) => state.setNotificationsOpen);

  return (
    <header className="surface-glass border-b border-[var(--border-subtle)] px-4 py-3 md:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Avatar
            initials={employee.avatar.initials}
            color={employee.avatar.color}
            size="lg"
            name={employee.name}
          />
          <StatusDot status={employee.status} className="absolute right-0 bottom-0" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display truncate text-xl font-semibold tracking-tight">
            {employee.name}
          </h1>
          <p className="truncate text-sm text-[var(--text-muted)]">
            {employee.jobTitle} · {employee.department}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Voice call">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Video call">
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="More">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="mt-3 flex gap-1 overflow-x-auto" aria-label="Employee workspace tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'bg-[var(--color-brand)] text-white'
                : 'text-[var(--text-secondary)] hover:bg-[var(--color-panel)]',
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
