/**
 * Transactional email via Resend.
 * Without RESEND_API_KEY, messages are logged only (local/dev).
 */
export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(input: SendEmailInput): Promise<{ sent: boolean; mode: 'resend' | 'log' }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim() || 'BioCross <onboarding@resend.dev>';

  if (!apiKey) {
    console.info('[email:log]', { to: input.to, subject: input.subject, text: input.text });
    return { sent: false, mode: 'log' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }

  return { sent: true, mode: 'resend' };
}

export function passwordResetEmail(opts: {
  to: string;
  token: string;
  appLink: string;
  webLink?: string;
}): SendEmailInput {
  const lines = [
    'Reset your BioCross password',
    '',
    'We received a request to reset your password. This link expires in 1 hour.',
    '',
    `Open in the app: ${opts.appLink}`,
  ];
  if (opts.webLink) {
    lines.push(`Or use this link: ${opts.webLink}`);
  }
  lines.push('', 'If you did not request this, you can ignore this email.');

  return {
    to: opts.to,
    subject: 'Reset your BioCross password',
    text: lines.join('\n'),
    html: `
      <h2>Reset your BioCross password</h2>
      <p>We received a request to reset your password. This link expires in <strong>1 hour</strong>.</p>
      <p><a href="${opts.appLink}">Open BioCross to reset</a></p>
      ${opts.webLink ? `<p>Or continue in the browser: <a href="${opts.webLink}">${opts.webLink}</a></p>` : ''}
      <p>If you did not request this, you can ignore this email.</p>
    `.trim(),
  };
}
