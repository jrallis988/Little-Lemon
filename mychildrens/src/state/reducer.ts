import { DEMO_FAMILY } from "../domain/demo";
import { selectMessages } from "../domain/selectors";
import type { ChartState, CheckinRecord, FamilyChart, VisitRequest } from "../domain/types";

export const initialState: ChartState = {
  session: { kind: "signed_out" },
  chart: null,
  activeChildId: null,
  completedCheckins: {},
  localReplies: [],
  readMessageIds: [],
  paidBillIds: [],
  requests: [],
  notifications: { messages: true, results: true, visits: true },
  biometricEnabled: false,
  locked: false,
  warnings: [],
};

export type Action =
  | { type: "sign_in_demo" }
  | { type: "sign_in_fhir"; chart: FamilyChart; iss: string; patientId: string; warnings: string[] }
  | { type: "sign_out" }
  | { type: "select_child"; id: string }
  | { type: "complete_checkin"; record: CheckinRecord }
  | { type: "send_reply"; patientId: string; threadId: string; subject: string; body: string; now: string }
  | { type: "mark_thread_read"; patientId: string; threadId: string }
  | { type: "pay_bill"; billId: string }
  | { type: "request_visit"; request: VisitRequest }
  | { type: "set_notification"; key: keyof ChartState["notifications"]; value: boolean }
  | { type: "set_biometric"; enabled: boolean }
  | { type: "lock" }
  | { type: "unlock" };

function signedIn(state: ChartState): boolean {
  return state.session.kind !== "signed_out" && state.chart !== null;
}

export function reduceChart(state: ChartState, action: Action): ChartState {
  switch (action.type) {
    case "sign_in_demo":
      return {
        ...initialState,
        session: { kind: "demo" },
        chart: DEMO_FAMILY,
        activeChildId: DEMO_FAMILY.children[0]?.child.id ?? null,
      };
    case "sign_in_fhir":
      return {
        ...initialState,
        session: { kind: "fhir", iss: action.iss, patientId: action.patientId },
        chart: action.chart,
        activeChildId: action.chart.children[0]?.child.id ?? null,
        warnings: action.warnings,
      };
    case "sign_out":
      return initialState;
    case "select_child": {
      if (!signedIn(state)) return state;
      const exists = state.chart?.children.some((child) => child.child.id === action.id);
      if (!exists) return state;
      return { ...state, activeChildId: action.id };
    }
    case "complete_checkin": {
      if (!signedIn(state)) return state;
      const known = state.chart?.children.some((child) =>
        child.visits.some((visit) => visit.id === action.record.visitId),
      );
      if (!known) return state;
      return {
        ...state,
        completedCheckins: { ...state.completedCheckins, [action.record.visitId]: action.record },
      };
    }
    case "send_reply": {
      if (!signedIn(state)) return state;
      const body = action.body.trim();
      if (!body) return state;
      const known = state.chart?.children.some((child) => child.child.id === action.patientId);
      if (!known) return state;
      return {
        ...state,
        localReplies: [
          ...state.localReplies,
          {
            id: `local-${action.now}`,
            patientId: action.patientId,
            threadId: action.threadId,
            subject: action.subject,
            fromName: state.chart?.guardian.name ?? "You",
            fromRole: "Parent",
            sentAt: action.now,
            body,
            unread: false,
            direction: "out",
          },
        ],
      };
    }
    case "mark_thread_read": {
      if (!signedIn(state)) return state;
      const ids = selectMessages(state, action.patientId)
        .filter((message) => message.threadId === action.threadId && message.direction === "in")
        .map((message) => message.id);
      const readMessageIds = Array.from(new Set([...state.readMessageIds, ...ids]));
      if (readMessageIds.length === state.readMessageIds.length) return state;
      return { ...state, readMessageIds };
    }
    case "pay_bill": {
      if (!signedIn(state) || state.paidBillIds.includes(action.billId)) return state;
      const known = state.chart?.children.some((child) => child.bills.some((bill) => bill.id === action.billId));
      if (!known) return state;
      return { ...state, paidBillIds: [...state.paidBillIds, action.billId] };
    }
    case "request_visit": {
      if (!signedIn(state)) return state;
      const known = state.chart?.children.some((child) => child.child.id === action.request.patientId);
      if (!known || !action.request.reason.trim()) return state;
      return { ...state, requests: [action.request, ...state.requests] };
    }
    case "set_notification":
      if (!signedIn(state)) return state;
      return { ...state, notifications: { ...state.notifications, [action.key]: action.value } };
    case "set_biometric":
      if (!signedIn(state)) return state;
      return { ...state, biometricEnabled: action.enabled, locked: action.enabled ? state.locked : false };
    case "lock":
      if (!signedIn(state) || !state.biometricEnabled) return state;
      return { ...state, locked: true };
    case "unlock":
      return { ...state, locked: false };
    default:
      return state;
  }
}
