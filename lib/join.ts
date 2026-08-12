import { promises as fs } from "fs";
import path from "path";
import { candidate } from "@/lib/candidate";

export type JoinPayload = {
  name: string;
  email: string;
};

export type JoinFieldErrors = Partial<Record<"name" | "email", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_DIR = path.join(process.cwd(), "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "join-signups.jsonl");

export function validateJoinPayload(input: unknown): {
  data?: JoinPayload;
  fieldErrors?: JoinFieldErrors;
} {
  const body = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const fieldErrors: JoinFieldErrors = {};

  if (!name) fieldErrors.name = "Enter your name.";
  else if (name.length > 120) fieldErrors.name = "Name is too long.";

  if (!email) fieldErrors.email = "Enter a valid email address.";
  else if (!EMAIL_RE.test(email) || email.length > 254) {
    fieldErrors.email = "Enter a valid email address.";
  }

  // Honeypot — bots fill hidden "company" fields
  if (String(body.company ?? "").trim()) {
    return { data: { name: name || "ignored", email: email || "ignored@example.com" } };
  }

  if (Object.keys(fieldErrors).length) return { fieldErrors };
  return { data: { name, email } };
}

export async function persistJoinSignup(data: JoinPayload): Promise<void> {
  const row = {
    ...data,
    source: "join-team-varga",
    createdAt: new Date().toISOString(),
  };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(SIGNUPS_FILE, `${JSON.stringify(row)}\n`, "utf8");
}

/** Optional campaign notify via webhook and/or Resend when env is configured. */
export async function notifyJoinSignup(data: JoinPayload): Promise<void> {
  const webhook = process.env.JOIN_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const tasks: Promise<unknown>[] = [];

  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          form: "join",
          brand: candidate.brandName,
          createdAt: new Date().toISOString(),
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Join webhook failed (${res.status})`);
      }),
    );
  }

  if (resendKey) {
    const to = process.env.JOIN_NOTIFY_TO?.trim() || candidate.email;
    const from = process.env.JOIN_FROM_EMAIL?.trim() || "onboarding@resend.dev";
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
          subject: `Team Varga signup — ${data.name}`,
          text: `New Join Team Varga signup\n\nName: ${data.name}\nEmail: ${data.email}\n`,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`Resend failed (${res.status}): ${detail}`);
        }
      }),
    );
  }

  if (!tasks.length) return;
  await Promise.all(tasks);
}
