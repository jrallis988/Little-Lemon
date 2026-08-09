# Partner API contracts

Trump RX calls optional HTTP partners. Implement these shapes (or adapt the
clients under `src/lib/`) when you wire live networks.

## Smart Switch — `SWITCH_API_URL`

### `GET /v1/health`
Return `200` when the switch is up.

### `POST /v1/precheck`
Request:
```json
{
  "pharmacyId": "string",
  "ncpdpId": "1234567",
  "npi": "string",
  "drugId": "atorvastatin",
  "strengthId": "string",
  "quantity": 30,
  "supplyDays": 30,
  "couponPrice": 12.5,
  "routing": { "bin": "610020", "pcn": "TRUMPRX", "group": "TRXSAVE", "memberId": "…" }
}
```
Response: same shape as `SwitchPrecheckResult` in `src/lib/switch/adjudication.ts`
(`status`, `confidence`, `checks[]`, `pharmacistTip`, `liveSwitch`, `routing`).

Auth: `Authorization: Bearer ${SWITCH_API_KEY}` when set.

## Pricing — `PRICING_API_URL` (`PRICING_PROVIDER=external`)

### `GET /v1/health`
Return `200` when quotes are available.

### `POST /v1/quotes`
See `src/lib/pricing-provider/types.ts` (`ExternalPricingQuoteRequest` /
`ExternalPricingQuoteResponse` with `offers[]`).

## Telehealth / mail-order
Deep-link URLs only. Trump RX appends `drug`, `strength`, `qty`, `channel`
query params. Set `TELEHEALTH_PARTNER_URL` / `MAIL_ORDER_PARTNER_URL`.

## Stripe
- Checkout: `STRIPE_SECRET_KEY` + `STRIPE_PLUS_PRICE_ID`
- Webhook endpoint: `/api/webhooks/stripe` with `STRIPE_WEBHOOK_SECRET`

## Chat notify
Resend emails `ADMIN_EMAILS` on new visitor messages. Optional
`ADMIN_SMS_TO` via Twilio.
