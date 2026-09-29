import { useState } from 'react';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

type Program = {
  id: string;
  name: string;
  path: string;
  running: boolean;
};

const INITIAL: Program[] = [
  { id: '1', name: 'Inbound ASN Parse', path: 'ZBI:ASN_IN.BAS', running: true },
  { id: '2', name: 'Pallet Tag Batch', path: 'ZBI:PALLET.BAS', running: false },
  { id: '3', name: 'Cycle Count Sync', path: 'ZBI:CYCLE.BAS', running: false },
  { id: '4', name: 'Nightly Purge', path: 'ZBI:PURGE.BAS', running: false },
];

export function ZbiProgramsMenu() {
  const [programs, setPrograms] = useState(INITIAL);
  const [selected, setSelected] = useState(INITIAL[0].id);

  const toggle = (id: string, running: boolean) => {
    setPrograms((list) =>
      list.map((p) => (p.id === id ? { ...p, running } : p)),
    );
  };

  const active = programs.find((p) => p.id === selected)!;

  return (
    <div className="space-y-4">
      <Panel>
        <SectionLabel>ZBI program list</SectionLabel>
        <div className="space-y-2">
          {programs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={`w-full text-left rounded-[var(--radius-control)] border px-3 py-3 transition-colors cursor-pointer ${
                selected === p.id
                  ? 'border-accent/50 bg-accent/10'
                  : 'border-border-subtle bg-slate-950/40 hover:border-border-strong'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-ink font-medium">{p.name}</span>
                <StatusPill tone={p.running ? 'ready' : 'muted'}>
                  {p.running ? 'RUN' : 'STOP'}
                </StatusPill>
              </div>
              <span className="font-metric text-[11px] text-ink-faint mt-1 block">
                {p.path}
              </span>
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="primary"
          disabled={active.running}
          onClick={() => toggle(active.id, true)}
        >
          Run
        </Button>
        <Button
          variant="danger"
          disabled={!active.running}
          onClick={() => toggle(active.id, false)}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}
