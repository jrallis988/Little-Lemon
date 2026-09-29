import { useNavigation } from '../navigation/NavigationContext';
import type { ScreenId } from '../navigation/screens';
import { Button, Metric, Panel, SectionLabel, StatusPill } from '../components/ui';

const SHORTCUTS: { id: ScreenId; label: string; hint: string }[] = [
  { id: 'print-job', label: 'Active Job', hint: 'Progress' },
  { id: 'device-info', label: 'Device Info', hint: 'Hardware' },
  { id: 'zbi-programs', label: 'ZBI Menu', hint: 'Scripts' },
  { id: 'wlan-security', label: 'WLAN', hint: 'Security' },
  { id: 'label-offset', label: 'Offset', hint: 'Align' },
  { id: 'darkness', label: 'Darkness', hint: 'Contrast' },
];

export function HomeDashboard() {
  const { settings, goTo, updateSettings } = useNavigation();
  const isPrinting = settings.printStatus === 'printing';

  return (
    <div className="space-y-4">
      <Panel className="bg-gradient-to-br from-panel to-slate-950">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <SectionLabel>Printer status</SectionLabel>
            <p className="text-3xl font-semibold tracking-tight text-ink capitalize">
              {isPrinting ? 'Printing' : 'Idle'}
            </p>
          </div>
          <StatusPill tone={isPrinting ? 'accent' : 'ready'}>
            <span className="pulse-ready h-1.5 w-1.5 rounded-full bg-current" />
            {isPrinting ? 'LIVE' : 'STANDBY'}
          </StatusPill>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-border-subtle pt-4">
          <Metric label="Queue" value={isPrinting ? '1' : '0'} tone="accent" />
          <Metric label="Temp" value="42°C" />
          <Metric label="Ribbon" value="78%" tone="ready" />
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              updateSettings({
                printStatus: 'printing',
                jobProgress: 18,
                jobDone: 22,
                jobTotal: 120,
              });
              goTo('print-job');
            }}
          >
            Start demo job
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() =>
              updateSettings({ printStatus: 'idle', jobProgress: 0, jobDone: 0 })
            }
          >
            Clear
          </Button>
        </div>
      </Panel>

      <Panel>
        <SectionLabel>Quick shortcuts</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {SHORTCUTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              className="text-left rounded-[var(--radius-control)] border border-border-subtle bg-slate-950/50 px-3 py-3 hover:border-accent/40 transition-colors cursor-pointer min-h-16"
            >
              <span className="block text-sm text-ink font-medium">{s.label}</span>
              <span className="block text-[11px] font-mono text-ink-faint mt-1">
                {s.hint}
              </span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionLabel>Maintenance</SectionLabel>
        <div className="flex flex-col gap-2">
          <Button variant="secondary" onClick={() => goTo('ribbon-calibration')}>
            Ribbon calibration wizard
          </Button>
          <Button variant="secondary" onClick={() => goTo('printhead-wizard')}>
            Printhead assembly check
          </Button>
          <Button variant="ghost" onClick={() => goTo('touch-calibration')}>
            Touch screen calibration
          </Button>
          <Button variant="danger" onClick={() => goTo('restore-network')}>
            Restore network defaults
          </Button>
        </div>
      </Panel>
    </div>
  );
}
