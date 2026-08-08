import { Link, Navigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { StatusDot } from '@/components/ui/status-dot';
import { AI_EMPLOYEES, DEPARTMENTS } from '@/data/employees';
import { useIsMobile } from '@/hooks/use-media-query';

export function MobileTeamPage() {
  const isMobile = useIsMobile();
  if (!isMobile) return <Navigate to="/app/calvin" replace />;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-chat)]">
      <header className="safe-top border-b border-[var(--border-subtle)] px-4 pt-3 pb-4">
        <p className="text-xs font-medium tracking-wide text-[var(--color-brand)] uppercase">
          Working Intelligence
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Your AI team</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Tap anyone to open a conversation in their department.
        </p>
      </header>

      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-4 pt-4 pb-24">
        {DEPARTMENTS.map((department) => {
          const employees = AI_EMPLOYEES.filter((employee) => employee.department === department);
          return (
            <section key={department}>
              <h2 className="mb-2 text-[11px] font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                {department}
              </h2>
              <div className="space-y-2">
                {employees.map((employee) => (
                  <Link
                    key={employee.id}
                    to={`/app/${employee.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] px-3 py-3 active:bg-[var(--color-panel)]"
                  >
                    <div className="relative">
                      <Avatar
                        initials={employee.avatar.initials}
                        color={employee.avatar.color}
                        name={employee.name}
                      />
                      <StatusDot status={employee.status} className="absolute right-0 bottom-0" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{employee.name}</div>
                      <div className="truncate text-xs text-[var(--text-muted)]">
                        {employee.jobTitle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
