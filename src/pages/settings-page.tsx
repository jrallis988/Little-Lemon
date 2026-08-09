import { Button } from '@/components/ui/button';
import { MobileScreenShell } from '@/features/mobile/mobile-screen-shell';
import { authModeLabel } from '@/services/auth';
import { useIsMobile } from '@/hooks/use-media-query';
import { useTheme } from '@/hooks/use-theme';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/utils/cn';

export function SettingsPage() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const user = useWorkspaceStore((state) => state.user);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);
  const resetDemoData = useWorkspaceStore((state) => state.resetDemoData);
  const memories = useWorkspaceStore((state) => state.memories);

  const sections = (
    <>
      <section
        className={cn(
          isMobile
            ? 'mobile-card p-5'
            : 'rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5',
        )}
      >
        <h2 className="font-semibold">Profile</h2>
        <p className={cn('mt-2 text-sm', isMobile ? 'text-white/65' : 'text-[var(--text-secondary)]')}>
          {user.fullName} · {user.email} · role: {user.role}
        </p>
        <p className={cn('mt-1 text-xs', isMobile ? 'text-white/40' : 'text-[var(--text-muted)]')}>
          {authModeLabel()}
        </p>
      </section>

      <section
        className={cn(
          isMobile
            ? 'mobile-card p-5'
            : 'rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5',
        )}
      >
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

      <section
        className={cn(
          isMobile
            ? 'mobile-card p-5'
            : 'rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5',
        )}
      >
        <h2 className="font-semibold">Workspaces</h2>
        <div className="mt-3 space-y-2">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              type="button"
              onClick={() => setActiveWorkspace(workspace.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left',
                isMobile
                  ? 'bg-white/[0.04] ring-1 ring-white/10 active:bg-white/[0.08]'
                  : 'border border-[var(--border-subtle)] hover:bg-[var(--color-panel)]',
              )}
            >
              <span>
                <span className="block font-medium">{workspace.name}</span>
                <span className={cn('text-xs', isMobile ? 'text-white/40' : 'text-[var(--text-muted)]')}>
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

      <section
        className={cn(
          isMobile
            ? 'mobile-card p-5'
            : 'rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5',
        )}
      >
        <h2 className="font-semibold">AI memory</h2>
        <p className={cn('mt-1 text-sm', isMobile ? 'text-white/45' : 'text-[var(--text-muted)]')}>
          {memories.length} memory entries stored locally in demo mode.
        </p>
        <ul
          className={cn(
            'mt-3 space-y-2 text-sm',
            isMobile ? 'text-white/65' : 'text-[var(--text-secondary)]',
          )}
        >
          {memories.slice(0, 5).map((memory) => (
            <li
              key={memory.id}
              className={cn(
                'rounded-xl px-3 py-2',
                isMobile ? 'bg-white/[0.06]' : 'bg-[var(--color-panel)]',
              )}
            >
              <span
                className={cn(
                  'text-xs uppercase',
                  isMobile ? 'text-white/40' : 'text-[var(--text-muted)]',
                )}
              >
                {memory.kind}
              </span>
              <p>{memory.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={cn(
          isMobile
            ? 'mobile-card p-5'
            : 'rounded-3xl border border-[var(--border-subtle)] bg-[var(--color-surface-elevated)] p-5',
        )}
      >
        <h2 className="font-semibold">Demo data</h2>
        <p className={cn('mt-1 text-sm', isMobile ? 'text-white/45' : 'text-[var(--text-muted)]')}>
          Reset conversations, tasks, files, and notifications to the seeded demo state.
        </p>
        <Button className="mt-3" variant="secondary" onClick={resetDemoData}>
          Reset demo workspace
        </Button>
      </section>
    </>
  );

  if (isMobile) {
    return (
      <MobileScreenShell
        eyebrow="Shift"
        title="Settings"
        subtitle="Appearance, workspace context, and the Working Intelligence layer."
        contentClassName="grid max-w-3xl gap-4"
      >
        {sections}
      </MobileScreenShell>
    );
  }

  return (
    <div className="scrollbar-thin h-full overflow-y-auto px-4 py-6 md:px-8">
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
        Shift settings — appearance, workspace context, auth mode, and the living Working
        Intelligence layer behind your agents.
      </p>
      <div className="mt-8 grid max-w-3xl gap-4">{sections}</div>
    </div>
  );
}
