import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

const TARGETS = [
  { id: 1, x: 12, y: 14 },
  { id: 2, x: 88, y: 14 },
  { id: 3, x: 50, y: 50 },
  { id: 4, x: 12, y: 86 },
  { id: 5, x: 88, y: 86 },
];

export function TouchCalibrationGrid() {
  const { goTo } = useNavigation();
  const [hits, setHits] = useState<number[]>([]);
  const next = TARGETS.find((t) => !hits.includes(t.id));
  const complete = hits.length >= TARGETS.length;

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Touch accuracy</SectionLabel>
          <StatusPill tone={complete ? 'ready' : 'accent'}>
            {hits.length}/{TARGETS.length}
          </StatusPill>
        </div>
        <p className="text-sm text-ink-muted mb-3">
          Tap each crosshair in order. Hold steady for a clean sample.
        </p>
        <div className="relative h-64 rounded-[var(--radius-control)] border border-border-subtle bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] bg-size-[24px_24px]" />
          {TARGETS.map((t) => {
            const hit = hits.includes(t.id);
            const active = next?.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={hit || (!active && !complete)}
                onClick={() => setHits((h) => [...h, t.id])}
                className="absolute -translate-x-1/2 -translate-y-1/2 h-12 w-12 cursor-pointer disabled:cursor-default"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                aria-label={`Calibration point ${t.id}`}
              >
                <span
                  className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${
                    hit ? 'bg-ready' : active ? 'bg-accent' : 'bg-border-strong'
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 ${
                    hit ? 'bg-ready' : active ? 'bg-accent' : 'bg-border-strong'
                  }`}
                />
                <span
                  className={`absolute inset-2 rounded-full border-2 ${
                    hit
                      ? 'border-ready bg-ready/20'
                      : active
                        ? 'border-accent pulse-ready'
                        : 'border-border-strong'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={() => setHits([])}>
          Retry
        </Button>
        <Button variant="primary" disabled={!complete} onClick={() => goTo('home')}>
          Save calibration
        </Button>
      </div>
    </div>
  );
}
