import { useState } from 'react'
import { api } from '../lib/apiClient'

export function CheckoutPanel() {
  const [seat, setSeat] = useState('A-1')
  const [price, setPrice] = useState(6500)
  const [currency, setCurrency] = useState('USD')
  const [status, setStatus] = useState('')
  const [pendingIntentId, setPendingIntentId] = useState<string | null>(null)
  const [log, setLog] = useState(
    'Inventory locks + Stripe-shaped PaymentIntents. Demo mode confirms without Stripe keys.',
  )

  const refreshLog = async (line: string) => {
    try {
      const inv = await api.inventory()
      const seats = inv.seats
        .map(
          (s) =>
            `${s.seatLabel}: ${s.available ? 'open' : 'locked'} @ ${s.listPriceCents}${s.currency}`,
        )
        .join('\n')
      setLog(
        `${line}\n\nPayments mode: ${inv.paymentsMode}\nInventory\n${seats}\n\nTickets issued: ${inv.ticketsIssued}`,
      )
    } catch (err) {
      setLog(`${line}\n\n${err instanceof Error ? err.message : 'Inventory refresh failed'}`)
    }
  }

  const buy = async () => {
    try {
      const result = await api.checkout({
        seatLabel: seat,
        offeredPriceCents: price,
        currency,
      })
      if (result.ok) {
        setStatus(`Checkout OK — ticket ${result.ticketId}`)
        await refreshLog(`One-shot capture · hold ${result.hold?.holdId}`)
      } else {
        setStatus(`Checkout failed securely: ${result.reason}`)
        await refreshLog(`Rejected: ${result.reason}`)
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Checkout failed')
    }
  }

  const startIntent = async () => {
    try {
      const started = await api.beginIntent({
        seatLabel: seat,
        offeredPriceCents: price,
        currency,
      })
      if (!started.ok || !('intent' in started)) {
        setStatus(`Intent failed: ${'reason' in started ? started.reason : 'unknown'}`)
        await refreshLog(`Intent rejected`)
        return
      }
      setPendingIntentId(started.intent.id)
      setStatus(`PaymentIntent ${started.intent.id} requires confirmation`)
      await refreshLog(
        `Hold ${started.holdId}\nclient_secret ${started.intent.clientSecret}\nstatus ${started.intent.status}`,
      )
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Intent failed')
    }
  }

  const confirmIntent = async () => {
    if (!pendingIntentId) {
      setStatus('Create a PaymentIntent first')
      return
    }
    try {
      const result = await api.confirmIntent(pendingIntentId)
      if (result.ok) {
        setStatus(`Paid — ticket ${result.ticketId}`)
        await refreshLog(`Confirmed ${pendingIntentId} → ticket ${result.ticketId}`)
        setPendingIntentId(null)
      } else {
        setStatus(`Confirm failed: ${result.reason}`)
        await refreshLog(`Confirm rejected: ${result.reason}`)
      }
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Confirm failed')
    }
  }

  const race = async () => {
    try {
      const result = await api.race('B-1', 8)
      setStatus(
        `Race complete: ${result.winners.length} winner, ${result.failures.length} secure failures`,
      )
      await refreshLog(
        result.winners[0]
          ? `Winner ticket ${result.winners[0].ticketId} / hold ${result.winners[0].hold?.holdId}`
          : 'No winner (seat already taken)',
      )
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Race failed')
    }
  }

  return (
    <section className="panel">
      <h2>Hardened checkout</h2>
      <p className="lede">
        Inventory locks, idempotency, currency guards, and Stripe-shaped PaymentIntents
        (demo HMAC webhooks). Flash-sale races still fail closed.
      </p>
      <div className="grid-2">
        <div className="stack">
          <div className="field">
            <label htmlFor="seat">Seat</label>
            <select id="seat" value={seat} onChange={(e) => setSeat(e.target.value)}>
              <option value="A-1">A-1</option>
              <option value="A-2">A-2</option>
              <option value="B-1">B-1 (race target)</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="price">Offered price (cents)</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR (tamper)</option>
              <option value="GBP">GBP (tamper)</option>
            </select>
          </div>
          <div className="actions">
            <button type="button" onClick={() => void buy()}>
              One-shot checkout
            </button>
            <button type="button" className="secondary" onClick={() => void startIntent()}>
              Create PaymentIntent
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => void confirmIntent()}
              disabled={!pendingIntentId}
            >
              Confirm payment
            </button>
            <button type="button" className="secondary" onClick={() => void race()}>
              Simulate 8-way race on B-1
            </button>
          </div>
          <p className="status-line" role="status">
            {status}
          </p>
        </div>
        <div className="field">
          <label>Checkout / payments trace</label>
          <div className="log">{log}</div>
        </div>
      </div>
    </section>
  )
}
