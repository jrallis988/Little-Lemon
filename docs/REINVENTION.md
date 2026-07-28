# Trump RX reinvention blueprint — architecture audit

Maps the reinvention brief (Parts 1–2) to what this codebase ships vs what still needs partners.

## Part 1 — Reinvention blueprint

| Blueprint item | Status | Implementation |
|---|---|---|
| **1. Unified real-time adjudication (Smart Switch)** | Shipped (simulated; live when partner env set) | `src/lib/switch/adjudication.ts`, `POST /api/switch/precheck`, `POST /api/switch/route` (universal router ranks pharmacies by network + BIN/PCN/Group pre-test), `SmartSwitchBadge`, `SmartSwitchRouteHint` |
| **2. Insurance vs cash decision matrix** | Shipped | `src/lib/insurance/decision-matrix.ts`, `POST /api/decision/insurance-vs-cash`, `InsuranceVsCashMatrix` on search |
| **3. Telehealth & fulfillment chaining** | Shipped (stubs; live URLs via env) | `src/lib/fulfillment/handoff.ts`, `POST /api/fulfillment/handoff`, `FulfillmentPanel` on search + checkout |
| **4. Transparent generic price benchmarking** | Shipped | `src/lib/benchmarking.ts`, `BenchmarkDrawer` side-by-side cash comps |
| **5. Frictionless, distraction-free UI** | Shipped (product UX) | Counter-price messaging, dense matrix, pharmacist mode; privacy policy published. Cookie / analytics posture is documented on `/privacy` — keep third-party trackers off the comparison path. |

## Part 2 — Gaps vs a static off-site portal

| Missing on typical portal | Trump RX response |
|---|---|
| **1. Direct-to-consumer digital checkout** | **Shipped:** in-app cart (`checkout-cart-store`) → `/checkout` → `POST /api/checkout/digital-pass` multi-coupon digital pass (barcodes + BIN/PCN). No manufacturer redirect required for cash coupons. Rx payment remains at the pharmacy counter (discount card), not a fake Rx e-commerce charge. |
| **2. Insurance / deductible intelligence** | **Shipped:** Insurance vs cash widget (today cost vs deductible progress). Not advice; user-entered plan inputs. |
| **3. Real-time pharmacy adjudication** | **Shipped:** Smart Switch precheck + route ranking. Live terminal verification requires `SWITCH_API_URL`. |
| **4. Telehealth / prescription routing loop** | **Shipped:** handoff API + UI. Live visit / transfer requires `TELEHEALTH_PARTNER_URL` / `MAIL_ORDER_PARTNER_URL`. |
| **5. Native price-benchmarking transparency** | **Shipped:** Benchmark drawer on search results. |

## Partner / production gates (still required for “live network”)

| Capability | Env / partner |
|---|---|
| Live claim switch | `SWITCH_API_URL` (+ optional `SWITCH_API_KEY`) |
| Telehealth visit | `TELEHEALTH_PARTNER_URL` |
| Mail-order transfer | `MAIL_ORDER_PARTNER_URL` |
| External PBM quotes | `PRICING_PROVIDER=external` + `PRICING_API_URL` |
| Membership billing | Stripe keys + webhook |
| Alerts | Resend / Twilio |

## Key product paths

- Compare → coupon → **Add to digital checkout** → `/checkout` → **Issue digital pass**
- Compare → **Smart Switch pick** → Get coupon (first-pass routing)
- Compare → Insurance vs cash / Benchmarks / Telehealth or mail-order
