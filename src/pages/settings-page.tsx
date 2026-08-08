import { Button } from '@/components/ui/button';
import { authModeLabel } from '@/services/auth';
import { useTheme } from '@/hooks/use-theme';
import { useWorkspaceStore } from '@/store/workspace-store';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const user = useWorkspaceStore((state) => state.user);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);
  const resetDemoData = useWorkspaceStore((state) => state.resetDemoData);
  const memories = useWorkspaceStore((state) => state.memories);

  return (
    <div className="scrollbar-thin h-full overflow-y-auto bg-black px-4 pt-6 pb-28 text-white md:bg-transparent md:px-8 md:pb-6 md:text-[var(--text-primary)]">
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-white/45 md:text-[var(--text-muted)]">
        Shift settings — appearance, workspace context, auth mode, and the living Working
        Intelligence layer behind your agents.
      </p>

      <div className="mt-8 grid max-w-3xl gap-4">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:border-[var(--border-subtle)] md:bg-[var(--color-surface-elevated)]">
          <h2 className="font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-white/65 md:text-[var(--text-secondary)]">
            {user.fullName} · {user.email} · role: {user.role}
          </p>
          <p className="mt-1 text-xs text-white/40 md:text-[var(--text-muted)]">{authModeLabel()}</p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:border-[var(--border-subtle)] md:bg-[var(--color-surface-elevated)]">
          <h2 className="font-semibold">Theme</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(['light', 'dark', 'system'] as const).map((value) => (
              <Button
                key={value}
                variant={theme === value ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setTheme(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:border-[var(--border-subtle)] md:bg-[var(--color-surface-elevated)]">
          <h2 className="font-semibold">Workspaces</h2>
          <div className="mt-3 space-y-2">
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                type="button"
                onClick={() => setActiveWorkspace(workspace.id)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-left hover:bg-white/[0.06] md:border-[var(--border-subtle)] md:hover:bg-[var(--color-panel)]"
              >
                <span>
                  <span className="block font-medium">{workspace.name}</span>
                  <span className="text-xs text-white/40 md:text-[var(--text-muted)]">
                    Role: {workspace.role}
                  </span>
                </span>
                {workspace.id === activeWorkspaceId && (
                  <span className="text-xs text-[var(--color-brand)]">Active</span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:border-[var(--border-subtle)] md:bg-[var(--color-surface-elevated)]">
          <h2 className="font-semibold">AI memory</h2>
          <p className="mt-1 text-sm text-white/45 md:text-[var(--text-muted)]">
            {memories.length} memory entries stored locally in demo mode.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/65 md:text-[var(--text-secondary)]">
            {memories.slice(0, 5).map((memory) => (
              <li
                key={memory.id}
                className="rounded-xl bg-white/[0.06] px-3 py-2 md:bg-[var(--color-panel)]"
              >
                <span className="text-xs uppercase text-white/40 md:text-[var(--text-muted)]">
                  {memory.kind}
                </span>
                <p>{memory.content}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:border-[var(--border-subtle)] md:bg-[var(--color-surface-elevated)]">
          <h2 className="font-semibold">Demo data</h2>
          <p className="mt-1 text-sm text-white/45 md:text-[var(--text-muted)]">
            Reset conversations, tasks, files, and notifications to the seeded demo state.
          </p>
          <Button className="mt-3" variant="secondary" onClick={resetDemoData}>
            Reset demo workspace
          </Button>
        </section>
      </div>
    </div>
  );
}
