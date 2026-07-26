import { randomId, sha256Hex } from '../crypto/hash'
import { EventBroker, TICKET_CHANNEL } from './pubsub'
import type {
  LedgerEvent,
  LedgerEventType,
  ScanResult,
  TicketLifecycle,
  TicketRecord,
} from './types'

const GENESIS_HASH = '0'.repeat(64)

interface IssueInput {
  eventId: string
  ownerUserId: string
  seatLabel: string
}

interface TransferInput {
  ticketId: string
  fromUserId: string
  toUserId: string
  handshakeId: string
}

export class EventLedger {
  private tickets = new Map<string, TicketRecord>()
  private events: LedgerEvent[] = []
  private tipHash = GENESIS_HASH
  readonly broker = new EventBroker<LedgerEvent>()

  get chainTip(): string {
    return this.tipHash
  }

  listEvents(): LedgerEvent[] {
    return [...this.events]
  }

  getTicket(ticketId: string): TicketRecord | undefined {
    const ticket = this.tickets.get(ticketId)
    return ticket ? { ...ticket } : undefined
  }

  listTickets(): TicketRecord[] {
    return [...this.tickets.values()].map((t) => ({ ...t }))
  }

  async issueTicket(input: IssueInput): Promise<{ ticket: TicketRecord; event: LedgerEvent }> {
    const now = new Date().toISOString()
    const ticketId = randomId('tkt')
    const barcodeSecret = randomId('bc')
    const ticket: TicketRecord = {
      ticketId,
      eventId: input.eventId,
      ownerUserId: input.ownerUserId,
      barcodeSecret,
      status: 'ISSUED',
      seatLabel: input.seatLabel,
      issuedAt: now,
      updatedAt: now,
      scanCount: 0,
    }
    this.tickets.set(ticketId, ticket)
    const event = await this.append('TICKET_ISSUED', ticketId, input.ownerUserId, {
      seatLabel: input.seatLabel,
      eventId: input.eventId,
      barcodeFingerprint: await sha256Hex(barcodeSecret),
    })
    return { ticket: { ...ticket }, event }
  }

  async transferTicket(input: TransferInput): Promise<{ ticket: TicketRecord; event: LedgerEvent }> {
    const ticket = this.requireTicket(input.ticketId)
    if (ticket.ownerUserId !== input.fromUserId) {
      throw new Error('TRANSFER_FORBIDDEN: actor is not the current owner')
    }
    if (ticket.status === 'SCANNED' || ticket.status === 'INVALIDATED') {
      throw new Error(`TRANSFER_FORBIDDEN: ticket status is ${ticket.status}`)
    }
    ticket.ownerUserId = input.toUserId
    ticket.status = 'TRANSFERRED'
    ticket.updatedAt = new Date().toISOString()
    const event = await this.append('TICKET_TRANSFERRED', ticket.ticketId, input.fromUserId, {
      toUserId: input.toUserId,
      handshakeId: input.handshakeId,
    })
    return { ticket: { ...ticket }, event }
  }

  /**
   * Gate scan: first valid presentation wins. Ledger append + pub/sub
   * instantly revoke validity for every connected client.
   */
  async scanAtGate(
    ticketId: string,
    presentedBarcode: string,
    gateId: string,
  ): Promise<ScanResult> {
    const ticket = this.tickets.get(ticketId)
    if (!ticket) return { ok: false, reason: 'UNKNOWN_TICKET' }
    if (ticket.barcodeSecret !== presentedBarcode) {
      return { ok: false, reason: 'BARCODE_MISMATCH' }
    }
    if (ticket.status === 'SCANNED') {
      return { ok: false, reason: 'ALREADY_SCANNED', ticket: { ...ticket } }
    }
    if (ticket.status === 'INVALIDATED') {
      return { ok: false, reason: 'INVALIDATED', ticket: { ...ticket } }
    }

    const previousStatus = ticket.status
    ticket.status = 'SCANNED'
    ticket.scanCount += 1
    ticket.updatedAt = new Date().toISOString()
    const event = await this.append('TICKET_SCANNED', ticket.ticketId, 'gate_system', {
      gateId,
      previousStatus,
    })
    return { ok: true, ticket: { ...ticket }, event }
  }

  async invalidate(ticketId: string, actorUserId: string, reason: string) {
    const ticket = this.requireTicket(ticketId)
    if (ticket.status === 'SCANNED') {
      throw new Error('INVALIDATE_FORBIDDEN: already scanned')
    }
    ticket.status = 'INVALIDATED'
    ticket.updatedAt = new Date().toISOString()
    const event = await this.append('TICKET_INVALIDATED', ticketId, actorUserId, { reason })
    return { ticket: { ...ticket }, event }
  }

  /** Replay the hash chain; any tampering fails verification. */
  async verifyChain(): Promise<{ valid: boolean; brokenAt?: number }> {
    let prev = GENESIS_HASH
    for (const event of this.events) {
      if (event.prevHash !== prev) return { valid: false, brokenAt: event.sequence }
      const expected = await this.computeHash(event)
      if (expected !== event.hash) return { valid: false, brokenAt: event.sequence }
      prev = event.hash
    }
    return { valid: true }
  }

  isBarcodeLive(ticketId: string, presentedBarcode: string): boolean {
    const ticket = this.tickets.get(ticketId)
    if (!ticket) return false
    if (ticket.barcodeSecret !== presentedBarcode) return false
    return ticket.status === 'ISSUED' || ticket.status === 'TRANSFERRED'
  }

  private requireTicket(ticketId: string): TicketRecord {
    const ticket = this.tickets.get(ticketId)
    if (!ticket) throw new Error('UNKNOWN_TICKET')
    return ticket
  }

  private async append(
    type: LedgerEventType,
    ticketId: string,
    actorUserId: string,
    payload: Record<string, unknown>,
  ): Promise<LedgerEvent> {
    const sequence = this.events.length + 1
    const occurredAt = new Date().toISOString()
    const eventId = randomId('evt')
    const draft: Omit<LedgerEvent, 'hash'> = {
      eventId,
      sequence,
      type,
      ticketId,
      actorUserId,
      payload,
      occurredAt,
      prevHash: this.tipHash,
    }
    const hash = await this.computeHash(draft)
    const event: LedgerEvent = { ...draft, hash }
    this.events.push(event)
    this.tipHash = hash
    this.broker.publish(TICKET_CHANNEL, event)
    this.broker.publish(`ticket:${ticketId}`, event)
    return event
  }

  private async computeHash(
    event: Omit<LedgerEvent, 'hash'> | LedgerEvent,
  ): Promise<string> {
    const canonical = JSON.stringify({
      eventId: event.eventId,
      sequence: event.sequence,
      type: event.type,
      ticketId: event.ticketId,
      actorUserId: event.actorUserId,
      payload: event.payload,
      occurredAt: event.occurredAt,
      prevHash: event.prevHash,
    })
    return sha256Hex(canonical)
  }
}

export function statusLabel(status: TicketLifecycle): string {
  switch (status) {
    case 'ISSUED':
      return 'Valid'
    case 'TRANSFERRED':
      return 'Valid (transferred)'
    case 'SCANNED':
      return 'Redeemed'
    case 'INVALIDATED':
      return 'Invalid'
  }
}
