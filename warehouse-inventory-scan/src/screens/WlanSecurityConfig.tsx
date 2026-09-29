import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

const PROTOCOLS = ['NONE', 'WEP', 'EAP-TLS', 'PEAP'] as const;

export function WlanSecurityConfig() {
  const { settings, updateSettings, goTo } = useNavigation();

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Auth protocol</SectionLabel>
          <StatusPill tone="accent">{settings.wlanProtocol}</StatusPill>
        </div>
        <div className="space-y-2">
          {PROTOCOLS.map((p) => {
            const active = settings.wlanProtocol === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => updateSettings({ wlanProtocol: p })}
                className={`w-full flex items-center justify-between rounded-[var(--radius-control)] border px-4 py-3.5 min-h-14 cursor-pointer transition-colors ${
                  active
                    ? 'border-accent bg-accent/15 text-ink'
                    : 'border-border-subtle bg-slate-950/40 text-ink-muted hover:border-border-strong'
                }`}
              >
                <span className="font-metric text-sm tracking-wide">{p}</span>
                <span
                  className={`h-4 w-4 rounded-full border-2 ${
                    active ? 'border-accent bg-accent' : 'border-border-strong'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <p className="text-sm text-ink-muted leading-relaxed">
          {settings.wlanProtocol === 'NONE' &&
            'Open network — not recommended for production floors.'}
          {settings.wlanProtocol === 'WEP' &&
            'Legacy WEP. Prefer PEAP or EAP-TLS where possible.'}
          {settings.wlanProtocol === 'EAP-TLS' &&
            'Certificate-based. Install device cert before associating.'}
          {settings.wlanProtocol === 'PEAP' &&
            'Username / password via MSCHAPv2. Continue to credentials.'}
        </p>
      </Panel>

      <Button
        variant="primary"
        className="w-full"
        onClick={() =>
          goTo(
            settings.wlanProtocol === 'NONE' || settings.wlanProtocol === 'WEP'
              ? 'wireless-ip'
              : 'wpa-credentials',
          )
        }
      >
        Continue
      </Button>
    </div>
  );
}
