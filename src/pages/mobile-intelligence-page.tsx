import { Navigate } from 'react-router-dom';
import { MobileScreenShell } from '@/features/mobile/mobile-screen-shell';
import { useIsMobile } from '@/hooks/use-media-query';
import { useWorkspaceStore } from '@/store/workspace-store';

export function MobileIntelligencePage() {
  const isMobile = useIsMobile();
  const badge = useWorkspaceStore((state) => state.workBadge);
  const insights = useWorkspaceStore((state) => state.managerInsights);
  const actions = useWorkspaceStore((state) => state.actions);

  if (!isMobile) return <Navigate to="/app/holly" replace />;

  const pending = actions.filter((action) => action.status === 'pending').length;

  return (
    <MobileScreenShell
      eyebrow="Working Intelligence"
      title="Intelligence layer"
      subtitle="Understand work context, surface what matters, and coordinate agent action."
      contentClassName="space-y-4"
    >
      <section className="mobile-card p-4">
        <h2 className="text-sm font-semibold text-white/70">Live signals</h2>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <Stat label="Pending actions" value={String(pending)} />
          <Stat label="CareerScore" value={String(badge.careerScore)} />
          <Stat label="Insights" value={String(insights.length)} />
        </div>
      </section>

      <section className="mobile-card p-4">
        <h2 className="text-sm font-semibold">Human Necessity Test</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <Row tone="automate" label="Automate" body="Retrieve docs, status checks, badge updates" />
          <Row tone="assist" label="Assist" body="Payroll investigation, delay notifications" />
          <Row tone="human_ai" label="Human + AI" body="Sensitive ER, coaching conversations" />
          <Row tone="human" label="Human" body="Final judgment, negotiation, presence" />
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-semibold text-white/70">ManagerScore watchlist</h2>
        {insights.map((insight) => (
          <article key={insight.id} className="mobile-card px-4 py-3">
            <div className="text-xs tracking-wide text-white/40 uppercase">{insight.severity}</div>
            <h3 className="mt-1 font-medium">{insight.title}</h3>
            <p className="mt-1 text-sm text-white/50">{insight.body}</p>
          </article>
        ))}
      </section>
    </MobileScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-[var(--color-brand)]">{value}</div>
      <div className="mt-1 text-[11px] text-white/40">{label}</div>
    </div>
  );
}

function Row({
  tone,
  label,
  body,
}: {
  tone: string;
  label: string;
  body: string;
}) {
  const colors: Record<string, string> = {
    automate: 'text-emerald-400',
    assist: 'text-sky-400',
    human_ai: 'text-amber-400',
    human: 'text-rose-400',
  };
  return (
    <li className="flex gap-3">
      <span className={`w-24 shrink-0 text-xs font-semibold ${colors[tone]}`}>{label}</span>
      <span className="text-white/55">{body}</span>
    </li>
  );
}
