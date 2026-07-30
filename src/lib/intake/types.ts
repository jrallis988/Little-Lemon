export type IntakeChannel =
  | "appointment"
  | "referral"
  | "second-opinion";

export type AppointmentIntakePayload = {
  channel: "appointment";
  conditionOrDepartment: string;
  insuranceCarrierId: string;
  insuranceCarrierName?: string;
  locationSlug: string;
  telehealth: boolean;
  patientName: string;
  phone: string;
  email: string;
  notes?: string;
};

export type ProfessionalIntakePayload = {
  channel: "referral" | "second-opinion";
  requesterName: string;
  practiceOrRelationship: string;
  email: string;
  phone: string;
  patientName: string;
  patientDob?: string;
  specialty: string;
  urgency?: string;
  summary: string;
  attachmentsNote?: string;
};

export type IntakePayload =
  | AppointmentIntakePayload
  | ProfessionalIntakePayload;

export type IntakeRecord = {
  id: string;
  referenceId: string;
  channel: IntakeChannel;
  createdAt: string;
  payload: IntakePayload;
  delivery: {
    stored: boolean;
    emailed: boolean;
    webhook: boolean;
    errors: string[];
  };
};
