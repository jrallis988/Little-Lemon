import { useEffect, useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

const PHASES = [
  'Clearing WLAN profiles…',
  'Flushing IP leases…',
  'Resetting credentials…',
  'Releasing radio…',
  'Applying factory network defaults…',
  'Complete',
];

export function NetworkRestoreStatus() {
  const { goTo, updateSettings } = useNavigation();
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + 8);
        const idx = Math.min(PHASES.length - 1, Math.floor(next / (100 / (PHASES.length - 1))));
        setPhase(idx);
        if (next >= 100) {
          updateSettings({
            wlanProtocol: 'NONE',
            wirelessIp: '0.0.0.0',
            subnetMask: '0.0.0.0',
            gateway: '0.0.0.0',
            wpaUsername: '',
            wpaPassword: '',
          });
        }
        return next;
      });
    }, 400);
    return () => window.clearInterval(id);
  }, [updateSettings]);

  const done = pct >= 100;

  return (
    <div className="space-y-4">
      <Panel className="text-center py-6">
        <SectionLabel>Restoration</SectionLabel>
        <p className="font-metric text-5xl font-semibold text-accent tabular-nums">{pct}%</p>
        <div className="mt-4 h-2 rounded-full bg-slate-950 border border-border-subtle overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-strong to-accent transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-ink-muted min-h-10">{PHASES[phase]}</p>
        <div className="mt-2 flex justify-center">
          <StatusPill tone={done ? 'ready' : 'accent'}>
            {done ? 'DONE' : 'IN PROGRESS'}
          </StatusPill>
        </div>
      </Panel>

      <Button
        variant="primary"
        className="w-full"
        disabled={!done}
        onClick={() => goTo('wlan-security')}
      >
        {done ? 'Reconfigure WLAN' : 'Please wait…'}
      </Button>
    </div>
  );
}
