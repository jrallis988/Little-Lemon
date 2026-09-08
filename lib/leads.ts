export type LeadType = "demo" | "pricing" | "contact";

export const planInterestOptions = [
  "Classroom",
  "School",
  "District",
  "Not sure yet",
] as const;

export type PlanInterest = (typeof planInterestOptions)[number];

export type LeadPayload = {
  type: LeadType;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  planInterest?: PlanInterest;
  message?: string;
  phone?: string;
};

export type LeadRecord = LeadPayload & {
  id: string;
  createdAt: string;
  source: "website";
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isPlanInterest(value: string): value is PlanInterest {
  return (planInterestOptions as readonly string[]).includes(value);
}

export function normalizePlanInterest(value?: string | null): PlanInterest {
  const trimmed = value?.trim() ?? "";
  return isPlanInterest(trimmed) ? trimmed : "Not sure yet";
}

export function validateLead(
  input: Partial<LeadPayload> & { website?: string },
): {
  ok: true;
  data: LeadPayload;
} | {
  ok: false;
  error: string;
} {
  // Honeypot: bots fill hidden "website" fields.
  if (input.website && input.website.trim().length > 0) {
    return { ok: false, error: "Unable to submit right now. Please try again." };
  }

  const type = input.type;
  if (type !== "demo" && type !== "pricing" && type !== "contact") {
    return { ok: false, error: "Choose a valid request type." };
  }

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const organization = input.organization?.trim() || undefined;
  const role = input.role?.trim() || undefined;
  const planRaw = input.planInterest?.trim();
  const planInterest = planRaw
    ? isPlanInterest(planRaw)
      ? planRaw
      : undefined
    : undefined;
  const message = input.message?.trim() || undefined;
  const phone = input.phone?.trim() || undefined;

  if (name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!emailPattern.test(email)) {
    return { ok: false, error: "Please enter a valid work email." };
  }

  if ((type === "demo" || type === "pricing") && !organization) {
    return { ok: false, error: "Please include your school or organization." };
  }

  if (planRaw && !planInterest) {
    return { ok: false, error: "Choose a valid plan interest." };
  }

  return {
    ok: true,
    data: {
      type,
      name,
      email,
      organization,
      role,
      planInterest,
      message,
      phone,
    },
  };
}

export function createLeadRecord(data: LeadPayload): LeadRecord {
  return {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "website",
  };
}
