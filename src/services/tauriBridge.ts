/**
 * Thin Tauri IPC bridge with safe web fallbacks for Vite-only development.
 */

export async function isTauriRuntime(): Promise<boolean> {
  return Boolean(
    typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__TAURI_INTERNALS__,
  );
}

export async function invokeCommand<T>(
  command: string,
  args?: Record<string, unknown>,
): Promise<T | null> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke<T>(command, args);
  } catch {
    return null;
  }
}

export async function minimizeWindow(): Promise<void> {
  await invokeCommand("minimize_window");
}

export async function closeWindow(): Promise<void> {
  await invokeCommand("close_window");
}

export async function persistSecureValue(
  key: string,
  value: string,
): Promise<void> {
  await invokeCommand("secure_set", { key, value });
}

export async function readSecureValue(key: string): Promise<string | null> {
  return invokeCommand<string>("secure_get", { key });
}

export async function nativeCheckUrl(
  url: string,
  whitelist: string[],
): Promise<{ allowed: boolean; reason?: string } | null> {
  return invokeCommand("check_url", { url, whitelist });
}
