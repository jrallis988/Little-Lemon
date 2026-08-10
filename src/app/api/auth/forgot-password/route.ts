import { createHash, randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { sendTransactionalEmail } from "@/lib/mail";
import { logger } from "@/lib/logger";

const schema = z.object({
  email: z.string().email(),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to avoid account enumeration.
  const generic = {
    ok: true,
    message:
      "If an account exists for that email, password reset instructions were sent.",
  };

  if (!user?.passwordHash) {
    return NextResponse.json(generic);
  }

  const raw = randomBytes(32).toString("hex");
  const token = hashToken(raw);
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.verificationToken.deleteMany({
    where: { identifier: `password-reset:${email}` },
  });
  await prisma.verificationToken.create({
    data: {
      identifier: `password-reset:${email}`,
      token,
      expires,
    },
  });

  const env = getEnv();
  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${raw}&email=${encodeURIComponent(email)}`;

  const mailed = await sendTransactionalEmail({
    to: email,
    subject: "Reset your Trump RX password",
    html: `<p>We received a request to reset your Trump RX password.</p>
      <p><a href="${resetUrl}">Choose a new password</a> (link expires in 1 hour).</p>
      <p>If you did not request this, you can ignore this email.</p>`,
    text: `Reset your Trump RX password: ${resetUrl}`,
  });

  if (mailed.skipped) {
    logger.info("password_reset.dev_link", { email, resetUrl });
  }

  return NextResponse.json({
    ...generic,
    ...(process.env.NODE_ENV !== "production" && mailed.skipped
      ? { devResetUrl: resetUrl }
      : {}),
  });
}
