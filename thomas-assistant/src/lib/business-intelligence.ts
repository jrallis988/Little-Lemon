import type {
  BusinessSnapshot,
  InventoryScan,
  NoticeAction,
  OrderLine,
  ShiftLog,
  ThomasNotice,
} from "./types";
import {
  countGapLabel,
  productName,
  productUnit,
  tillLabel,
} from "./product-catalog";
import { varianceLevel } from "./types";

/** Latest scan per SKU (first occurrence wins — scans are newest-first). */
export function latestScansBySku(scans: InventoryScan[]): InventoryScan[] {
  const seen = new Set<string>();
  const latest: InventoryScan[] = [];
  for (const scan of scans) {
    const key = scan.sku.toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    latest.push(scan);
  }
  return latest;
}

export function buildHouseSnapshot(
  scans: InventoryScan[],
  shifts: ShiftLog[],
): BusinessSnapshot {
  const latest = latestScansBySku(scans);
  let exact = 0;
  let minor = 0;
  let attention = 0;
  let runningLow = 0;

  for (const scan of latest) {
    const level = varianceLevel(scan.variance);
    if (level === "exact") exact += 1;
    else if (level === "minor") minor += 1;
    else attention += 1;

    // Running low: counted ≤ 30% of expected, or absolute short ≥ 5
    if (
      scan.expected_qty > 0 &&
      (scan.actual_qty / scan.expected_qty <= 0.35 || scan.variance <= -5)
    ) {
      runningLow += 1;
    }
  }

  const today = new Date();
  const todayLabel = today.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const closedTonight = shifts.some((s) => s.timestamp.includes(todayLabel));

  const recentDiscrepancies = latest.filter((s) => s.variance !== 0).length;

  return {
    inventoryExact: exact,
    inventoryMinor: minor,
    inventoryAttention: attention,
    tonightClose: closedTonight ? "Closed" : "Not closed yet",
    recentDiscrepancies,
    runningLow,
  };
}

function notice(
  id: string,
  title: string,
  detail: string,
  severity: ThomasNotice["severity"],
  actions: NoticeAction[],
): ThomasNotice {
  return { id, title, detail, severity, actions };
}

/** Know → Notice → Act from live house data. */
export function buildNotices(
  scans: InventoryScan[],
  shifts: ShiftLog[],
): ThomasNotice[] {
  const notices: ThomasNotice[] = [];
  const latest = latestScansBySku(scans);

  const critical = latest.filter((s) => varianceLevel(s.variance) === "critical");
  const minor = latest.filter((s) => varianceLevel(s.variance) === "minor");
  const lowStock = latest.filter(
    (s) =>
      s.expected_qty > 0 &&
      (s.actual_qty / s.expected_qty <= 0.35 || s.variance <= -5),
  );

  if (critical.length > 0) {
    const names = critical.map((s) => productName(s.sku));
    const label =
      names.length === 1
        ? names[0]
        : names.length === 2
          ? `${names[0]} and ${names[1]}`
          : `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
    notices.push(
      notice(
        "discrepancies",
        `${critical.length} inventor${critical.length === 1 ? "y" : "ies"} need${critical.length === 1 ? "s" : ""} attention`,
        `${label} ${critical.length === 1 ? "is" : "are"} still flagged from today’s cellar checks.`,
        "urgent",
        [
          { label: "Review count", target: "inventory" },
          { label: "Check history", target: "audit" },
        ],
      ),
    );
  } else if (minor.length > 0) {
    const names = minor.map((s) => productName(s.sku)).join(", ");
    notices.push(
      notice(
        "minor-gaps",
        "A few counts are worth a second look",
        `${names} — small gaps, but better confirmed before service.`,
        "watch",
        [
          { label: "Review count", target: "inventory" },
          { label: "Ask Thomas", target: "chat" },
        ],
      ),
    );
  }

  for (const scan of lowStock) {
    const name = productName(scan.sku);
    const unit = productUnit(scan.sku);
    const pct = Math.round((scan.actual_qty / scan.expected_qty) * 100);
    notices.push(
      notice(
        `low-${scan.sku}`,
        `${name} may run short before the weekend`,
        `Counted ${scan.actual_qty} ${unit} against ${scan.expected_qty} expected (~${pct}% on hand). I’d prepare a restock.`,
        scan.variance <= -10 ? "urgent" : "watch",
        [
          { label: "Prepare order", target: "order" },
          { label: "Ask Thomas", target: "chat" },
        ],
      ),
    );
  }

  // Till shortfall pattern (same register, ≥2 shorts in recent shifts)
  const byRegister = new Map<string, ShiftLog[]>();
  for (const shift of shifts) {
    const list = byRegister.get(shift.register_id) ?? [];
    list.push(shift);
    byRegister.set(shift.register_id, list);
  }
  for (const [reg, logs] of byRegister) {
    const shorts = logs.filter((s) => s.variance < -1);
    if (shorts.length >= 2) {
      const avg =
        shorts.reduce((sum, s) => sum + s.variance, 0) / shorts.length;
      notices.push(
        notice(
          `till-${reg}`,
          `${tillLabel(reg)} has closed short ${shorts.length} times recently`,
          `Modest shortfalls (about $${Math.abs(avg).toFixed(2)} on average), but the pattern is worth a quiet look before tonight’s close.`,
          "watch",
          [
            { label: "Check history", target: "audit" },
            { label: "Ask Thomas", target: "chat" },
          ],
        ),
      );
    }
  }

  // Slow / quiet movers: expected high relative to tiny variance and high on-hand
  const quiet = latest.filter(
    (s) => s.variance === 0 && s.actual_qty >= 15 && s.expected_qty >= 15,
  );
  // Also treat Bright Pilsner-style: small short but historically full
  const stagnant = latest.filter(
    (s) => Math.abs(s.variance) <= 1 && s.actual_qty >= 15,
  );
  const stagnantNames = [...new Set([...quiet, ...stagnant].map((s) => productName(s.sku)))];
  if (stagnantNames.length >= 2 && scans.length > 3) {
    notices.push(
      notice(
        "stagnant",
        "Two products have been sitting quiet",
        `${stagnantNames.slice(0, 2).join(" and ")} aren’t moving much — consider a special or return.`,
        "info",
        [
          { label: "Check history", target: "audit" },
          { label: "Ask Thomas", target: "chat" },
        ],
      ),
    );
  }

  if (scans.length === 0 && shifts.length === 0) {
    notices.push(
      notice(
        "empty-house",
        "The house is quiet so far",
        "Run a cellar check or start tonight’s close — I’ll notice what needs you.",
        "info",
        [
          { label: "Review count", target: "inventory" },
          { label: "Ask Thomas", target: "chat" },
        ],
      ),
    );
  }

  return notices;
}

export function buildSuggestedActions(
  snapshot: BusinessSnapshot,
): { label: string; target: "inventory" | "shift" | "chat" | "order" }[] {
  const actions: { label: string; target: "inventory" | "shift" | "chat" | "order" }[] =
    [];

  if (snapshot.inventoryAttention > 0 || snapshot.inventoryMinor > 0) {
    actions.push({ label: "Review flagged counts", target: "inventory" });
  }
  if (snapshot.tonightClose !== "Closed") {
    actions.push({ label: "Start tonight’s close", target: "shift" });
  }
  if (snapshot.runningLow > 0) {
    actions.push({ label: "Prepare restock order", target: "order" });
  }
  actions.push({ label: "Ask Thomas about the house", target: "chat" });
  return actions.slice(0, 4);
}

/**
 * Restock recommendation: cover the shortfall + a small buffer for service.
 * Never auto-orders — staff must approve.
 */
export function buildRestockOrder(scans: InventoryScan[]): OrderLine[] {
  const latest = latestScansBySku(scans);
  const lines: OrderLine[] = [];

  for (const scan of latest) {
    const short = Math.max(0, -scan.variance);
    const lowRatio =
      scan.expected_qty > 0 && scan.actual_qty / scan.expected_qty <= 0.35;
    if (short === 0 && !lowRatio) continue;

    const buffer = Math.max(2, Math.ceil(scan.expected_qty * 0.15));
    const suggested = short > 0 ? short + buffer : buffer;
    const name = productName(scan.sku);
    const unit = productUnit(scan.sku);

    let reason: string;
    if (short >= 5) {
      reason = `Counted ${countGapLabel(scan.variance).toLowerCase()} versus expected. ${suggested} ${unit} restores the floor plus a small buffer for weekend service.`;
    } else if (lowRatio) {
      reason = `Only ${scan.actual_qty} of ${scan.expected_qty} ${unit} on hand. Bringing in ${suggested} keeps you from running dry mid-service.`;
    } else {
      reason = `Small short on ${name}. ${suggested} ${unit} covers the gap without overstocking.`;
    }

    lines.push({
      sku: scan.sku,
      name,
      unit,
      onHand: scan.actual_qty,
      expected: scan.expected_qty,
      suggestedQty: suggested,
      reason,
    });
  }

  return lines.sort((a, b) => b.suggestedQty - a.suggestedQty);
}

export function formatOrderExport(lines: { name: string; unit: string; qty: number; reason: string }[]): string {
  let csv = "product,unit,quantity,reason\n";
  for (const line of lines) {
    csv += `"${line.name}","${line.unit}",${line.qty},"${line.reason.replace(/"/g, '""')}"\n`;
  }
  return csv;
}
