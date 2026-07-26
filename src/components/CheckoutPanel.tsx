import { useState } from 'react'
import type { DemoPlatform } from '../lib/demoStore'
import { EVENT_ID, users } from '../lib/demoStore'

interface Props {
  platform: DemoPlatform
}

export function CheckoutPanel({ platform }: Props) {
  const { checkout, inventory, ledger } = platform
  const [seat, setSeat] = useState('A-1')
  const [price, setPrice] = useState(6500)
  const [currency, setCurrency] = useState('USD')
  const [status, setStatus] = useState('')
  const [log, setLog] = useState('Flash-sale checkout with inventory locks and currency guards.')

  const refreshLog = (line: string) => {
    const seats = ['A-1', 'A-2', 'B-1']
      .map((label) => {
        const s = inventory.getSeat(EVENT_ID, label)
        return `${label}: ${s?.available ? 'open' : 'locked'} @ ${s?.listPriceCents}${s?.currency}`
      })
      .join('\n')
    setLog(`${line}\n\nInventory\n${seats}\n\nTickets issued: ${ledger.listTickets().length}`)
  }

  const buy = async () => {
    const result = await checkout.checkout({
      eventId: EVENT_ID,
      seatLabel: seat,
      buyerUserId: users.bob.userId,
      offeredPriceCents: price,
      currency,
      idempotencyKey: `ui_${seat}_${Date.now()}`,
    })
    if (result.ok) {
      setStatus(`Checkout OK — ticket ${result.ticketId}`)
      refreshLog(`Captured hold ${result.hold?.holdId}`)
    } else {
      setStatus(`Checkout failed securely: ${result.reason}`)
      refreshLog(`Rejected: ${result.reason}`)
    }
  }

  const race = async () => {
    const results = await Promise.all(
      Array.from({ length: 8 }, (_, i) =>
        checkout.checkout({
          eventId: EVENT_ID,
          seatLabel: 'B-1',
          buyerUserId: `racer_${i}`,
          offeredPriceCents: 6500,
          currency: 'USD',
          idempotencyKey: `ui_race_${Date.now()}_${i}`,
        }),
      ),
    )
    const wins = results.filter((r) => r.ok)
    setStatus(
      `Race complete: ${wins.length} winner, ${results.length - wins.length} secure failures`,
    )
    refreshLog(
      wins[0]
        ? `Winner ticket ${wins[0].ticketId} / hold ${wins[0].hold?.holdId}`
        : 'No winner (seat already taken)',
    )
  }

  return (
    <section className="panel">
      <h2>Hardened checkout</h2>
      <p className="lede">
        Inventory locks, idempotency keys, and currency/price assertions stop flash-sale races
        and client-side amount manipulation from minting duplicate access rights.
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
              Checkout
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
          <label>Checkout trace</label>
          <div className="log">{log}</div>
        </div>
      </div>
    </section>
  )
}
