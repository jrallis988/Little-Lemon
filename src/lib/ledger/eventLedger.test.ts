import { describe, expect, it, vi } from 'vitest'
import { EventLedger } from './eventLedger'
import { TICKET_CHANNEL } from './pubsub'

describe('EventLedger cryptographic chain', () => {
  it('issues tickets and links events with a verifiable hash chain', async () => {
    const ledger = new EventLedger()
    const { ticket, event } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'A-12',
    })

    expect(ticket.status).toBe('ISSUED')
    expect(event.sequence).toBe(1)
    expect(event.prevHash).toBe('0'.repeat(64))
    expect(event.hash).toHaveLength(64)
    await expect(ledger.verifyChain()).resolves.toEqual({ valid: true })
  })

  it('revokes barcode validity for all subscribers when scanned at the gate', async () => {
    const ledger = new EventLedger()
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'B-1',
    })

    const listener = vi.fn()
    ledger.broker.subscribe(TICKET_CHANNEL, listener)
    ledger.broker.subscribe(`ticket:${ticket.ticketId}`, listener)

    expect(ledger.isBarcodeLive(ticket.ticketId, ticket.barcodeSecret)).toBe(true)

    const first = await ledger.scanAtGate(ticket.ticketId, ticket.barcodeSecret, 'gate-north')
    expect(first.ok).toBe(true)
    expect(listener).toHaveBeenCalled()
    expect(ledger.isBarcodeLive(ticket.ticketId, ticket.barcodeSecret)).toBe(false)

    const clonedScreenshot = await ledger.scanAtGate(
      ticket.ticketId,
      ticket.barcodeSecret,
      'gate-south',
    )
    expect(clonedScreenshot.ok).toBe(false)
    expect(clonedScreenshot.reason).toBe('ALREADY_SCANNED')
  })

  it('rejects forged barcodes and detects chain tampering', async () => {
    const ledger = new EventLedger()
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'C-3',
    })

    const forged = await ledger.scanAtGate(ticket.ticketId, 'bc_forged_pdf_clone', 'gate-1')
    expect(forged).toEqual({ ok: false, reason: 'BARCODE_MISMATCH' })

    const live = (
      ledger as unknown as { events: Array<{ payload: Record<string, unknown> }> }
    ).events
    live[0].payload = { seatLabel: 'HACKED' }
    const broken = await ledger.verifyChain()
    expect(broken.valid).toBe(false)
    expect(broken.brokenAt).toBe(1)
  })

  it('blocks transfers after scan/invalidation', async () => {
    const ledger = new EventLedger()
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'D-4',
    })
    await ledger.scanAtGate(ticket.ticketId, ticket.barcodeSecret, 'gate-1')
    await expect(
      ledger.transferTicket({
        ticketId: ticket.ticketId,
        fromUserId: 'user_a',
        toUserId: 'user_b',
        handshakeId: 'hs_x',
      }),
    ).rejects.toThrow(/TRANSFER_FORBIDDEN/)
  })
})
