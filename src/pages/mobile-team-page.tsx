import { Link, Navigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { MobileScreenShell } from '@/features/mobile/mobile-screen-shell';
import { AI_EMPLOYEES, DEPARTMENTS } from '@/data/employees';
import { useIsMobile } from '@/hooks/use-media-query';

export function MobileTeamPage() {
  const isMobile = useIsMobile();
  if (!isMobile) return <Navigate to="/app/nate" replace />;

  return (
    <MobileScreenShell
      eyebrow="Office"
      title="Your AI workforce"
      subtitle="Specialized agents with job briefs, systems, and controlled autonomy."
      contentClassName="space-y-5"
    >
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
                  className="mobile-card flex items-center gap-3 px-3 py-3 active:bg-white/[0.08]"
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
    </MobileScreenShell>
  );
}
