import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
  priority: z.enum(["low", "normal", "high"]).optional(),
  assignedTo: z.string().max(120).nullable().optional(),
  resolution: z.string().max(4000).nullable().optional(),
  note: z.string().max(2000).optional(),
});

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const tickets = await prisma.supportTicket.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      notes: { orderBy: { createdAt: "asc" }, take: 50 },
      user: { select: { id: true, email: true, name: true } },
    },
  });

  const openCount = await prisma.supportTicket.count({
    where: { status: { in: ["open", "in_progress"] } },
  });

  return NextResponse.json({ tickets, openCount });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid ticket update" }, { status: 400 });
  }

  const existing = await prisma.supportTicket.findUnique({
    where: { id: parsed.data.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ticket = await prisma.$transaction(async (tx) => {
    if (parsed.data.note?.trim()) {
      await tx.supportTicketNote.create({
        data: {
          ticketId: existing.id,
          authorEmail: session.user!.email!,
          body: parsed.data.note.trim(),
        },
      });
    }

    return tx.supportTicket.update({
      where: { id: existing.id },
      data: {
        status: parsed.data.status,
        priority: parsed.data.priority,
        assignedTo:
          parsed.data.assignedTo === undefined
            ? undefined
            : parsed.data.assignedTo,
        resolution:
          parsed.data.resolution === undefined
            ? undefined
            : parsed.data.resolution,
      },
      include: {
        notes: { orderBy: { createdAt: "asc" } },
        user: { select: { id: true, email: true, name: true } },
      },
    });
  });

  return NextResponse.json({ ticket });
}
