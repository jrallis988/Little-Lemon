import type { ChatMessage, MobileScreen, ProductMode, WorkflowTab } from "../types";
import {
  THOMAS_GREETING,
  butlerSessionContext,
  STAFF_FIRST_NAME,
} from "../thomas-persona";
import { isBrowserMode } from "../api";
import { getChatMessages, setChatMessages } from "../browser-storage";

export const currentUser = STAFF_FIRST_NAME;

function initialChatMessages(): ChatMessage[] {
  if (isBrowserMode) {
    const stored = getChatMessages();
    if (stored.length > 0) return stored;
  }
  return [
    {
      role: "assistant" as const,
      content: THOMAS_GREETING,
      timestamp: new Date().toISOString(),
    },
  ];
}

export const appState = $state({
  mode: "business" as ProductMode,
  activeTab: "home" as WorkflowTab,
  mobileScreen: "home" as MobileScreen,
  inventoryScans: [] as import("../types").InventoryScan[],
  shiftLogs: [] as import("../types").ShiftLog[],
  auditTrails: [] as import("../types").AuditTrail[],
  summary: null as import("../types").InventorySummary | null,
  chatMessages: initialChatMessages() as ChatMessage[],
  chatOpen: true,
  loading: false,
  error: null as string | null,
});

export function setMode(mode: ProductMode) {
  appState.mode = mode;
  if (mode === "business") {
    appState.activeTab = "home";
    appState.mobileScreen = "home";
  }
}

export function setActiveTab(tab: WorkflowTab) {
  appState.activeTab = tab;
  if (tab === "home" || tab === "inventory" || tab === "shift" || tab === "audit") {
    appState.mobileScreen = tab;
  }
}

export function setMobileScreen(screen: MobileScreen) {
  appState.mobileScreen = screen;
  if (screen === "inventory" || screen === "shift" || screen === "audit" || screen === "home") {
    appState.activeTab = screen;
  }
}

export function addChatMessage(role: ChatMessage["role"], content: string) {
  const next = [
    ...appState.chatMessages,
    { role, content, timestamp: new Date().toISOString() },
  ];
  appState.chatMessages = next;
  if (isBrowserMode) {
    setChatMessages(next);
  }
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
    needsAttention: summary?.critical_variances,
    latestProduct: latestScan?.sku,
    latestCountGap: latestScan?.variance,
    latestTill: latestShift?.register_id,
    latestTillGap: latestShift?.variance,
  });
}
