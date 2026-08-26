import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["received", "reviewed", "closed"]).optional(),
});

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const requests = await prisma.medicationRequest.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const openCount = await prisma.medicationRequest.count({
    where: { status: { in: ["received", "reviewed"] } },
  });

  return NextResponse.json({ requests, openCount });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const existing = await prisma.medicationRequest.findUnique({
    where: { id: parsed.data.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const request = await prisma.medicationRequest.update({
    where: { id: existing.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ request });
}
