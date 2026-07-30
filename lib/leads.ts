export type LeadType = "demo" | "pricing" | "contact";

export type LeadPayload = {
  type: LeadType;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  planInterest?: string;
  message?: string;
  phone?: string;
};

export type LeadRecord = LeadPayload & {
  id: string;
  createdAt: string;
  source: "website";
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: Partial<LeadPayload>): {
  ok: true;
  data: LeadPayload;
} | {
  ok: false;
  error: string;
} {
  const type = input.type;
  if (type !== "demo" && type !== "pricing" && type !== "contact") {
    return { ok: false, error: "Choose a valid request type." };
  }

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const organization = input.organization?.trim() || undefined;
  const role = input.role?.trim() || undefined;
  const planInterest = input.planInterest?.trim() || undefined;
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
