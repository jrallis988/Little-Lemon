import { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { useRouter } from "expo-router";
import { deviceBiometricsAvailable, promptBiometricUnlock } from "@/src/auth/biometrics";
import { hostOf } from "@/src/domain/format";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, Screen, StackHeader, T, TextField } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function SettingsScreen() {
  const { state, dispatch } = useChart();
  const router = useRouter();
  const { t, language, setLanguage } = useI18n();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(state.profile?.name ?? "");
  const [email, setEmail] = useState(state.profile?.email ?? "");
  const [phone, setPhone] = useState(state.profile?.phone ?? "");
  const [address, setAddress] = useState(state.profile?.address ?? "");

  useEffect(() => {
    deviceBiometricsAvailable().then(setAvailable).catch(() => setAvailable(false));
  }, []);

  const source = state.session.kind === "fhir"
    ? hostOf(state.session.iss)
    : state.session.kind === "demo"
      ? "Sample family on this device"
      : "";

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
      <StackHeader title={t("settings")} subtitle={source} />
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>{t("notifications")}</T>
        <Preference label={t("messages")} value={state.notifications.messages} onChange={(value) => dispatch({ type: "set_notification", key: "messages", value })} />
        <Preference label={t("results")} value={state.notifications.results} onChange={(value) => dispatch({ type: "set_notification", key: "results", value })} />
        <Preference label={t("visits")} value={state.notifications.visits} onChange={(value) => dispatch({ type: "set_notification", key: "visits", value })} />
      </Card>
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>{t("security")}</T>
        <T variant="small">
          {available
            ? "Uses Face ID or fingerprint on the installed iOS or Android app."
            : "Face ID and fingerprint run on the installed phone app."}
        </T>
        <Preference label={t("signInBiometric")} value={state.biometricEnabled} disabled={!available} onChange={(value) => void enableBiometrics(value)} />
        {state.biometricEnabled ? <Button label="Lock now" variant="secondary" onPress={() => dispatch({ type: "lock" })} /> : null}
        {note ? <T variant="small">{note}</T> : null}
      </Card>
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>{t("demographics")}</T>
        <TextField label="Name" value={name} onChangeText={setName} />
        <TextField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextField label="Phone" value={phone} onChangeText={setPhone} />
        <TextField label="Address" value={address} onChangeText={setAddress} />
        <Button
          label={t("save")}
          onPress={() => {
            dispatch({ type: "update_profile", profile: { name, email, phone, address } });
            setSaved(true);
          }}
        />
        {saved ? <Banner tone="ok" text={t("saved")} /> : null}
      </Card>
      <Card>
        <T variant="label" style={{ fontSize: 16 }}>{t("language")}</T>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button label={t("english")} variant={language === "en" ? "primary" : "secondary"} onPress={() => setLanguage("en")} />
          <Button label={t("spanish")} variant={language === "es" ? "primary" : "secondary"} onPress={() => setLanguage("es")} />
        </View>
      </Card>
      {state.warnings.length > 0 ? (
        <Card>
          {state.warnings.map((warning) => <T key={warning} variant="small">{warning}</T>)}
        </Card>
      ) : null}
      <Button
        label={t("signOut")}
        variant="danger"
        onPress={() => {
          dispatch({ type: "sign_out" });
          router.replace("/welcome");
        }}
      />
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
      <T style={{ flex: 1 }}>{label}</T>
      <Switch accessibilityLabel={label} value={value} disabled={disabled} onValueChange={onChange} trackColor={{ true: theme.teal, false: theme.line }} />
    </View>
  );
}
