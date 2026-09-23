import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.ts'

export type Database = NodePgDatabase<typeof schema>

let _db: Database | null = null

/** True when a Postgres URL is configured for Better Auth / Drizzle. */
export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

/**
 * Lazy Drizzle client.
 * - Local / Node: `node-postgres` via DATABASE_URL
 * - Cloudflare Workers: prefer Neon HTTP or Hyperdrive binding; until then
 *   the app falls back to the in-memory OJ catalog + on-device stores.
 */
export function getDb(): Database {
  if (_db) return _db
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  _db = drizzleNode(url, { schema })
  return _db
}

/** @deprecated Prefer getDb() so Workers bundles stay lazy */
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver)
  },
})
