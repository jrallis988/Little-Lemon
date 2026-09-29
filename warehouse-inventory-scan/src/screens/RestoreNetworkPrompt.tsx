import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, StatusPill } from '../components/ui';

export function RestoreNetworkPrompt() {
  const { goTo, goBack } = useNavigation();

  return (
    <div className="space-y-4">
      <Panel className="border-danger/40 bg-danger/5">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Warning</SectionLabel>
          <StatusPill tone="danger">IRREVERSIBLE</StatusPill>
        </div>
        <p className="text-xl font-semibold text-ink mb-3">Restore network defaults?</p>
        <p className="text-sm text-ink-muted leading-relaxed">
          This clears WLAN credentials, static IP assignments, and saved SSIDs. The printer
          will disconnect from the floor network until reconfigured.
        </p>
      </Panel>

      <Panel>
        <SectionLabel>Will reset</SectionLabel>
        <ul className="space-y-2 font-metric text-sm text-ink-muted">
          <li>• WLAN security profile</li>
          <li>• Wireless IP / subnet / gateway</li>
          <li>• WPA username & password</li>
          <li>• Preferred SSID list</li>
        </ul>
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={goBack}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => goTo('restore-status')}>
          Restore now
        </Button>
      </div>
    </div>
  );
}
