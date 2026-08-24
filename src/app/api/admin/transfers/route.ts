import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["submitted", "in_review", "completed", "canceled"]).optional(),
  adminNotes: z.string().max(2000).nullable().optional(),
  assignedTo: z.string().max(120).nullable().optional(),
});

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const status = new URL(req.url).searchParams.get("status");
  const transfers = await prisma.prescriptionTransfer.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: { select: { id: true, email: true, name: true } },
      toPharmacy: { select: { id: true, name: true, phone: true, city: true, state: true } },
    },
  });

  const openCount = await prisma.prescriptionTransfer.count({
    where: { status: { in: ["submitted", "in_review"] } },
  });

  return NextResponse.json({ transfers, openCount });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid transfer update" }, { status: 400 });
  }

  const transfer = await prisma.prescriptionTransfer.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      adminNotes:
        parsed.data.adminNotes === undefined ? undefined : parsed.data.adminNotes,
      assignedTo:
        parsed.data.assignedTo === undefined ? undefined : parsed.data.assignedTo,
    },
    include: {
      user: { select: { id: true, email: true, name: true } },
      toPharmacy: { select: { id: true, name: true, phone: true } },
    },
  });

  return NextResponse.json({ transfer });
}
