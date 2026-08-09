import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Circle,
  FileText,
  Link2,
  NotebookPen,
  Sparkles,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import type {
  AiEmployee,
  AgentAction,
  FileAttachment,
  HumanNecessity,
  TaskItem,
} from '@/types';
import { CONNECTED_SYSTEMS, getSystemById } from '@/data/systems';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatFileSize } from '@/utils/format';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { createId } from '@/utils/id';

export function EmployeeTabs({ employee }: { employee: AiEmployee }) {
  const activeTab = useUiStore((state) => state.activeTab);

  switch (activeTab) {
    case 'actions':
      return <ActionsTab employee={employee} />;
    case 'systems':
      return <SystemsTab employee={employee} />;
    case 'badge':
      return <WorkBadgeTab employee={employee} />;
    case 'files':
      return <FilesTab employeeId={employee.id} />;
    case 'tasks':
      return <TasksTab employee={employee} />;
    case 'notes':
      return <NotesTab employeeId={employee.id} />;
    case 'calendar':
      return <CalendarTab employeeId={employee.id} />;
    case 'guidelines':
      return <JobBriefTab employee={employee} />;
    default:
      return null;
  }
}

function ActionsTab({ employee }: { employee: AiEmployee }) {
  const allActions = useWorkspaceStore((state) => state.actions);
  const setActionStatus = useWorkspaceStore((state) => state.setActionStatus);
  const actions = useMemo(
    () => allActions.filter((action) => action.employeeId === employee.id),
    [allActions, employee.id],
  );

  return (
    <Panel>
      <PanelTitle icon={<Sparkles className="h-4 w-4" />} title="Agent actions" />
      <p className="mb-4 max-w-2xl text-sm text-[var(--text-muted)]">
        Working Intelligence proposes work inside defined boundaries. Approve, snooze, or decline —
        controlled agency, not unrestricted automation.
      </p>
      <div className="space-y-3">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} onStatus={setActionStatus} />
        ))}
        {actions.length === 0 && <Empty text="No proposed actions for this agent yet." />}
      </div>
    </Panel>
  );
}

function ActionCard({
  action,
  onStatus,
}: {
  action: AgentAction;
  onStatus: (id: string, status: AgentAction['status']) => void;
}) {
  return (
    <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4">
      <div className="flex flex-wrap items-start gap-2">
        <h3 className="min-w-0 flex-1 font-medium">{action.title}</h3>
        <NecessityBadge value={action.humanNecessity} />
        <span className="rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
          L{action.autonomyLevel}
        </span>
        <span className="rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-[11px] text-[var(--text-muted)] capitalize">
          {action.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{action.summary}</p>
      <p className="mt-2 text-xs text-[var(--text-muted)]">{action.rationale}</p>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        Systems: {action.systemsTouched.join(' · ')}
      </p>
      {action.status === 'pending' && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onStatus(action.id, 'approved')}>
            Approve
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onStatus(action.id, 'snoozed')}>
            Snooze
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onStatus(action.id, 'declined')}>
            Decline
          </Button>
        </div>
      )}
    </article>
  );
}

function SystemsTab({ employee }: { employee: AiEmployee }) {
  const systems = employee.connectedSystems
    .map((id) => getSystemById(id))
    .filter((system): system is NonNullable<typeof system> => Boolean(system));

  return (
    <Panel>
      <PanelTitle icon={<Link2 className="h-4 w-4" />} title="Connected systems" />
      <p className="mb-4 max-w-2xl text-sm text-[var(--text-muted)]">
        Keep what you already use. Working Intelligence is the intelligence layer that connects
        payroll, ATS, LMS, POS, CRM, and more — not another rip-and-replace suite.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {systems.map((system) => (
          <article
            key={system.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium">{system.name}</h3>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
                  system.status === 'connected' &&
                    'bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]',
                  system.status === 'available' && 'bg-[var(--color-panel)] text-[var(--text-muted)]',
                  system.status === 'pending' &&
                    'bg-[color-mix(in_oklab,var(--color-warning)_20%,transparent)] text-[var(--color-warning)]',
                )}
              >
                {system.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{system.category}</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{system.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-dashed border-[var(--border-subtle)] p-4">
        <h3 className="text-sm font-semibold">Also available in the catalog</h3>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {CONNECTED_SYSTEMS.filter((system) => !employee.connectedSystems.includes(system.id))
            .map((system) => system.name)
            .slice(0, 8)
            .join(' · ')}
        </p>
      </div>
    </Panel>
  );
}

function WorkBadgeTab({ employee }: { employee: AiEmployee }) {
  const badge = useWorkspaceStore((state) => state.workBadge);
  const insights = useWorkspaceStore((state) => state.managerInsights);

  return (
    <Panel>
      <PanelTitle icon={<BadgeCheck className="h-4 w-4" />} title="Work Badge" />
      <p className="mb-4 max-w-2xl text-sm text-[var(--text-muted)]">
        A living professional identity — skills, training, accomplishments, and explainable
        CareerScore signals — maintained by Working Intelligence and coordinated with {employee.name}.
      </p>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-semibold">{badge.employeeName}</h3>
              <p className="text-sm text-[var(--text-muted)]">{badge.role}</p>
            </div>
            <div className="text-right">
              <div className="text-xs tracking-wide text-[var(--text-muted)] uppercase">
                CareerScore
              </div>
              <div className="font-display text-3xl font-semibold text-[var(--color-brand)]">
                {badge.careerScore}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {badge.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-[var(--text-muted)]">L{skill.level}</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--color-panel)]">
                  <div
                    className="h-2 rounded-full bg-[var(--color-brand)]"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ListBlock title="Training verified" items={badge.training} />
          <div className="mt-3">
            <ListBlock title="Accomplishments" items={badge.accomplishments} />
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Evidence: {badge.verified.join(' · ')}
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold">ManagerScore signals</h3>
          {insights.map((insight) => (
            <article
              key={insight.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
                    insight.severity === 'action' &&
                      'bg-[color-mix(in_oklab,var(--color-danger)_16%,transparent)] text-[var(--color-danger)]',
                    insight.severity === 'watch' &&
                      'bg-[color-mix(in_oklab,var(--color-warning)_20%,transparent)] text-[var(--color-warning)]',
                    insight.severity === 'info' && 'bg-[var(--color-panel)] text-[var(--text-muted)]',
                  )}
                >
                  {insight.severity}
                </span>
                <h4 className="text-sm font-medium">{insight.title}</h4>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{insight.body}</p>
            </article>
          ))}
        </section>
      </div>
    </Panel>
  );
}

function FilesTab({ employeeId }: { employeeId: string }) {
  const allFiles = useWorkspaceStore((state) => state.files);
  const files = useMemo(
    () => allFiles.filter((file) => file.employeeId === employeeId),
    [allFiles, employeeId],
  );

  const columns = useMemo<ColumnDef<FileAttachment>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ getValue }) => formatFileSize(getValue<number>()),
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Uploaded',
        cell: ({ getValue }) => format(parseISO(getValue<string>()), 'MMM d, yyyy'),
      },
      { accessorKey: 'mimeType', header: 'Type' },
    ],
    [],
  );

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Panel>
      <PanelTitle icon={<FileText className="h-4 w-4" />} title="Shared files" />
      {files.length === 0 ? (
        <Empty text="No files yet for this agent." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-panel)] text-[var(--text-muted)]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-medium">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--border-subtle)]">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

function TasksTab({ employee }: { employee: AiEmployee }) {
  const allTasks = useWorkspaceStore((state) => state.tasks);
  const upsertTask = useWorkspaceStore((state) => state.upsertTask);
  const tasks = useMemo(
    () => allTasks.filter((task) => task.employeeId === employee.id),
    [allTasks, employee.id],
  );

  const cycleStatus = (task: TaskItem) => {
    const next =
      task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'done' : 'todo';
    upsertTask({ ...task, status: next });
  };

  return (
    <Panel>
      <div className="mb-4 flex items-center justify-between gap-3">
        <PanelTitle icon={<CheckCircle2 className="h-4 w-4" />} title="Tasks" />
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            upsertTask({
              id: createId('task'),
              employeeId: employee.id,
              title: `New work item for ${employee.name}`,
              description: 'Describe the workflow outcome and systems involved.',
              status: 'todo',
              priority: 'medium',
              createdAt: new Date().toISOString(),
            })
          }
        >
          Add task
        </Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => cycleStatus(task)}
            className="flex w-full items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3 text-left transition-colors hover:bg-[var(--color-panel)]"
          >
            {task.status === 'done' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
            ) : (
              <Circle className="mt-0.5 h-4 w-4 text-[var(--text-muted)]" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn('font-medium', task.status === 'done' && 'line-through opacity-70')}
                >
                  {task.title}
                </span>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{task.description}</p>
            </div>
          </button>
        ))}
        {tasks.length === 0 && <Empty text="No tasks yet." />}
      </div>
    </Panel>
  );
}

function NotesTab({ employeeId }: { employeeId: string }) {
  const allNotes = useWorkspaceStore((state) => state.notes);
  const notes = useMemo(
    () => allNotes.filter((note) => note.employeeId === employeeId),
    [allNotes, employeeId],
  );

  return (
    <Panel>
      <PanelTitle icon={<NotebookPen className="h-4 w-4" />} title="Notes" />
      <div className="grid gap-3 md:grid-cols-2">
        {notes.map((note) => (
          <article
            key={note.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4"
          >
            <h3 className="font-medium">{note.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{note.content}</p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              Updated {format(parseISO(note.updatedAt), 'MMM d, h:mm a')}
            </p>
          </article>
        ))}
      </div>
      {notes.length === 0 && <Empty text="No notes yet." />}
    </Panel>
  );
}

function CalendarTab({ employeeId }: { employeeId: string }) {
  const allEvents = useWorkspaceStore((state) => state.events);
  const events = useMemo(
    () => allEvents.filter((event) => event.employeeId === employeeId),
    [allEvents, employeeId],
  );

  return (
    <Panel>
      <PanelTitle icon={<CalendarDays className="h-4 w-4" />} title="Calendar" />
      <div className="space-y-2">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3"
          >
            <h3 className="font-medium">{event.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{event.description}</p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              {format(parseISO(event.startsAt), 'EEE, MMM d · h:mm a')}
            </p>
          </article>
        ))}
        {events.length === 0 && <Empty text="No upcoming events." />}
      </div>
    </Panel>
  );
}

function JobBriefTab({ employee }: { employee: AiEmployee }) {
  return (
    <Panel>
      <PanelTitle title="Job brief" />
      <p className="mb-4 max-w-2xl text-sm text-[var(--text-muted)]">
        Working Intelligence agents get a real job description — responsibilities, systems, autonomy
        level, and may / may-not boundaries.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <InfoBlock title="Personality" body={employee.personality} />
        <InfoBlock
          title="Autonomy"
          body={`Level ${employee.autonomyLevel} — ${
            employee.autonomyLevel === 1
              ? 'Tell me'
              : employee.autonomyLevel === 2
                ? 'Help me'
                : 'Handle it'
          }`}
        />
        <ListBlock title="Responsibilities" items={employee.responsibilities} />
        <ListBlock title="May do" items={employee.jobBoundary.mayDo} />
        <ListBlock title="May not do" items={employee.jobBoundary.mayNotDo} />
        <ListBlock title="Tools" items={employee.tools} />
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold">Human Necessity Test</h3>
          <ul className="mt-3 space-y-2">
            {employee.humanNecessityExamples.map((example) => (
              <li
                key={example.task}
                className="flex flex-wrap items-center justify-between gap-2 text-sm"
              >
                <span className="text-[var(--text-secondary)]">{example.task}</span>
                <NecessityBadge value={example.classification} />
              </li>
            ))}
          </ul>
        </section>
        <ListBlock title="Guidelines" items={employee.guidelines} />
        <InfoBlock title="System focus" body={employee.systemPrompt.split('\n')[0] ?? ''} />
      </div>
    </Panel>
  );
}

function NecessityBadge({ value }: { value: HumanNecessity }) {
  const labels: Record<HumanNecessity, string> = {
    automate: 'Automate',
    assist: 'Assist',
    human_ai: 'Human + AI',
    human: 'Human',
  };
  const styles: Record<HumanNecessity, string> = {
    automate:
      'bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]',
    assist: 'bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-[var(--color-accent)]',
    human_ai:
      'bg-[color-mix(in_oklab,var(--color-warning)_20%,transparent)] text-[var(--color-warning)]',
    human: 'bg-[color-mix(in_oklab,var(--color-danger)_16%,transparent)] text-[var(--color-danger)]',
  };
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', styles[value])}>
      {labels[value]}
    </span>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="tab-panel scrollbar-thin h-full overflow-y-auto px-4 py-4 md:px-6">
      {children}
    </div>
  );
}

function PanelTitle({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold">
      {icon}
      {title}
    </h2>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-[var(--text-muted)]">{text}</p>;
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{body}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}

function PriorityBadge({ priority }: { priority: TaskItem['priority'] }) {
  const styles = {
    low: 'bg-[var(--color-panel)] text-[var(--text-muted)]',
    medium:
      'bg-[color-mix(in_oklab,var(--color-warning)_20%,transparent)] text-[var(--color-warning)]',
    high: 'bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-[var(--color-danger)]',
  };
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[11px] font-medium capitalize',
        styles[priority],
      )}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: TaskItem['status'] }) {
  return (
    <span className="rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-muted)] capitalize">
      {status.replace('_', ' ')}
    </span>
  );
}
