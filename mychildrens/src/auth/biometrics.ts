import * as LocalAuthentication from "expo-local-authentication";

export async function deviceBiometricsAvailable(): Promise<boolean> {
  try {
    const hardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return hardware && enrolled;
  } catch {
    return false;
  }
}

export async function promptBiometricUnlock(): Promise<{ ok: boolean; message?: string }> {
  const available = await deviceBiometricsAvailable();
  if (!available) {
    return { ok: false, message: "Face ID and fingerprint unlock are available on the iOS and Android builds." };
  }
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock MyChildren's",
    cancelLabel: "Cancel",
    disableDeviceFallback: false,
  });
  if (result.success) return { ok: true };
  return { ok: false, message: "Authentication was not completed." };
}
