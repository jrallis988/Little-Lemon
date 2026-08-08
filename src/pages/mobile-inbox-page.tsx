import { Bell, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusDot } from '@/components/ui/status-dot';
import { AI_EMPLOYEES } from '@/data/employees';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

export function MobileInboxPage() {
  const searchQuery = useUiStore((state) => state.searchQuery);
  const setSearchQuery = useUiStore((state) => state.setSearchQuery);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const setNotificationsOpen = useUiStore((state) => state.setNotificationsOpen);
  const conversations = useWorkspaceStore((state) => state.conversations);
  const favoriteEmployeeIds = useWorkspaceStore((state) => state.favoriteEmployeeIds);
  const notifications = useWorkspaceStore((state) => state.notifications);
  const unread = notifications.filter((item) => !item.read).length;

  const query = searchQuery.trim().toLowerCase();
  const conversationByEmployee = new Map(
    conversations.map((conversation) => [conversation.employeeId, conversation]),
  );

  const sorted = [...AI_EMPLOYEES]
    .filter((employee) => {
      if (!query) return true;
      return (
        employee.name.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const aFav = favoriteEmployeeIds.includes(a.id) ? 1 : 0;
      const bFav = favoriteEmployeeIds.includes(b.id) ? 1 : 0;
      if (aFav !== bFav) return bFav - aFav;
      const aTime = conversationByEmployee.get(a.id)?.lastMessageAt ?? '';
      const bTime = conversationByEmployee.get(b.id)?.lastMessageAt ?? '';
      return +new Date(bTime) - +new Date(aTime);
    });

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-chat)]">
      <header className="safe-top border-b border-[var(--border-subtle)] px-4 pt-3 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-[var(--color-brand)] uppercase">
              Working Intelligence
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Chats</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Command palette"
              onClick={() => setCommandPaletteOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && <Badge className="absolute -top-0.5 -right-0.5">{unread}</Badge>}
            </Button>
          </div>
        </div>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search your AI team"
            className="h-11 rounded-2xl pl-9"
            aria-label="Search employees"
          />
        </div>
      </header>

      <div className="scrollbar-thin flex-1 overflow-y-auto pb-24">
        <div className="flex gap-3 overflow-x-auto px-4 py-4">
          {AI_EMPLOYEES.filter((employee) => favoriteEmployeeIds.includes(employee.id)).map(
            (employee) => (
              <Link
                key={employee.id}
                to={`/app/${employee.slug}`}
                className="flex w-16 shrink-0 flex-col items-center gap-1.5"
              >
                <div className="relative">
                  <Avatar
                    initials={employee.avatar.initials}
                    color={employee.avatar.color}
                    name={employee.name}
                  />
                  <StatusDot status={employee.status} className="absolute right-0 bottom-0" />
                </div>
                <span className="truncate text-[11px] text-[var(--text-secondary)]">
                  {employee.name}
                </span>
              </Link>
            ),
          )}
        </div>

        <ul className="px-2">
          {sorted.map((employee) => {
            const conversation = conversationByEmployee.get(employee.id);
            return (
              <li key={employee.id}>
                <Link
                  to={`/app/${employee.slug}`}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors active:bg-[var(--color-panel)]',
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar
                      initials={employee.avatar.initials}
                      color={employee.avatar.color}
                      size="lg"
                      name={employee.name}
                    />
                    <StatusDot status={employee.status} className="absolute right-0 bottom-0" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">{employee.name}</span>
                      <span className="ml-auto shrink-0 text-[11px] text-[var(--text-muted)]">
                        {conversation ? formatRelativeTime(conversation.lastMessageAt) : ''}
                      </span>
                    </div>
                    <p className="truncate text-xs text-[var(--text-muted)]">{employee.jobTitle}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="truncate text-sm text-[var(--text-secondary)]">
                        {conversation?.typing
                          ? `${employee.name} is typing…`
                          : (conversation?.lastMessagePreview ?? 'Start a conversation')}
                      </p>
                      {!!conversation?.unreadCount && <Badge>{conversation.unreadCount}</Badge>}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
