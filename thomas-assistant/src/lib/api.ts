import { invoke } from "@tauri-apps/api/core";
import type {
  AuditTrail,
  InventoryScan,
  InventorySummary,
  ShiftLog,
} from "./types";
import {
  formatTimestamp,
  getAudits,
  getScans,
  getShifts,
  nextRecordId,
  setAudits,
  setScans,
  setShifts,
  appendAudit,
} from "./browser-storage";
import { matchBrowserReply } from "./thomas-persona";
import { countGapLabel, productName, tillGapLabel } from "./product-catalog";
import type { ChatMessage } from "./types";

export const isBrowserMode =
  typeof window !== "undefined" && !("__TAURI_INTERNALS__" in window);

/** @deprecated use isBrowserMode */
export const isCloudDemo = isBrowserMode;

export async function recordInventoryScan(
  sku: string,
  expectedQty: number,
  actualQty: number,
  userId: string,
): Promise<InventoryScan> {
  if (isBrowserMode) {
    const timestamp = formatTimestamp();
    const scan: InventoryScan = {
      id: nextRecordId(),
      sku,
      expected_qty: expectedQty,
      actual_qty: actualQty,
      variance: actualQty - expectedQty,
      timestamp,
    };
    const scans = [scan, ...getScans()];
    setScans(scans);
    const abs = Math.abs(scan.variance);
    const severity =
      abs === 0 ? "all set" : abs <= 5 ? "double-check" : "needs attention";
    const name = productName(sku);
    const audits = [
      {
        id: nextRecordId(),
        action_type: "cellar_check",
        details: `${name}: should have ${expectedQty}, counted ${actualQty} — ${countGapLabel(scan.variance)} (${severity})`,
        user_id: userId,
        timestamp,
      },
      ...getAudits(),
    ];
    setAudits(audits);
    return scan;
  }
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
  if (isBrowserMode) return getScans().slice(0, limit);
  return invoke("list_inventory_scans", { limit });
}

export async function recordShiftLog(
  registerId: string,
  cashExpected: number,
  cashActual: number,
  userId: string,
): Promise<ShiftLog> {
  if (isBrowserMode) {
    const timestamp = formatTimestamp();
    const log: ShiftLog = {
      id: nextRecordId(),
      register_id: registerId,
      cash_expected: cashExpected,
      cash_actual: cashActual,
      variance: cashActual - cashExpected,
      user_id: userId,
      timestamp,
    };
    const shifts = [log, ...getShifts()];
    setShifts(shifts);
    const audits = [
      {
        id: nextRecordId(),
        action_type: "close_night",
        details: `Till ${registerId.replace(/^REG-?/i, "")}: expected $${cashExpected.toFixed(2)}, counted $${cashActual.toFixed(2)} — ${tillGapLabel(log.variance)}`,
        user_id: userId,
        timestamp,
      },
      ...getAudits(),
    ];
    setAudits(audits);
    return log;
  }
  return invoke("record_shift_log", {
    registerId,
    cashExpected,
    cashActual,
    userId,
  });
}

export async function listShiftLogs(limit = 50): Promise<ShiftLog[]> {
  if (isBrowserMode) return getShifts().slice(0, limit);
  return invoke("list_shift_logs", { limit });
}

export async function listAuditTrails(limit = 100): Promise<AuditTrail[]> {
  if (isBrowserMode) return getAudits().slice(0, limit);
  return invoke("list_audit_trails", { limit });
}

export async function exportAuditTrails(
  format: "csv" | "json",
): Promise<string> {
  if (isBrowserMode) {
    const trails = getAudits();
    if (format === "json") return JSON.stringify(trails, null, 2);
    let csv = "id,action_type,details,user_id,timestamp\n";
    for (const t of trails) {
      csv += `${t.id},"${t.action_type}","${t.details.replace(/"/g, '""')}","${t.user_id}","${t.timestamp}"\n`;
    }
    return csv;
  }
  return invoke("export_audit_trails", { format });
}

export async function getInventorySummary(): Promise<InventorySummary> {
  if (isBrowserMode) {
    const scans = getScans();
    const critical = scans.filter((s) => Math.abs(s.variance) > 5).length;
    const minor = scans.filter(
      (s) => Math.abs(s.variance) >= 1 && Math.abs(s.variance) <= 5,
    ).length;
    const exact = scans.filter((s) => s.variance === 0).length;
    return {
      total_scans: scans.length,
      critical_variances: critical,
      minor_variances: minor,
      exact_matches: exact,
    };
  }
  return invoke("get_inventory_summary");
}

export async function chatWithAssistant(
  message: string,
  context: string,
  history: ChatMessage[] = [],
): Promise<string> {
  if (isBrowserMode) {
    await new Promise((r) => setTimeout(r, 120));
    return matchBrowserReply(message, context, history);
  }
  return invoke("chat_with_assistant", { message, context });
}

/** Log an approved restock (never auto-sends to a vendor). */
export async function recordRestockApproval(
  summary: string,
  userId: string,
): Promise<AuditTrail> {
  if (isBrowserMode) {
    return appendAudit({
      action_type: "restock_order",
      details: `Restock approved (pending proprietor): ${summary}`,
      user_id: userId,
      timestamp: formatTimestamp(),
    });
  }
  return invoke("record_restock_approval", { summary, userId });
}
