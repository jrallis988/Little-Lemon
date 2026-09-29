import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

const STEPS = [
  {
    title: 'Cool-down',
    body: 'Ensure printhead temperature is below 45°C before opening the assembly.',
  },
  {
    title: 'Release latch',
    body: 'Pull the green printhead release toward you until the arm lifts freely.',
  },
  {
    title: 'Inspect element',
    body: 'Check the ceramic strip for debris or scratches. Clean with approved wipe only.',
  },
  {
    title: 'Reseat & lock',
    body: 'Lower the assembly evenly and press until the latch clicks. Run a test print.',
  },
];

export function PrintheadWizard() {
  const { goTo } = useNavigation();
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Printhead check</SectionLabel>
          <StatusPill tone="accent">
            {step + 1}/{STEPS.length}
          </StatusPill>
        </div>
        <p className="text-xl font-semibold text-ink mb-2">{current.title}</p>
        <p className="text-sm text-ink-muted leading-relaxed">{current.body}</p>
      </Panel>

      <Panel>
        <SectionLabel>Safety</SectionLabel>
        <ul className="space-y-2 text-sm text-ink-muted">
          <li className="flex gap-2">
            <span className="text-accent font-mono">01</span>
            Never touch the heating element with bare metal tools.
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-mono">02</span>
            Use only isopropyl wipes rated for thermal heads.
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-mono">03</span>
            Re-run darkness calibration after reseating.
          </li>
        </ul>
      </Panel>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            if (step >= STEPS.length - 1) goTo('darkness');
            else setStep((s) => s + 1);
          }}
        >
          {step >= STEPS.length - 1 ? 'Adjust darkness' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
