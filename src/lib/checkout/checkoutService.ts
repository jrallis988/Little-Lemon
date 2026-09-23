import type { EventLedger } from '../ledger/eventLedger'
import type { InventoryLockService } from './inventoryLock'
import {
  InstantPaymentProvider,
  type PaymentIntent,
  type PaymentProvider,
} from './payments'
import type { CheckoutRequest, CheckoutResult } from './types'

/**
 * Checkout orchestration: lock inventory → payment → issue ticket on ledger.
 * Fails closed: never issues duplicate access rights when the seat race is lost.
 */
export class CheckoutService {
  constructor(
    private readonly inventory: InventoryLockService,
    private readonly ledger: EventLedger,
    private readonly payments: PaymentProvider = new InstantPaymentProvider(),
  ) {}

  /** One-shot checkout (tests / demo): claim → pay → capture → issue. */
  async checkout(request: CheckoutRequest): Promise<CheckoutResult> {
    let hold
    try {
      hold = await this.inventory.claimHold(request)
    } catch (err) {
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'CLAIM_FAILED',
      }
    }

    try {
      const intent = await this.payments.createIntent({
        holdId: hold.holdId,
        buyerUserId: request.buyerUserId,
        amountCents: hold.unitPriceCents,
        currency: hold.currency,
      })
      if (intent.status !== 'succeeded') {
        await this.payments.confirmIntent(intent.id)
      }
      return await this.finalizePaidIntent(intent.id)
    } catch (err) {
      await this.inventory.releaseHold(hold.holdId, request.buyerUserId).catch(() => undefined)
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'CHECKOUT_FAILED',
        hold,
      }
    }
  }

  /** Phase 1: hold seat + create PaymentIntent (client confirms with Stripe.js). */
  async beginPaidCheckout(
    request: CheckoutRequest,
  ): Promise<{ ok: true; holdId: string; intent: PaymentIntent } | CheckoutResult> {
    let hold
    try {
      hold = await this.inventory.claimHold(request)
    } catch (err) {
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'CLAIM_FAILED',
      }
    }
    try {
      const intent = await this.payments.createIntent({
        holdId: hold.holdId,
        buyerUserId: request.buyerUserId,
        amountCents: hold.unitPriceCents,
        currency: hold.currency,
      })
      return { ok: true, holdId: hold.holdId, intent }
    } catch (err) {
      await this.inventory.releaseHold(hold.holdId, request.buyerUserId).catch(() => undefined)
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'PAYMENT_INTENT_FAILED',
        hold,
      }
    }
  }

  /** Phase 2: after PaymentIntent succeeds (confirm or webhook), mint ticket. */
  async finalizePaidIntent(intentId: string): Promise<CheckoutResult> {
    const intent = this.payments.getIntent(intentId)
    if (!intent) return { ok: false, reason: 'UNKNOWN_INTENT' }
    if (intent.status !== 'succeeded') {
      return { ok: false, reason: 'PAYMENT_NOT_SUCCEEDED' }
    }
    const hold = this.inventory.getHold(intent.holdId)
    if (!hold) return { ok: false, reason: 'UNKNOWN_HOLD' }

    try {
      const captured = await this.inventory.captureHold(hold.holdId, intent.buyerUserId)
      const { ticket } = await this.ledger.issueTicket({
        eventId: hold.eventId,
        ownerUserId: intent.buyerUserId,
        seatLabel: hold.seatLabel,
      })
      return { ok: true, hold: captured, ticketId: ticket.ticketId }
    } catch (err) {
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'FINALIZE_FAILED',
        hold,
      }
    }
  }
}
