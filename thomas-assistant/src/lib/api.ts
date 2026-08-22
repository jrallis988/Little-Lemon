import { invoke } from "@tauri-apps/api/core";
import type {
  AuditTrail,
  InventoryScan,
  InventorySummary,
  ShiftLog,
} from "./types";
import {
  demoAuditTrails,
  demoInventoryScans,
  demoShiftLogs,
} from "./demo-data";
import { matchDemoReply } from "./thomas-persona";

export const isCloudDemo =
  typeof window !== "undefined" && !("__TAURI_INTERNALS__" in window);

let mockScans = [...demoInventoryScans];
let mockShifts = [...demoShiftLogs];
let mockAudits = [...demoAuditTrails];
let mockId = 100;

function nextId() {
  return ++mockId;
}

export async function recordInventoryScan(
  sku: string,
  expectedQty: number,
  actualQty: number,
  userId: string,
): Promise<InventoryScan> {
  if (isCloudDemo) {
    const scan: InventoryScan = {
      id: nextId(),
      sku,
      expected_qty: expectedQty,
      actual_qty: actualQty,
      variance: actualQty - expectedQty,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
    };
    mockScans = [scan, ...mockScans];
    const abs = Math.abs(scan.variance);
    const severity = abs === 0 ? "exact" : abs <= 5 ? "minor" : "critical";
    mockAudits = [
      {
        id: nextId(),
        action_type: "inventory_scan",
        details: `SKU ${sku}: expected ${expectedQty}, actual ${actualQty}, variance ${scan.variance} (${severity})`,
        user_id: userId,
        timestamp: scan.timestamp,
      },
      ...mockAudits,
    ];
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
  if (isCloudDemo) return mockScans.slice(0, limit);
  return invoke("list_inventory_scans", { limit });
}

export async function recordShiftLog(
  registerId: string,
  cashExpected: number,
  cashActual: number,
  userId: string,
): Promise<ShiftLog> {
  if (isCloudDemo) {
    const log: ShiftLog = {
      id: nextId(),
      register_id: registerId,
      cash_expected: cashExpected,
      cash_actual: cashActual,
      variance: cashActual - cashExpected,
      user_id: userId,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC",
    };
    mockShifts = [log, ...mockShifts];
    mockAudits = [
      {
        id: nextId(),
        action_type: "shift_close",
        details: `Register ${registerId}: expected $${cashExpected.toFixed(2)}, actual $${cashActual.toFixed(2)}, variance $${log.variance.toFixed(2)}`,
        user_id: userId,
        timestamp: log.timestamp,
      },
      ...mockAudits,
    ];
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
  if (isCloudDemo) return mockShifts.slice(0, limit);
  return invoke("list_shift_logs", { limit });
}

export async function listAuditTrails(limit = 100): Promise<AuditTrail[]> {
  if (isCloudDemo) return mockAudits.slice(0, limit);
  return invoke("list_audit_trails", { limit });
}

export async function exportAuditTrails(
  format: "csv" | "json",
): Promise<string> {
  if (isCloudDemo) {
    const trails = mockAudits;
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
  if (isCloudDemo) {
    const critical = mockScans.filter((s) => Math.abs(s.variance) > 5).length;
    const minor = mockScans.filter(
      (s) => Math.abs(s.variance) >= 1 && Math.abs(s.variance) <= 5,
    ).length;
    const exact = mockScans.filter((s) => s.variance === 0).length;
    return {
      total_scans: mockScans.length,
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
): Promise<string> {
  if (isCloudDemo) {
    await new Promise((r) => setTimeout(r, 700));
    return matchDemoReply(message);
  }
  return invoke("chat_with_assistant", { message, context });
}
