import type { AuditTrail, InventoryScan, ShiftLog } from "./types";
import type { ChatMessage } from "./types";

const STORAGE_KEY = "thomas-house-data";

interface HouseData {
  scans: InventoryScan[];
  shifts: ShiftLog[];
  audits: AuditTrail[];
  nextId: number;
  signoffPin: string | null;
  chatMessages: ChatMessage[];
}

const empty: HouseData = {
  scans: [],
  shifts: [],
  audits: [],
  nextId: 0,
  signoffPin: null,
  chatMessages: [],
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
