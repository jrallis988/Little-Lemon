import type { ChatMessage, WorkflowTab } from "../types";

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
      content:
        "Thomas online. I'm your local retail copilot — scan inventory, close shifts, and I'll flag discrepancies in real time.",
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
  const parts: string[] = [];
  if (appState.summary) {
    parts.push(
      `Inventory: ${appState.summary.total_scans} scans, ${appState.summary.critical_variances} critical, ${appState.summary.minor_variances} minor.`,
    );
  }
  if (appState.inventoryScans.length > 0) {
    const latest = appState.inventoryScans[0];
    parts.push(
      `Latest scan: SKU ${latest.sku}, variance ${latest.variance}.`,
    );
  }
  if (appState.shiftLogs.length > 0) {
    const latest = appState.shiftLogs[0];
    parts.push(
      `Latest shift: register ${latest.register_id}, cash variance $${latest.variance.toFixed(2)}.`,
    );
  }
  return parts.join(" ");
}
