import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getEmployeeBySlug } from '@/data/employees';
import { ChatPanel } from '@/features/chat/chat-panel';
import { EmployeeTabs } from '@/features/workspace/employee-tabs';
import { WorkspaceHeader } from '@/features/workspace/workspace-header';
import { useIsMobile } from '@/hooks/use-media-query';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/utils/cn';

export function EmployeeWorkspacePage() {
  const isMobile = useIsMobile();
  const { employeeSlug } = useParams();
  const employee = employeeSlug ? getEmployeeBySlug(employeeSlug) : undefined;
  const activeTab = useUiStore((state) => state.activeTab);
  const conversations = useWorkspaceStore((state) => state.conversations);
  const createConversation = useWorkspaceStore((state) => state.createConversation);
  const setActiveConversation = useWorkspaceStore((state) => state.setActiveConversation);
  const markConversationRead = useWorkspaceStore((state) => state.markConversationRead);

  const conversationId = useMemo(() => {
    if (!employee) return null;
    return conversations.find((item) => item.employeeId === employee.id)?.id ?? null;
  }, [conversations, employee]);

  useEffect(() => {
    if (!employee) return;

    let id = conversationId;
    if (!id) {
      id = createConversation(employee.id);
    }

    setActiveConversation(id);
    markConversationRead(id);
  }, [
    employee,
    conversationId,
    createConversation,
    setActiveConversation,
    markConversationRead,
  ]);

  if (!employee) {
    return <Navigate to="/app/holly" replace />;
  }

  if (!conversationId) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
        Starting conversation with {employee.name}…
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-full min-h-0 flex-col',
        isMobile ? 'bg-black text-white' : 'bg-[var(--bg-chat)]',
      )}
    >
      <WorkspaceHeader employee={employee} />
      <div className="min-h-0 flex-1">
        {activeTab === 'chat' ? (
          <ChatPanel employee={employee} conversationId={conversationId} />
        ) : (
          <EmployeeTabs employee={employee} />
        )}
      </div>
    </div>
  );
}
