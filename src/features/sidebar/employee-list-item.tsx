import { Pin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { StatusDot } from '@/components/ui/status-dot';
import type { AiEmployee, Conversation } from '@/types';
import { cn } from '@/utils/cn';
import { formatRelativeTime } from '@/utils/format';

interface EmployeeListItemProps {
  employee: AiEmployee;
  conversation?: Conversation;
}

export function EmployeeListItem({ employee, conversation }: EmployeeListItemProps) {
  return (
    <NavLink
      to={`/app/${employee.slug}`}
      className={({ isActive }) =>
        cn(
          'group flex gap-3 rounded-2xl px-3 py-2.5 transition-colors',
          isActive
            ? 'bg-[var(--color-brand-soft)] text-[var(--text-primary)]'
            : 'hover:bg-[var(--color-panel)]',
        )
      }
    >
      <div className="relative shrink-0">
        <Avatar
          initials={employee.avatar.initials}
          color={employee.avatar.color}
          name={employee.name}
        />
        <StatusDot status={employee.status} className="absolute -right-0.5 -bottom-0.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{employee.name}</span>
          {conversation?.pinned && (
            <Pin className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" aria-label="Pinned" />
          )}
          <span className="ml-auto shrink-0 text-[11px] text-[var(--text-muted)]">
            {conversation ? formatRelativeTime(conversation.lastMessageAt) : ''}
          </span>
        </div>
        <div className="truncate text-xs text-[var(--text-muted)]">
          {employee.jobTitle} · {employee.department}
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <p className="truncate text-xs text-[var(--text-secondary)]">
            {conversation?.typing
              ? `${employee.name} is typing…`
              : (conversation?.lastMessagePreview ?? 'No messages yet')}
          </p>
          {!!conversation?.unreadCount && <Badge>{conversation.unreadCount}</Badge>}
        </div>
      </div>
    </NavLink>
  );
}
