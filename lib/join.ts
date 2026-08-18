import {
  acceptSubmission,
  isHoneypotTripped,
  validateSubmission,
  type FieldErrors,
} from "@/lib/submissions";

export type JoinPayload = {
  name: string;
  email: string;
};

export type JoinFieldErrors = Partial<Record<"name" | "email", string>>;

export function validateJoinPayload(input: unknown): {
  data?: JoinPayload;
  fieldErrors?: JoinFieldErrors;
} {
  const { data, fieldErrors } = validateSubmission({
    ...(input && typeof input === "object" ? input : {}),
    form: "join",
  });
  if (fieldErrors) return { fieldErrors: fieldErrors as JoinFieldErrors };
  if (!data) return { fieldErrors: {} };
  return { data: { name: data.name, email: data.email } };
}

export async function persistJoinSignup(data: JoinPayload): Promise<void> {
  await acceptSubmission({
    form: "join",
    name: data.name,
    email: data.email,
    createdAt: new Date().toISOString(),
  });
}

export async function notifyJoinSignup(data: JoinPayload): Promise<void> {
  // Notification is handled inside acceptSubmission / notifySubmission.
  void data;
}

export { isHoneypotTripped };
export type { FieldErrors };
