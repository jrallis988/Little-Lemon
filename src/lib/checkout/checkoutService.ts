import type { EventLedger } from '../ledger/eventLedger'
import type { InventoryLockService } from './inventoryLock'
import type { CheckoutRequest, CheckoutResult } from './types'

/**
 * Checkout orchestration: lock inventory → capture payment stub → issue ticket on ledger.
 * Fails closed: never issues duplicate access rights when the seat race is lost.
 */
export class CheckoutService {
  constructor(
    private readonly inventory: InventoryLockService,
    private readonly ledger: EventLedger,
  ) {}

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
      // Payment gateway stub — amount/currency already validated at hold time.
      await this.capturePayment(hold.holdId, hold.unitPriceCents, hold.currency)
      const captured = await this.inventory.captureHold(hold.holdId, request.buyerUserId)
      const { ticket } = await this.ledger.issueTicket({
        eventId: request.eventId,
        ownerUserId: request.buyerUserId,
        seatLabel: request.seatLabel,
      })
      return { ok: true, hold: captured, ticketId: ticket.ticketId }
    } catch (err) {
      await this.inventory.releaseHold(hold.holdId, request.buyerUserId).catch(() => undefined)
      return {
        ok: false,
        reason: err instanceof Error ? err.message : 'CHECKOUT_FAILED',
        hold,
      }
    }
  }

  private async capturePayment(
    holdId: string,
    amountCents: number,
    currency: string,
  ): Promise<void> {
    if (amountCents <= 0) throw new Error('PAYMENT_REJECTED')
    if (!currency) throw new Error('PAYMENT_REJECTED')
    // Deterministic success for demo; wire Stripe/Adyen here.
    void holdId
  }
}
