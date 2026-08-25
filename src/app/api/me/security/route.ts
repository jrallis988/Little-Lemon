import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const passwordSchema = z.object({
  currentPassword: z.string().min(8).max(128),
  newPassword: z.string().min(8).max(128),
});

const securitySchema = z.object({
  allowPersonalizedTips: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorMethod: z.enum(["email"]).nullable().optional(),
  phone: z.string().max(32).nullable().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      name: true,
      phone: true,
      allowPersonalizedTips: true,
      twoFactorEnabled: true,
      twoFactorMethod: true,
      passwordHash: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    security: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      allowPersonalizedTips: user.allowPersonalizedTips,
      twoFactorEnabled: user.twoFactorEnabled,
      twoFactorMethod: user.twoFactorMethod,
      hasPassword: Boolean(user.passwordHash),
      createdAt: user.createdAt.toISOString(),
    },
  });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = securitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid security update" }, { status: 400 });
  }

  const data: {
    allowPersonalizedTips?: boolean;
    twoFactorEnabled?: boolean;
    twoFactorMethod?: string | null;
    phone?: string | null;
  } = {};

  if (parsed.data.allowPersonalizedTips !== undefined) {
    data.allowPersonalizedTips = parsed.data.allowPersonalizedTips;
  }
  if (parsed.data.twoFactorEnabled !== undefined) {
    data.twoFactorEnabled = parsed.data.twoFactorEnabled;
    data.twoFactorMethod = parsed.data.twoFactorEnabled
      ? parsed.data.twoFactorMethod ?? "email"
      : null;
  } else if (parsed.data.twoFactorMethod !== undefined) {
    data.twoFactorMethod = parsed.data.twoFactorMethod;
  }
  if (parsed.data.phone !== undefined) {
    data.phone = parsed.data.phone;
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: {
      email: true,
      phone: true,
      allowPersonalizedTips: true,
      twoFactorEnabled: true,
      twoFactorMethod: true,
    },
  });

  return NextResponse.json({ security: user });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = passwordSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  });

  if (!user?.passwordHash) {
    return NextResponse.json(
      { error: "This account uses social sign-in. Set a password via forgot-password after linking email credentials, or contact support." },
      { status: 400 }
    );
  }

  const ok = await compare(parsed.data.currentPassword, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  const passwordHash = await hash(parsed.data.newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash },
  });

  return NextResponse.json({ ok: true });
}
