import type { CheckoutResult } from './checkout/types'
import type {
  DeviceSession,
  TransferChallenge,
  WebAuthnCredential,
} from './identity/types'
import type { LedgerEvent, ScanResult, TicketRecord } from './ledger/types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  const data = (await res.json()) as T & { error?: string }
  if (!res.ok) {
    throw new Error(
      typeof data === 'object' && data && 'error' in data && data.error
        ? data.error
        : `API ${res.status}`,
    )
  }
  return data
}

export const api = {
  health: () => request<{ ok: boolean; tickets: number }>('/api/health'),
  listTickets: () => request<{ tickets: TicketRecord[] }>('/api/ledger/tickets'),
  listEvents: () => request<{ events: LedgerEvent[] }>('/api/ledger/events'),
  verifyChain: () => request<{ valid: boolean; brokenAt?: number }>('/api/ledger/verify'),
  issueTicket: (seatLabel?: string) =>
    request<{ ticket: TicketRecord; event: LedgerEvent }>('/api/ledger/issue', {
      method: 'POST',
      body: JSON.stringify({ seatLabel }),
    }),
  scanTicket: (ticketId: string, gateId = 'gate-main') =>
    request<ScanResult>('/api/ledger/scan', {
      method: 'POST',
      body: JSON.stringify({ ticketId, gateId }),
    }),
  registerPasskey: () =>
    request<{
      options: { rp: { id: string } }
      credential: WebAuthnCredential
    }>('/api/identity/passkey/register', { method: 'POST', body: '{}' }),
  openSession: () =>
    request<{ session: DeviceSession }>('/api/identity/session', {
      method: 'POST',
      body: '{}',
    }),
  stealSession: (sessionId: string, token: string) =>
    request<{ ok: boolean; reason?: string }>('/api/identity/session/verify-ato', {
      method: 'POST',
      body: JSON.stringify({ sessionId, token }),
    }),
  startTransfer: (sessionId: string, sessionToken: string, ticketId?: string) =>
    request<{ handshake: TransferChallenge; ticketId: string }>(
      '/api/identity/transfer/start',
      {
        method: 'POST',
        body: JSON.stringify({ sessionId, sessionToken, ticketId }),
      },
    ),
  approveTransfer: (input: {
    handshakeId: string
    credentialId: string
    challenge: string
    signCount: number
  }) =>
    request<{ handshake: TransferChallenge; ticket: TicketRecord }>(
      '/api/identity/transfer/approve',
      { method: 'POST', body: JSON.stringify(input) },
    ),
  inventory: () =>
    request<{
      seats: Array<{
        seatLabel: string
        available: boolean
        listPriceCents: number
        currency: string
      }>
      ticketsIssued: number
    }>('/api/checkout/inventory'),
  checkout: (input: {
    seatLabel: string
    offeredPriceCents: number
    currency: string
  }) =>
    request<CheckoutResult>('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
  race: (seatLabel = 'B-1', contenders = 8) =>
    request<{
      winners: CheckoutResult[]
      failures: CheckoutResult[]
      ticketsIssued: number
    }>('/api/checkout/race', {
      method: 'POST',
      body: JSON.stringify({ seatLabel, contenders }),
    }),
}

export function subscribeLedger(onEvent: (event: LedgerEvent) => void): () => void {
  const source = new EventSource('/api/ledger/stream')
  source.addEventListener('ledger', (msg) => {
    onEvent(JSON.parse((msg as MessageEvent).data) as LedgerEvent)
  })
  return () => source.close()
}
