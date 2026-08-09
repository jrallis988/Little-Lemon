import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { MobileScreenShell } from '@/features/mobile/mobile-screen-shell';
import { AI_EMPLOYEES } from '@/data/employees';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatInboxTime } from '@/utils/format';
import { cn } from '@/utils/cn';

export function MobileInboxPage() {
  const conversations = useWorkspaceStore((state) => state.conversations);
  const favoriteEmployeeIds = useWorkspaceStore((state) => state.favoriteEmployeeIds);

  const conversationByEmployee = new Map(
    conversations.map((conversation) => [conversation.employeeId, conversation]),
  );

  const sorted = [...AI_EMPLOYEES].sort((a, b) => {
    const aFav = favoriteEmployeeIds.includes(a.id) ? 1 : 0;
    const bFav = favoriteEmployeeIds.includes(b.id) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    const aTime = conversationByEmployee.get(a.id)?.lastMessageAt ?? '';
    const bTime = conversationByEmployee.get(b.id)?.lastMessageAt ?? '';
    return +new Date(bTime) - +new Date(aTime);
  });

  return (
    <MobileScreenShell
      eyebrow="Shift"
      title="Chats"
      subtitle="Conversations with your AI workforce."
      contentClassName="-mx-1 px-1"
    >
      <ul>
        {sorted.map((employee) => {
          const conversation = conversationByEmployee.get(employee.id);
          const preview = conversation?.typing
            ? `${employee.name} is typing…`
            : (conversation?.lastMessagePreview ?? 'Start a conversation');
          const unread = conversation?.unreadCount ?? 0;
          const dimmed = unread === 0 && !favoriteEmployeeIds.includes(employee.id);

          return (
            <li key={employee.id}>
              <Link
                to={`/app/${employee.slug}`}
                className={cn(
                  'flex items-center gap-3.5 px-3 py-3.5 transition-colors active:bg-white/5',
                  dimmed && 'opacity-70',
                )}
              >
                <Avatar
                  initials={employee.avatar.initials}
                  color={employee.avatar.color}
                  imageUrl={employee.avatar.imageUrl}
                  name={employee.name}
                  size="xl"
                  className="rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <h2 className="truncate text-[1.05rem] leading-tight font-semibold tracking-tight">
                      {employee.shortTitle}
                    </h2>
                    <time className="ml-auto shrink-0 pt-0.5 text-xs text-white/40">
                      {conversation ? formatInboxTime(conversation.lastMessageAt) : ''}
                    </time>
                  </div>
                  <div className="mt-1 flex items-end gap-2">
                    <p className="line-clamp-2 min-w-0 flex-1 text-[0.92rem] leading-snug text-white/45">
                      <span className="text-white/70">{employee.name}:</span> {preview}
                    </p>
                    {unread > 0 && (
                      <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#e11d48] px-1.5 text-[11px] font-semibold text-white">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </MobileScreenShell>
  );
}
