import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1).max(80),
  relation: z.string().max(40).optional().nullable(),
  dateOfBirth: z.string().max(32).optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

const patchSchema = createSchema.extend({
  id: z.string().min(1),
});

async function familyLimitForUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { membershipTier: true, membershipStatus: true },
  });
  const plus =
    user?.membershipTier === "plus" &&
    (user.membershipStatus === "active" || user.membershipStatus == null);
  return plus ? 5 : 0;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [members, limit] = await Promise.all([
    prisma.familyMember.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    }),
    familyLimitForUser(session.user.id),
  ]);

  return NextResponse.json({ members, limit });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid family member" }, { status: 400 });
  }

  const limit = await familyLimitForUser(session.user.id);
  if (limit === 0) {
    return NextResponse.json(
      {
        error:
          "Family profiles are included with Trump RX Plus. Upgrade to manage dependents.",
        code: "plus_required",
      },
      { status: 403 }
    );
  }

  const count = await prisma.familyMember.count({
    where: { userId: session.user.id },
  });
  if (count >= limit) {
    return NextResponse.json(
      { error: `Plus accounts can manage up to ${limit} family members.` },
      { status: 400 }
    );
  }

  const member = await prisma.familyMember.create({
    data: {
      userId: session.user.id,
      name: parsed.data.name,
      relation: parsed.data.relation || null,
      dateOfBirth: parsed.data.dateOfBirth || null,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json({ member }, { status: 201 });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const existing = await prisma.familyMember.findFirst({
    where: { id: parsed.data.id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const member = await prisma.familyMember.update({
    where: { id: existing.id },
    data: {
      name: parsed.data.name,
      relation: parsed.data.relation || null,
      dateOfBirth: parsed.data.dateOfBirth || null,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json({ member });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.familyMember.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ ok: true });
}
