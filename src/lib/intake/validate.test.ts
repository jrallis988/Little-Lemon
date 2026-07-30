import { describe, expect, it } from "vitest";
import { validateAppointment, validateProfessional } from "./validate";

describe("intake validation", () => {
  it("accepts a complete appointment payload", () => {
    const result = validateAppointment({
      conditionOrDepartment: "Neurology",
      insuranceCarrierId: "bcbs-ma",
      locationSlug: "longwood",
      telehealth: false,
      patientName: "Alex Parent",
      phone: "(617) 555-0100",
      email: "alex@example.com",
      notes: "Follow-up",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects invalid appointment email/phone", () => {
    const result = validateAppointment({
      conditionOrDepartment: "Neurology",
      insuranceCarrierId: "bcbs-ma",
      locationSlug: "longwood",
      telehealth: false,
      patientName: "Alex",
      phone: "123",
      email: "not-an-email",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it("requires a clinical summary for referrals", () => {
    const result = validateProfessional("referral", {
      requesterName: "Dr. Lee",
      practiceOrRelationship: "Community Pediatrics",
      email: "lee@example.com",
      phone: "6175550199",
      patientName: "Sam",
      specialty: "Neurology",
      summary: "too short",
    });
    expect(result.ok).toBe(false);
  });
});
