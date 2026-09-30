import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { configuredClientId, configuredIssuer, signInWithSmart, smartRedirectUri } from "@/src/auth/smart-login";
import { scopeDescriptions } from "@/src/fhir/oauth";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Mark, PrototypeNote, T, TextField } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function LoginScreen() {
  const { state, dispatch } = useChart();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(Boolean(configuredIssuer() || configuredClientId()));
  const [iss, setIss] = useState(configuredIssuer());
  const [clientId, setClientId] = useState(configuredClientId());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (state.session.kind !== "signed_out" && !state.locked) return <Redirect href="/(tabs)/home" />;

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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.paper }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingTop: insets.top + 28, paddingHorizontal: 24, paddingBottom: insets.bottom + 32, gap: 18 }}
    >
      <Mark />
      <View style={{ gap: 6 }}>
        <T variant="label" color={theme.tealDark}>Prototype</T>
        <T variant="display">MyChildren's</T>
        <T color={theme.muted}>
          Appointments, results, messages, and vaccines for the children you look after.
        </T>
      </View>
      <Button
        label="View the sample family"
        onPress={() => {
          dispatch({ type: "sign_in_demo" });
          router.replace("/(tabs)/home");
        }}
      />
      <Button label={open ? "Hospital connection" : "Connect a hospital account"} variant="secondary" onPress={() => setOpen((value) => !value)} />
      {open ? (
        <View style={{ gap: 12 }}>
          <TextField
            label="FHIR base URL"
            value={iss}
            onChangeText={setIss}
            autoCapitalize="none"
            placeholder="https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"
          />
          <TextField label="Client ID" value={clientId} onChangeText={setClientId} autoCapitalize="none" placeholder="Issued by the health system" />
          <T variant="small">Register this redirect URI with the health system: {smartRedirectUri()}</T>
          <T variant="small">
            Boston Children's production address and client ID come from the hospital's Epic app registration. This prototype does not include those credentials. The connection is read-only SMART on FHIR with PKCE.
          </T>
          <View style={{ gap: 4 }}>
            {scopeDescriptions().slice(3).map((scope) => (
              <T key={scope.scope} variant="small">• {scope.label}</T>
            ))}
          </View>
          {error ? <Banner text={error} /> : null}
          <Button label={busy ? "Contacting the health system…" : "Continue to sign in"} disabled={busy} onPress={() => void connect()} />
        </View>
      ) : null}
      <PrototypeNote />
    </ScrollView>
  );
}
