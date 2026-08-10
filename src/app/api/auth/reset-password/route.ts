import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  email: z.string().email(),
  token: z.string().min(20),
  password: z.string().min(8).max(128),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid reset request. Use a password of at least 8 characters." },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase();
  const tokenHash = hashToken(parsed.data.token);
  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: `password-reset:${email}`,
        token: tokenHash,
      },
    },
  });

  if (!record || record.expires < new Date()) {
    if (record) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: record.identifier,
            token: record.token,
          },
        },
      });
    }
    return NextResponse.json(
      { error: "This reset link is invalid or has expired." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  const passwordHash = await hash(parsed.data.password, 12);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    }),
    prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: record.identifier,
          token: record.token,
        },
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
