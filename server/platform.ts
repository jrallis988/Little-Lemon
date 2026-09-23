import { CheckoutService } from '../src/lib/checkout/checkoutService'
import { InventoryLockService } from '../src/lib/checkout/inventoryLock'
import { StripePaymentProvider } from '../src/lib/checkout/payments'
import { OidcClient } from '../src/lib/identity/oauth'
import { DeviceSessionService } from '../src/lib/identity/sessionTokens'
import { TransferHandshakeService } from '../src/lib/identity/transferHandshake'
import type { UserAccount } from '../src/lib/identity/types'
import { WebAuthnService } from '../src/lib/identity/webauthn'
import { EventLedger } from '../src/lib/ledger/eventLedger'
import { TICKET_CHANNEL } from '../src/lib/ledger/pubsub'
import type { LedgerEvent } from '../src/lib/ledger/types'
import {
  insertLedgerEvent,
  loadCredentials,
  loadEvents,
  loadSeats,
  loadSessions,
  loadTickets,
  openDatabase,
  syncTicketFromLedger,
  upsertCredential,
  upsertSeat,
  upsertSession,
  type GateLedgerDb,
} from './db'

export const EVENT_ID = 'evt_little_lemon_night'

export const users = {
  alice: {
    userId: 'user_alice',
    email: 'alice@littlelemon.local',
    displayName: 'Alice Nguyen',
    primaryDeviceId: 'device_alice_phone',
  } satisfies UserAccount,
  bob: {
    userId: 'user_bob',
    email: 'bob@littlelemon.local',
    displayName: 'Bob Okonkwo',
    primaryDeviceId: 'device_bob_phone',
  } satisfies UserAccount,
}

export interface ServerPlatform {
  db: GateLedgerDb
  ledger: EventLedger
  inventory: InventoryLockService
  checkout: CheckoutService
  payments: StripePaymentProvider
  webauthn: WebAuthnService
  sessions: DeviceSessionService
  handshakes: TransferHandshakeService
  oidc: OidcClient
  users: typeof users
  eventId: string
  persistCredential: (credentialId: string) => void
  persistSession: (sessionId: string) => void
}

export function createServerPlatform(dbPath: string): ServerPlatform {
  const db = openDatabase(dbPath)
  const ledger = new EventLedger()
  ledger.hydrate(loadTickets(db), loadEvents(db))

  const inventory = new InventoryLockService()
  const seats = loadSeats(db)
  if (seats.length === 0) {
    for (const seatLabel of ['A-1', 'A-2', 'B-1']) {
      const seat = {
        eventId: EVENT_ID,
        seatLabel,
        listPriceCents: 6500,
        currency: 'USD',
        available: true,
      }
      inventory.seedSeat(seat)
      upsertSeat(db, seat)
    }
  } else {
    for (const seat of seats) inventory.seedSeat(seat)
  }

  const payments = new StripePaymentProvider({
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? 'whsec_gateledger_demo',
    secretKey: process.env.STRIPE_SECRET_KEY,
    allowTestConfirm:
      process.env.STRIPE_ALLOW_TEST_CONFIRM !== 'false' &&
      process.env.NODE_ENV !== 'production',
  })
  const checkout = new CheckoutService(inventory, ledger, payments)
  const webauthn = new WebAuthnService('littlelemon.local', 'Little Lemon GateLedger')
  webauthn.hydrate(loadCredentials(db))
  const sessions = new DeviceSessionService()
  sessions.hydrate(loadSessions(db))
  const handshakes = new TransferHandshakeService(webauthn, sessions)
  const oidc = new OidcClient()
  oidc.registerUser(users.alice)
  oidc.registerUser(users.bob)

  ledger.broker.subscribe(TICKET_CHANNEL, (event: LedgerEvent) => {
    insertLedgerEvent(db, event)
    syncTicketFromLedger(db, ledger.getTicket(event.ticketId))
  })

  return {
    db,
    ledger,
    inventory,
    checkout,
    payments,
    webauthn,
    sessions,
    handshakes,
    oidc,
    users,
    eventId: EVENT_ID,
    persistCredential(credentialId: string) {
      const credential = webauthn
        .exportCredentials()
        .find((c) => c.credentialId === credentialId)
      if (credential) upsertCredential(db, credential)
    },
    persistSession(sessionId: string) {
      const session = sessions.exportSessions().find((s) => s.sessionId === sessionId)
      if (session) upsertSession(db, session)
    },
  }
}

export function persistInventory(platform: ServerPlatform) {
  for (const seatLabel of ['A-1', 'A-2', 'B-1']) {
    const seat = platform.inventory.getSeat(platform.eventId, seatLabel)
    if (seat) upsertSeat(platform.db, seat)
  }
}
