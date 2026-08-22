import type { ChatMessage, WorkflowTab } from "../types";
import { THOMAS_GREETING, butlerSessionContext } from "../thomas-persona";

export const currentUser = "operator-1";

export const appState = $state({
  activeTab: "inventory" as WorkflowTab,
  inventoryScans: [] as import("../types").InventoryScan[],
  shiftLogs: [] as import("../types").ShiftLog[],
  auditTrails: [] as import("../types").AuditTrail[],
  summary: null as import("../types").InventorySummary | null,
  chatMessages: [
    {
      role: "assistant" as const,
      content: THOMAS_GREETING,
      timestamp: new Date().toISOString(),
    },
  ] as ChatMessage[],
  chatOpen: true,
  loading: false,
  error: null as string | null,
});

export function setActiveTab(tab: WorkflowTab) {
  appState.activeTab = tab;
}

export function addChatMessage(role: ChatMessage["role"], content: string) {
  appState.chatMessages = [
    ...appState.chatMessages,
    { role, content, timestamp: new Date().toISOString() },
  ];
}

export function toggleChat() {
  appState.chatOpen = !appState.chatOpen;
}

export function buildChatContext(): string {
  const summary = appState.summary;
  const latestScan = appState.inventoryScans[0];
  const latestShift = appState.shiftLogs[0];

  return butlerSessionContext({
    totalScans: summary?.total_scans,
    critical: summary?.critical_variances,
    minor: summary?.minor_variances,
    latestItem: latestScan?.sku,
    latestCountGap: latestScan?.variance,
    latestRegister: latestShift?.register_id,
    latestTillGap: latestShift?.variance,
  });
}
