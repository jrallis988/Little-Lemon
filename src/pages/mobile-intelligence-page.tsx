import { Navigate } from 'react-router-dom';
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
    <div className="mobile-dark flex h-full min-h-0 flex-col bg-black text-white">
      <header className="safe-top px-4 pt-4 pb-3">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-brand)] uppercase">
          Working Intelligence
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Intelligence layer</h1>
        <p className="mt-1 text-sm text-white/45">
          Understand work context, surface what matters, and coordinate agent action.
        </p>
      </header>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 pb-24">
        <section className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <h2 className="text-sm font-semibold text-white/70">Live signals</h2>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <Stat label="Pending actions" value={String(pending)} />
            <Stat label="CareerScore" value={String(badge.careerScore)} />
            <Stat label="Insights" value={String(insights.length)} />
          </div>
        </section>

        <section className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <h2 className="text-sm font-semibold">Human Necessity Test</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <Row tone="automate" label="Automate" body="Retrieve docs, status checks, badge updates" />
            <Row tone="assist" label="Assist" body="Payroll investigation, delay notifications" />
            <Row tone="human_ai" label="Human + AI" body="Sensitive ER, coaching conversations" />
            <Row tone="human" label="Human" body="Final judgment, negotiation, presence" />
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-white/70">ManagerScore watchlist</h2>
          {insights.map((insight) => (
            <article
              key={insight.id}
              className="rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10"
            >
              <div className="text-xs tracking-wide text-white/40 uppercase">{insight.severity}</div>
              <h3 className="mt-1 font-medium">{insight.title}</h3>
              <p className="mt-1 text-sm text-white/50">{insight.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
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
