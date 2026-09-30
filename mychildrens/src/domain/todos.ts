import { echeckinState, formatMoney, formatWhen } from "./format";
import { selectBalanceCents, splitVisits } from "./selectors";
import type { Bill, CheckinRecord, PatientChart } from "./types";

export interface Todo {
  id: string;
  title: string;
  detail: string;
  href: string;
  tone: "default" | "attention";
}

export function buildTodos(input: {
  patient: PatientChart;
  completedCheckins: Readonly<Record<string, CheckinRecord>>;
  bills: readonly Bill[];
  unreadCount: number;
  now?: Date;
}): Todo[] {
  const now = input.now ?? new Date();
  const todos: Todo[] = [];
  const next = splitVisits(input.patient.visits, now).upcoming[0];
  if (next && echeckinState(next, input.completedCheckins[next.id], now) === "open") {
    todos.push({
      id: `checkin-${next.id}`,
      title: `eCheck-In for ${input.patient.child.preferredName}`,
      detail: `${next.title} · ${formatWhen(next.start)}`,
      href: `/echeckin/${next.id}`,
      tone: "attention",
    });
  }
  const balance = selectBalanceCents(input.bills);
  if (balance > 0) {
    todos.push({
      id: "balance",
      title: `${formatMoney(balance)} balance`,
      detail: "Review the statement and record a demo payment.",
      href: "/billing",
      tone: "default",
    });
  }
  const vaccines = input.patient.vaccines.filter((vaccine) => vaccine.status !== "completed");
  if (vaccines.length > 0) {
    const overdue = vaccines.some((vaccine) => vaccine.status === "overdue");
    todos.push({
      id: "vaccines",
      title: overdue ? "A vaccine is overdue" : "A vaccine is due",
      detail: vaccines.map((vaccine) => vaccine.name).join(", "),
      href: "/vaccines",
      tone: overdue ? "attention" : "default",
    });
  }
  if (input.unreadCount > 0) {
    todos.push({
      id: "messages",
      title: input.unreadCount === 1 ? "1 unread message" : `${input.unreadCount} unread messages`,
      detail: "From the care team.",
      href: "/inbox",
      tone: "default",
    });
  }
  return todos;
}
