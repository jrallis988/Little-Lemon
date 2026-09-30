import type {
  Allergy,
  Bill,
  CareTeamMember,
  Child,
  Condition,
  FamilyChart,
  GrowthPoint,
  Interpretation,
  LabResult,
  Medication,
  Message,
  Sex,
  Vaccine,
  Visit,
  VisitStatus,
} from "../domain/types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textOf(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!isRecord(value)) return undefined;
  if (typeof value.text === "string" && value.text.trim()) return value.text.trim();
  const coding = Array.isArray(value.coding) ? value.coding : [];
  for (const entry of coding) {
    if (isRecord(entry) && typeof entry.display === "string" && entry.display.trim()) return entry.display.trim();
  }
  return undefined;
}

function codingCode(value: unknown): string | undefined {
  if (!isRecord(value) || !Array.isArray(value.coding)) return undefined;
  for (const entry of value.coding) {
    if (isRecord(entry) && typeof entry.code === "string" && entry.code) return entry.code;
  }
  return undefined;
}

export function interpretationFromFhir(code: string | undefined, text: string | undefined): Interpretation | undefined {
  const normalized = (code ?? "").toUpperCase();
  const label = (text ?? "").toLowerCase();
  if (normalized === "HH" || normalized === "LL" || normalized === "AA" || label.includes("critical")) return "critical";
  if (normalized === "H" || normalized === "HU" || label === "high") return "high";
  if (normalized === "L" || normalized === "LU" || label === "low") return "low";
  if (normalized === "A" || label.includes("abnormal")) return "abnormal";
  if (normalized === "N" || label === "normal") return "normal";
  return undefined;
}

function mapSex(gender: string | undefined): Sex {
  if (gender === "female" || gender === "male" || gender === "other" || gender === "unknown") return gender;
  return "unknown";
}

function initialsFrom(given: string, family: string, name: string): string {
  const letters = `${given.slice(0, 1)}${family.slice(0, 1)}`.toUpperCase();
  return letters || name.slice(0, 1).toUpperCase() || "P";
}

export function patientToChild(resource: unknown): Child | null {
  if (!isRecord(resource) || resource.resourceType !== "Patient" || typeof resource.id !== "string") return null;
  const name = Array.isArray(resource.name) ? resource.name.find(isRecord) : undefined;
  const given = name && Array.isArray(name.given) ? name.given.filter((part): part is string => typeof part === "string") : [];
  const family = name && typeof name.family === "string" ? name.family : "";
  const explicit = name && typeof name.text === "string" ? name.text.trim() : "";
  const full = explicit || [given.join(" "), family].filter(Boolean).join(" ").trim() || "Patient";
  return {
    id: resource.id,
    name: full,
    preferredName: given[0] || full.split(/\s+/)[0] || full,
    birthDate: typeof resource.birthDate === "string" ? resource.birthDate : "1970-01-01",
    sex: mapSex(typeof resource.gender === "string" ? resource.gender : undefined),
    mrn: mrnFrom(resource) ?? resource.id,
    initials: initialsFrom(given[0] ?? "", family, full),
    color: "#1F7A8C",
  };
}

function mrnFrom(resource: Record<string, unknown>): string | undefined {
  const identifiers = Array.isArray(resource.identifier) ? resource.identifier : [];
  for (const entry of identifiers) {
    if (!isRecord(entry) || typeof entry.value !== "string") continue;
    const label = textOf(entry.type)?.toLowerCase() ?? "";
    if (label.includes("mrn") || codingCode(entry.type) === "MR") return entry.value;
  }
  const first = identifiers.find(isRecord);
  return first && typeof first.value === "string" ? first.value : undefined;
}

function mapAppointmentStatus(status: string): VisitStatus | null {
  if (status === "entered-in-error") return null;
  if (status === "arrived" || status === "checked-in") return "arrived";
  if (status === "fulfilled") return "fulfilled";
  if (status === "cancelled" || status === "noshow") return "cancelled";
  return "booked";
}

export function appointmentToVisit(resource: unknown, patientId: string): Visit | null {
  if (!isRecord(resource) || resource.resourceType !== "Appointment") return null;
  if (typeof resource.id !== "string" || typeof resource.start !== "string") return null;
  const status = mapAppointmentStatus(typeof resource.status === "string" ? resource.status : "booked");
  if (!status) return null;
  const participants = Array.isArray(resource.participant) ? resource.participant.filter(isRecord) : [];
  const provider =
    participants
      .map((participant) => (isRecord(participant.actor) && typeof participant.actor.display === "string" ? participant.actor.display : ""))
      .find((name) => name && !name.toLowerCase().includes("patient")) || "Care team";
  const service = Array.isArray(resource.serviceType) ? textOf(resource.serviceType[0]) : undefined;
  const title = typeof resource.description === "string" && resource.description.trim() ? resource.description.trim() : service ?? "Visit";
  const location = participants
    .map((participant) => (isRecord(participant.actor) ? participant.actor : undefined))
    .find((actor) => actor && typeof actor.reference === "string" && actor.reference.startsWith("Location/") && typeof actor.display === "string");
  return {
    id: resource.id,
    patientId,
    status,
    kind: "specialty",
    title,
    reason: typeof resource.comment === "string" && resource.comment.trim() ? resource.comment.trim() : title,
    start: resource.start,
    end: typeof resource.end === "string" ? resource.end : resource.start,
    provider,
    specialty: service ?? "Care team",
    location: location && typeof location.display === "string" ? location.display : "Clinic",
    address: "",
    instructions: [],
  };
}

function observationValue(resource: Record<string, unknown>): { value: string; unit?: string; numeric?: number } | null {
  if (isRecord(resource.valueQuantity) && (typeof resource.valueQuantity.value === "number" || typeof resource.valueQuantity.value === "string")) {
    const numeric = typeof resource.valueQuantity.value === "number" ? resource.valueQuantity.value : Number(resource.valueQuantity.value);
    return {
      value: String(resource.valueQuantity.value),
      unit: typeof resource.valueQuantity.unit === "string" ? resource.valueQuantity.unit : undefined,
      numeric: Number.isNaN(numeric) ? undefined : numeric,
    };
  }
  if (typeof resource.valueString === "string" && resource.valueString.trim()) return { value: resource.valueString.trim() };
  const coded = textOf(resource.valueCodeableConcept);
  if (coded) return { value: coded };
  return null;
}

function isVital(resource: Record<string, unknown>): boolean {
  const categories = Array.isArray(resource.category) ? resource.category : [];
  return categories.some((category) => codingCode(category) === "vital-signs" || (textOf(category)?.toLowerCase().includes("vital") ?? false));
}

function rangeText(resource: Record<string, unknown>): string | undefined {
  const range = Array.isArray(resource.referenceRange) ? resource.referenceRange.find(isRecord) : undefined;
  if (!range) return undefined;
  if (typeof range.text === "string" && range.text.trim()) return range.text.trim();
  const low = isRecord(range.low) && typeof range.low.value === "number" ? String(range.low.value) : undefined;
  const high = isRecord(range.high) && typeof range.high.value === "number" ? String(range.high.value) : undefined;
  if (low && high) return `${low}–${high}`;
  if (high) return `≤ ${high}`;
  if (low) return `≥ ${low}`;
  return undefined;
}

function noteText(resource: Record<string, unknown>): string | undefined {
  const note = Array.isArray(resource.note) ? resource.note.find(isRecord) : undefined;
  return note && typeof note.text === "string" ? note.text : undefined;
}

function firstInterpretation(resource: Record<string, unknown>): Interpretation | undefined {
  const list = Array.isArray(resource.interpretation) ? resource.interpretation : [];
  const first = list.find(isRecord);
  if (!first) return undefined;
  return interpretationFromFhir(codingCode(first), textOf(first));
}

export function observationToLab(resource: unknown, patientId: string): LabResult | null {
  if (!isRecord(resource) || resource.resourceType !== "Observation") return null;
  if (resource.status === "cancelled" || resource.status === "entered-in-error") return null;
  if (isVital(resource)) return null;
  if (typeof resource.id !== "string") return null;
  const name = textOf(resource.code);
  const value = observationValue(resource);
  const collected = typeof resource.effectiveDateTime === "string" ? resource.effectiveDateTime : typeof resource.issued === "string" ? resource.issued : "";
  if (!name || !value || !collected) return null;
  return {
    id: resource.id,
    patientId,
    name,
    panel: Array.isArray(resource.category) ? textOf(resource.category[0]) : undefined,
    collectedAt: collected,
    reportedAt: typeof resource.issued === "string" ? resource.issued : collected,
    status: resource.status === "preliminary" ? "preliminary" : "final",
    value: value.value,
    unit: value.unit,
    referenceRange: rangeText(resource),
    interpretation: firstInterpretation(resource),
    note: noteText(resource),
  };
}

function toCentimeters(value: number, unit: string | undefined): number | undefined {
  const normalized = (unit ?? "cm").toLowerCase();
  if (normalized === "cm" || normalized === "centimeter" || normalized === "centimeters") return value;
  if (normalized === "m") return value * 100;
  if (normalized === "in" || normalized === "[in_i]" || normalized === "[in_us]" || normalized === "inch" || normalized === "inches") {
    return value * 2.54;
  }
  return undefined;
}

function toKilograms(value: number, unit: string | undefined): number | undefined {
  const normalized = (unit ?? "kg").toLowerCase();
  if (normalized === "kg" || normalized === "kilogram" || normalized === "kilograms") return value;
  if (normalized === "g" || normalized === "gram" || normalized === "grams") return value / 1000;
  if (normalized === "lb" || normalized === "lbs" || normalized === "[lb_av]") return value * 0.45359237;
  return undefined;
}

export function vitalsToGrowth(resources: readonly unknown[], patientId: string): GrowthPoint[] {
  const groups = new Map<string, GrowthPoint>();
  for (const resource of resources) {
    if (!isRecord(resource) || resource.resourceType !== "Observation") continue;
    if (typeof resource.effectiveDateTime !== "string") continue;
    const date = resource.effectiveDateTime.slice(0, 10);
    const code = codingCode(resource.code) ?? "";
    const label = textOf(resource.code)?.toLowerCase() ?? "";
    const measured = observationValue(resource);
    if (!measured?.numeric) continue;
    const point = groups.get(date) ?? { id: `${patientId}-${date}`, patientId, date };
    const percentile = label.includes("percentile");
    if (percentile && (label.includes("height") || label.includes("length") || code === "8302-2")) {
      point.heightPercentile = measured.numeric;
    } else if (percentile && label.includes("weight")) {
      point.weightPercentile = measured.numeric;
    } else if (label.includes("height") || label.includes("length") || code === "8302-2") {
      point.heightCm = toCentimeters(measured.numeric, measured.unit);
    } else if (label.includes("weight") || code === "29463-7") {
      point.weightKg = toKilograms(measured.numeric, measured.unit);
    } else {
      continue;
    }
    groups.set(date, point);
  }
  return [...groups.values()]
    .filter((point) => point.heightCm !== undefined || point.weightKg !== undefined)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function medicationToMed(resource: unknown, patientId: string): Medication | null {
  if (!isRecord(resource) || resource.resourceType !== "MedicationRequest" || typeof resource.id !== "string") return null;
  if (resource.status === "entered-in-error" || resource.status === "draft" || resource.status === "unknown") return null;
  const coded = textOf(resource.medicationCodeableConcept);
  const referenced = isRecord(resource.medicationReference) && typeof resource.medicationReference.display === "string"
    ? resource.medicationReference.display
    : undefined;
  const name = coded ?? referenced;
  if (!name) return null;
  const dosage = Array.isArray(resource.dosageInstruction) ? resource.dosageInstruction.find(isRecord) : undefined;
  const instructions = dosage && typeof dosage.text === "string" && dosage.text.trim() ? dosage.text.trim() : "See the label from the pharmacy.";
  const status = resource.status === "stopped" || resource.status === "cancelled"
    ? "stopped"
    : resource.status === "active" || resource.status === "on-hold"
      ? "active"
      : "completed";
  return {
    id: resource.id,
    patientId,
    name,
    status,
    prescriber: isRecord(resource.requester) && typeof resource.requester.display === "string" ? resource.requester.display : "Care team",
    startedOn: typeof resource.authoredOn === "string" ? resource.authoredOn : undefined,
    instructions,
  };
}

export function immunizationToVaccine(resource: unknown, patientId: string): Vaccine | null {
  if (!isRecord(resource) || resource.resourceType !== "Immunization" || typeof resource.id !== "string") return null;
  if (resource.status === "entered-in-error") return null;
  const name = textOf(resource.vaccineCode);
  if (!name) return null;
  const protocol = Array.isArray(resource.protocolApplied) ? resource.protocolApplied.find(isRecord) : undefined;
  const dose = protocol && (typeof protocol.doseNumberPositiveInt === "number" || typeof protocol.doseNumberString === "string")
    ? `Dose ${protocol.doseNumberPositiveInt ?? protocol.doseNumberString}`
    : undefined;
  return {
    id: resource.id,
    patientId,
    name,
    status: resource.status === "not-done" ? "due" : "completed",
    date: typeof resource.occurrenceDateTime === "string" ? resource.occurrenceDateTime : undefined,
    doseLabel: dose,
  };
}

export function allergyToAllergy(resource: unknown, patientId: string): Allergy | null {
  if (!isRecord(resource) || resource.resourceType !== "AllergyIntolerance" || typeof resource.id !== "string") return null;
  const substance = textOf(resource.code);
  if (!substance) return null;
  const clinical = `${codingCode(resource.clinicalStatus) ?? ""} ${textOf(resource.clinicalStatus) ?? ""}`.toLowerCase();
  const reaction = Array.isArray(resource.reaction) ? resource.reaction.find(isRecord) : undefined;
  const manifestation = reaction && Array.isArray(reaction.manifestation) ? textOf(reaction.manifestation[0]) : undefined;
  const severity = reaction && (reaction.severity === "mild" || reaction.severity === "moderate" || reaction.severity === "severe")
    ? reaction.severity
    : "mild";
  return {
    id: resource.id,
    patientId,
    substance,
    reaction: manifestation ?? "Reaction not specified",
    severity,
    status: clinical.includes("resolved") || clinical.includes("inactive") ? "resolved" : "active",
  };
}

export function conditionToCondition(resource: unknown, patientId: string): Condition | null {
  if (!isRecord(resource) || resource.resourceType !== "Condition" || typeof resource.id !== "string") return null;
  const name = textOf(resource.code);
  if (!name) return null;
  const clinical = `${codingCode(resource.clinicalStatus) ?? ""} ${textOf(resource.clinicalStatus) ?? ""}`.toLowerCase();
  return {
    id: resource.id,
    patientId,
    name,
    status: clinical.includes("resolved") || clinical.includes("inactive") || clinical.includes("remission") ? "resolved" : "active",
    onset: typeof resource.onsetDateTime === "string" ? resource.onsetDateTime : undefined,
  };
}

export function communicationToMessage(resource: unknown, patientId: string): Message | null {
  if (!isRecord(resource) || resource.resourceType !== "Communication" || typeof resource.id !== "string") return null;
  const payloads = Array.isArray(resource.payload) ? resource.payload : [];
  const body = payloads
    .map((payload) => (isRecord(payload) && typeof payload.contentString === "string" ? payload.contentString.trim() : ""))
    .filter(Boolean)
    .join("\n\n");
  const sentAt = typeof resource.sent === "string" ? resource.sent : typeof resource.received === "string" ? resource.received : "";
  if (!body || !sentAt) return null;
  const senderRef = isRecord(resource.sender) && typeof resource.sender.reference === "string" ? resource.sender.reference : "";
  const direction = senderRef.startsWith("Patient/") ? "out" : "in";
  const sender = isRecord(resource.sender) && typeof resource.sender.display === "string" ? resource.sender.display : "Care team";
  const subject = textOf(resource.topic) ?? "Message";
  return {
    id: resource.id,
    patientId,
    threadId: subject,
    subject,
    fromName: direction === "out" ? "You" : sender,
    fromRole: direction === "out" ? "Sent" : "Care team",
    sentAt,
    body,
    unread: direction === "in" && resource.status !== "completed",
    direction,
  };
}

export function careTeamToMembers(resource: unknown, patientId: string): CareTeamMember[] {
  if (!isRecord(resource) || resource.resourceType !== "CareTeam") return [];
  const participants = Array.isArray(resource.participant) ? resource.participant : [];
  const members: CareTeamMember[] = [];
  for (const participant of participants) {
    if (!isRecord(participant) || !isRecord(participant.member) || typeof participant.member.display !== "string") continue;
    const role = Array.isArray(participant.role) ? textOf(participant.role[0]) : textOf(participant.role);
    const reference = typeof participant.member.reference === "string" ? participant.member.reference : participant.member.display;
    members.push({
      id: `${typeof resource.id === "string" ? resource.id : "team"}-${reference}`,
      patientId,
      name: participant.member.display,
      role: role ?? "Care team",
      clinic: typeof resource.name === "string" ? resource.name : "Care team",
    });
  }
  return members;
}

export function invoiceToBill(resource: unknown, patientId: string): Bill | null {
  if (!isRecord(resource) || resource.resourceType !== "Invoice" || typeof resource.id !== "string") return null;
  if (resource.status === "entered-in-error" || resource.status === "draft") return null;
  const money = isRecord(resource.totalGross) ? resource.totalGross : isRecord(resource.totalNet) ? resource.totalNet : undefined;
  const dollars = money && typeof money.value === "number" ? money.value : 0;
  const status = resource.status === "balanced" ? "paid" : resource.status === "cancelled" ? "pending" : "due";
  return {
    id: resource.id,
    patientId,
    description: textOf(resource.type) ?? "Statement",
    serviceDate: typeof resource.date === "string" ? resource.date : "1970-01-01",
    amountCents: Math.round(dollars * 100),
    status,
  };
}

export function resourcesFrom(json: unknown): unknown[] {
  if (!isRecord(json)) return [];
  if (json.resourceType === "Bundle" && Array.isArray(json.entry)) {
    return json.entry.map((entry) => (isRecord(entry) ? entry.resource : undefined)).filter((resource) => resource !== undefined);
  }
  if (typeof json.resourceType === "string" && json.resourceType !== "OperationOutcome") return [json];
  return [];
}

export function outcomeMessage(json: unknown): string | null {
  if (!isRecord(json) || json.resourceType !== "OperationOutcome") return null;
  const issue = Array.isArray(json.issue) ? json.issue.find(isRecord) : undefined;
  if (!issue) return "The health system returned an error.";
  if (typeof issue.diagnostics === "string" && issue.diagnostics.trim()) return issue.diagnostics.trim();
  return textOf(issue.details) ?? "The health system returned an error.";
}

export function buildChart(input: {
  patient: unknown;
  appointments: unknown[];
  labs: unknown[];
  vitals: unknown[];
  medications: unknown[];
  immunizations: unknown[];
  allergies: unknown[];
  conditions: unknown[];
  communications: unknown[];
  careTeams: unknown[];
  invoices: unknown[];
  guardianName?: string;
}): FamilyChart | null {
  const child = patientToChild(input.patient);
  if (!child) return null;
  const patientId = child.id;
  return {
    guardian: {
      id: "connected-account",
      name: input.guardianName?.trim() || "Connected account",
      email: "",
      relationship: "Health system account",
    },
    children: [
      {
        child,
        visits: input.appointments.map((resource) => appointmentToVisit(resource, patientId)).filter((visit): visit is Visit => visit !== null),
        results: input.labs.map((resource) => observationToLab(resource, patientId)).filter((result): result is LabResult => result !== null),
        medications: input.medications.map((resource) => medicationToMed(resource, patientId)).filter((med): med is Medication => med !== null),
        vaccines: input.immunizations.map((resource) => immunizationToVaccine(resource, patientId)).filter((vaccine): vaccine is Vaccine => vaccine !== null),
        allergies: input.allergies.map((resource) => allergyToAllergy(resource, patientId)).filter((allergy): allergy is Allergy => allergy !== null),
        conditions: input.conditions.map((resource) => conditionToCondition(resource, patientId)).filter((condition): condition is Condition => condition !== null),
        growth: vitalsToGrowth(input.vitals, patientId),
        messages: input.communications.map((resource) => communicationToMessage(resource, patientId)).filter((message): message is Message => message !== null),
        bills: input.invoices.map((resource) => invoiceToBill(resource, patientId)).filter((bill): bill is Bill => bill !== null),
        careTeam: input.careTeams.flatMap((resource) => careTeamToMembers(resource, patientId)),
      },
    ],
  };
}
