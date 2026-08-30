/**
 * Payments adapter.
 * With STRIPE_* secrets in production, swap demoCheckout for Stripe Checkout /
 * PaymentIntents. Until then, membership store records local unlocks/tips.
 */

export type CheckoutKind = 'subscribe' | 'tip'

export type CheckoutInput = {
  kind: CheckoutKind
  creatorId: string
  creatorName: string
  amount: number
  label: string
}

export type CheckoutResult =
  | { status: 'demo_ok'; receiptId: string }
  | { status: 'needs_stripe'; message: string }

export async function demoCheckout(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  // Simulate network + processor latency
  await new Promise((r) => setTimeout(r, 450))

  if (typeof process !== 'undefined' && process.env.STRIPE_SECRET_KEY) {
    return {
      status: 'needs_stripe',
      message:
        'Stripe key detected but live checkout wiring is not enabled in this build.',
    }
  }

  return {
    status: 'demo_ok',
    receiptId: `rcpt_${input.kind}_${input.creatorId}_${Date.now().toString(36)}`,
  }
}
