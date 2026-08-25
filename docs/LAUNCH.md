# Trump RX — Production launch & expansion checklist

Operational checklist for going live. Product blueprint surfaces are already shipped (`docs/REINVENTION.md`).

---

## Part 1 — Must have for a real launch

| # | Item | Code readiness | Operator action |
|---|---|---|---|
| 1 | **Live PBM / Switch** | `SWITCH_API_URL` + `SWITCH_API_KEY`; Smart Switch sends `ncpdpId` / NPI when present | Register real BIN/PCN/Group; point env at partner `/v1/precheck` |
| 2 | **Live pharmacy pricing** | `PRICING_PROVIDER=external` + `PRICING_API_URL` client (`src/lib/pricing-provider`) | Contract feed; flip provider in prod env |
| 3 | **Production infrastructure** | Prisma works with Postgres `DATABASE_URL`; prod `AUTH_SECRET` (≥32) + `AUTH_URL` enforced | Provision Postgres, host (Vercel/Fly/etc.), HTTPS domain |
| 4 | **Stripe / Resend / Twilio** | Checkout, portal, `/api/webhooks/stripe`, alert dispatch | Set keys; Stripe webhook → `/api/webhooks/stripe`; cron `PUT /api/alerts` |
| 5 | **Telehealth + mail-order** | CTAs hidden when partners unset (`/api/config` + fulfillment panel) | Set `TELEHEALTH_PARTNER_URL` / `MAIL_ORDER_PARTNER_URL` or leave hidden |
| 6 | **Legal / brand review** | Privacy + Terms pages; private-discount (not .gov) copy | Counsel review; naming separation from any official brand |

**Launch readiness probe:** `GET /api/health` and `GET /api/config` (public partner flags).

---

## Part 2 — Strong next product additions

| Addition | Status in repo |
|---|---|
| Saved digital passes on account | Shipped — reopen barcodes from Profile |
| Chat + admin inbox + notify | Shipped — `/admin/messages`, email/SMS on new chats |
| Counter reject guidance | Shipped — coupon pharmacist mode + help |
| First-win homepage CTAs | Shipped — curated common fills |
| True insurance plan import | Shipped — `/profile/insurance` + saved plan in Insurance vs cash |
| Rx transfer ops queue | Shipped — `/admin/transfers` |
| Refill email/SMS reminders | Shipped — cron on `PUT /api/alerts` checks `nextRefillAt` |
| FAQ page | Shipped — `/faq` |
| Order confirmation | Shipped — `/checkout/confirmation` after digital pass |
| Insurance calculator | Shipped — `/tools/insurance-calculator` |
| Provider portal | Shipped — `/providers` |
| Security settings | Shipped — `/profile/security` (password, 2FA preference, privacy) |
| NCPDP / pharmacy ID enrichment | Mapped + seeded |
| Admin tools | `/admin` + messages inbox |
| Observability | Health + optional `SENTRY_DSN` |
| Deploy scaffolding | `Dockerfile`, `docker-compose.yml`, `vercel.json`, CI |
| E2E / smoke | `npm run test:smoke`, `npm run test:e2e` (needs running server) |

---

## Part 3 — Already shipped (not missing)

Smart Switch UI · Insurance-vs-cash · Benchmarks · Fulfillment panel · Counter-price UX · In-app digital checkout — see `docs/REINVENTION.md`.

---

## Bottom line

The application is built as a production service: Postgres in production,
Auth.js-only auth, Stripe for membership, DB-backed carts and digital passes,
and structured logging. Go-live still requires partner credentials and legal
sign-off — see Part 1 operator actions.
