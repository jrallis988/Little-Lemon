export type TicketLifecycle =
  | 'ISSUED'
  | 'TRANSFERRED'
  | 'SCANNED'
  | 'INVALIDATED'

export type LedgerEventType =
  | 'TICKET_ISSUED'
  | 'TICKET_TRANSFERRED'
  | 'TICKET_SCANNED'
  | 'TICKET_INVALIDATED'

export interface TicketRecord {
  ticketId: string
  eventId: string
  ownerUserId: string
  barcodeSecret: string
  status: TicketLifecycle
  seatLabel: string
  issuedAt: string
  updatedAt: string
  scanCount: number
}

export interface LedgerEvent {
  eventId: string
  sequence: number
  type: LedgerEventType
  ticketId: string
  actorUserId: string
  payload: Record<string, unknown>
  occurredAt: string
  prevHash: string
  hash: string
}

export interface ScanResult {
  ok: boolean
  reason?: string
  ticket?: TicketRecord
  event?: LedgerEvent
}
