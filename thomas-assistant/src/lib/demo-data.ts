import type {
  AuditTrail,
  InventoryScan,
  InventorySummary,
  ShiftLog,
} from "./types";
import { productName } from "./product-catalog";

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
    action_type: "cellar_check",
    details: `${productName("SKU-8842")}: should have 48, counted 38 — 10 short (needs attention)`,
    user_id: "James",
    timestamp: `${now()} UTC`,
  },
  {
    id: 2,
    action_type: "cellar_check",
    details: `${productName("SKU-3310")}: should have 24, counted 22 — 2 short (double-check)`,
    user_id: "James",
    timestamp: `${now()} UTC`,
  },
  {
    id: 1,
    action_type: "close_night",
    details: "Till 01: expected $500.00, counted $497.50 — $2.50 short",
    user_id: "James",
    timestamp: `${now()} UTC`,
  },
];

export const demoSummary: InventorySummary = {
  total_scans: 3,
  critical_variances: 1,
  minor_variances: 1,
  exact_matches: 1,
};
