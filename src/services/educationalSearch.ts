import type { EducationalSearchResult } from "@/types";
import { isTauriRuntime } from "@/services/browserBridge";

const DESKTOP_REQUIRED =
  "Educational search requires the Surf desktop app.";

export async function educationalSearch(
  query: string,
  limit = 10,
): Promise<EducationalSearchResult[]> {
  if (!isTauriRuntime()) {
    throw new Error(DESKTOP_REQUIRED);
  }

  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<EducationalSearchResult[]>("educational_search", {
    query,
    limit,
  });
}

export { DESKTOP_REQUIRED as educationalSearchDesktopRequiredMessage };
