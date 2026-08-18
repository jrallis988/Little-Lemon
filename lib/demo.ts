/**
 * Remaining demo / placeholder flags.
 *
 * Live forms (Join, Contact, Volunteer, Come to My Town) persist to
 * data/form-submissions.jsonl and notify via FORM_WEBHOOK_URL / Resend
 * when those env vars are set.
 *
 * Still demo-only:
 * - Store checkout does not process payments
 * - Chat “live support” is not connected to staff
 * - No live analytics pixels
 */
export const DEMO_MODE = true as const;

/** Shared success copy for remaining mock surfaces */
export const demoFormSuccess = {
  checkout:
    "Demo order request received. No payment was processed and no order was saved. In production, the campaign would confirm payment and shipping next.",
  chatLive:
    "Demo message received. Live campaign support is not connected in this preview — nothing was delivered to staff.",
} as const;

export const demoFormNote =
  "Demo mode: this form validates and shows a success message only. It does not send email, sync a CRM, or save data.";
