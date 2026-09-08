import type { AuditTrail, InventoryScan, ShiftLog } from "./types";
import { PRODUCT_CATALOG } from "./product-catalog";
import { countGapLabel, productName, tillGapLabel } from "./product-catalog";

/** Believable house state for demo / validation night. */
export const SEED_VERSION = 1;

function daysAgo(n: number, hour = 21, minute = 15): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Latest cellar picture — one row per SKU (most recent count). */
export function buildSeedScans(): InventoryScan[] {
  const rows: Omit<InventoryScan, "id">[] = [
    {
      sku: "SKU-8842", // House Porter — moving fast / running low
      expected_qty: 8,
      actual_qty: 2,
      variance: -6,
      timestamp: daysAgo(0, 16, 40),
    },
    {
      sku: "SKU-3310", // Session IPA — discrepancy
      expected_qty: 24,
      actual_qty: 18,
      variance: -6,
      timestamp: daysAgo(0, 16, 42),
    },
    {
      sku: "SKU-2201", // Bright Pilsner — discrepancy, slow mover
      expected_qty: 18,
      actual_qty: 17,
      variance: -1,
      timestamp: daysAgo(0, 16, 45),
    },
    {
      sku: "SKU-5500", // Cabernet — may run low
      expected_qty: 36,
      actual_qty: 11,
      variance: -25,
      timestamp: daysAgo(0, 16, 48),
    },
    {
      sku: "SKU-1104", // Golden Lager — exact
      expected_qty: 20,
      actual_qty: 20,
      variance: 0,
      timestamp: daysAgo(0, 16, 50),
    },
    // Older exact checks so snapshot isn’t all red
    {
      sku: "SKU-8842",
      expected_qty: 10,
      actual_qty: 10,
      variance: 0,
      timestamp: daysAgo(2, 15, 10),
    },
    {
      sku: "SKU-1104",
      expected_qty: 22,
      actual_qty: 21,
      variance: -1,
      timestamp: daysAgo(3, 14, 20),
    },
  ];

  return rows.map((row, i) => ({ ...row, id: i + 1 }));
}

/** REG-01 short three times this week — pattern notice. */
export function buildSeedShifts(): ShiftLog[] {
  const rows: Omit<ShiftLog, "id">[] = [
    {
      register_id: "REG-01",
      cash_expected: 500,
      cash_actual: 487.5,
      variance: -12.5,
      user_id: "James",
      timestamp: daysAgo(1, 23, 5),
    },
    {
      register_id: "REG-01",
      cash_expected: 500,
      cash_actual: 492,
      variance: -8,
      user_id: "James",
      timestamp: daysAgo(3, 22, 50),
    },
    {
      register_id: "REG-01",
      cash_expected: 480,
      cash_actual: 471.25,
      variance: -8.75,
      user_id: "James",
      timestamp: daysAgo(5, 23, 10),
    },
    {
      register_id: "REG-02",
      cash_expected: 350,
      cash_actual: 350,
      variance: 0,
      user_id: "James",
      timestamp: daysAgo(2, 22, 40),
    },
  ];
  return rows.map((row, i) => ({ ...row, id: 100 + i + 1 }));
}

export function buildSeedAudits(
  scans: InventoryScan[],
  shifts: ShiftLog[],
): AuditTrail[] {
  const audits: AuditTrail[] = [];
  let id = 200;

  for (const scan of scans) {
    const abs = Math.abs(scan.variance);
    const severity =
      abs === 0 ? "all set" : abs <= 5 ? "double-check" : "needs attention";
    audits.push({
      id: ++id,
      action_type: "cellar_check",
      details: `${productName(scan.sku)}: should have ${scan.expected_qty}, counted ${scan.actual_qty} — ${countGapLabel(scan.variance)} (${severity})`,
      user_id: "James",
      timestamp: scan.timestamp,
    });
  }

  for (const shift of shifts) {
    audits.push({
      id: ++id,
      action_type: "close_night",
      details: `Till ${shift.register_id.replace(/^REG-?/i, "")}: expected $${shift.cash_expected.toFixed(2)}, counted $${shift.cash_actual.toFixed(2)} — ${tillGapLabel(shift.variance)}`,
      user_id: shift.user_id,
      timestamp: shift.timestamp,
    });
  }

  return audits.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
}

export function maxSeedId(
  scans: InventoryScan[],
  shifts: ShiftLog[],
  audits: AuditTrail[],
): number {
  return Math.max(
    0,
    ...scans.map((s) => s.id),
    ...shifts.map((s) => s.id),
    ...audits.map((a) => a.id),
  );
}

export function catalogHint(): string {
  return PRODUCT_CATALOG.map((p) => p.name).join(", ");
}
