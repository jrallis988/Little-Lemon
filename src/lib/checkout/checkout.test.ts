import { describe, expect, it } from 'vitest'
import { EventLedger } from '../ledger/eventLedger'
import { CheckoutService } from './checkoutService'
import { InventoryLockService } from './inventoryLock'

function seedInventory() {
  const inventory = new InventoryLockService()
  inventory.seedSeat({
    eventId: 'evt_flash',
    seatLabel: 'GA-100',
    listPriceCents: 7500,
    currency: 'USD',
    available: true,
  })
  return inventory
}

describe('Checkout & inventory locking', () => {
  it('captures a hold and issues exactly one ledger ticket', async () => {
    const inventory = seedInventory()
    const ledger = new EventLedger()
    const checkout = new CheckoutService(inventory, ledger)

    const result = await checkout.checkout({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 7500,
      currency: 'USD',
      idempotencyKey: 'idem_1',
    })

    expect(result.ok).toBe(true)
    expect(result.ticketId).toBeTruthy()
    expect(ledger.listTickets()).toHaveLength(1)
    expect(inventory.getSeat('evt_flash', 'GA-100')?.available).toBe(false)
  })

  it('fails closed on currency manipulation and price tampering', async () => {
    const inventory = seedInventory()
    const ledger = new EventLedger()
    const checkout = new CheckoutService(inventory, ledger)

    const fx = await checkout.checkout({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 7500,
      currency: 'EUR',
      idempotencyKey: 'idem_fx',
    })
    expect(fx.ok).toBe(false)
    expect(fx.reason).toBe('CURRENCY_MISMATCH')

    const underpay = await checkout.checkout({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 1,
      currency: 'USD',
      idempotencyKey: 'idem_under',
    })
    expect(underpay.ok).toBe(false)
    expect(underpay.reason).toBe('PRICE_TAMPER')
    expect(ledger.listTickets()).toHaveLength(0)
  })

  it('is idempotent for the same checkout key', async () => {
    const inventory = seedInventory()
    const first = await inventory.claimHold({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 7500,
      currency: 'USD',
      idempotencyKey: 'idem_same',
    })
    const second = await inventory.claimHold({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 7500,
      currency: 'USD',
      idempotencyKey: 'idem_same',
    })
    expect(second.holdId).toBe(first.holdId)
  })

  it('expires holds and returns the seat to inventory', async () => {
    const inventory = seedInventory()
    const hold = await inventory.claimHold({
      eventId: 'evt_flash',
      seatLabel: 'GA-100',
      buyerUserId: 'buyer_1',
      offeredPriceCents: 7500,
      currency: 'USD',
      idempotencyKey: 'idem_ttl',
    })
    inventory.forceExpire(hold.holdId)
    expect(inventory.statusOf(hold.holdId)).toBe('EXPIRED')
    expect(inventory.getSeat('evt_flash', 'GA-100')?.available).toBe(true)
  })
})

describe('Flash-sale race conditions', () => {
  it('allows only one concurrent claimer to win a held seat', async () => {
    const inventory = seedInventory()
    const contenders = Array.from({ length: 25 }, (_, i) =>
      inventory
        .claimHold({
          eventId: 'evt_flash',
          seatLabel: 'GA-100',
          buyerUserId: `buyer_${i}`,
          offeredPriceCents: 7500,
          currency: 'USD',
          idempotencyKey: `race_${i}`,
        })
        .then((hold) => ({ ok: true as const, hold }))
        .catch((err: Error) => ({ ok: false as const, reason: err.message })),
    )

    const results = await Promise.all(contenders)
    const winners = results.filter((r) => r.ok)
    const losers = results.filter((r) => !r.ok)

    expect(winners).toHaveLength(1)
    expect(losers.length).toBe(24)
    for (const loser of losers) {
      if (!loser.ok) expect(loser.reason).toMatch(/SEAT_HELD|SEAT_UNAVAILABLE/)
    }
  })

  it('never issues duplicate ledger tickets when checkout races', async () => {
    const inventory = seedInventory()
    const ledger = new EventLedger()
    const checkout = new CheckoutService(inventory, ledger)

    const results = await Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        checkout.checkout({
          eventId: 'evt_flash',
          seatLabel: 'GA-100',
          buyerUserId: `buyer_${i}`,
          offeredPriceCents: 7500,
          currency: 'USD',
          idempotencyKey: `checkout_race_${i}`,
        }),
      ),
    )

    const successes = results.filter((r) => r.ok)
    expect(successes).toHaveLength(1)
    expect(ledger.listTickets()).toHaveLength(1)
    expect(new Set(ledger.listTickets().map((t) => t.seatLabel)).size).toBe(1)
  })
})
