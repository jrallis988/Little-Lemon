/**
 * Demo / placeholder site flags.
 *
 * This campaign site currently ships as a front-end demonstration:
 * - Forms show success UI only (no email, CRM, or API persistence)
 * - Checkout does not process payments or save orders
 * - Social links and some contact fields are placeholders
 * - No live analytics, pixels, or tracking SDKs are loaded
 */

export const DEMO_MODE = true as const;

/** Shared success copy for mock form submissions */
export const demoFormSuccess = {
  contact:
    "Demo submission received — thanks. In this preview, messages are not emailed or stored.",
  volunteer:
    "Demo volunteer sign-up received — thank you. In this preview, sign-ups are not saved to a CRM.",
    join: "You're on the list. Welcome to Team Varga.",
  townRequest:
    "Demo visit request received. In this preview, town requests are not routed to campaign staff.",
  checkout:
    "Demo order request received. No payment was processed and no order was saved. In production, the campaign would confirm payment and shipping next.",
  chatLive:
    "Demo message received. Live campaign support is not connected in this preview — nothing was delivered to staff.",
} as const;

export const demoFormNote =
  "Demo mode: this form validates and shows a success message only. It does not send email, sync a CRM, or save data.";
