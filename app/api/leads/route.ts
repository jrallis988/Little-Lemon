import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createLeadRecord, validateLead, type LeadRecord } from "@/lib/leads";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

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

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Morgan Bright <onboarding@resend.dev>";
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

function hasDeliveryConfigured() {
  return Boolean(process.env.FORM_WEBHOOK_URL || process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Partial<
      Parameters<typeof validateLead>[0]
    >;
    const validated = validateLead(body);

    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const record = createLeadRecord(validated.data);

    // Local file is useful in development; Vercel disks are ephemeral.
    try {
      await persistLead(record);
    } catch {
      // Continue — delivery channels are the source of truth in production.
    }

    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction && !hasDeliveryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Lead delivery is not configured. Please email us directly or try again later.",
        },
        { status: 503 },
      );
    }

    let forwarded = false;
    const channels: string[] = [];

    try {
      if (await forwardWebhook(record)) {
        forwarded = true;
        channels.push("webhook");
      }
    } catch {
      // Try the next channel.
    }

    try {
      if (await forwardResend(record)) {
        forwarded = true;
        channels.push("resend");
      }
    } catch {
      // Evaluated below if production delivery is required.
    }

    if (isProduction && hasDeliveryConfigured() && !forwarded) {
      return NextResponse.json(
        {
          error:
            "We could not deliver your request right now. Please email us or try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      forwarded,
      channels,
      // Do not expose internal delivery errors to the client.
      message:
        record.type === "pricing"
          ? "Thanks — our sales team will follow up with pricing guidance within one business day."
          : record.type === "demo"
            ? "Thanks — we will schedule your demo follow-up within one business day."
            : "Thanks — we received your message and will reply within one business day.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 },
    );
  }
}
