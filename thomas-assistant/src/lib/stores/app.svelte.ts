import type {
  ChatMessage,
  MobileScreen,
  PersonalBottle,
  PersonalEvent,
  ProductMode,
  WorkflowTab,
} from "../types";
import {
  THOMAS_GREETING,
  PERSONAL_GREETING,
  butlerSessionContext,
  STAFF_FIRST_NAME,
} from "../thomas-persona";
import { isBrowserMode } from "../api";
import {
  appendPersonalEvent,
  ensureHouseSeed,
  formatTimestamp,
  getChatMessages,
  getPersonalBottles,
  getPersonalEvents,
  getProductMode,
  getScans,
  getShifts,
  getUserArea,
  nextRecordId,
  setChatMessages,
  setPersonalBottles,
  setProductMode as persistProductMode,
  setUserArea,
} from "../browser-storage";
import { retailContextForLlm } from "../retail-locator";

export const currentUser = STAFF_FIRST_NAME;

export const PERSONAL_MODE_ENABLED = true;

if (typeof window !== "undefined" && isBrowserMode) {
  ensureHouseSeed();
}

function greetingFor(mode: ProductMode): string {
  return mode === "personal" ? PERSONAL_GREETING : THOMAS_GREETING;
}

function initialChatMessages(mode: ProductMode): ChatMessage[] {
  if (isBrowserMode) {
    const stored = getChatMessages();
    if (stored.length > 0) return stored;
  }
  return [
    {
      role: "assistant" as const,
      content: greetingFor(mode),
      timestamp: new Date().toISOString(),
    },
  ];
}

const initialMode: ProductMode =
  (isBrowserMode ? getProductMode() : null) ?? "business";

export const appState = $state({
  mode: initialMode,
  activeTab: "home" as WorkflowTab,
  mobileScreen: "home" as MobileScreen,
  inventoryScans: isBrowserMode ? getScans() : ([] as import("../types").InventoryScan[]),
  shiftLogs: isBrowserMode ? getShifts() : ([] as import("../types").ShiftLog[]),
  auditTrails: [] as import("../types").AuditTrail[],
  summary: null as import("../types").InventorySummary | null,
  chatMessages: initialChatMessages(initialMode) as ChatMessage[],
  userArea: isBrowserMode ? getUserArea() : null,
  personalBottles: isBrowserMode ? getPersonalBottles() : ([] as PersonalBottle[]),
  personalEvents: isBrowserMode ? getPersonalEvents() : ([] as PersonalEvent[]),
  chatOpen: true,
  loading: false,
  error: null as string | null,
  pendingPrompt: null as string | null,
});

export function setMode(mode: ProductMode) {
  if (!PERSONAL_MODE_ENABLED && mode === "personal") return;
  appState.mode = mode;
  appState.activeTab = "home";
  appState.mobileScreen = "home";
  if (isBrowserMode) persistProductMode(mode);
}

const businessScreens: WorkflowTab[] = [
  "home",
  "inventory",
  "shift",
  "audit",
  "order",
];

const personalScreens: WorkflowTab[] = ["home", "discover", "history"];

export function setActiveTab(tab: WorkflowTab) {
  appState.activeTab = tab;
  const screens =
    appState.mode === "personal" ? personalScreens : businessScreens;
  if (screens.includes(tab)) {
    appState.mobileScreen = tab;
  }
}

export function setMobileScreen(screen: MobileScreen) {
  appState.mobileScreen = screen;
  const screens =
    appState.mode === "personal" ? personalScreens : businessScreens;
  if ((screens as string[]).includes(screen)) {
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
  if (role === "user" && appState.mode === "personal" && isBrowserMode) {
    const event = appendPersonalEvent({
      kind: "ask",
      title: content.length > 72 ? `${content.slice(0, 69)}…` : content,
      detail: "Asked Thomas",
      timestamp: formatTimestamp(),
    });
    appState.personalEvents = [event, ...appState.personalEvents];
  }
}

export function addPersonalBottle(
  bottle: Omit<PersonalBottle, "id" | "addedAt">,
): PersonalBottle {
  const full: PersonalBottle = {
    ...bottle,
    id: isBrowserMode ? nextRecordId() : Date.now(),
    addedAt: formatTimestamp(),
  };
  appState.personalBottles = [full, ...appState.personalBottles];
  if (isBrowserMode) {
    setPersonalBottles(appState.personalBottles);
    const event = appendPersonalEvent({
      kind: "bottle",
      title: `Added ${full.name}`,
      detail: kindLabel(full.kind),
      timestamp: full.addedAt,
    });
    appState.personalEvents = [event, ...appState.personalEvents];
  }
  return full;
}

export function removePersonalBottle(id: number) {
  appState.personalBottles = appState.personalBottles.filter((b) => b.id !== id);
  if (isBrowserMode) setPersonalBottles(appState.personalBottles);
}

export function kindLabel(kind: PersonalBottle["kind"]): string {
  if (kind === "bubbles") return "Sparkling";
  if (kind === "spirits") return "Spirits";
  if (kind === "beer") return "Beer";
  return "Wine";
}

export function toggleChat() {
  appState.chatOpen = !appState.chatOpen;
}

export function saveUserArea(area: string | null) {
  const trimmed = area?.trim() || null;
  appState.userArea = trimmed;
  if (isBrowserMode) setUserArea(trimmed);
}

export function askThomas(message: string) {
  appState.pendingPrompt = message;
  appState.chatOpen = true;
  appState.mobileScreen = "chat";
}

export function buildChatContext(): string {
  const parts: string[] = [];
  parts.push(
    appState.mode === "personal"
      ? "PRODUCT_MODE=personal"
      : "PRODUCT_MODE=business",
  );

  if (appState.mode === "personal") {
    if (appState.personalBottles.length === 0) {
      parts.push("Guest home bar is empty — they have not added bottles yet.");
    } else {
      const list = appState.personalBottles
        .slice(0, 12)
        .map((b) => `${b.name} (${kindLabel(b.kind)}${b.notes ? `: ${b.notes}` : ""})`)
        .join("; ");
      parts.push(`Guest home bar: ${list}.`);
    }
  } else {
    const summary = appState.summary;
    const latestScan = appState.inventoryScans[0];
    const latestShift = appState.shiftLogs[0];
    const latestAudit = appState.auditTrails[0];

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
  }

  parts.push(retailContextForLlm(appState.userArea));

  return parts.join(" ");
}
