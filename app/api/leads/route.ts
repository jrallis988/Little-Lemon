import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createLeadRecord, validateLead } from "@/lib/leads";
import { site } from "@/lib/site";

export const runtime = "nodejs";

async function persistLead(record: ReturnType<typeof createLeadRecord>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(
    path.join(dataDir, "leads.jsonl"),
    `${JSON.stringify(record)}\n`,
    "utf8",
  );
}

async function forwardLead(record: ReturnType<typeof createLeadRecord>) {
  const webhook = process.env.FORM_WEBHOOK_URL;
  if (!webhook) return { forwarded: false as const };

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

  return { forwarded: true as const };
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
    try {
      const result = await forwardLead(record);
      forwarded = result.forwarded;
    } catch {
      // Local persistence still succeeded; webhook can be configured later.
      forwarded = false;
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      forwarded,
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
