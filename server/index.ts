import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { streamSSE } from 'hono/streaming'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { TICKET_CHANNEL } from '../src/lib/ledger/pubsub'
import { createServerPlatform, persistInventory, users } from './platform'

const dataDir = resolve(process.cwd(), 'data')
mkdirSync(dataDir, { recursive: true })
const platform = createServerPlatform(resolve(dataDir, 'gateledger.sqlite'))

const app = new Hono()
app.use('*', cors())

app.get('/api/health', (c) =>
  c.json({
    ok: true,
    service: 'gateledger-api',
    chainTip: platform.ledger.chainTip.slice(0, 16),
    tickets: platform.ledger.listTickets().length,
  }),
)

app.get('/api/meta', (c) =>
  c.json({
    eventId: platform.eventId,
    users,
  }),
)

app.get('/api/ledger/tickets', (c) => c.json({ tickets: platform.ledger.listTickets() }))

app.get('/api/ledger/events', (c) => c.json({ events: platform.ledger.listEvents() }))

app.get('/api/ledger/verify', async (c) => c.json(await platform.ledger.verifyChain()))

app.post('/api/ledger/issue', async (c) => {
  const body = await c.req.json<{ seatLabel?: string; ownerUserId?: string }>()
  const seatLabel =
    body.seatLabel ?? `A-${platform.ledger.listTickets().length + 1}`
  const ownerUserId = body.ownerUserId ?? users.alice.userId
  const result = await platform.ledger.issueTicket({
    eventId: platform.eventId,
    ownerUserId,
    seatLabel,
  })
  return c.json(result)
})

app.post('/api/ledger/scan', async (c) => {
  const body = await c.req.json<{
    ticketId: string
    barcodeSecret?: string
    gateId?: string
  }>()
  const ticket = platform.ledger.getTicket(body.ticketId)
  if (!ticket) return c.json({ ok: false, reason: 'UNKNOWN_TICKET' }, 404)
  const result = await platform.ledger.scanAtGate(
    body.ticketId,
    body.barcodeSecret ?? ticket.barcodeSecret,
    body.gateId ?? 'gate-main',
  )
  return c.json(result)
})

app.get('/api/ledger/stream', (c) =>
  streamSSE(c, async (stream) => {
    let closed = false
    c.req.raw.signal.addEventListener('abort', () => {
      closed = true
    })
    const unsubscribe = platform.ledger.broker.subscribe(TICKET_CHANNEL, (event) => {
      void stream.writeSSE({
        event: 'ledger',
        data: JSON.stringify(event),
        id: String(event.sequence),
      })
    })
    await stream.writeSSE({
      event: 'ready',
      data: JSON.stringify({ channel: TICKET_CHANNEL }),
    })
    while (!closed) {
      await stream.sleep(15_000)
      if (!closed) {
        await stream.writeSSE({ event: 'ping', data: String(Date.now()) })
      }
    }
    unsubscribe()
  }),
)

app.post('/api/identity/passkey/register', async (c) => {
  const options = platform.webauthn.beginRegistration(users.alice)
  const credential = await platform.webauthn.finishRegistration(
    users.alice.userId,
    'Alice primary phone',
    options.challenge,
    btoa('alice-platform-authenticator'),
  )
  return c.json({ options, credential })
})

app.post('/api/identity/session', async (c) => {
  const session = await platform.sessions.issue(
    users.alice.userId,
    users.alice.primaryDeviceId,
  )
  return c.json({ session })
})

app.post('/api/identity/session/verify-ato', async (c) => {
  const body = await c.req.json<{ sessionId: string; token: string }>()
  const result = await platform.sessions.verify(
    body.sessionId,
    body.token,
    'attacker_device_clone',
  )
  return c.json(result)
})

app.post('/api/identity/transfer/start', async (c) => {
  const body = await c.req.json<{
    ticketId?: string
    sessionId: string
    sessionToken: string
  }>()
  let ticketId = body.ticketId
  if (!ticketId || !platform.ledger.getTicket(ticketId)) {
    const issued = await platform.ledger.issueTicket({
      eventId: platform.eventId,
      ownerUserId: users.alice.userId,
      seatLabel: 'VIP-1',
    })
    ticketId = issued.ticket.ticketId
  }
  try {
    const handshake = await platform.handshakes.initiate({
      ticketId,
      fromUser: users.alice,
      toUserId: users.bob.userId,
      sessionId: body.sessionId,
      sessionToken: body.sessionToken,
      deviceId: users.alice.primaryDeviceId,
    })
    return c.json({ handshake, ticketId })
  } catch (err) {
    return c.json(
      { error: err instanceof Error ? err.message : 'TRANSFER_INIT_FAILED' },
      400,
    )
  }
})

app.post('/api/identity/transfer/approve', async (c) => {
  const body = await c.req.json<{
    handshakeId: string
    credentialId: string
    challenge: string
    signCount: number
  }>()
  try {
    const digest = await platform.webauthn.buildAssertionDigest(
      body.credentialId,
      body.challenge,
    )
    const handshake = await platform.handshakes.confirmWithPasskey({
      handshakeId: body.handshakeId,
      credentialId: body.credentialId,
      challenge: body.challenge,
      signatureDigest: digest,
      signCount: body.signCount,
    })
    const transfer = await platform.ledger.transferTicket({
      ticketId: handshake.ticketId,
      fromUserId: users.alice.userId,
      toUserId: users.bob.userId,
      handshakeId: handshake.handshakeId,
    })
    return c.json({ handshake, ticket: transfer.ticket })
  } catch (err) {
    return c.json(
      { error: err instanceof Error ? err.message : 'TRANSFER_APPROVE_FAILED' },
      400,
    )
  }
})

app.get('/api/checkout/inventory', (c) => {
  const seats = ['A-1', 'A-2', 'B-1'].map((seatLabel) =>
    platform.inventory.getSeat(platform.eventId, seatLabel),
  )
  return c.json({
    seats: seats.filter(Boolean),
    ticketsIssued: platform.ledger.listTickets().length,
  })
})

app.post('/api/checkout', async (c) => {
  const body = await c.req.json<{
    seatLabel: string
    offeredPriceCents: number
    currency: string
    buyerUserId?: string
    idempotencyKey?: string
  }>()
  const result = await platform.checkout.checkout({
    eventId: platform.eventId,
    seatLabel: body.seatLabel,
    buyerUserId: body.buyerUserId ?? users.bob.userId,
    offeredPriceCents: body.offeredPriceCents,
    currency: body.currency,
    idempotencyKey: body.idempotencyKey ?? `api_${body.seatLabel}_${Date.now()}`,
  })
  persistInventory(platform)
  return c.json(result)
})

app.post('/api/checkout/race', async (c) => {
  const body = await c.req.json<{ seatLabel?: string; contenders?: number }>()
  const seatLabel = body.seatLabel ?? 'B-1'
  const contenders = body.contenders ?? 8
  const results = await Promise.all(
    Array.from({ length: contenders }, (_, i) =>
      platform.checkout.checkout({
        eventId: platform.eventId,
        seatLabel,
        buyerUserId: `racer_${i}`,
        offeredPriceCents: 6500,
        currency: 'USD',
        idempotencyKey: `race_${Date.now()}_${i}`,
      }),
    ),
  )
  persistInventory(platform)
  return c.json({
    winners: results.filter((r) => r.ok),
    failures: results.filter((r) => !r.ok),
    ticketsIssued: platform.ledger.listTickets().length,
  })
})

const port = Number(process.env.PORT ?? 8787)
console.log(`GateLedger API listening on http://127.0.0.1:${port}`)
serve({ fetch: app.fetch, port })
