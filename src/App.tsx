import { useMemo, useState } from 'react'
import { CheckoutPanel } from './components/CheckoutPanel'
import { IdentityPanel } from './components/IdentityPanel'
import { LedgerPanel } from './components/LedgerPanel'
import { createDemoPlatform } from './lib/demoStore'

type Tab = 'ledger' | 'identity' | 'checkout'

export default function App() {
  const platform = useMemo(() => createDemoPlatform(), [])
  const [tab, setTab] = useState<Tab>('ledger')

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

      {tab === 'ledger' && <LedgerPanel platform={platform} />}
      {tab === 'identity' && <IdentityPanel platform={platform} />}
      {tab === 'checkout' && <CheckoutPanel platform={platform} />}
    </div>
  )
}
