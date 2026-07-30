import { mkdir, writeFile, appendFile } from "fs/promises";
import path from "path";
import { siteConfig } from "@/lib/site";
import type { IntakeRecord } from "./types";

function makeReferenceId(channel: IntakeRecord["channel"]) {
  const n = Math.floor(100000 + Math.random() * 900000);
  if (channel === "appointment") return `BCH-${n}`;
  if (channel === "referral") return `REF-${n}`;
  return `SO-${n}`;
}

function makeId() {
  return `intake_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

async function persistLocal(record: IntakeRecord) {
  // Durable on local/dev; on Vercel use /tmp (ephemeral) + webhook/email.
  const root =
    process.env.INTAKE_STORE_DIR ||
    (process.env.VERCEL ? "/tmp/bch-intake" : path.join(process.cwd(), ".data/intake"));
  await mkdir(root, { recursive: true });
  const file = path.join(root, `${record.referenceId}.json`);
  await writeFile(file, JSON.stringify(record, null, 2), "utf8");
  await appendFile(
    path.join(root, "index.ndjson"),
    `${JSON.stringify({
      referenceId: record.referenceId,
      channel: record.channel,
      createdAt: record.createdAt,
    })}\n`,
    "utf8",
  );
}

async function deliverWebhook(record: IntakeRecord) {
  const url = process.env.INTAKE_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.INTAKE_WEBHOOK_SECRET
        ? { "X-Intake-Secret": process.env.INTAKE_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(record),
  });
  if (!res.ok) {
    throw new Error(`Webhook failed (${res.status})`);
  }
  return true;
}

async function deliverEmail(record: IntakeRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = siteConfig.intakeEmail;
  const from =
    process.env.INTAKE_FROM_EMAIL || "Care Intake <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[${record.channel}] ${record.referenceId}`,
      text: JSON.stringify(record, null, 2),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend failed (${res.status}): ${text}`);
  }
  return true;
}

export async function processIntake(
  channel: IntakeRecord["channel"],
  payload: IntakeRecord["payload"],
): Promise<IntakeRecord> {
  const record: IntakeRecord = {
    id: makeId(),
    referenceId: makeReferenceId(channel),
    channel,
    createdAt: new Date().toISOString(),
    payload,
    delivery: {
      stored: false,
      emailed: false,
      webhook: false,
      errors: [],
    },
  };

  try {
    await persistLocal(record);
    record.delivery.stored = true;
  } catch (err) {
    record.delivery.errors.push(
      err instanceof Error ? err.message : "Failed to store intake",
    );
  }

  try {
    record.delivery.webhook = await deliverWebhook(record);
  } catch (err) {
    record.delivery.errors.push(
      err instanceof Error ? err.message : "Webhook delivery failed",
    );
  }

  try {
    record.delivery.emailed = await deliverEmail(record);
  } catch (err) {
    record.delivery.errors.push(
      err instanceof Error ? err.message : "Email delivery failed",
    );
  }

  // Local/staging without providers still succeeds if stored.
  const delivered =
    record.delivery.stored ||
    record.delivery.webhook ||
    record.delivery.emailed;

  if (!delivered) {
    throw new Error(
      "Intake could not be delivered. Configure INTAKE_WEBHOOK_URL or RESEND_API_KEY, or ensure local disk is writable.",
    );
  }

  return record;
}
