import { Metric, Panel, SectionLabel, StatusPill } from '../components/ui';

export function DeviceInfoPanel() {
  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex items-start justify-between mb-4">
          <div>
            <SectionLabel>Device identity</SectionLabel>
            <p className="text-xl font-semibold text-ink">ZT411-42F8</p>
            <p className="font-metric text-sm text-ink-muted mt-1">SN · XXZL244200184</p>
          </div>
          <StatusPill tone="ready">ONLINE</StatusPill>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-border-subtle pt-4">
          <Metric label="Model" value="ZT411" />
          <Metric label="Location" value="WH-A4" tone="accent" />
        </div>
      </Panel>

      <Panel>
        <SectionLabel>Network addresses</SectionLabel>
        <div className="space-y-3">
          <div className="flex justify-between gap-3 items-baseline">
            <span className="text-sm text-ink-muted">Wired Ethernet</span>
            <span className="font-metric text-sm text-ink">10.42.18.12</span>
          </div>
          <div className="flex justify-between gap-3 items-baseline">
            <span className="text-sm text-ink-muted">Wireless WLAN</span>
            <span className="font-metric text-sm text-accent">10.42.18.64</span>
          </div>
          <div className="flex justify-between gap-3 items-baseline">
            <span className="text-sm text-ink-muted">MAC</span>
            <span className="font-metric text-xs text-ink-muted">00:A0:F8:C2:1D:9E</span>
          </div>
        </div>
      </Panel>

      <Panel>
        <SectionLabel>Firmware & Link-OS</SectionLabel>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-ink-muted">Link-OS</span>
            <span className="font-metric text-sm text-ready">6.8.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-ink-muted">Main firmware</span>
            <span className="font-metric text-sm text-ink">V95.21.17Z</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-ink-muted">Update channel</span>
            <span className="font-metric text-sm text-ink-muted">Stable</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
