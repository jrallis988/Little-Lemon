import { CheckCircle2, Circle } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { MobileScreenShell } from '@/features/mobile/mobile-screen-shell';
import { getEmployeeById } from '@/data/employees';
import { useIsMobile } from '@/hooks/use-media-query';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/utils/cn';

export function MobileTasksPage() {
  const isMobile = useIsMobile();
  const tasks = useWorkspaceStore((state) => state.tasks);
  const upsertTask = useWorkspaceStore((state) => state.upsertTask);

  if (!isMobile) return <Navigate to="/app/nate" replace />;

  return (
    <MobileScreenShell
      eyebrow="Work queue"
      title="Tasks"
      subtitle="Work items flowing from agents — tap to cycle status."
      contentClassName="space-y-2"
    >
      {tasks.map((task) => {
        const employee = getEmployeeById(task.employeeId);
        return (
          <button
            key={task.id}
            type="button"
            onClick={() => {
              const next =
                task.status === 'todo'
                  ? 'in_progress'
                  : task.status === 'in_progress'
                    ? 'done'
                    : 'todo';
              upsertTask({ ...task, status: next });
            }}
            className="mobile-card flex w-full items-start gap-3 px-3 py-3 text-left active:bg-white/[0.08]"
          >
            {task.status === 'done' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 text-white/35" />
            )}
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  'font-medium',
                  task.status === 'done' && 'text-white/45 line-through',
                )}
              >
                {task.title}
              </div>
              <p className="mt-1 text-sm text-white/45">{task.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/40">
                {employee && (
                  <Link
                    to={`/app/${employee.slug}`}
                    className="text-[var(--color-brand)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {employee.name}
                  </Link>
                )}
                <span className="capitalize">{task.priority}</span>
                <span className="capitalize">{task.status.replace('_', ' ')}</span>
              </div>
            </div>
          </button>
        );
      })}
    </MobileScreenShell>
  );
}
