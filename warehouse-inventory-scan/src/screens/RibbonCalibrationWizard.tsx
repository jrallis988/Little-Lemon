import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

const STEPS = [
  {
    title: 'Power idle',
    body: 'Pause the queue and wait for the READY indicator before opening the cover.',
  },
  {
    title: 'Open media cover',
    body: 'Release the side latch and lift the cover until it locks open.',
  },
  {
    title: 'Unload spent ribbon',
    body: 'Wind remaining leader onto the take-up spindle, then lift both cores free.',
  },
  {
    title: 'Seat new ribbon',
    body: 'Install supply on the rear hub and empty core on the take-up. Advance until taut.',
  },
  {
    title: 'Calibrate sensors',
    body: 'Close the cover and run Auto-Cal. Confirm ribbon remaining reads above 90%.',
  },
];

export function RibbonCalibrationWizard() {
  const { goTo } = useNavigation();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const done = step >= STEPS.length - 1;

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Ribbon reload</SectionLabel>
          <StatusPill tone="accent">
            STEP {step + 1}/{STEPS.length}
          </StatusPill>
        </div>
        <div className="flex gap-1.5 mb-5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i <= step ? 'bg-accent' : 'bg-slate-950 border border-border-subtle'
              }`}
            />
          ))}
        </div>
        <p className="text-xl font-semibold text-ink mb-2">{current.title}</p>
        <p className="text-sm text-ink-muted leading-relaxed">{current.body}</p>
      </Panel>

      <Panel className="bg-slate-950/60">
        <p className="font-metric text-xs text-ink-faint uppercase tracking-wider mb-2">
          Diagram
        </p>
        <div className="h-28 rounded-[var(--radius-control)] border border-dashed border-border-strong flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-4 border border-accent/30 rounded-md" />
          <div className="absolute left-8 top-8 h-12 w-12 rounded-full border-2 border-accent/50" />
          <div className="absolute right-8 top-8 h-12 w-12 rounded-full border-2 border-ready/50" />
          <span className="font-metric text-[11px] text-accent relative z-10">
            SUPPLY → TAKE-UP
          </span>
        </div>
      </Panel>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            if (done) goTo('home');
            else setStep((s) => s + 1);
          }}
        >
          {done ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
