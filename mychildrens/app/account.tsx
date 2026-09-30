import { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { deviceBiometricsAvailable, promptBiometricUnlock } from "@/src/auth/biometrics";
import { hostOf } from "@/src/domain/format";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, PrototypeNote, Screen, StackHeader, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function AccountScreen() {
  const { state, dispatch } = useChart();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    deviceBiometricsAvailable().then(setAvailable).catch(() => setAvailable(false));
  }, []);

  const source = state.session.kind === "fhir"
    ? `Connected to ${hostOf(state.session.iss)}`
    : state.session.kind === "demo"
      ? "Sample family on this device"
      : "Signed out";

  async function enableBiometrics(next: boolean) {
    if (!next) {
      dispatch({ type: "set_biometric", enabled: false });
      setNote(null);
      return;
    }
    const result = await promptBiometricUnlock();
    if (!result.ok) {
      setNote(result.message ?? "Biometrics were not enabled.");
      return;
    }
    dispatch({ type: "set_biometric", enabled: true });
    setNote("This session can now be locked with Face ID or fingerprint.");
  }

  return (
    <Screen>
      <StackHeader title="Account" subtitle={state.chart?.guardian.name} />
      <Card>
        <T variant="label" color={theme.tealDark}>Data source</T>
        <T>{source}</T>
        <T variant="small">{state.chart?.guardian.relationship}{state.chart?.guardian.email ? ` · ${state.chart.guardian.email}` : ""}</T>
      </Card>
      {state.warnings.length > 0 ? (
        <Card>
          <T variant="label" style={{ fontSize: 16 }}>Sections that did not load</T>
          {state.warnings.map((warning) => <T key={warning} variant="small">{warning}</T>)}
        </Card>
      ) : null}
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>Notifications</T>
        <T variant="small">Saved for this session only. A production app would register these with the health system.</T>
        <Preference label="Messages" value={state.notifications.messages} onChange={(value) => dispatch({ type: "set_notification", key: "messages", value })} />
        <Preference label="Results" value={state.notifications.results} onChange={(value) => dispatch({ type: "set_notification", key: "results", value })} />
        <Preference label="Visits" value={state.notifications.visits} onChange={(value) => dispatch({ type: "set_notification", key: "visits", value })} />
      </Card>
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>Biometric lock</T>
        <T variant="small">
          {available
            ? "Uses the iOS or Android biometric prompt. The chart stays in this session until you sign out."
            : "Face ID and fingerprint unlock run on the installed iOS and Android app. This browser session cannot use them."}
        </T>
        <Preference label="Require biometrics" value={state.biometricEnabled} disabled={!available} onChange={(value) => void enableBiometrics(value)} />
        {state.biometricEnabled ? <Button label="Lock now" variant="secondary" onPress={() => dispatch({ type: "lock" })} /> : null}
        {note ? <T variant="small">{note}</T> : null}
      </Card>
      <Button label="Sign out" variant="danger" onPress={() => dispatch({ type: "sign_out" })} />
      <PrototypeNote />
    </Screen>
  );
}

function Preference({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <T>{label}</T>
      <Switch
        accessibilityLabel={label}
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        trackColor={{ true: theme.teal, false: theme.line }}
      />
    </View>
  );
}
