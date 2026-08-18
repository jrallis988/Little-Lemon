import { promises as fs } from "fs";
import path from "path";
import { candidate } from "@/lib/candidate";

export const FORM_KINDS = ["join", "contact", "volunteer", "town-request"] as const;
export type FormKind = (typeof FORM_KINDS)[number];

export type SubmissionRecord = {
  form: FormKind;
  name: string;
  email: string;
  message?: string;
  role?: string;
  phone?: string;
  town?: string;
  notes?: string;
  createdAt: string;
};

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "form-submissions.jsonl");
const JOIN_FILE = path.join(DATA_DIR, "join-signups.jsonl");

const FORM_LABELS: Record<FormKind, string> = {
  join: "Join Team Varga",
  contact: "Contact",
  volunteer: "Volunteer",
  "town-request": "Come to My Town",
};

export function isFormKind(value: unknown): value is FormKind {
  return typeof value === "string" && (FORM_KINDS as readonly string[]).includes(value);
}

export function isHoneypotTripped(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  return Boolean(String((input as Record<string, unknown>).company ?? "").trim());
}

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function validateEmail(email: string): string | undefined {
  if (!email) return "Enter a valid email address.";
  if (!EMAIL_RE.test(email) || email.length > 254) return "Enter a valid email address.";
  return undefined;
}

export function validateSubmission(input: unknown): {
  data?: SubmissionRecord;
  fieldErrors?: FieldErrors;
} {
  const body = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const form = body.form;
  if (!isFormKind(form)) {
    return { fieldErrors: { form: "Unknown form." } };
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const fieldErrors: FieldErrors = {};

  if (!name) fieldErrors.name = "Enter your name.";
  const emailError = validateEmail(email);
  if (emailError) fieldErrors.email = emailError;

  const record: SubmissionRecord = {
    form,
    name,
    email,
    createdAt: new Date().toISOString(),
  };

  if (form === "contact") {
    const message = clean(body.message, 4000);
    if (!message) fieldErrors.message = "Enter a message.";
    record.message = message;
  }

  if (form === "volunteer") {
    record.role = clean(body.role, 80);
    record.phone = clean(body.phone, 40);
  }

  if (form === "town-request") {
    const town = clean(body.town, 120);
    if (!town) fieldErrors.town = "Enter your town or city.";
    record.town = town;
    record.notes = clean(body.notes, 2000);
  }

  if (Object.keys(fieldErrors).length) return { fieldErrors };
  return { data: record };
}

export async function persistSubmission(record: SubmissionRecord): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = `${JSON.stringify(record)}\n`;
  await fs.appendFile(SUBMISSIONS_FILE, line, "utf8");
  if (record.form === "join") {
    await fs.appendFile(JOIN_FILE, line, "utf8");
  }
}

function notifyTargets() {
  return {
    webhook:
      process.env.FORM_WEBHOOK_URL?.trim() || process.env.JOIN_WEBHOOK_URL?.trim() || "",
    resendKey: process.env.RESEND_API_KEY?.trim() || "",
    to:
      process.env.FORM_NOTIFY_TO?.trim() ||
      process.env.JOIN_NOTIFY_TO?.trim() ||
      candidate.email,
    from: process.env.FORM_FROM_EMAIL?.trim() || process.env.JOIN_FROM_EMAIL?.trim() || "onboarding@resend.dev",
  };
}

function formatEmailBody(record: SubmissionRecord): string {
  const lines = [
    `New ${FORM_LABELS[record.form]} submission`,
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
  ];
  if (record.phone) lines.push(`Phone: ${record.phone}`);
  if (record.role) lines.push(`Role: ${record.role}`);
  if (record.town) lines.push(`Town: ${record.town}`);
  if (record.message) lines.push("", "Message:", record.message);
  if (record.notes) lines.push("", "Notes:", record.notes);
  lines.push("", `Received: ${record.createdAt}`);
  return lines.join("\n");
}

export async function notifySubmission(record: SubmissionRecord): Promise<boolean> {
  const { webhook, resendKey, to, from } = notifyTargets();
  const tasks: Promise<unknown>[] = [];

  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...record,
          brand: candidate.brandName,
          label: FORM_LABELS[record.form],
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Form webhook failed (${res.status})`);
      }),
    );
  }

  if (resendKey) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: record.email,
          subject: `${FORM_LABELS[record.form]} — ${record.name}`,
          text: formatEmailBody(record),
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`Resend failed (${res.status}): ${detail}`);
        }
      }),
    );
  }

  if (!tasks.length) return false;
  await Promise.all(tasks);
  return true;
}

/**
 * Persist locally when the filesystem is writable, and notify staff when
 * webhook/Resend env is set. Succeeds if either path works.
 */
export async function acceptSubmission(record: SubmissionRecord): Promise<void> {
  let persisted = false;
  try {
    await persistSubmission(record);
    persisted = true;
  } catch (err) {
    console.error("[submissions] persist failed", err);
  }

  let notified = false;
  try {
    notified = await notifySubmission(record);
  } catch (err) {
    console.error("[submissions] notify failed", err);
  }

  if (!persisted && !notified) {
    throw new Error("Could not save or notify this submission.");
  }
}
