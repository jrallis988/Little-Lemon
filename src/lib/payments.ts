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

export function stripeConnectConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_CONNECT_CLIENT_ID,
  )
}

/** Append checkout metadata so the client can apply unlocks on return. */
export function withCheckoutReturnParams(
  baseUrl: string,
  input: Pick<CheckoutInput, 'kind' | 'creatorId' | 'amount' | 'label'>,
  outcome: 'success' | 'cancel',
) {
  const url = new URL(baseUrl, 'http://localhost')
  url.searchParams.set('checkout', outcome)
  if (outcome === 'success') {
    url.searchParams.set('creatorId', input.creatorId)
    url.searchParams.set('kind', input.kind)
    url.searchParams.set('amount', String(input.amount))
    url.searchParams.set('label', input.label)
  }
  // Preserve path+search+hash relative to original base when base was absolute
  if (/^https?:\/\//i.test(baseUrl)) {
    return url.toString()
  }
  return `${url.pathname}${url.search}${url.hash}`
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

  const successBase =
    input.successUrl ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000/library'
  const cancelBase =
    input.cancelUrl ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000/discover'

  const success = withCheckoutReturnParams(successBase, input, 'success')
  const cancel = withCheckoutReturnParams(cancelBase, input, 'cancel')

  const unitAmount = Math.max(50, Math.round(input.amount * 100))
  const mode = input.kind === 'subscribe' ? 'subscription' : 'payment'

  const params = new URLSearchParams()
  params.set('mode', mode)
  params.set('success_url', success)
  params.set('cancel_url', cancel)
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
  params.set('metadata[label]', input.label)
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

export type ConnectResult =
  | { status: 'demo_ok'; accountId: string }
  | { status: 'stripe_onboarding'; accountId: string; url: string }
  | { status: 'needs_stripe'; message: string }
  | { status: 'error'; message: string }

/** Stripe Connect Express onboarding stub (Account Links via REST). */
export async function createStripeConnectOnboarding(input: {
  returnUrl?: string
  refreshUrl?: string
  email?: string
}): Promise<ConnectResult> {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    await new Promise((r) => setTimeout(r, 250))
    return {
      status: 'demo_ok',
      accountId: `acct_demo_${Date.now().toString(36)}`,
    }
  }

  const returnUrl =
    input.returnUrl ??
    `${process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'}/settings?connect=success`
  const refreshUrl =
    input.refreshUrl ??
    `${process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'}/settings?connect=refresh`

  try {
    const accountParams = new URLSearchParams()
    accountParams.set('type', 'express')
    accountParams.set('capabilities[card_payments][requested]', 'true')
    accountParams.set('capabilities[transfers][requested]', 'true')
    if (input.email) accountParams.set('email', input.email)

    const accountRes = await fetch('https://api.stripe.com/v1/accounts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: accountParams,
    })
    const account = (await accountRes.json()) as {
      id?: string
      error?: { message?: string }
    }
    if (!accountRes.ok || !account.id) {
      return {
        status: 'error',
        message: account.error?.message ?? 'Stripe Connect account failed',
      }
    }

    const linkParams = new URLSearchParams()
    linkParams.set('account', account.id)
    linkParams.set('refresh_url', refreshUrl)
    linkParams.set('return_url', returnUrl)
    linkParams.set('type', 'account_onboarding')

    const linkRes = await fetch('https://api.stripe.com/v1/account_links', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: linkParams,
    })
    const link = (await linkRes.json()) as {
      url?: string
      error?: { message?: string }
    }
    if (!linkRes.ok || !link.url) {
      return {
        status: 'error',
        message: link.error?.message ?? 'Stripe Account Link failed',
      }
    }

    return {
      status: 'stripe_onboarding',
      accountId: account.id,
      url: link.url,
    }
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'Stripe Connect failed',
    }
  }
}
