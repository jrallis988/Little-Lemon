type SendResult = {
  sent: boolean;
  provider?: 'smtp' | 'resend' | 'console';
  error?: string;
};

function appBaseUrl() {
  return (
    process.env.APP_BASE_URL?.replace(/\/$/, '') ??
    process.env.EXPO_PUBLIC_APP_URL?.replace(/\/$/, '') ??
    'http://localhost:8081'
  );
}

export function buildResetLink(email: string, token: string) {
  const base = appBaseUrl();
  const params = new URLSearchParams({ email, token });
  return `${base}/forgot-password?${params.toString()}`;
}

/** Send password-reset mail when SMTP or Resend is configured. */
export async function sendPasswordResetEmail(input: {
  to: string;
  token: string;
}): Promise<SendResult> {
  const link = buildResetLink(input.to, input.token);
  const subject = 'Reset your Rate My Employer password';
  const text = [
    'Reset your Rate My Employer password.',
    '',
    `Use this code: ${input.token}`,
    `Or open: ${link}`,
    '',
    'This code expires in 30 minutes. If you did not request it, ignore this email.',
  ].join('\n');
  const html = `
    <p>Reset your Rate My Employer password.</p>
    <p>Use this code: <strong>${input.token}</strong></p>
    <p><a href="${link}">Reset password</a></p>
    <p>This code expires in 30 minutes.</p>
  `;

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const from = process.env.EMAIL_FROM ?? 'Rate My Employer <onboarding@resend.dev>';
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [input.to],
          subject,
          text,
          html,
        }),
      });
      if (!response.ok) {
        const body = await response.text();
        return { sent: false, provider: 'resend', error: body };
      }
      return { sent: true, provider: 'resend' };
    } catch (error) {
      return {
        sent: false,
        provider: 'resend',
        error: error instanceof Error ? error.message : 'Resend failed',
      };
    }
  }

  const host = process.env.SMTP_HOST;
  if (host) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth:
          process.env.SMTP_USER && process.env.SMTP_PASS
            ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              }
            : undefined,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM ?? process.env.SMTP_USER ?? 'noreply@ratemyemployer.app',
        to: input.to,
        subject,
        text,
        html,
      });
      return { sent: true, provider: 'smtp' };
    } catch (error) {
      return {
        sent: false,
        provider: 'smtp',
        error: error instanceof Error ? error.message : 'SMTP failed',
      };
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[rme-mail] password reset for ${input.to}: ${input.token}`);
    return { sent: false, provider: 'console' };
  }

  return { sent: false };
}

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
}
