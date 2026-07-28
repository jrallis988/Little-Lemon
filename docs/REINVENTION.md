# Trump RX reinvention blueprint

Product surfaces that close gaps vs a static coupon directory / off-site portal.

## 1. Smart Switch (adjudication pre-check)

- `POST /api/switch/precheck` — validates BIN/PCN/Group/Member + pharmacy network
- UI: `SmartSwitchBadge` on coupon modal
- Live partner: set `SWITCH_API_URL` (+ optional `SWITCH_API_KEY`)

## 2. Insurance vs cash decision matrix

- Client + `POST /api/decision/insurance-vs-cash`
- UI: `InsuranceVsCashMatrix` on search results
- Frames today-cost vs deductible progress (not insurance advice)

## 3. Telehealth & fulfillment chaining

- `POST /api/fulfillment/handoff` — telehealth / mail-order / specialty
- UI: `FulfillmentPanel`
- Partners: `TELEHEALTH_PARTNER_URL`, `MAIL_ORDER_PARTNER_URL`

## 4. Transparent generic / cash benchmarks

- `buildBenchmarkDrawer` + `BenchmarkDrawer` sheet
- Shows lowest, median, peer cash, and estimated retail side-by-side

## 5. Frictionless counter-price UX

- “Seen price = counter price” messaging
- Coupon modal labels **Counter price (show this)**
- Minimal chrome on the comparison path

## Still requires partners

| Capability | Env / partner |
|---|---|
| Live claim switch | `SWITCH_API_URL` |
| Telehealth visit | `TELEHEALTH_PARTNER_URL` |
| Mail-order transfer | `MAIL_ORDER_PARTNER_URL` |
| External PBM quotes | `PRICING_PROVIDER=external` + `PRICING_API_URL` |
