import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/mail";
import { getEnv } from "@/lib/env";

const createSchema = z.object({
  patientName: z.string().min(1).max(80),
  contactEmail: z.string().email().optional().nullable(),
  contactPhone: z.string().max(32).optional().nullable(),
  drugName: z.string().min(1).max(120),
  strength: z.string().max(80).optional().nullable(),
  quantity: z.string().max(40).optional().nullable(),
  fromPharmacyName: z.string().min(1).max(120),
  fromPharmacyPhone: z.string().max(32).optional().nullable(),
  toPharmacyId: z.string().optional().nullable(),
  toPharmacyName: z.string().max(120).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transfers = await prisma.prescriptionTransfer.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ transfers });
}

export async function POST(req: Request) {
  const session = await auth();
  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid transfer request" }, { status: 400 });
  }

  let toPharmacyName = parsed.data.toPharmacyName || null;
  if (parsed.data.toPharmacyId) {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: { id: parsed.data.toPharmacyId },
      select: { name: true, acceptsTrumpRxCoupon: true },
    });
    if (!pharmacy) {
      return NextResponse.json({ error: "Target pharmacy not found" }, { status: 404 });
    }
    toPharmacyName = pharmacy.name;
  }

  const transfer = await prisma.prescriptionTransfer.create({
    data: {
      userId: session?.user?.id ?? null,
      patientName: parsed.data.patientName,
      contactEmail: parsed.data.contactEmail || session?.user?.email || null,
      contactPhone: parsed.data.contactPhone || null,
      drugName: parsed.data.drugName,
      strength: parsed.data.strength || null,
      quantity: parsed.data.quantity || null,
      fromPharmacyName: parsed.data.fromPharmacyName,
      fromPharmacyPhone: parsed.data.fromPharmacyPhone || null,
      toPharmacyId: parsed.data.toPharmacyId || null,
      toPharmacyName,
      notes: parsed.data.notes || null,
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
      subject: `Rx transfer request: ${transfer.drugName}`,
      html: `<p>New transfer request from <strong>${transfer.patientName}</strong>.</p>
        <p>${transfer.drugName}${transfer.strength ? ` · ${transfer.strength}` : ""}</p>
        <p>From: ${transfer.fromPharmacyName}<br/>To: ${transfer.toPharmacyName ?? "TBD"}</p>
        <p><a href="${env.NEXT_PUBLIC_APP_URL}/admin/tickets">Open ops</a></p>`,
    });
  }

  return NextResponse.json({ transfer }, { status: 201 });
}
