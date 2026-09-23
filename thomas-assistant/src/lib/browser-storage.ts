import type {
  AuditTrail,
  ChatMessage,
  InventoryScan,
  PersonalBottle,
  PersonalEvent,
  ProductMode,
  ShiftLog,
} from "./types";
import type { Product } from "./product-catalog";
import { cloneDefaultCatalog, setLiveCatalog } from "./product-catalog";
import {
  SEED_VERSION,
  buildSeedAudits,
  buildSeedScans,
  buildSeedShifts,
  maxSeedId,
} from "./house-seed";

const STORAGE_KEY = "thomas-house-data";

interface HouseData {
  scans: InventoryScan[];
  shifts: ShiftLog[];
  audits: AuditTrail[];
  nextId: number;
  signoffPin: string | null;
  chatMessages: ChatMessage[];
  seedVersion: number | null;
  userArea: string | null;
  productMode: ProductMode | null;
  personalBottles: PersonalBottle[];
  personalEvents: PersonalEvent[];
  products: Product[] | null;
}

const empty: HouseData = {
  scans: [],
  shifts: [],
  audits: [],
  nextId: 0,
  signoffPin: null,
  chatMessages: [],
  seedVersion: null,
  userArea: null,
  productMode: null,
  personalBottles: [],
  personalEvents: [],
  products: null,
};

function read(): HouseData {
  if (typeof window === "undefined") return { ...empty };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw) as Partial<HouseData>;
    return {
      scans: parsed.scans ?? [],
      shifts: parsed.shifts ?? [],
      audits: parsed.audits ?? [],
      nextId: parsed.nextId ?? 0,
      signoffPin: parsed.signoffPin ?? null,
      chatMessages: parsed.chatMessages ?? [],
      seedVersion: parsed.seedVersion ?? null,
      userArea: parsed.userArea ?? null,
      productMode: parsed.productMode ?? null,
      personalBottles: parsed.personalBottles ?? [],
      personalEvents: parsed.personalEvents ?? [],
      products: parsed.products ?? null,
    };
  } catch {
    return { ...empty };
  }
}

function write(data: HouseData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let cache = read();

/**
 * First visit stays empty. Sample nights are loaded only from Settings
 * (or “Load a sample night” on Home) — never automatically.
 */
export function ensureHouseSeed(): boolean {
  return false;
}

export function hasHouseActivity(): boolean {
  return (
    cache.scans.length > 0 ||
    cache.shifts.length > 0 ||
    cache.audits.length > 0
  );
}

/** Load the demo cellar/close night. Keeps area, PIN, mode, and Personal bar. */
export function loadSampleHouse(): void {
  const products = cloneDefaultCatalog();
  setLiveCatalog(products);
  const scans = buildSeedScans();
  const shifts = buildSeedShifts();
  const audits = buildSeedAudits(scans, shifts);
  cache = {
    scans,
    shifts,
    audits,
    nextId: Math.max(cache.nextId, maxSeedId(scans, shifts, audits)),
    signoffPin: cache.signoffPin,
    chatMessages: cache.chatMessages,
    seedVersion: SEED_VERSION,
    userArea: cache.userArea,
    productMode: cache.productMode,
    personalBottles: cache.personalBottles,
    personalEvents: cache.personalEvents,
    products,
  };
  write(cache);
}

/** @deprecated use loadSampleHouse */
export const resetHouseToSeed = loadSampleHouse;

/** Empty operational data; keep Personal bar, area, PIN, and mode. */
export function clearHouseOperations(): void {
  cache = {
    ...cache,
    scans: [],
    shifts: [],
    audits: [],
    seedVersion: 0,
  };
  write(cache);
}

export function clearSignoffPin(): void {
  cache.signoffPin = null;
  write(cache);
}

export function formatTimestamp(date = new Date()): string {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getSignoffPin(): string | null {
  return cache.signoffPin;
}

export function setSignoffPin(pin: string) {
  cache.signoffPin = pin;
  write(cache);
}

export function getChatMessages(): ChatMessage[] {
  return cache.chatMessages;
}

export function setChatMessages(messages: ChatMessage[]) {
  cache.chatMessages = messages;
  write(cache);
}

export function nextRecordId(): number {
  cache.nextId += 1;
  write(cache);
  return cache.nextId;
}

export function getScans(): InventoryScan[] {
  return cache.scans;
}

export function setScans(scans: InventoryScan[]) {
  cache.scans = scans;
  write(cache);
}

export function getShifts(): ShiftLog[] {
  return cache.shifts;
}

export function setShifts(shifts: ShiftLog[]) {
  cache.shifts = shifts;
  write(cache);
}

export function getAudits(): AuditTrail[] {
  return cache.audits;
}

export function setAudits(audits: AuditTrail[]) {
  cache.audits = audits;
  write(cache);
}

export function appendAudit(trail: Omit<AuditTrail, "id"> & { id?: number }): AuditTrail {
  const full: AuditTrail = {
    id: trail.id ?? nextRecordId(),
    action_type: trail.action_type,
    details: trail.details,
    user_id: trail.user_id,
    timestamp: trail.timestamp,
  };
  cache.audits = [full, ...cache.audits];
  write(cache);
  return full;
}

export function getUserArea(): string | null {
  return cache.userArea;
}

export function setUserArea(area: string | null) {
  cache.userArea = area?.trim() || null;
  write(cache);
}

export function getProductMode(): ProductMode | null {
  return cache.productMode;
}

export function setProductMode(mode: ProductMode) {
  cache.productMode = mode;
  write(cache);
}

export function getPersonalBottles(): PersonalBottle[] {
  return cache.personalBottles;
}

export function setPersonalBottles(bottles: PersonalBottle[]) {
  cache.personalBottles = bottles;
  write(cache);
}

export function getPersonalEvents(): PersonalEvent[] {
  return cache.personalEvents;
}

export function setPersonalEvents(events: PersonalEvent[]) {
  cache.personalEvents = events;
  write(cache);
}

export function appendPersonalEvent(
  event: Omit<PersonalEvent, "id"> & { id?: number },
): PersonalEvent {
  const full: PersonalEvent = {
    id: event.id ?? nextRecordId(),
    kind: event.kind,
    title: event.title,
    detail: event.detail,
    timestamp: event.timestamp,
  };
  cache.personalEvents = [full, ...cache.personalEvents];
  write(cache);
  return full;
}

export function getProducts(): Product[] {
  if (cache.products == null) return cloneDefaultCatalog();
  return cache.products;
}

export function setProducts(products: Product[]) {
  cache.products = products.map((p) => ({ ...p }));
  write(cache);
  setLiveCatalog(cache.products);
}

setLiveCatalog(getProducts());
