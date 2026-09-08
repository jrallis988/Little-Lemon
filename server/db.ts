import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import type { LedgerEvent, TicketRecord } from '../src/lib/ledger/types'
import type { SeatInventory } from '../src/lib/checkout/types'

export function openDatabase(path: string) {
  mkdirSync(dirname(path), { recursive: true })
  const db = new Database(path)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      ticket_id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      owner_user_id TEXT NOT NULL,
      barcode_secret TEXT NOT NULL,
      status TEXT NOT NULL,
      seat_label TEXT NOT NULL,
      issued_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      scan_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS ledger_events (
      sequence INTEGER PRIMARY KEY,
      event_id TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      ticket_id TEXT NOT NULL,
      actor_user_id TEXT NOT NULL,
      payload TEXT NOT NULL,
      occurred_at TEXT NOT NULL,
      prev_hash TEXT NOT NULL,
      hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inventory_seats (
      event_id TEXT NOT NULL,
      seat_label TEXT NOT NULL,
      list_price_cents INTEGER NOT NULL,
      currency TEXT NOT NULL,
      available INTEGER NOT NULL,
      PRIMARY KEY (event_id, seat_label)
    );
  `)
  return db
}

export type GateLedgerDb = ReturnType<typeof openDatabase>

export function loadTickets(db: GateLedgerDb): TicketRecord[] {
  return db
    .prepare(
      `SELECT ticket_id as ticketId, event_id as eventId, owner_user_id as ownerUserId,
              barcode_secret as barcodeSecret, status, seat_label as seatLabel,
              issued_at as issuedAt, updated_at as updatedAt, scan_count as scanCount
       FROM tickets`,
    )
    .all() as TicketRecord[]
}

export function loadEvents(db: GateLedgerDb): LedgerEvent[] {
  const rows = db
    .prepare(
      `SELECT sequence, event_id as eventId, type, ticket_id as ticketId,
              actor_user_id as actorUserId, payload, occurred_at as occurredAt,
              prev_hash as prevHash, hash
       FROM ledger_events ORDER BY sequence ASC`,
    )
    .all() as Array<Omit<LedgerEvent, 'payload'> & { payload: string }>
  return rows.map((row) => ({
    ...row,
    payload: JSON.parse(row.payload) as Record<string, unknown>,
  }))
}

export function upsertTicket(db: GateLedgerDb, ticket: TicketRecord) {
  db.prepare(
    `INSERT INTO tickets (
      ticket_id, event_id, owner_user_id, barcode_secret, status,
      seat_label, issued_at, updated_at, scan_count
    ) VALUES (
      @ticketId, @eventId, @ownerUserId, @barcodeSecret, @status,
      @seatLabel, @issuedAt, @updatedAt, @scanCount
    )
    ON CONFLICT(ticket_id) DO UPDATE SET
      owner_user_id = excluded.owner_user_id,
      barcode_secret = excluded.barcode_secret,
      status = excluded.status,
      seat_label = excluded.seat_label,
      updated_at = excluded.updated_at,
      scan_count = excluded.scan_count`,
  ).run(ticket)
}

export function insertLedgerEvent(db: GateLedgerDb, event: LedgerEvent) {
  db.prepare(
    `INSERT OR IGNORE INTO ledger_events (
      sequence, event_id, type, ticket_id, actor_user_id,
      payload, occurred_at, prev_hash, hash
    ) VALUES (
      @sequence, @eventId, @type, @ticketId, @actorUserId,
      @payload, @occurredAt, @prevHash, @hash
    )`,
  ).run({
    ...event,
    payload: JSON.stringify(event.payload),
  })
}

export function upsertSeat(db: GateLedgerDb, seat: SeatInventory) {
  db.prepare(
    `INSERT INTO inventory_seats (
      event_id, seat_label, list_price_cents, currency, available
    ) VALUES (
      @eventId, @seatLabel, @listPriceCents, @currency, @available
    )
    ON CONFLICT(event_id, seat_label) DO UPDATE SET
      list_price_cents = excluded.list_price_cents,
      currency = excluded.currency,
      available = excluded.available`,
  ).run({
    eventId: seat.eventId,
    seatLabel: seat.seatLabel,
    listPriceCents: seat.listPriceCents,
    currency: seat.currency,
    available: seat.available ? 1 : 0,
  })
}

export function loadSeats(db: GateLedgerDb): SeatInventory[] {
  const rows = db
    .prepare(
      `SELECT event_id as eventId, seat_label as seatLabel,
              list_price_cents as listPriceCents, currency, available
       FROM inventory_seats`,
    )
    .all() as Array<Omit<SeatInventory, 'available'> & { available: number }>
  return rows.map((row) => ({
    ...row,
    available: row.available === 1,
  }))
}

export function syncTicketFromLedger(db: GateLedgerDb, ticket: TicketRecord | undefined) {
  if (ticket) upsertTicket(db, ticket)
}
