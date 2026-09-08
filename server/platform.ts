import { CheckoutService } from '../src/lib/checkout/checkoutService'
import { InventoryLockService } from '../src/lib/checkout/inventoryLock'
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
  loadEvents,
  loadSeats,
  loadTickets,
  openDatabase,
  syncTicketFromLedger,
  upsertSeat,
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
  webauthn: WebAuthnService
  sessions: DeviceSessionService
  handshakes: TransferHandshakeService
  oidc: OidcClient
  users: typeof users
  eventId: string
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

  const checkout = new CheckoutService(inventory, ledger)
  const webauthn = new WebAuthnService('littlelemon.local', 'Little Lemon GateLedger')
  const sessions = new DeviceSessionService()
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
    webauthn,
    sessions,
    handshakes,
    oidc,
    users,
    eventId: EVENT_ID,
  }
}

export function persistInventory(platform: ServerPlatform) {
  for (const seatLabel of ['A-1', 'A-2', 'B-1']) {
    const seat = platform.inventory.getSeat(platform.eventId, seatLabel)
    if (seat) upsertSeat(platform.db, seat)
  }
}
