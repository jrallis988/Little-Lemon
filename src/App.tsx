import { useEffect, useState } from 'react'
import { CheckoutPanel } from './components/CheckoutPanel'
import { IdentityPanel } from './components/IdentityPanel'
import { LedgerPanel } from './components/LedgerPanel'
import { api } from './lib/apiClient'

type Tab = 'ledger' | 'identity' | 'checkout'

export default function App() {
  const [tab, setTab] = useState<Tab>('ledger')
  const [apiStatus, setApiStatus] = useState<'checking' | 'up' | 'down'>('checking')

  useEffect(() => {
    api
      .health()
      .then(() => setApiStatus('up'))
      .catch(() => setApiStatus('down'))
  }, [])

  return (
    <div className="app-shell">
      <header className="brand-lockup">
        <div className="eyebrow">Little Lemon · GateLedger</div>
        <h1>
          Transactional <span>security</span>
        </h1>
        <p>
          Event-driven ledger verification, passkey transfer handshakes, and test-hardened
          checkout — a single source of truth against forged PDFs, ATO dumps, and flash-sale
          double-issues.
        </p>
        <p className="status-line">
          API:{' '}
          <span className={`badge ${apiStatus === 'up' ? 'good' : apiStatus === 'down' ? 'bad' : 'warn'}`}>
            {apiStatus === 'checking' ? 'checking' : apiStatus === 'up' ? 'connected' : 'offline'}
          </span>
        </p>
      </header>

      <nav className="tabs" aria-label="Security modules">
        <button
          type="button"
          aria-selected={tab === 'ledger'}
          onClick={() => setTab('ledger')}
        >
          5 · Ledger
        </button>
        <button
          type="button"
          aria-selected={tab === 'identity'}
          onClick={() => setTab('identity')}
        >
          6 · Identity
        </button>
        <button
          type="button"
          aria-selected={tab === 'checkout'}
          onClick={() => setTab('checkout')}
        >
          7 · Checkout TDD
        </button>
      </nav>

      {tab === 'ledger' && <LedgerPanel />}
      {tab === 'identity' && <IdentityPanel />}
      {tab === 'checkout' && <CheckoutPanel />}
    </div>
  )
}
