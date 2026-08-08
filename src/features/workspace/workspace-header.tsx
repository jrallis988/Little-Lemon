import {
  ArrowLeft,
  Bell,
  MoreHorizontal,
  Phone,
  Search,
  Share2,
  Video,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusDot } from '@/components/ui/status-dot';
import { useIsMobile } from '@/hooks/use-media-query';
import type { AiEmployee, WorkspaceTab } from '@/types';
import { cn } from '@/utils/cn';
import { useUiStore } from '@/store/ui-store';

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: 'chat', label: 'Chat' },
  { id: 'actions', label: 'Actions' },
  { id: 'systems', label: 'Systems' },
  { id: 'badge', label: 'Work Badge' },
  { id: 'files', label: 'Files' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'notes', label: 'Notes' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'guidelines', label: 'Job Brief' },
];

interface WorkspaceHeaderProps {
  employee: AiEmployee;
}

export function WorkspaceHeader({ employee }: WorkspaceHeaderProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const activeTab = useUiStore((state) => state.activeTab);
  const setActiveTab = useUiStore((state) => state.setActiveTab);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const setNotificationsOpen = useUiStore((state) => state.setNotificationsOpen);

  return (
    <header className="surface-glass safe-top border-b border-[var(--border-subtle)] px-3 py-2.5 md:px-6 md:py-3">
      <div className="flex items-center gap-2 md:gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to chats"
            onClick={() => navigate('/app')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative shrink-0">
          <Avatar
            initials={employee.avatar.initials}
            color={employee.avatar.color}
            imageUrl={employee.avatar.imageUrl}
            size={isMobile ? 'md' : 'lg'}
            name={employee.name}
            className="rounded-2xl"
          />
          <StatusDot status={employee.status} className="absolute right-0 bottom-0" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display truncate text-lg font-semibold tracking-tight md:text-xl">
            {employee.name}
          </h1>
          <p className="truncate text-xs text-[var(--text-muted)] md:text-sm">
            {isMobile
              ? employee.jobTitle
              : `${employee.jobTitle} · Level ${employee.autonomyLevel} autonomy`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {!isMobile && (
            <>
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
            </>
          )}
          {isMobile && (
            <>
              <Button variant="ghost" size="icon" aria-label="Voice call">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Video call">
                <Video className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <nav
        className="-mx-1 mt-2.5 flex gap-1 overflow-x-auto px-1 pb-0.5 md:mt-3"
        aria-label="Employee workspace tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors',
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
