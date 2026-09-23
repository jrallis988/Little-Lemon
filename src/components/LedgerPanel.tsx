import { useEffect, useState } from 'react'
import { api, subscribeLedger } from '../lib/apiClient'
import { statusLabel } from '../lib/ledger/eventLedger'
import type { LiveBarcode } from '../lib/ledger/rotatingBarcode'
import type { LedgerEvent, TicketRecord } from '../lib/ledger/types'

export function LedgerPanel() {
  const [tickets, setTickets] = useState<TicketRecord[]>([])
  const [events, setEvents] = useState<LedgerEvent[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [status, setStatus] = useState('')
  const [chainOk, setChainOk] = useState(true)
  const [liveFeed, setLiveFeed] = useState<string[]>([])
  const [apiUp, setApiUp] = useState(true)
  const [liveCode, setLiveCode] = useState<LiveBarcode | null>(null)
  const [frozenShot, setFrozenShot] = useState<string | null>(null)

  const refresh = async () => {
    try {
      const [{ tickets: nextTickets }, { events: nextEvents }, verification] =
        await Promise.all([api.listTickets(), api.listEvents(), api.verifyChain()])
      setTickets(nextTickets)
      setEvents(nextEvents)
      setChainOk(verification.valid)
      setApiUp(true)
    } catch {
      setApiUp(false)
    }
  }

  useEffect(() => {
    void refresh()
    return subscribeLedger((event) => {
      setLiveFeed((prev) =>
        [
          `${event.occurredAt.slice(11, 19)} ${event.type} · ${event.ticketId}`,
          ...prev,
        ].slice(0, 12),
      )
      void refresh()
    })
  }, [])

  useEffect(() => {
    if (!selectedId) {
      setLiveCode(null)
      return
    }
    let active = true
    const pull = async () => {
      try {
        const code = await api.liveCode(selectedId)
        if (active) setLiveCode(code)
      } catch {
        if (active) setLiveCode(null)
      }
    }
    void pull()
    const timer = window.setInterval(() => void pull(), 1000)
    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [selectedId])

  const issue = async () => {
    try {
      const { ticket, live } = await api.issueTicket(`A-${tickets.length + 1}`)
      setSelectedId(ticket.ticketId)
      if (live) {
        setLiveCode(live)
        setFrozenShot(live.token)
      }
      setStatus(`Issued ${ticket.ticketId} — rotating QR active`)
      await refresh()
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Issue failed')
    }
  }

  const scan = async () => {
    if (!selectedId) {
      setStatus('Select a ticket first')
      return
    }
    try {
      const code = liveCode ?? (await api.liveCode(selectedId))
      setFrozenShot(code.token)
      const result = await api.scanTicket(selectedId, 'gate-main', {
        presentedToken: code.token,
      })
      setStatus(
        result.ok
          ? 'Scan accepted — barcode revoked across all clients'
          : `Scan rejected: ${result.reason}`,
      )
      await refresh()
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Scan failed')
    }
  }

  const scanClone = async () => {
    if (!selectedId) {
      setStatus('Select a ticket first')
      return
    }
    try {
      // Prefer an explicitly frozen token; otherwise force a token from 2 steps ago.
      const result = frozenShot
        ? await api.scanTicket(selectedId, 'gate-clone', {
            presentedToken: frozenShot,
            staleSteps: 2,
          })
        : await api.scanTicket(selectedId, 'gate-clone', { staleSteps: 2 })
      setStatus(
        result.ok
          ? 'Unexpected accept'
          : `Screenshot/PDF clone blocked: ${result.reason}`,
      )
      await refresh()
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Replay failed')
    }
  }

  const selected = tickets.find((t) => t.ticketId === selectedId)
  const live =
    selected != null &&
    (selected.status === 'ISSUED' || selected.status === 'TRANSFERRED')

  return (
    <section className="panel">
      <h2>Cryptographic event ledger</h2>
      <p className="lede">
        Rotating QR tokens (15s) + hash-chained ledger events. Screenshots die when the
        window advances; a successful gate scan revokes the ticket everywhere via SSE.
      </p>
      {!apiUp && (
        <p className="status-line">
          API offline — start with `npm run dev:api` or `npm run dev:all`.
        </p>
      )}
      <div className="grid-2">
        <div className="stack">
          <div className="actions">
            <button type="button" onClick={() => void issue()}>
              Issue ticket
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => void scan()}
              disabled={!selected || !live}
            >
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
              onChange={(e) => {
                setSelectedId(e.target.value)
                setFrozenShot(null)
              }}
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
                <span>
                  live QR:{' '}
                  {liveCode ? `${liveCode.token.slice(0, 12)}… (${Math.ceil(liveCode.validForMs / 1000)}s)` : '—'}
                </span>
                <span>wallet live: {live ? 'yes' : 'no'}</span>
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
            <label>Pub/sub feed (SSE · tickets.state)</label>
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
