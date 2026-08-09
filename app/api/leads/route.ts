import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createLeadRecord, validateLead, type LeadRecord } from "@/lib/leads";
import { site } from "@/lib/site";

export const runtime = "nodejs";

async function persistLead(record: LeadRecord) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(
    path.join(dataDir, "leads.jsonl"),
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
}

async function forwardWebhook(record: LeadRecord) {
  const webhook = process.env.FORM_WEBHOOK_URL;
  if (!webhook) return false;

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...record,
      to: site.email,
      subject: `Morgan Bright ${record.type} request from ${record.name}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }

  return true;
}

async function forwardResend(record: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.RESEND_FROM_EMAIL ?? "Morgan Bright <onboarding@resend.dev>";
  const subject = `Morgan Bright ${record.type} request from ${record.name}`;
  const text = [
    `Type: ${record.type}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Organization: ${record.organization ?? "—"}`,
    `Role: ${record.role ?? "—"}`,
    `Plan interest: ${record.planInterest ?? "—"}`,
    `Phone: ${record.phone ?? "—"}`,
    `Message: ${record.message ?? "—"}`,
    `Submitted: ${record.createdAt}`,
    `Lead ID: ${record.id}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [site.email],
      reply_to: record.email,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with status ${response.status}`);
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<
      Parameters<typeof validateLead>[0]
    >;
    const validated = validateLead(body);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const record = createLeadRecord(validated.data);
    await persistLead(record);

    let forwarded = false;
    const channels: string[] = [];

    try {
      if (await forwardWebhook(record)) {
        forwarded = true;
        channels.push("webhook");
      }
    } catch {
      // Continue to other delivery channels.
    }

    try {
      if (await forwardResend(record)) {
        forwarded = true;
        channels.push("resend");
      }
    } catch {
      // Local persistence still succeeded.
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      forwarded,
      channels,
      message:
        record.type === "pricing"
          ? "Thanks — our sales team will follow up with pricing guidance."
          : record.type === "demo"
            ? "Thanks — we will schedule your demo follow-up shortly."
            : "Thanks — we received your message and will reply soon.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 },
    );
  }
}
