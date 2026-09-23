import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { loadEvents, loadTickets } from './db'
import { createServerPlatform } from './platform'

describe('SQLite-backed server platform', () => {
  const dirs: string[] = []

  afterEach(() => {
    while (dirs.length) {
      const dir = dirs.pop()
      if (dir) rmSync(dir, { recursive: true, force: true })
    }
  })

  it('persists issued tickets and reloads the hash chain', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'gateledger-'))
    dirs.push(dir)
    const dbPath = join(dir, 'test.sqlite')

    const first = createServerPlatform(dbPath)
    const { ticket } = await first.ledger.issueTicket({
      eventId: first.eventId,
      ownerUserId: 'user_alice',
      seatLabel: 'Z-9',
    })
    expect(loadTickets(first.db)).toHaveLength(1)
    expect(loadEvents(first.db)).toHaveLength(1)
    first.db.close()

    const second = createServerPlatform(dbPath)
    expect(second.ledger.listTickets().map((t) => t.ticketId)).toEqual([ticket.ticketId])
    await expect(second.ledger.verifyChain()).resolves.toEqual({ valid: true })
    const live = await second.ledger.liveBarcode(ticket.ticketId)
    expect(live).toBeTruthy()
    const replay = await second.ledger.scanAtGate(
      ticket.ticketId,
      live!.token,
      'gate-1',
    )
    expect(replay.ok).toBe(true)
    second.db.close()

    const third = createServerPlatform(dbPath)
    expect(third.ledger.getTicket(ticket.ticketId)?.status).toBe('SCANNED')
    const clone = await third.ledger.scanAtGate(
      ticket.ticketId,
      live!.token,
      'gate-2',
    )
    expect(clone.ok).toBe(false)
    third.db.close()
  })

  it('persists WebAuthn credentials across restarts', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'gateledger-'))
    dirs.push(dir)
    const dbPath = join(dir, 'id.sqlite')
    const first = createServerPlatform(dbPath)
    const options = first.webauthn.beginRegistration(first.users.alice)
    const credential = await first.webauthn.finishRegistration(
      first.users.alice.userId,
      'Phone',
      options.challenge,
      'pk',
    )
    first.persistCredential(credential.credentialId)
    first.db.close()

    const second = createServerPlatform(dbPath)
    expect(second.webauthn.listCredentials(first.users.alice.userId)).toHaveLength(1)
    second.db.close()
  })
})
