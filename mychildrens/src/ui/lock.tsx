import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { promptBiometricUnlock } from "../auth/biometrics";
import { useChart } from "../state/chart-context";
import { Button, Mark, T } from "./primitives";
import { theme } from "./theme";

export function LockScreen() {
  const { dispatch } = useChart();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);

  async function unlock() {
    const result = await promptBiometricUnlock();
    if (result.ok) {
      dispatch({ type: "unlock" });
      return;
    }
    setMessage(result.message ?? "Authentication was not completed.");
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.paper, paddingTop: insets.top + 48, paddingHorizontal: 24, paddingBottom: insets.bottom + 24, gap: 18 }}>
      <Mark />
      <T variant="display">Chart locked</T>
      <T color={theme.muted}>Use Face ID, Touch ID, or the device fingerprint sensor to continue.</T>
      {message ? <T color={theme.danger}>{message}</T> : null}
      <Button label="Unlock" onPress={() => void unlock()} />
      <Button label="Sign out" variant="ghost" onPress={() => dispatch({ type: "sign_out" })} />
    </View>
  );
}
