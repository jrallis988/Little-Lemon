import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel } from '../components/ui';

type Field = 'wirelessIp' | 'subnetMask' | 'gateway';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'] as const;

export function WirelessIpInput() {
  const { settings, updateSettings, goTo } = useNavigation();
  const [field, setField] = useState<Field>('wirelessIp');

  const value = settings[field];

  const push = (key: (typeof KEYS)[number]) => {
    if (key === '⌫') {
      updateSettings({ [field]: value.slice(0, -1) });
      return;
    }
    if (value.length >= 15) return;
    updateSettings({ [field]: value + key });
  };

  const fields: { id: Field; label: string }[] = [
    { id: 'wirelessIp', label: 'IP address' },
    { id: 'subnetMask', label: 'Subnet' },
    { id: 'gateway', label: 'Gateway' },
  ];

  return (
    <div className="space-y-4">
      <Panel>
        <SectionLabel>Manual network</SectionLabel>
        <div className="space-y-2">
          {fields.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setField(f.id)}
              className={`w-full text-left rounded-[var(--radius-control)] border px-3 py-3 cursor-pointer ${
                field === f.id
                  ? 'border-accent/50 bg-accent/10'
                  : 'border-border-subtle bg-slate-950/40'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-ink-faint">
                {f.label}
              </span>
              <span className="block font-metric text-lg text-ink mt-0.5 min-h-7">
                {settings[f.id] || <span className="text-ink-faint">—</span>}
                {field === f.id && (
                  <span className="pulse-ready inline-block w-0.5 h-5 ml-0.5 align-middle bg-accent" />
                )}
              </span>
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((k) => (
          <Button
            key={k}
            variant={k === '⌫' ? 'ghost' : 'secondary'}
            size="lg"
            className="!font-metric text-xl"
            onClick={() => push(k)}
          >
            {k}
          </Button>
        ))}
      </div>

      <Button variant="primary" className="w-full" onClick={() => goTo('home')}>
        Apply IP settings
      </Button>
    </div>
  );
}
