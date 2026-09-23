import { describe, expect, it } from 'vitest'
import { CheckoutService } from './checkoutService'
import { InventoryLockService } from './inventoryLock'
import { StripePaymentProvider } from './payments'
import { EventLedger } from '../ledger/eventLedger'

describe('Stripe-shaped payment flow', () => {
  it('creates an intent, confirms, and issues exactly one ticket', async () => {
    const inventory = new InventoryLockService()
    inventory.seedSeat({
      eventId: 'evt_pay',
      seatLabel: 'P-1',
      listPriceCents: 6500,
      currency: 'USD',
      available: true,
    })
    const ledger = new EventLedger()
    const payments = new StripePaymentProvider()
    const checkout = new CheckoutService(inventory, ledger, payments)

    const started = await checkout.beginPaidCheckout({
      eventId: 'evt_pay',
      seatLabel: 'P-1',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 6500,
      currency: 'USD',
      idempotencyKey: 'pay_1',
    })
    expect(started.ok).toBe(true)
    if (!started.ok || !('intent' in started)) throw new Error('expected intent')

    expect(started.intent.status).toBe('requires_confirmation')
    expect(started.intent.clientSecret).toContain('_secret_')

    await payments.confirmIntent(started.intent.id)
    const finalized = await checkout.finalizePaidIntent(started.intent.id)
    expect(finalized.ok).toBe(true)
    expect(finalized.ticketId).toBeTruthy()
    expect(ledger.listTickets()).toHaveLength(1)
  })

  it('rejects webhooks with bad signatures and accepts signed payment_intent.succeeded', async () => {
    const payments = new StripePaymentProvider('whsec_test')
    const intent = await payments.createIntent({
      holdId: 'hold_1',
      buyerUserId: 'buyer_1',
      amountCents: 1000,
      currency: 'USD',
    })
    await payments.confirmIntent(intent.id)

    const body = JSON.stringify({
      type: 'payment_intent.succeeded',
      data: { object: { id: intent.id } },
    })
    await expect(
      payments.verifyAndParseWebhook(body, 'sha256=deadbeef'),
    ).rejects.toThrow('WEBHOOK_SIGNATURE_INVALID')

    const parsed = await payments.verifyAndParseWebhook(
      body,
      await payments.signWebhook(body),
    )
    expect(parsed).toEqual({ type: 'payment_intent.succeeded', intentId: intent.id })
  })
})
