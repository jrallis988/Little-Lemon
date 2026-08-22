import type {
  AuditTrail,
  InventoryScan,
  InventorySummary,
  ShiftLog,
} from "./types";

const now = () => new Date().toISOString().replace("T", " ").slice(0, 19);

export const demoInventoryScans: InventoryScan[] = [
  {
    id: 3,
    sku: "SKU-8842",
    expected_qty: 48,
    actual_qty: 38,
    variance: -10,
    timestamp: `${now()} UTC`,
  },
  {
    id: 2,
    sku: "SKU-3310",
    expected_qty: 24,
    actual_qty: 22,
    variance: -2,
    timestamp: `${now()} UTC`,
  },
  {
    id: 1,
    sku: "SKU-1104",
    expected_qty: 120,
    actual_qty: 120,
    variance: 0,
    timestamp: `${now()} UTC`,
  },
];

export const demoShiftLogs: ShiftLog[] = [
  {
    id: 1,
    register_id: "REG-01",
    cash_expected: 500,
    cash_actual: 497.5,
    variance: -2.5,
    user_id: "operator-1",
    timestamp: `${now()} UTC`,
  },
];

export const demoAuditTrails: AuditTrail[] = [
  {
    id: 3,
    action_type: "inventory_scan",
    details:
      "SKU SKU-8842: expected 48, actual 38, variance -10 (critical)",
    user_id: "operator-1",
    timestamp: `${now()} UTC`,
  },
  {
    id: 2,
    action_type: "inventory_scan",
    details: "SKU SKU-3310: expected 24, actual 22, variance -2 (minor)",
    user_id: "operator-1",
    timestamp: `${now()} UTC`,
  },
  {
    id: 1,
    action_type: "shift_close",
    details:
      "Register REG-01: expected $500.00, actual $497.50, variance $-2.50",
    user_id: "operator-1",
    timestamp: `${now()} UTC`,
  },
];

export const demoSummary: InventorySummary = {
  total_scans: 3,
  critical_variances: 1,
  minor_variances: 1,
  exact_matches: 1,
};
