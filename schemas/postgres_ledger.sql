-- GateLedger: PostgreSQL schema for cryptographic event-driven ticket verification.
-- Pair with Redis Pub/Sub (channel tickets.state) or Kafka topic ticket.lifecycle.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  user_id         TEXT PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  display_name    TEXT NOT NULL,
  primary_device_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  event_id    TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  venue       TEXT NOT NULL,
  starts_at   TIMESTAMPTZ NOT NULL
);

CREATE TYPE ticket_lifecycle AS ENUM (
  'ISSUED',
  'TRANSFERRED',
  'SCANNED',
  'INVALIDATED'
);

CREATE TABLE tickets (
  ticket_id       TEXT PRIMARY KEY,
  event_id        TEXT NOT NULL REFERENCES events(event_id),
  owner_user_id   TEXT NOT NULL REFERENCES users(user_id),
  barcode_secret  TEXT NOT NULL,
  barcode_hash    TEXT NOT NULL,
  status          ticket_lifecycle NOT NULL DEFAULT 'ISSUED',
  seat_label      TEXT NOT NULL,
  scan_count      INTEGER NOT NULL DEFAULT 0,
  issued_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX tickets_owner_idx ON tickets(owner_user_id);
CREATE INDEX tickets_event_status_idx ON tickets(event_id, status);

CREATE TYPE ledger_event_type AS ENUM (
  'TICKET_ISSUED',
  'TICKET_TRANSFERRED',
  'TICKET_SCANNED',
  'TICKET_INVALIDATED'
);

-- Append-only hash-chained ledger (single source of truth).
CREATE TABLE ledger_events (
  sequence        BIGSERIAL PRIMARY KEY,
  event_id        TEXT NOT NULL UNIQUE,
  type            ledger_event_type NOT NULL,
  ticket_id       TEXT NOT NULL REFERENCES tickets(ticket_id),
  actor_user_id   TEXT NOT NULL,
  payload         JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  prev_hash       CHAR(64) NOT NULL,
  hash            CHAR(64) NOT NULL
);

CREATE INDEX ledger_ticket_idx ON ledger_events(ticket_id, sequence);

-- Device-bound sessions for transfer MFA.
CREATE TABLE device_sessions (
  session_id      TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL REFERENCES users(user_id),
  device_id       TEXT NOT NULL,
  token_hash      TEXT NOT NULL,
  expires_at      TIMESTAMPTZ NOT NULL,
  revoked_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE webauthn_credentials (
  credential_id   TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL REFERENCES users(user_id),
  public_key      BYTEA NOT NULL,
  sign_count      BIGINT NOT NULL DEFAULT 0,
  device_label    TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE inventory_holds (
  hold_id         TEXT PRIMARY KEY,
  event_id        TEXT NOT NULL REFERENCES events(event_id),
  seat_label      TEXT NOT NULL,
  buyer_user_id   TEXT NOT NULL REFERENCES users(user_id),
  currency        CHAR(3) NOT NULL,
  unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents > 0),
  expires_at      TIMESTAMPTZ NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('HELD', 'CAPTURED', 'RELEASED', 'EXPIRED')),
  UNIQUE (event_id, seat_label) -- one live claim path; enforce via partial index in app layer
);

CREATE UNIQUE INDEX inventory_active_seat
  ON inventory_holds(event_id, seat_label)
  WHERE status = 'HELD';
