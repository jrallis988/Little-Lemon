import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { promptBiometricUnlock } from "@/src/auth/biometrics";
import { configuredClientId, configuredIssuer, signInWithSmart, smartRedirectUri } from "@/src/auth/smart-login";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Mark, T, TextField } from "@/src/ui/primitives";
import { fonts, theme } from "@/src/ui/theme";

export default function LoginScreen() {
  const { state, dispatch } = useChart();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [open, setOpen] = useState(Boolean(configuredIssuer() || configuredClientId()));
  const [iss, setIss] = useState(configuredIssuer());
  const [clientId, setClientId] = useState(configuredClientId());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (state.session.kind !== "signed_out" && !state.locked) return <Redirect href="/(tabs)/home" />;

  function enterSample() {
    dispatch({ type: "sign_in_demo" });
    router.replace("/(tabs)/home");
  }

  async function connect() {
    setBusy(true);
    setError(null);
    try {
      const signedIn = await signInWithSmart({ iss, clientId });
      dispatch({
        type: "sign_in_fhir",
        chart: signedIn.chart,
        iss: signedIn.iss,
        patientId: signedIn.patientId,
        warnings: signedIn.warnings,
      });
      router.replace("/(tabs)/home");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function biometric() {
    setError(null);
    const result = await promptBiometricUnlock();
    if (!result.ok) {
      setError(result.message ?? "Biometrics were not completed.");
      return;
    }
    enterSample();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.paper }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingTop: insets.top + 28, paddingHorizontal: 24, paddingBottom: insets.bottom + 32, gap: 16 }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line }}>
        <Text style={{ fontFamily: fonts.semibold, fontSize: 18, color: theme.ink }}>‹</Text>
      </Pressable>
      <Mark />
      <View style={{ gap: 6 }}>
        <T variant="label" color={theme.tealDark}>{t("hospital")}</T>
        <T variant="display">{t("signInTitle")}</T>
      </View>
      <Button label={t("signInHospital")} onPress={() => setOpen(true)} />
      <Button label={t("signInBiometric")} variant="secondary" onPress={() => void biometric()} />
      <T variant="small">{t("biometricHint")}</T>
      {open ? (
        <View style={{ gap: 12 }}>
          <TextField label={t("fhirUrl")} value={iss} onChangeText={setIss} autoCapitalize="none" placeholder="https://example.org/fhir/R4" />
          <TextField label={t("clientId")} value={clientId} onChangeText={setClientId} autoCapitalize="none" placeholder="Issued for this hospital app" />
          {error ? <Banner text={error} /> : null}
          <T variant="small">Redirect URI: {smartRedirectUri()}</T>
          <T variant="small">OAuth 2.0 with PKCE. The hospital issues the FHIR base URL and client ID. This build does not include production credentials.</T>
          <Button label={busy ? t("connecting") : t("connect")} disabled={busy} onPress={() => void connect()} />
        </View>
      ) : error ? <Banner text={error} /> : null}
      <Pressable accessibilityRole="button" onPress={enterSample} style={{ minHeight: 44, justifyContent: "center" }}>
        <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: theme.tealDark }}>{t("sampleFamily")}</Text>
      </Pressable>
    </ScrollView>
  );
}
