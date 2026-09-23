import { randomId, sha256Hex } from '../crypto/hash'

export type PaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'succeeded'
  | 'canceled'

export interface PaymentIntent {
  id: string
  amountCents: number
  currency: string
  status: PaymentIntentStatus
  holdId: string
  buyerUserId: string
  clientSecret: string
  createdAt: string
}

export interface PaymentProvider {
  createIntent(input: {
    holdId: string
    buyerUserId: string
    amountCents: number
    currency: string
  }): Promise<PaymentIntent>
  confirmIntent(intentId: string): Promise<PaymentIntent>
  getIntent(intentId: string): PaymentIntent | undefined
  /**
   * Verify a Stripe-style webhook. Demo mode uses HMAC-SHA256 of the raw body
   * with the configured webhook secret. Live mode uses Stripe's signature scheme.
   */
  verifyAndParseWebhook(
    rawBody: string,
    signatureHeader: string,
  ): Promise<{ type: string; intentId: string }>
}

const textEncoder = new TextEncoder()

async function hmacSha256Hex(secret: string, body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, textEncoder.encode(body))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

function mapStripeStatus(status: string): PaymentIntentStatus {
  switch (status) {
    case 'succeeded':
      return 'succeeded'
    case 'canceled':
      return 'canceled'
    case 'requires_payment_method':
      return 'requires_payment_method'
    default:
      return 'requires_confirmation'
  }
}

export interface StripeProviderOptions {
  webhookSecret?: string
  secretKey?: string
  /** When true (default in test/demo APIs), server may confirm with pm_card_visa. */
  allowTestConfirm?: boolean
}

/**
 * Stripe-shaped payment provider.
 * - No secretKey → local demo intents (offline).
 * - With secretKey → real Stripe PaymentIntents via the official SDK.
 */
export class StripePaymentProvider implements PaymentProvider {
  private intents = new Map<string, PaymentIntent>()
  private webhookSecret: string
  private secretKey?: string
  private allowTestConfirm: boolean
  private stripe: import('stripe').default | null = null

  constructor(
    webhookSecretOrOptions: string | StripeProviderOptions = 'whsec_gateledger_demo',
    secretKey?: string,
  ) {
    if (typeof webhookSecretOrOptions === 'string') {
      this.webhookSecret = webhookSecretOrOptions
      this.secretKey = secretKey
      this.allowTestConfirm = true
    } else {
      this.webhookSecret = webhookSecretOrOptions.webhookSecret ?? 'whsec_gateledger_demo'
      this.secretKey = webhookSecretOrOptions.secretKey
      this.allowTestConfirm = webhookSecretOrOptions.allowTestConfirm ?? true
    }
  }

  get mode(): 'demo' | 'stripe' {
    return this.secretKey ? 'stripe' : 'demo'
  }

  private async client() {
    if (!this.secretKey) return null
    if (!this.stripe) {
      const { default: Stripe } = await import('stripe')
      this.stripe = new Stripe(this.secretKey)
    }
    return this.stripe
  }

  private cache(intent: PaymentIntent) {
    this.intents.set(intent.id, intent)
    return { ...intent }
  }

  async createIntent(input: {
    holdId: string
    buyerUserId: string
    amountCents: number
    currency: string
  }): Promise<PaymentIntent> {
    if (input.amountCents <= 0) throw new Error('PAYMENT_REJECTED')
    const stripe = await this.client()
    if (!stripe) {
      const id = randomId('pi')
      const clientSecret = `${id}_secret_${(await sha256Hex(id)).slice(0, 12)}`
      return this.cache({
        id,
        amountCents: input.amountCents,
        currency: input.currency.toUpperCase(),
        status: 'requires_confirmation',
        holdId: input.holdId,
        buyerUserId: input.buyerUserId,
        clientSecret,
        createdAt: new Date().toISOString(),
      })
    }

    const pi = await stripe.paymentIntents.create({
      amount: input.amountCents,
      currency: input.currency.toLowerCase(),
      metadata: {
        holdId: input.holdId,
        buyerUserId: input.buyerUserId,
      },
      automatic_payment_methods: { enabled: true },
    })
    return this.cache({
      id: pi.id,
      amountCents: pi.amount,
      currency: pi.currency.toUpperCase(),
      status: mapStripeStatus(pi.status),
      holdId: input.holdId,
      buyerUserId: input.buyerUserId,
      clientSecret: pi.client_secret ?? '',
      createdAt: new Date(pi.created * 1000).toISOString(),
    })
  }

  async confirmIntent(intentId: string): Promise<PaymentIntent> {
    const stripe = await this.client()
    if (!stripe) {
      const intent = this.intents.get(intentId)
      if (!intent) throw new Error('UNKNOWN_INTENT')
      if (intent.status === 'canceled') throw new Error('INTENT_CANCELED')
      intent.status = 'succeeded'
      return { ...intent }
    }

    let pi = await stripe.paymentIntents.retrieve(intentId)
    const meta = (pi.metadata ?? {}) as { holdId?: string; buyerUserId?: string }
    if (pi.status !== 'succeeded' && this.allowTestConfirm) {
      pi = await stripe.paymentIntents.confirm(intentId, {
        payment_method: 'pm_card_visa',
        return_url: 'https://gateledger.local/checkout/return',
      })
    }
    if (pi.status !== 'succeeded') {
      throw new Error('PAYMENT_REQUIRES_CLIENT_CONFIRM')
    }
    const cached = this.intents.get(intentId)
    return this.cache({
      id: pi.id,
      amountCents: pi.amount,
      currency: pi.currency.toUpperCase(),
      status: 'succeeded',
      holdId: cached?.holdId ?? meta.holdId ?? '',
      buyerUserId: cached?.buyerUserId ?? meta.buyerUserId ?? '',
      clientSecret: pi.client_secret ?? cached?.clientSecret ?? '',
      createdAt:
        cached?.createdAt ?? new Date(pi.created * 1000).toISOString(),
    })
  }

  getIntent(intentId: string): PaymentIntent | undefined {
    const intent = this.intents.get(intentId)
    return intent ? { ...intent } : undefined
  }

  /** Cache/hydrate an intent after webhook or DB reload. */
  remember(intent: PaymentIntent) {
    this.intents.set(intent.id, { ...intent })
  }

  async verifyAndParseWebhook(
    rawBody: string,
    signatureHeader: string,
  ): Promise<{ type: string; intentId: string }> {
    const stripe = await this.client()
    if (stripe && this.webhookSecret.startsWith('whsec_') && this.mode === 'stripe') {
      try {
        const event = stripe.webhooks.constructEvent(
          rawBody,
          signatureHeader,
          this.webhookSecret,
        )
        const intentId = (event.data?.object as { id?: string } | undefined)?.id
        if (!intentId) throw new Error('WEBHOOK_MISSING_INTENT')
        return { type: event.type, intentId }
      } catch (err) {
        // Fall through to demo HMAC if constructEvent rejects (e.g. unit tests with demo sig).
        if (this.secretKey && !signatureHeader.startsWith('sha256=')) {
          throw err instanceof Error ? err : new Error('WEBHOOK_SIGNATURE_INVALID')
        }
      }
    }

    const expected = await hmacSha256Hex(this.webhookSecret, rawBody)
    const provided = signatureHeader.replace(/^sha256=/, '')
    if (!safeEqualHex(expected, provided)) {
      throw new Error('WEBHOOK_SIGNATURE_INVALID')
    }
    const payload = JSON.parse(rawBody) as {
      type?: string
      data?: { object?: { id?: string } }
    }
    const intentId = payload.data?.object?.id
    if (!intentId) throw new Error('WEBHOOK_MISSING_INTENT')
    return {
      type: payload.type ?? 'payment_intent.succeeded',
      intentId,
    }
  }

  /** Test helper to mint a valid demo webhook signature. */
  async signWebhook(rawBody: string): Promise<string> {
    return `sha256=${await hmacSha256Hex(this.webhookSecret, rawBody)}`
  }
}

/** Instant-success provider used by flash-sale race tests. */
export class InstantPaymentProvider implements PaymentProvider {
  private intents = new Map<string, PaymentIntent>()

  async createIntent(input: {
    holdId: string
    buyerUserId: string
    amountCents: number
    currency: string
  }): Promise<PaymentIntent> {
    const intent: PaymentIntent = {
      id: randomId('pi'),
      amountCents: input.amountCents,
      currency: input.currency,
      status: 'succeeded',
      holdId: input.holdId,
      buyerUserId: input.buyerUserId,
      clientSecret: 'instant',
      createdAt: new Date().toISOString(),
    }
    this.intents.set(intent.id, intent)
    return { ...intent }
  }

  async confirmIntent(intentId: string): Promise<PaymentIntent> {
    const intent = this.intents.get(intentId)
    if (!intent) throw new Error('UNKNOWN_INTENT')
    intent.status = 'succeeded'
    return { ...intent }
  }

  getIntent(intentId: string) {
    const intent = this.intents.get(intentId)
    return intent ? { ...intent } : undefined
  }

  async verifyAndParseWebhook(
    _rawBody: string,
    _signatureHeader: string,
  ): Promise<{ type: string; intentId: string }> {
    throw new Error('NOT_SUPPORTED')
  }
}
