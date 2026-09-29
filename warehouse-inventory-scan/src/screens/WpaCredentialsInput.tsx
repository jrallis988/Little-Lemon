import { useState } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel } from '../components/ui';

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
];

type Field = 'user' | 'pass';

export function WpaCredentialsInput() {
  const { settings, updateSettings, goTo } = useNavigation();
  const [field, setField] = useState<Field>('user');
  const [shift, setShift] = useState(false);

  const value = field === 'user' ? settings.wpaUsername : settings.wpaPassword;

  const press = (key: string) => {
    if (key === '⇧') {
      setShift((s) => !s);
      return;
    }
    if (key === '⌫') {
      if (field === 'user') updateSettings({ wpaUsername: value.slice(0, -1) });
      else updateSettings({ wpaPassword: value.slice(0, -1) });
      return;
    }
    const ch = shift ? key.toUpperCase() : key;
    if (field === 'user') updateSettings({ wpaUsername: (value + ch).slice(0, 32) });
    else updateSettings({ wpaPassword: (value + ch).slice(0, 64) });
    setShift(false);
  };

  return (
    <div className="space-y-3">
      <Panel>
        <SectionLabel>WPA credentials</SectionLabel>
        <button
          type="button"
          onClick={() => setField('user')}
          className={`w-full text-left mb-2 rounded-[var(--radius-control)] border px-3 py-2.5 cursor-pointer ${
            field === 'user' ? 'border-accent/50 bg-accent/10' : 'border-border-subtle'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider text-ink-faint">Username</span>
          <span className="block font-metric text-sm text-ink mt-0.5 min-h-5">
            {settings.wpaUsername || '—'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setField('pass')}
          className={`w-full text-left rounded-[var(--radius-control)] border px-3 py-2.5 cursor-pointer ${
            field === 'pass' ? 'border-accent/50 bg-accent/10' : 'border-border-subtle'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider text-ink-faint">Password</span>
          <span className="block font-metric text-sm text-ink mt-0.5 min-h-5">
            {settings.wpaPassword ? '•'.repeat(Math.min(settings.wpaPassword.length, 16)) : '—'}
          </span>
        </button>
      </Panel>

      <div className="space-y-1.5 rounded-[var(--radius-panel)] border border-border-subtle bg-panel p-2">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                className={`min-h-10 rounded border border-border-strong bg-slate-950 text-ink font-metric text-xs hover:border-accent/50 cursor-pointer ${
                  key === '⇧' || key === '⌫' ? 'px-2.5 flex-[1.2]' : 'flex-1 px-1'
                } ${shift && key === '⇧' ? 'bg-accent/20 border-accent/50' : ''}`}
              >
                {key === '⇧' ? (shift ? '⬆' : '⇧') : key}
              </button>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={() => press(' ')}
          className="w-full min-h-10 mt-1 rounded border border-border-strong bg-slate-950 text-ink-muted text-xs cursor-pointer hover:border-accent/50"
        >
          space
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={() => goTo('wlan-security')}>
          Back
        </Button>
        <Button variant="primary" onClick={() => goTo('wireless-ip')}>
          Next · IP
        </Button>
      </div>
    </div>
  );
}
