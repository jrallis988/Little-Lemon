import { useEffect, useState } from 'react'
import type { DemoPlatform } from '../lib/demoStore'
import { users } from '../lib/demoStore'
import { statusLabel } from '../lib/ledger/eventLedger'
import type { LedgerEvent, TicketRecord } from '../lib/ledger/types'
import { TICKET_CHANNEL } from '../lib/ledger/pubsub'

interface Props {
  platform: DemoPlatform
}

export function LedgerPanel({ platform }: Props) {
  const { ledger } = platform
  const [tickets, setTickets] = useState<TicketRecord[]>([])
  const [events, setEvents] = useState<LedgerEvent[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [status, setStatus] = useState('')
  const [chainOk, setChainOk] = useState(true)
  const [liveFeed, setLiveFeed] = useState<string[]>([])

  const refresh = async () => {
    setTickets(ledger.listTickets())
    setEvents(ledger.listEvents())
    const verification = await ledger.verifyChain()
    setChainOk(verification.valid)
  }

  useEffect(() => {
    let active = true
    const pull = async () => {
      setTickets(ledger.listTickets())
      setEvents(ledger.listEvents())
      const verification = await ledger.verifyChain()
      if (active) setChainOk(verification.valid)
    }
    void pull()
    return ledger.broker.subscribe(TICKET_CHANNEL, (event) => {
      setLiveFeed((prev) =>
        [
          `${event.occurredAt.slice(11, 19)} ${event.type} · ${event.ticketId}`,
          ...prev,
        ].slice(0, 12),
      )
      void pull()
    })
  }, [ledger])

  const issue = async () => {
    const seat = `A-${tickets.length + 1}`
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_little_lemon_night',
      ownerUserId: users.alice.userId,
      seatLabel: seat,
    })
    setSelectedId(ticket.ticketId)
    setStatus(`Issued ${ticket.ticketId} for seat ${seat}`)
    await refresh()
  }

  const scan = async () => {
    const ticket = ledger.getTicket(selectedId)
    if (!ticket) {
      setStatus('Select a ticket first')
      return
    }
    const result = await ledger.scanAtGate(ticket.ticketId, ticket.barcodeSecret, 'gate-main')
    setStatus(
      result.ok
        ? 'Scan accepted — barcode revoked across all clients'
        : `Scan rejected: ${result.reason}`,
    )
    await refresh()
  }

  const scanClone = async () => {
    const ticket = ledger.getTicket(selectedId)
    if (!ticket) {
      setStatus('Select a ticket first')
      return
    }
    const result = await ledger.scanAtGate(ticket.ticketId, ticket.barcodeSecret, 'gate-clone')
    setStatus(
      result.ok
        ? 'Unexpected accept'
        : `Screenshot/PDF clone blocked: ${result.reason}`,
    )
    await refresh()
  }

  const selected = tickets.find((t) => t.ticketId === selectedId)

  return (
    <section className="panel">
      <h2>Cryptographic event ledger</h2>
      <p className="lede">
        Every issuance, transfer, scan, and invalidation appends a hash-chained event and
        fans out over pub/sub so copied barcodes die the moment a gate accepts the original.
      </p>
      <div className="grid-2">
        <div className="stack">
          <div className="actions">
            <button type="button" onClick={() => void issue()}>
              Issue ticket
            </button>
            <button type="button" className="secondary" onClick={() => void scan()} disabled={!selected}>
              Scan at gate
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => void scanClone()}
              disabled={!selected}
            >
              Replay screenshot
            </button>
          </div>
          <div className="field">
            <label htmlFor="ticket-select">Active ticket</label>
            <select
              id="ticket-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Select…</option>
              {tickets.map((t) => (
                <option key={t.ticketId} value={t.ticketId}>
                  {t.seatLabel} · {statusLabel(t.status)}
                </option>
              ))}
            </select>
          </div>
          {selected && (
            <div className="ticket">
              <strong>{selected.seatLabel}</strong>{' '}
              <span
                className={`badge ${
                  selected.status === 'SCANNED' || selected.status === 'INVALIDATED'
                    ? 'bad'
                    : 'good'
                }`}
              >
                {statusLabel(selected.status)}
              </span>
              <div className="meta">
                <span>ticket: {selected.ticketId}</span>
                <span>owner: {selected.ownerUserId}</span>
                <span>barcode: {selected.barcodeSecret}</span>
                <span>
                  live for clients:{' '}
                  {ledger.isBarcodeLive(selected.ticketId, selected.barcodeSecret)
                    ? 'yes'
                    : 'no'}
                </span>
              </div>
            </div>
          )}
          <p className="status-line" role="status">
            {status}
          </p>
          <p className="status-line">
            Chain tip integrity:{' '}
            <span className={`badge ${chainOk ? 'good' : 'bad'}`}>
              {chainOk ? 'verified' : 'broken'}
            </span>
          </p>
        </div>
        <div className="stack">
          <div className="field">
            <label>Pub/sub feed ({TICKET_CHANNEL})</label>
            <div className="log">{liveFeed.join('\n') || 'Waiting for ledger events…'}</div>
          </div>
          <div className="field">
            <label>Hash chain ({events.length} events)</label>
            <div className="log">
              {events
                .map(
                  (e) =>
                    `#${e.sequence} ${e.type}\n  hash ${e.hash.slice(0, 18)}…\n  prev ${e.prevHash.slice(0, 18)}…`,
                )
                .join('\n\n') || 'No events yet.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
