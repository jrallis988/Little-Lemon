import { useEffect } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

export function PrintJobProgress() {
  const { settings, updateSettings, goTo } = useNavigation();
  const { jobDone, jobTotal, jobProgress, jobLabel, printStatus } = settings;

  useEffect(() => {
    if (printStatus !== 'printing') return;
    const id = window.setInterval(() => {
      updateSettings({
        jobDone: Math.min(jobTotal, jobDone + 1),
        jobProgress: Math.min(100, Math.round(((jobDone + 1) / jobTotal) * 100)),
        printStatus: jobDone + 1 >= jobTotal ? 'idle' : 'printing',
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [printStatus, jobDone, jobTotal, updateSettings]);

  return (
    <div className="space-y-4">
      <Panel className="text-center py-6">
        <SectionLabel>Job progress</SectionLabel>
        <p className="font-metric text-6xl font-semibold text-accent tabular-nums leading-none">
          {jobProgress}
          <span className="text-2xl text-ink-faint">%</span>
        </p>
        <p className="mt-3 font-metric text-sm text-ink-muted">
          {jobDone} / {jobTotal} labels
        </p>
        <div className="mt-4 h-2 rounded-full bg-slate-950 border border-border-subtle overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-strong to-accent transition-[width] duration-500"
            style={{ width: `${jobProgress}%` }}
          />
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Active format</SectionLabel>
          <StatusPill tone={printStatus === 'printing' ? 'accent' : 'muted'}>
            {printStatus === 'printing' ? 'RUNNING' : 'IDLE'}
          </StatusPill>
        </div>
        <p className="font-metric text-lg text-ink">{jobLabel}</p>
        <p className="text-xs text-ink-faint mt-1">Media · 4×6 thermal transfer</p>
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="primary"
          onClick={() =>
            updateSettings({
              printStatus: 'printing',
              jobDone: 0,
              jobProgress: 0,
              jobTotal: 120,
            })
          }
        >
          Reprint
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            updateSettings({ printStatus: 'idle', jobProgress: 100, jobDone: jobTotal })
          }
        >
          Cancel
        </Button>
      </div>
      <Button variant="secondary" className="w-full" onClick={() => goTo('home')}>
        Back to dashboard
      </Button>
    </div>
  );
}
