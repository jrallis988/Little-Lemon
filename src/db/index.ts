import { drizzle } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.ts'

export type Database = NodePgDatabase<typeof schema>

let _db: Database | null = null

/**
 * Lazy Drizzle client. On Cloudflare Workers, prefer Neon HTTP / Hyperdrive
 * and swap this adapter — node-postgres needs a TCP socket.
 */
export function getDb(): Database {
  if (_db) return _db
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }
  _db = drizzle(url, { schema })
  return _db
}

/** @deprecated Prefer getDb() so Workers bundles stay lazy */
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver)
  },
})
