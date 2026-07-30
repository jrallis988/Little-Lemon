import type {
  AppointmentIntakePayload,
  ProfessionalIntakePayload,
} from "./types";

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function validateAppointment(
  body: Partial<AppointmentIntakePayload>,
): { ok: true; data: AppointmentIntakePayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (!body.conditionOrDepartment?.trim()) {
    errors.push("Condition or department is required.");
  }
  if (!body.insuranceCarrierId?.trim()) {
    errors.push("Insurance carrier is required.");
  }
  if (!body.telehealth && !body.locationSlug?.trim()) {
    errors.push("Location or telehealth preference is required.");
  }
  if (!body.patientName || body.patientName.trim().length < 2) {
    errors.push("Parent / caregiver name is required.");
  }
  if (!body.phone || digits(body.phone).length < 10) {
    errors.push("A valid phone number is required.");
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("A valid email address is required.");
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      channel: "appointment",
      conditionOrDepartment: body.conditionOrDepartment!.trim(),
      insuranceCarrierId: body.insuranceCarrierId!.trim(),
      insuranceCarrierName: body.insuranceCarrierName?.trim(),
      locationSlug: body.locationSlug?.trim() || "",
      telehealth: Boolean(body.telehealth),
      patientName: body.patientName!.trim(),
      phone: body.phone!.trim(),
      email: body.email!.trim().toLowerCase(),
      notes: body.notes?.trim() || "",
    },
  };
}

export function validateProfessional(
  channel: "referral" | "second-opinion",
  body: Partial<ProfessionalIntakePayload>,
): { ok: true; data: ProfessionalIntakePayload } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (!body.requesterName?.trim()) errors.push("Requester name is required.");
  if (!body.practiceOrRelationship?.trim()) {
    errors.push("Practice or relationship is required.");
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("A valid email is required.");
  }
  if (!body.phone || digits(body.phone).length < 10) {
    errors.push("A valid phone number is required.");
  }
  if (!body.patientName?.trim()) errors.push("Patient name is required.");
  if (!body.specialty?.trim()) errors.push("Specialty is required.");
  if (!body.summary || body.summary.trim().length < 20) {
    errors.push("Please provide a clinical summary (at least 20 characters).");
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    data: {
      channel,
      requesterName: body.requesterName!.trim(),
      practiceOrRelationship: body.practiceOrRelationship!.trim(),
      email: body.email!.trim().toLowerCase(),
      phone: body.phone!.trim(),
      patientName: body.patientName!.trim(),
      patientDob: body.patientDob?.trim(),
      specialty: body.specialty!.trim(),
      urgency: body.urgency?.trim(),
      summary: body.summary!.trim(),
      attachmentsNote: body.attachmentsNote?.trim(),
    },
  };
}
