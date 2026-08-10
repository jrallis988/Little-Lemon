import { Resend } from "resend";
import { getEnv, isResendConfigured } from "@/lib/env";
import { logger } from "@/lib/logger";

/** Best-effort transactional email. Logs and no-ops when Resend is unset. */
export async function sendTransactionalEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!isResendConfigured()) {
    logger.info("email.skipped", { to: opts.to, subject: opts.subject });
    return { ok: true, skipped: true };
  }

  try {
    const env = getEnv();
    const resend = new Resend(env.RESEND_API_KEY!);
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL!,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    });
    return { ok: true };
  } catch (err) {
    logger.error("email.failed", {
      to: opts.to,
      subject: opts.subject,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Email send failed",
    };
  }
}
