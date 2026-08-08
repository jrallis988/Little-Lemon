import { Link, Navigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { AI_EMPLOYEES, DEPARTMENTS } from '@/data/employees';
import { useIsMobile } from '@/hooks/use-media-query';

export function MobileTeamPage() {
  const isMobile = useIsMobile();
  if (!isMobile) return <Navigate to="/app/holly" replace />;

  return (
    <div className="mobile-dark flex h-full min-h-0 flex-col bg-black text-white">
      <header className="safe-top px-4 pt-4 pb-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
          Office
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Your AI workforce</h1>
        <p className="mt-1 text-sm text-white/45">
          Specialized agents with job briefs, systems, and controlled autonomy.
        </p>
      </header>

      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto px-4 pt-2 pb-24">
        {DEPARTMENTS.map((department) => {
          const employees = AI_EMPLOYEES.filter((employee) => employee.department === department);
          return (
            <section key={department}>
              <h2 className="mb-2 text-[11px] font-semibold tracking-wide text-white/35 uppercase">
                {department}
              </h2>
              <div className="space-y-2">
                {employees.map((employee) => (
                  <Link
                    key={employee.id}
                    to={`/app/${employee.slug}`}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-3 ring-1 ring-white/10 active:bg-white/[0.08]"
                  >
                    <Avatar
                      initials={employee.avatar.initials}
                      color={employee.avatar.color}
                      imageUrl={employee.avatar.imageUrl}
                      name={employee.name}
                      size="lg"
                      className="rounded-2xl"
                    />
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{employee.shortTitle}</div>
                      <div className="truncate text-xs text-white/45">{employee.name}</div>
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
