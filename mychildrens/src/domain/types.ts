export type Sex = "female" | "male" | "other" | "unknown";

export type VisitStatus = "booked" | "arrived" | "fulfilled" | "cancelled";

export type VisitKind = "well-visit" | "follow-up" | "sick" | "telehealth" | "specialty";

export type Interpretation = "normal" | "low" | "high" | "critical" | "abnormal";

export interface Guardian {
  id: string;
  name: string;
  email: string;
  relationship: string;
}

export interface Child {
  id: string;
  name: string;
  preferredName: string;
  birthDate: string;
  sex: Sex;
  mrn: string;
  initials: string;
  color: string;
}

export interface Visit {
  id: string;
  patientId: string;
  status: VisitStatus;
  kind: VisitKind;
  title: string;
  reason: string;
  start: string;
  end: string;
  provider: string;
  specialty: string;
  location: string;
  address: string;
  instructions: string[];
  summary?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  name: string;
  panel?: string;
  kind?: "lab" | "imaging";
  collectedAt: string;
  reportedAt: string;
  status: "final" | "preliminary";
  value: string;
  unit?: string;
  referenceRange?: string;
  interpretation?: Interpretation;
  note?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  status: "active" | "completed" | "stopped";
  prescriber: string;
  pharmacy?: string;
  startedOn?: string;
  instructions: string;
}

export interface Vaccine {
  id: string;
  patientId: string;
  name: string;
  status: "completed" | "due" | "overdue";
  date?: string;
  doseLabel?: string;
}

export interface Allergy {
  id: string;
  patientId: string;
  substance: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  status: "active" | "resolved";
}

export interface Condition {
  id: string;
  patientId: string;
  name: string;
  status: "active" | "resolved";
  onset?: string;
}

export interface GrowthPoint {
  id: string;
  patientId: string;
  date: string;
  heightCm?: number;
  heightPercentile?: number;
  weightKg?: number;
  weightPercentile?: number;
}

export interface Message {
  id: string;
  patientId: string;
  threadId: string;
  subject: string;
  fromName: string;
  fromRole: string;
  sentAt: string;
  body: string;
  unread: boolean;
  direction: "in" | "out";
}

export interface Bill {
  id: string;
  patientId: string;
  statementNumber: string;
  description: string;
  serviceDate: string;
  amountCents: number;
  status: "due" | "paid" | "pending";
}

export interface CareTeamMember {
  id: string;
  patientId: string;
  name: string;
  role: string;
  clinic: string;
}

export interface PatientChart {
  child: Child;
  visits: Visit[];
  results: LabResult[];
  medications: Medication[];
  vaccines: Vaccine[];
  allergies: Allergy[];
  conditions: Condition[];
  growth: GrowthPoint[];
  messages: Message[];
  bills: Bill[];
  careTeam: CareTeamMember[];
}

export interface FamilyChart {
  guardian: Guardian;
  children: PatientChart[];
}

export interface CheckinRecord {
  visitId: string;
  fever: "yes" | "no";
  pharmacy: string;
  completedAt: string;
}

export interface VisitRequest {
  id: string;
  patientId: string;
  reason: string;
  preferred: string;
  notes: string;
  createdAt: string;
}

export interface NotificationPrefs {
  messages: boolean;
  results: boolean;
  visits: boolean;
}

export type Language = "en" | "es";

export type PaymentPlan = "full" | "monthly";

export interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface RefillRequest {
  id: string;
  patientId: string;
  medicationId: string;
  medicationName: string;
  pharmacy: string;
  createdAt: string;
}

export type Session =
  | { kind: "signed_out" }
  | { kind: "demo" }
  | { kind: "fhir"; iss: string; patientId: string };

export interface ChartState {
  session: Session;
  chart: FamilyChart | null;
  activeChildId: string | null;
  completedCheckins: Record<string, CheckinRecord>;
  localReplies: Message[];
  readMessageIds: string[];
  paidBillIds: string[];
  requests: VisitRequest[];
  refills: RefillRequest[];
  notifications: NotificationPrefs;
  biometricEnabled: boolean;
  locked: boolean;
  warnings: string[];
  language: Language;
  paperless: boolean;
  paymentPlan: PaymentPlan;
  profile: Profile | null;
}
