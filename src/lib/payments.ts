/**
 * Payments adapter.
 * Demo mode records on-device unlocks/tips.
 * With STRIPE_SECRET_KEY, /api/stripe/checkout creates Checkout Sessions.
 */

export type CheckoutKind = 'subscribe' | 'tip'

export type CheckoutInput = {
  kind: CheckoutKind
  creatorId: string
  creatorName: string
  amount: number
  label: string
  successUrl?: string
  cancelUrl?: string
  customerEmail?: string
}

export type CheckoutResult =
  | { status: 'demo_ok'; receiptId: string }
  | { status: 'stripe_session'; sessionId: string; url: string }
  | { status: 'needs_stripe'; message: string }
  | { status: 'error'; message: string }

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

export async function demoCheckout(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  await new Promise((r) => setTimeout(r, 350))

  if (stripeConfigured()) {
    return {
      status: 'needs_stripe',
      message:
        'Stripe is configured — use POST /api/stripe/checkout for hosted Checkout.',
    }
  }

  return {
    status: 'demo_ok',
    receiptId: `rcpt_${input.kind}_${input.creatorId}_${Date.now().toString(36)}`,
  }
}

/** Build Stripe Checkout Session via REST (no stripe SDK required). */
export async function createStripeCheckoutSession(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return demoCheckout(input)
  }

  const success =
    input.successUrl ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000/settings'
  const cancel =
    input.cancelUrl ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000/discover'

  const unitAmount = Math.max(50, Math.round(input.amount * 100))
  const mode = input.kind === 'subscribe' ? 'subscription' : 'payment'

  const params = new URLSearchParams()
  params.set('mode', mode)
  params.set('success_url', `${success}?checkout=success`)
  params.set('cancel_url', `${cancel}?checkout=cancel`)
  params.set('line_items[0][quantity]', '1')
  params.set('line_items[0][price_data][currency]', 'usd')
  params.set(
    'line_items[0][price_data][product_data][name]',
    `${input.label} · ${input.creatorName}`,
  )
  params.set('line_items[0][price_data][unit_amount]', String(unitAmount))
  if (mode === 'subscription') {
    params.set('line_items[0][price_data][recurring][interval]', 'month')
  }
  params.set('metadata[creatorId]', input.creatorId)
  params.set('metadata[kind]', input.kind)
  if (input.customerEmail) params.set('customer_email', input.customerEmail)

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
    const data = (await res.json()) as {
      id?: string
      url?: string
      error?: { message?: string }
    }
    if (!res.ok || !data.id || !data.url) {
      return {
        status: 'error',
        message: data.error?.message ?? 'Stripe Checkout session failed',
      }
    }
    return { status: 'stripe_session', sessionId: data.id, url: data.url }
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'Stripe request failed',
    }
  }
}
