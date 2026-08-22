import { invoke } from "@tauri-apps/api/core";
import type {
  AuditTrail,
  InventoryScan,
  InventorySummary,
  ShiftLog,
} from "./types";

export async function recordInventoryScan(
  sku: string,
  expectedQty: number,
  actualQty: number,
  userId: string,
): Promise<InventoryScan> {
  return invoke("record_inventory_scan", {
    sku,
    expectedQty,
    actualQty,
    userId,
  });
}

export async function listInventoryScans(
  limit = 50,
): Promise<InventoryScan[]> {
  return invoke("list_inventory_scans", { limit });
}

export async function recordShiftLog(
  registerId: string,
  cashExpected: number,
  cashActual: number,
  userId: string,
): Promise<ShiftLog> {
  return invoke("record_shift_log", {
    registerId,
    cashExpected,
    cashActual,
    userId,
  });
}

export async function listShiftLogs(limit = 50): Promise<ShiftLog[]> {
  return invoke("list_shift_logs", { limit });
}

export async function listAuditTrails(limit = 100): Promise<AuditTrail[]> {
  return invoke("list_audit_trails", { limit });
}

export async function exportAuditTrails(
  format: "csv" | "json",
): Promise<string> {
  return invoke("export_audit_trails", { format });
}

export async function getInventorySummary(): Promise<InventorySummary> {
  return invoke("get_inventory_summary");
}

export async function chatWithAssistant(
  message: string,
  context: string,
): Promise<string> {
  return invoke("chat_with_assistant", { message, context });
}
