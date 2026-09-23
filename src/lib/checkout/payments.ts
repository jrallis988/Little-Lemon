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
   * with the configured webhook secret.
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

/**
 * Stripe-shaped payment provider.
 * - Default: local demo intents (no network).
 * - Pass a secretKey to mark mode as `stripe` for production wiring.
 */
export class StripePaymentProvider implements PaymentProvider {
  private intents = new Map<string, PaymentIntent>()

  constructor(
    private readonly webhookSecret = 'whsec_gateledger_demo',
    private readonly secretKey?: string,
  ) {}

  get mode(): 'demo' | 'stripe' {
    return this.secretKey ? 'stripe' : 'demo'
  }

  async createIntent(input: {
    holdId: string
    buyerUserId: string
    amountCents: number
    currency: string
  }): Promise<PaymentIntent> {
    if (input.amountCents <= 0) throw new Error('PAYMENT_REJECTED')
    const id = randomId('pi')
    const clientSecret = `${id}_secret_${(await sha256Hex(id)).slice(0, 12)}`
    const intent: PaymentIntent = {
      id,
      amountCents: input.amountCents,
      currency: input.currency.toUpperCase(),
      status: 'requires_confirmation',
      holdId: input.holdId,
      buyerUserId: input.buyerUserId,
      clientSecret,
      createdAt: new Date().toISOString(),
    }
    this.intents.set(id, intent)
    // Production: POST https://api.stripe.com/v1/payment_intents with this.secretKey
    void this.secretKey
    return { ...intent }
  }

  async confirmIntent(intentId: string): Promise<PaymentIntent> {
    const intent = this.intents.get(intentId)
    if (!intent) throw new Error('UNKNOWN_INTENT')
    if (intent.status === 'canceled') throw new Error('INTENT_CANCELED')
    intent.status = 'succeeded'
    return { ...intent }
  }

  getIntent(intentId: string): PaymentIntent | undefined {
    const intent = this.intents.get(intentId)
    return intent ? { ...intent } : undefined
  }

  async verifyAndParseWebhook(
    rawBody: string,
    signatureHeader: string,
  ): Promise<{ type: string; intentId: string }> {
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
