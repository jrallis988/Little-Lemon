import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/mail";
import { getEnv } from "@/lib/env";

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().max(80).optional().nullable(),
  subject: z.string().min(3).max(160),
  category: z
    .enum([
      "counter_price",
      "out_of_stock",
      "pharmacy",
      "billing",
      "account",
      "other",
    ])
    .default("other"),
  body: z.string().min(10).max(4000),
  pharmacyName: z.string().max(120).optional().nullable(),
  drugName: z.string().max(120).optional().nullable(),
  expectedPrice: z.number().min(0).max(100000).optional().nullable(),
  chargedPrice: z.number().min(0).max(100000).optional().nullable(),
  priority: z.enum(["low", "normal", "high"]).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid support request" }, { status: 400 });
  }

  const priority =
    parsed.data.priority ??
    (parsed.data.category === "counter_price" ||
    parsed.data.category === "out_of_stock"
      ? "high"
      : "normal");

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: session?.user?.id ?? null,
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name || session?.user?.name || null,
      subject: parsed.data.subject,
      category: parsed.data.category,
      body: parsed.data.body,
      pharmacyName: parsed.data.pharmacyName || null,
      drugName: parsed.data.drugName || null,
      expectedPrice: parsed.data.expectedPrice ?? null,
      chargedPrice: parsed.data.chargedPrice ?? null,
      priority,
    },
  });

  const env = getEnv();
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (admins[0]) {
    await sendTransactionalEmail({
      to: admins[0],
      subject: `[${ticket.priority}] ${ticket.subject}`,
      html: `<p>New support ticket (${ticket.category}).</p>
        <p>${ticket.body}</p>
        <p><a href="${env.NEXT_PUBLIC_APP_URL}/admin/tickets">Open ticket queue</a></p>`,
    });
  }

  return NextResponse.json({ ticket: { id: ticket.id, status: ticket.status } }, { status: 201 });
}
