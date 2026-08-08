import { motion } from 'framer-motion';
import {
  Bell,
  Building2,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/brand/logo';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_EMPLOYEES, DEPARTMENTS } from '@/data/employees';
import { EmployeeListItem } from '@/features/sidebar/employee-list-item';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import type { AiEmployee, Conversation, UserProfile } from '@/types';
import { cn } from '@/utils/cn';

export function Sidebar({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const searchQuery = useUiStore((state) => state.searchQuery);
  const setSearchQuery = useUiStore((state) => state.setSearchQuery);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const setNotificationsOpen = useUiStore((state) => state.setNotificationsOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const user = useWorkspaceStore((state) => state.user);
  const conversations = useWorkspaceStore((state) => state.conversations);
  const favoriteEmployeeIds = useWorkspaceStore((state) => state.favoriteEmployeeIds);
  const notifications = useWorkspaceStore((state) => state.notifications);
  const createConversation = useWorkspaceStore((state) => state.createConversation);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);

  const unread = notifications.filter((item) => !item.read).length;
  const query = searchQuery.trim().toLowerCase();

  const filteredEmployees = AI_EMPLOYEES.filter((employee) => {
    if (!query) return true;
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.jobTitle.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  const conversationByEmployee = new Map(
    conversations.map((conversation) => [conversation.employeeId, conversation]),
  );

  const favorites = filteredEmployees.filter((employee) =>
    favoriteEmployeeIds.includes(employee.id),
  );
  const recent = [...conversations]
    .sort((a, b) => +new Date(b.lastMessageAt) - +new Date(a.lastMessageAt))
    .slice(0, 5)
    .map((conversation) => AI_EMPLOYEES.find((employee) => employee.id === conversation.employeeId))
    .filter((employee): employee is AiEmployee => Boolean(employee));

  const activeWorkspace = workspaces.find((workspace) => workspace.id === activeWorkspaceId);

  const body = (
    <SidebarBody
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setCommandPaletteOpen={setCommandPaletteOpen}
      setNotificationsOpen={setNotificationsOpen}
      unread={unread}
      createConversation={createConversation}
      activeWorkspaceName={activeWorkspace?.name}
      favorites={favorites}
      recent={recent}
      filteredEmployees={filteredEmployees}
      conversationByEmployee={conversationByEmployee}
      user={user}
      onNavigate={variant === 'mobile' ? () => setSidebarOpen(false) : undefined}
    />
  );

  if (variant === 'mobile') {
    return (
      <aside
        className="surface-glass flex h-full w-80 flex-col overflow-hidden rounded-none border-y-0 border-l-0"
        aria-label="Workspace sidebar"
      >
        {body}
      </aside>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 320 : 0, opacity: sidebarOpen ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={cn(
        'surface-glass relative z-20 hidden h-full shrink-0 flex-col overflow-hidden rounded-none border-y-0 border-l-0 md:flex',
        !sidebarOpen && 'pointer-events-none border-r-0',
      )}
      aria-label="Workspace sidebar"
    >
      <div className="flex h-full w-80 flex-col">{body}</div>
    </motion.aside>
  );
}

function SidebarBody({
  searchQuery,
  setSearchQuery,
  setCommandPaletteOpen,
  setNotificationsOpen,
  unread,
  createConversation,
  activeWorkspaceName,
  favorites,
  recent,
  filteredEmployees,
  conversationByEmployee,
  user,
  onNavigate,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  unread: number;
  createConversation: (employeeId: string) => string;
  activeWorkspaceName?: string;
  favorites: AiEmployee[];
  recent: AiEmployee[];
  filteredEmployees: AiEmployee[];
  conversationByEmployee: Map<string, Conversation>;
  user: UserProfile;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="border-b border-[var(--border-subtle)] px-4 py-4">
        <Logo />
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--color-panel)] px-3 py-2 text-xs text-[var(--text-muted)]">
          <Building2 className="h-3.5 w-3.5" />
          <span className="truncate">{activeWorkspaceName ?? 'Workspace'}</span>
        </div>
      </div>

      <div className="space-y-3 border-b border-[var(--border-subtle)] px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search employees"
            className="pl-9"
            aria-label="Search employees"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            Command
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="relative"
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && <Badge className="absolute -top-1 -right-1">{unread}</Badge>}
          </Button>
          <Button
            size="icon"
            aria-label="New conversation"
            onClick={() => {
              const first = AI_EMPLOYEES[0];
              if (first) {
                createConversation(first.id);
                onNavigate?.();
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-3 py-4" onClick={onNavigate}>
        {favorites.length > 0 && (
          <section>
            <SectionLabel icon={<Star className="h-3.5 w-3.5" />} label="Favorites" />
            <div className="mt-1 space-y-0.5">
              {favorites.map((employee) => (
                <EmployeeListItem
                  key={employee.id}
                  employee={employee}
                  conversation={conversationByEmployee.get(employee.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionLabel label="Recent chats" />
          <div className="mt-1 space-y-0.5">
            {recent.map((employee) => (
              <EmployeeListItem
                key={`recent-${employee.id}`}
                employee={employee}
                conversation={conversationByEmployee.get(employee.id)}
              />
            ))}
          </div>
        </section>

        {DEPARTMENTS.map((department) => {
          const employees = filteredEmployees.filter(
            (employee) => employee.department === department,
          );
          if (!employees.length) return null;
          return (
            <section key={department}>
              <SectionLabel label={department} />
              <div className="mt-1 space-y-0.5">
                {employees.map((employee) => (
                  <EmployeeListItem
                    key={employee.id}
                    employee={employee}
                    conversation={conversationByEmployee.get(employee.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="border-t border-[var(--border-subtle)] p-3">
        <div className="flex items-center gap-3 rounded-2xl px-2 py-2">
          <Avatar initials="AM" color="#0E7C74" name={user.fullName} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user.fullName}</div>
            <div className="truncate text-xs text-[var(--text-muted)]">{user.email}</div>
          </div>
          <Link
            to="/app/settings"
            className="rounded-xl p-2 text-[var(--text-muted)] hover:bg-[var(--color-panel)]"
            aria-label="Settings"
            onClick={onNavigate}
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

function SectionLabel({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 text-[11px] font-semibold tracking-wide text-[var(--text-muted)] uppercase">
      {icon}
      {label}
    </div>
  );
}
