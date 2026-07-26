export type HoldStatus = 'HELD' | 'CAPTURED' | 'RELEASED' | 'EXPIRED'

export interface SeatInventory {
  eventId: string
  seatLabel: string
  listPriceCents: number
  currency: string
  available: boolean
}

export interface InventoryHold {
  holdId: string
  eventId: string
  seatLabel: string
  buyerUserId: string
  currency: string
  unitPriceCents: number
  expiresAt: string
  status: HoldStatus
}

export interface CheckoutRequest {
  eventId: string
  seatLabel: string
  buyerUserId: string
  offeredPriceCents: number
  currency: string
  idempotencyKey: string
}

export interface CheckoutResult {
  ok: boolean
  reason?: string
  hold?: InventoryHold
  ticketId?: string
}
