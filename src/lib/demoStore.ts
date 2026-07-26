import { CheckoutService } from './checkout/checkoutService'
import { InventoryLockService } from './checkout/inventoryLock'
import { OidcClient } from './identity/oauth'
import { DeviceSessionService } from './identity/sessionTokens'
import { TransferHandshakeService } from './identity/transferHandshake'
import type { UserAccount } from './identity/types'
import { WebAuthnService } from './identity/webauthn'
import { EventLedger } from './ledger/eventLedger'

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

export function createDemoPlatform() {
  const ledger = new EventLedger()
  const inventory = new InventoryLockService()
  const checkout = new CheckoutService(inventory, ledger)
  const webauthn = new WebAuthnService('littlelemon.local', 'Little Lemon GateLedger')
  const sessions = new DeviceSessionService()
  const handshakes = new TransferHandshakeService(webauthn, sessions)
  const oidc = new OidcClient()
  oidc.registerUser(users.alice)
  oidc.registerUser(users.bob)

  for (const seat of ['A-1', 'A-2', 'B-1']) {
    inventory.seedSeat({
      eventId: EVENT_ID,
      seatLabel: seat,
      listPriceCents: 6500,
      currency: 'USD',
      available: true,
    })
  }

  return { ledger, inventory, checkout, webauthn, sessions, handshakes, oidc }
}

export type DemoPlatform = ReturnType<typeof createDemoPlatform>
