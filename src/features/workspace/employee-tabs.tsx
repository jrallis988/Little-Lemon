import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { CalendarDays, CheckCircle2, Circle, FileText, NotebookPen } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { AiEmployee, FileAttachment, TaskItem } from '@/types';
import { useUiStore } from '@/store/ui-store';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatFileSize } from '@/utils/format';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { createId } from '@/utils/id';

export function EmployeeTabs({ employee }: { employee: AiEmployee }) {
  const activeTab = useUiStore((state) => state.activeTab);

  switch (activeTab) {
    case 'files':
      return <FilesTab employeeId={employee.id} />;
    case 'tasks':
      return <TasksTab employee={employee} />;
    case 'notes':
      return <NotesTab employeeId={employee.id} />;
    case 'calendar':
      return <CalendarTab employeeId={employee.id} />;
    case 'posts':
      return <PostsTab employeeId={employee.id} />;
    case 'guidelines':
      return <GuidelinesTab employee={employee} />;
    default:
      return null;
  }
}

function FilesTab({ employeeId }: { employeeId: string }) {
  const files = useWorkspaceStore((state) =>
    state.files.filter((file) => file.employeeId === employeeId),
  );

  const columns: ColumnDef<FileAttachment>[] = [
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
  ];

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Panel>
      <PanelTitle icon={<FileText className="h-4 w-4" />} title="Shared files" />
      {files.length === 0 ? (
        <Empty text="No files yet for this employee." />
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
  const tasks = useWorkspaceStore((state) =>
    state.tasks.filter((task) => task.employeeId === employee.id),
  );
  const upsertTask = useWorkspaceStore((state) => state.upsertTask);

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
              title: `New task for ${employee.name}`,
              description: 'Describe the outcome and due date.',
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
                <span className={cn('font-medium', task.status === 'done' && 'line-through opacity-70')}>
                  {task.title}
                </span>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{task.description}</p>
            </div>
          </button>
        ))}
        {tasks.length === 0 && <Empty text="No tasks assigned yet." />}
      </div>
    </Panel>
  );
}

function NotesTab({ employeeId }: { employeeId: string }) {
  const notes = useWorkspaceStore((state) =>
    state.notes.filter((note) => note.employeeId === employeeId),
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
  const events = useWorkspaceStore((state) =>
    state.events.filter((event) => event.employeeId === employeeId),
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
              {event.location ? ` · ${event.location}` : ''}
            </p>
          </article>
        ))}
        {events.length === 0 && <Empty text="No upcoming events." />}
      </div>
    </Panel>
  );
}

function PostsTab({ employeeId }: { employeeId: string }) {
  const posts = useWorkspaceStore((state) =>
    state.posts.filter((post) => post.employeeId === employeeId),
  );

  return (
    <Panel>
      <PanelTitle title="Posts" />
      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-4"
          >
            <h3 className="font-display text-lg font-semibold">{post.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{post.body}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
        {posts.length === 0 && <Empty text="No posts from this employee yet." />}
      </div>
    </Panel>
  );
}

function GuidelinesTab({ employee }: { employee: AiEmployee }) {
  return (
    <Panel>
      <PanelTitle title="Guidelines & capabilities" />
      <div className="grid gap-4 lg:grid-cols-2">
        <InfoBlock title="Personality" body={employee.personality} />
        <InfoBlock title="System focus" body={employee.systemPrompt.split('\n')[0] ?? ''} />
        <ListBlock title="Responsibilities" items={employee.responsibilities} />
        <ListBlock title="Tools" items={employee.tools} />
        <ListBlock title="Permissions" items={employee.permissions} />
        <ListBlock title="Knowledge base" items={employee.knowledgeBase} />
        <ListBlock title="Guidelines" items={employee.guidelines} />
        <InfoBlock
          title="Model routing"
          body={`Provider: ${employee.provider}${employee.model ? ` · ${employee.model}` : ''}`}
        />
      </div>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="scrollbar-thin h-full overflow-y-auto px-4 py-4 md:px-6">{children}</div>;
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
    medium: 'bg-[color-mix(in_oklab,var(--color-warning)_20%,transparent)] text-[var(--color-warning)]',
    high: 'bg-[color-mix(in_oklab,var(--color-danger)_18%,transparent)] text-[var(--color-danger)]',
  };
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium capitalize', styles[priority])}>
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
