export interface InventoryScan {
  id: number;
  sku: string;
  expected_qty: number;
  actual_qty: number;
  variance: number;
  timestamp: string;
}

export interface ShiftLog {
  id: number;
  register_id: string;
  cash_expected: number;
  cash_actual: number;
  variance: number;
  user_id: string;
  timestamp: string;
}

export interface AuditTrail {
  id: number;
  action_type: string;
  details: string;
  user_id: string;
  timestamp: string;
}

export interface InventorySummary {
  total_scans: number;
  critical_variances: number;
  minor_variances: number;
  exact_matches: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export type WorkflowTab = "inventory" | "shift" | "audit";
export type MobileScreen = "chat" | WorkflowTab;
export type VarianceLevel = "exact" | "minor" | "critical";

export function varianceLevel(variance: number): VarianceLevel {
  const abs = Math.abs(variance);
  if (abs === 0) return "exact";
  if (abs <= 5) return "minor";
  return "critical";
}
