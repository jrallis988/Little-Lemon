import { randomId } from '../crypto/hash'
import { assertPriceMatchesListing, assertSupportedCurrency } from './currency'
import type { CheckoutRequest, HoldStatus, InventoryHold, SeatInventory } from './types'

/**
 * Optimistic inventory locking for flash-sale seats.
 * Concurrent claimers race; only one hold is granted per seat.
 */
export class InventoryLockService {
  private seats = new Map<string, SeatInventory>()
  private holds = new Map<string, InventoryHold>()
  private seatHoldIndex = new Map<string, string>() // seatKey -> holdId
  private idempotency = new Map<string, InventoryHold>()
  /** Mutex queue per seat for simulating atomic compare-and-set under concurrency. */
  private seatQueues = new Map<string, Promise<unknown>>()

  seedSeat(seat: SeatInventory) {
    this.seats.set(this.seatKey(seat.eventId, seat.seatLabel), { ...seat })
  }

  getSeat(eventId: string, seatLabel: string): SeatInventory | undefined {
    const seat = this.seats.get(this.seatKey(eventId, seatLabel))
    return seat ? { ...seat } : undefined
  }

  getHold(holdId: string): InventoryHold | undefined {
    const hold = this.holds.get(holdId)
    return hold ? { ...hold } : undefined
  }

  async claimHold(request: CheckoutRequest, ttlMs = 120_000): Promise<InventoryHold> {
    const existing = this.idempotency.get(request.idempotencyKey)
    if (existing) return { ...existing }

    const currency = assertSupportedCurrency(request.currency)
    const key = this.seatKey(request.eventId, request.seatLabel)

    return this.withSeatLock(key, async () => {
      const again = this.idempotency.get(request.idempotencyKey)
      if (again) return { ...again }

      this.expireIfNeeded(key)
      const seat = this.seats.get(key)
      if (!seat || !seat.available) {
        throw new Error('SEAT_UNAVAILABLE')
      }
      assertPriceMatchesListing(
        request.offeredPriceCents,
        seat.listPriceCents,
        currency,
        seat.currency,
      )
      if (this.seatHoldIndex.has(key)) {
        throw new Error('SEAT_HELD')
      }

      const hold: InventoryHold = {
        holdId: randomId('hold'),
        eventId: request.eventId,
        seatLabel: request.seatLabel,
        buyerUserId: request.buyerUserId,
        currency,
        unitPriceCents: request.offeredPriceCents,
        expiresAt: new Date(Date.now() + ttlMs).toISOString(),
        status: 'HELD',
      }
      seat.available = false
      this.holds.set(hold.holdId, hold)
      this.seatHoldIndex.set(key, hold.holdId)
      this.idempotency.set(request.idempotencyKey, hold)
      return { ...hold }
    })
  }

  async captureHold(holdId: string, buyerUserId: string): Promise<InventoryHold> {
    const hold = this.holds.get(holdId)
    if (!hold) throw new Error('UNKNOWN_HOLD')
    if (hold.buyerUserId !== buyerUserId) throw new Error('HOLD_OWNER_MISMATCH')
    this.expireHold(hold)
    if (hold.status !== 'HELD') throw new Error(`HOLD_${hold.status}`)
    hold.status = 'CAPTURED'
    return { ...hold }
  }

  async releaseHold(holdId: string, buyerUserId: string): Promise<InventoryHold> {
    const hold = this.holds.get(holdId)
    if (!hold) throw new Error('UNKNOWN_HOLD')
    if (hold.buyerUserId !== buyerUserId) throw new Error('HOLD_OWNER_MISMATCH')
    if (hold.status === 'CAPTURED') throw new Error('HOLD_CAPTURED')
    hold.status = 'RELEASED'
    this.freeSeat(hold)
    return { ...hold }
  }

  /** Test helper: force TTL expiry. */
  forceExpire(holdId: string) {
    const hold = this.holds.get(holdId)
    if (!hold) return
    hold.expiresAt = new Date(Date.now() - 1).toISOString()
    this.expireHold(hold)
  }

  private expireIfNeeded(seatKey: string) {
    const holdId = this.seatHoldIndex.get(seatKey)
    if (!holdId) return
    const hold = this.holds.get(holdId)
    if (hold) this.expireHold(hold)
  }

  private expireHold(hold: InventoryHold) {
    if (hold.status !== 'HELD') return
    if (new Date(hold.expiresAt).getTime() >= Date.now()) return
    hold.status = 'EXPIRED'
    this.freeSeat(hold)
  }

  private freeSeat(hold: InventoryHold) {
    const key = this.seatKey(hold.eventId, hold.seatLabel)
    this.seatHoldIndex.delete(key)
    const seat = this.seats.get(key)
    if (seat && hold.status !== 'CAPTURED') {
      seat.available = true
    }
  }

  private seatKey(eventId: string, seatLabel: string) {
    return `${eventId}::${seatLabel}`
  }

  private async withSeatLock<T>(seatKey: string, fn: () => Promise<T>): Promise<T> {
    const prev = this.seatQueues.get(seatKey) ?? Promise.resolve()
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    this.seatQueues.set(
      seatKey,
      prev.then(() => gate),
    )
    await prev
    try {
      return await fn()
    } finally {
      release()
    }
  }

  statusOf(holdId: string): HoldStatus | undefined {
    return this.holds.get(holdId)?.status
  }
}
