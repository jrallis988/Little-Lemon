# Limited v1 launch

TrumpRx v1 is a **narrow, honest launch** — not a demo pretending to be a universal pharmacy.

## Scope

| Included | Excluded in v1 |
|----------|----------------|
| 10 generic medications (pharmacy pickup) | GLP-1s, brand-only programs |
| Coverage search + drug detail | Plus / paid membership |
| Compare vs what you pay today | Rx transfer requests |
| Eligibility + access pathways | Provider portal |
| Pharmacy pickup access path | Manufacturer-direct pathways |
| Request medication (not included) | Live per-pharmacy pricing matrix* |
| Report issue (contextual) | |

\* Live pricing turns on only when `PRICING_PROVIDER=external` and `PRICING_API_URL` is set.

## v1 formulary (10 generics)

Configured in `src/lib/launch-mode.ts` → `V1_PHARMACY_PICKUP_DRUG_IDS`:

- atorvastatin
- metformin
- amlodipine
- lisinopril
- omeprazole
- sertraline
- losartan
- gabapentin
- levothyroxine
- montelukast

## Launch mode

```bash
# Default — recommended for first production deploy
NEXT_PUBLIC_LAUNCH_MODE=limited_v1

# Full catalog + membership when partners are wired
NEXT_PUBLIC_LAUNCH_MODE=full
```

Server-side fallback (optional): `TRUMPRX_LAUNCH_MODE`.

Public feature flags are exposed at `GET /api/config` under `launch`.

## Environment checklist (v1 go-live)

### Required

| Variable | Notes |
|----------|-------|
| `DATABASE_URL` | PostgreSQL in production (`postgresql://…`) |
| `AUTH_SECRET` | ≥32 chars in production |
| `AUTH_URL` | Public HTTPS origin |
| `NEXT_PUBLIC_APP_URL` | Same public URL |
| `NEXT_PUBLIC_LAUNCH_MODE` | `limited_v1` |
| `ADMIN_EMAILS` | Comma-separated ops inboxes |

### Recommended before traffic

| Variable | Notes |
|----------|-------|
| `RESEND_API_KEY` + `RESEND_FROM_EMAIL` | Alert / notification email |
| `ALERTS_CRON_SECRET` | Protect price-alert cron endpoint |
| `SENTRY_DSN` | Error reporting |

### Enable when partners sign (not v1 blockers)

| Variable | Unlocks |
|----------|---------|
| `PRICING_PROVIDER=external` + `PRICING_API_URL` | Live per-pharmacy pricing |
| `SWITCH_API_URL` | Live Smart Switch |
| `STRIPE_*` | Plus membership (`full` mode) |
| `TELEHEALTH_PARTNER_URL` / `MAIL_ORDER_PARTNER_URL` | Extra fulfillment CTAs |

## Ops queues

Staff medication-request and issue-report queues:

- `/admin/medication-requests`
- `/admin/issue-reports`

Requires sign-in with an email in `ADMIN_EMAILS`.

## Legal / product sign-off (manual)

- Formulary list approved by program owner
- Pricing disclaimers reviewed (“confirmed at fill”)
- Privacy / terms updated for limited scope
- No copy implying universal pharmacy coverage

## Upgrading to full mode

1. Set `NEXT_PUBLIC_LAUNCH_MODE=full`
2. Wire Stripe, transfer workflow, and any manufacturer pathways
3. Enable live pricing / switch env vars as partners go live
4. Re-run launch checklist in `/admin/launch`

See also `docs/LAUNCH.md` and `docs/PRODUCT-ARCHITECTURE.md`.
