import { describe, expect, it, vi } from 'vitest'
import { EventLedger } from './eventLedger'
import { TICKET_CHANNEL } from './pubsub'
import { BARCODE_STEP_MS, staleToken } from './rotatingBarcode'

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

    const live = await ledger.liveBarcode(ticket.ticketId)
    expect(live).toBeTruthy()
    await expect(ledger.isBarcodeLive(ticket.ticketId, live!.token)).resolves.toBe(true)

    const first = await ledger.scanAtGate(ticket.ticketId, live!.token, 'gate-north')
    expect(first.ok).toBe(true)
    expect(listener).toHaveBeenCalled()
    await expect(ledger.isBarcodeLive(ticket.ticketId, live!.token)).resolves.toBe(false)

    const clonedScreenshot = await ledger.scanAtGate(
      ticket.ticketId,
      live!.token,
      'gate-south',
    )
    expect(clonedScreenshot.ok).toBe(false)
    expect(clonedScreenshot.reason).toBe('ALREADY_SCANNED')
  })

  it('rejects forged and stale screenshot barcodes', async () => {
    const ledger = new EventLedger()
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'C-3',
    })

    const forged = await ledger.scanAtGate(ticket.ticketId, 'bc_forged_pdf_clone', 'gate-1')
    expect(forged).toEqual({ ok: false, reason: 'BARCODE_MISMATCH' })

    const now = Date.now()
    const frozen = await staleToken(ticket.barcodeSecret, 2, now)
    const stale = await ledger.scanAtGate(ticket.ticketId, frozen, 'gate-1', now)
    expect(stale).toEqual({ ok: false, reason: 'BARCODE_MISMATCH' })

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
    const live = await ledger.liveBarcode(ticket.ticketId)
    await ledger.scanAtGate(ticket.ticketId, live!.token, 'gate-1')
    await expect(
      ledger.transferTicket({
        ticketId: ticket.ticketId,
        fromUserId: 'user_a',
        toUserId: 'user_b',
        handshakeId: 'hs_x',
      }),
    ).rejects.toThrow(/TRANSFER_FORBIDDEN/)
  })

  it('accepts a live rotating token after the display window advances within skew', async () => {
    const ledger = new EventLedger()
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_jazz',
      ownerUserId: 'user_a',
      seatLabel: 'E-5',
    })
    const t0 = 1_700_000_000_000
    const code = await ledger.liveBarcode(ticket.ticketId, t0)
    // Within ±1 step skew at gate clocks
    const result = await ledger.scanAtGate(
      ticket.ticketId,
      code!.token,
      'gate-1',
      t0 + BARCODE_STEP_MS,
    )
    expect(result.ok).toBe(true)
  })
})
