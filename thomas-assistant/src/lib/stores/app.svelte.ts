import type { ChatMessage, MobileScreen, ProductMode, WorkflowTab } from "../types";
import {
  THOMAS_GREETING,
  butlerSessionContext,
  STAFF_FIRST_NAME,
} from "../thomas-persona";
import { isBrowserMode } from "../api";
import {
  ensureHouseSeed,
  getChatMessages,
  getScans,
  getShifts,
  getUserArea,
  setChatMessages,
  setUserArea,
} from "../browser-storage";
import { retailContextForLlm } from "../retail-locator";

export const currentUser = STAFF_FIRST_NAME;

/** Personal mode parked — Business-only for this phase. */
export const PERSONAL_MODE_ENABLED = false;

if (typeof window !== "undefined" && isBrowserMode) {
  ensureHouseSeed();
}

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
  inventoryScans: isBrowserMode ? getScans() : ([] as import("../types").InventoryScan[]),
  shiftLogs: isBrowserMode ? getShifts() : ([] as import("../types").ShiftLog[]),
  auditTrails: [] as import("../types").AuditTrail[],
  summary: null as import("../types").InventorySummary | null,
  chatMessages: initialChatMessages() as ChatMessage[],
  userArea: isBrowserMode ? getUserArea() : null,
  chatOpen: true,
  loading: false,
  error: null as string | null,
});

export function setMode(mode: ProductMode) {
  if (!PERSONAL_MODE_ENABLED && mode === "personal") return;
  appState.mode = mode;
  if (mode === "business") {
    appState.activeTab = "home";
    appState.mobileScreen = "home";
  }
}

const workflowScreens: WorkflowTab[] = [
  "home",
  "inventory",
  "shift",
  "audit",
  "order",
];

export function setActiveTab(tab: WorkflowTab) {
  appState.activeTab = tab;
  if (workflowScreens.includes(tab)) {
    appState.mobileScreen = tab;
  }
}

export function setMobileScreen(screen: MobileScreen) {
  appState.mobileScreen = screen;
  if ((workflowScreens as string[]).includes(screen)) {
    appState.activeTab = screen as WorkflowTab;
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

export function saveUserArea(area: string | null) {
  const trimmed = area?.trim() || null;
  appState.userArea = trimmed;
  if (isBrowserMode) setUserArea(trimmed);
}

export function buildChatContext(): string {
  const summary = appState.summary;
  const latestScan = appState.inventoryScans[0];
  const latestShift = appState.shiftLogs[0];
  const latestAudit = appState.auditTrails[0];

  const parts: string[] = [];

  const house = butlerSessionContext({
    totalScans: summary?.total_scans,
    needsAttention: summary?.critical_variances,
    latestProduct: latestScan?.sku,
    latestCountGap: latestScan?.variance,
    latestTill: latestShift?.register_id,
    latestTillGap: latestShift?.variance,
  });
  if (house) parts.push(house);

  if (latestAudit) {
    parts.push(`Latest in The Record: ${latestAudit.details}`);
  }

  parts.push(retailContextForLlm(appState.userArea));

  return parts.join(" ");
}
