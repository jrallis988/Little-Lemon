import type {
  ChatMessage,
  MobileScreen,
  PersonalBottle,
  PersonalEvent,
  ProductMode,
  WorkflowTab,
} from "../types";
import {
  greetingFor,
  butlerSessionContext,
} from "../thomas-persona";
import { isBrowserMode } from "../api";
import {
  appendPersonalEvent,
  clearHouseOperations,
  clearSignoffPin,
  formatTimestamp,
  getAudits,
  getChatMessages,
  getDisplayName,
  getPersonalBottles,
  getPersonalEvents,
  getProductMode,
  getProducts,
  getScans,
  getShifts,
  getSignoffPin,
  getUserArea,
  hasHouseActivity,
  loadSampleHouse as persistSampleHouse,
  nextRecordId,
  setChatMessages,
  setDisplayName as persistDisplayName,
  setPersonalBottles,
  setProductMode as persistProductMode,
  setProducts as persistProducts,
  setUserArea,
} from "../browser-storage";
import { retailContextForLlm } from "../retail-locator";
import {
  catalogNames,
  cloneDefaultCatalog,
  nextHouseSku,
  setLiveCatalog,
  type Product,
} from "../product-catalog";

export function getCurrentUser(): string {
  return appState.displayName?.trim() || "Staff";
}

/** @deprecated use getCurrentUser() */
export const currentUser = "Staff";

export const PERSONAL_MODE_ENABLED = true;

function initialChatMessages(mode: ProductMode): ChatMessage[] {
  if (isBrowserMode) {
    const stored = getChatMessages();
    if (stored.length > 0) return stored;
  }
  return [
    {
      role: "assistant" as const,
      content: greetingFor(mode, isBrowserMode ? getDisplayName() : null),
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
  displayName: isBrowserMode ? getDisplayName() : null,
  personalBottles: isBrowserMode ? getPersonalBottles() : ([] as PersonalBottle[]),
  personalEvents: isBrowserMode ? getPersonalEvents() : ([] as PersonalEvent[]),
  products: (isBrowserMode ? getProducts() : cloneDefaultCatalog()) as Product[],
  chatOpen: true,
  loading: false,
  error: null as string | null,
  pendingPrompt: null as string | null,
});

function isIdleGreeting(): boolean {
  const msgs = appState.chatMessages;
  return (
    msgs.length === 1 &&
    msgs[0]?.role === "assistant" &&
    msgs[0].content.startsWith("Good evening")
  );
}

function refreshIdleGreeting() {
  if (!isIdleGreeting()) return;
  const next = [
    {
      ...appState.chatMessages[0],
      content: greetingFor(appState.mode, appState.displayName),
    },
  ];
  appState.chatMessages = next;
  if (isBrowserMode) setChatMessages(next);
}

export function setMode(mode: ProductMode, options?: { keepScreen?: boolean }) {
  if (!PERSONAL_MODE_ENABLED && mode === "personal") return;
  appState.mode = mode;
  if (!options?.keepScreen) {
    appState.activeTab = "home";
    appState.mobileScreen = "home";
  }
  if (isBrowserMode) persistProductMode(mode);
  refreshIdleGreeting();
}

const businessScreens: WorkflowTab[] = [
  "home",
  "inventory",
  "shift",
  "audit",
  "order",
  "settings",
];

const personalScreens: WorkflowTab[] = [
  "home",
  "discover",
  "history",
  "settings",
];

export function hydrateFromStorage() {
  if (!isBrowserMode) return;
  appState.inventoryScans = getScans();
  appState.shiftLogs = getShifts();
  appState.auditTrails = getAudits();
  appState.userArea = getUserArea();
  appState.displayName = getDisplayName();
  appState.personalBottles = getPersonalBottles();
  appState.personalEvents = getPersonalEvents();
  appState.products = getProducts();
  setLiveCatalog(appState.products);
}

export function loadSampleHouse() {
  persistSampleHouse();
  hydrateFromStorage();
}

export function startEmptyHouse() {
  clearHouseOperations();
  hydrateFromStorage();
}

export function houseHasActivity(): boolean {
  return isBrowserMode ? hasHouseActivity() : appState.inventoryScans.length > 0;
}

export function signoffIsSet(): boolean {
  return isBrowserMode ? getSignoffPin() != null : false;
}

export function saveCatalog(products: Product[]) {
  appState.products = products.map((p) => ({ ...p }));
  setLiveCatalog(appState.products);
  if (isBrowserMode) persistProducts(appState.products);
}

export function addHouseProduct(input: {
  name: string;
  unit: string;
  par?: number;
}): Product | null {
  const name = input.name.trim();
  if (!name) return null;
  const sku = nextHouseSku(appState.products);
  const product: Product = {
    sku,
    name,
    unit: input.unit || "units",
    par: input.par && input.par > 0 ? input.par : undefined,
  };
  saveCatalog([...appState.products, product]);
  return product;
}

export function updateHouseProduct(sku: string, patch: Partial<Product>) {
  saveCatalog(
    appState.products.map((p) =>
      p.sku === sku ? { ...p, ...patch, sku: p.sku } : p,
    ),
  );
}

export function removeHouseProduct(sku: string) {
  saveCatalog(appState.products.filter((p) => p.sku !== sku));
}

export function restoreDefaultCatalog() {
  saveCatalog(cloneDefaultCatalog());
}

export function clearHouseSignoff() {
  clearSignoffPin();
}

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

export function saveDisplayName(name: string | null) {
  const trimmed = name?.trim() || null;
  appState.displayName = trimmed;
  if (isBrowserMode) persistDisplayName(trimmed);
  refreshIdleGreeting();
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

  const who = appState.displayName?.trim();
  if (who) {
    parts.push(
      `Address them as ${who} when it feels natural — that is their name.`,
    );
  }

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

    parts.push(`House lineup: ${catalogNames(appState.products)}.`);
  }

  parts.push(retailContextForLlm(appState.userArea));

  return parts.join(" ");
}
