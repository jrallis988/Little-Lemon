import type { Bill, ChartState, LabResult, Message, PatientChart, Vaccine, Visit } from "./types";

export function selectActivePatient(state: ChartState): PatientChart | null {
  if (!state.chart || !state.activeChildId) return null;
  return state.chart.children.find((child) => child.child.id === state.activeChildId) ?? null;
}

export function selectMessages(state: ChartState, patientId: string): Message[] {
  const patient = state.chart?.children.find((child) => child.child.id === patientId);
  if (!patient) return [];
  return [...patient.messages, ...state.localReplies.filter((message) => message.patientId === patientId)]
    .map((message) =>
      message.direction === "in" && state.readMessageIds.includes(message.id)
        ? { ...message, unread: false }
        : message,
    )
    .sort((a, b) => a.sentAt.localeCompare(b.sentAt));
}

export interface ThreadSummary {
  threadId: string;
  patientId: string;
  subject: string;
  preview: string;
  fromName: string;
  fromRole: string;
  sentAt: string;
  unreadCount: number;
}

export function selectThreads(state: ChartState, patientId: string): ThreadSummary[] {
  const grouped = new Map<string, Message[]>();
  for (const message of selectMessages(state, patientId)) {
    const list = grouped.get(message.threadId) ?? [];
    list.push(message);
    grouped.set(message.threadId, list);
  }
  const threads: ThreadSummary[] = [];
  for (const [threadId, list] of grouped) {
    const first = list[0];
    const last = list[list.length - 1];
    if (!first || !last) continue;
    threads.push({
      threadId,
      patientId,
      subject: first.subject,
      preview: last.body,
      fromName: last.direction === "out" ? "You" : last.fromName,
      fromRole: last.direction === "out" ? "Sent" : last.fromRole,
      sentAt: last.sentAt,
      unreadCount: list.filter((message) => message.unread).length,
    });
  }
  return threads.sort((a, b) => b.sentAt.localeCompare(a.sentAt));
}

export function selectUnreadCount(state: ChartState, patientId: string): number {
  return selectThreads(state, patientId).reduce((sum, thread) => sum + thread.unreadCount, 0);
}

export function selectBills(state: ChartState, patient: PatientChart): Bill[] {
  return patient.bills.map((bill) =>
    state.paidBillIds.includes(bill.id) ? { ...bill, status: "paid" } : bill,
  );
}

export function selectBalanceCents(bills: readonly Bill[]): number {
  return bills.filter((bill) => bill.status === "due").reduce((sum, bill) => sum + bill.amountCents, 0);
}

export function splitVisits(visits: readonly Visit[], now = new Date()): { upcoming: Visit[]; past: Visit[] } {
  const upcoming: Visit[] = [];
  const past: Visit[] = [];
  const current = now.getTime();
  for (const visit of visits) {
    const start = new Date(visit.start).getTime();
    if (visit.status === "cancelled" || visit.status === "fulfilled" || start < current) past.push(visit);
    else upcoming.push(visit);
  }
  upcoming.sort((a, b) => a.start.localeCompare(b.start));
  past.sort((a, b) => b.start.localeCompare(a.start));
  return { upcoming, past };
}

export function sortResults(results: readonly LabResult[]): LabResult[] {
  return [...results].sort((a, b) => b.collectedAt.localeCompare(a.collectedAt));
}

export function sortVaccines(vaccines: readonly Vaccine[]): Vaccine[] {
  const rank = { overdue: 0, due: 1, completed: 2 } as const;
  return [...vaccines].sort(
    (a, b) => rank[a.status] - rank[b.status] || (b.date ?? "").localeCompare(a.date ?? ""),
  );
}

export function findVisit(state: ChartState, visitId: string): { patient: PatientChart; visit: Visit } | null {
  for (const patient of state.chart?.children ?? []) {
    const visit = patient.visits.find((item) => item.id === visitId);
    if (visit) return { patient, visit };
  }
  return null;
}

export function findResult(state: ChartState, resultId: string): { patient: PatientChart; result: LabResult } | null {
  for (const patient of state.chart?.children ?? []) {
    const result = patient.results.find((item) => item.id === resultId);
    if (result) return { patient, result };
  }
  return null;
}
