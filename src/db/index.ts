/**
 * Lazy Drizzle client.
 * Neon HTTP is Workers-safe and sync-constructible (Better Auth).
 * node-postgres is dynamically imported so it never lands in the browser bundle.
 */

import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.ts'

export type Database =
  | NeonHttpDatabase<typeof schema>
  | NodePgDatabase<typeof schema>

let _db: Database | null = null
let _dbPromise: Promise<Database> | null = null

/** True when a Postgres URL is configured for Better Auth / Drizzle. */
export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

/**
 * Prefer Neon HTTP on Workers / neon.tech URLs (no TCP socket).
 * Override with DATABASE_DRIVER=neon-http | node-postgres.
 */
export function shouldUseNeonHttp(url = process.env.DATABASE_URL ?? '') {
  const driver = process.env.DATABASE_DRIVER
  if (driver === 'neon-http') return true
  if (driver === 'node-postgres') return false
  return (
    /neon\.tech/i.test(url) ||
    Boolean(process.env.CF_PAGES || process.env.WORKER)
  )
}

function createNeonDb(url: string): Database {
  const sql = neon(url)
  return drizzleNeon(sql, { schema })
}

/**
 * Sync Neon client (Better Auth adapter). Throws if node-postgres is required —
 * use await getDbAsync() for that path.
 */
export function getDb(): Database {
  if (_db) return _db
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  if (!shouldUseNeonHttp(url)) {
    throw new Error(
      'Synchronous getDb() only supports Neon HTTP. Set DATABASE_DRIVER=neon-http or use getDbAsync().',
    )
  }
  _db = createNeonDb(url)
  return _db
}

/** Async client — supports Neon HTTP and node-postgres (dynamic import). */
export async function getDbAsync(): Promise<Database> {
  if (_db) return _db
  if (_dbPromise) return _dbPromise

  _dbPromise = (async () => {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set')

    if (shouldUseNeonHttp(url)) {
      _db = createNeonDb(url)
      return _db
    }

    const { drizzle: drizzleNode } = await import('drizzle-orm/node-postgres')
    _db = drizzleNode(url, { schema })
    return _db
  })()

  try {
    return await _dbPromise
  } catch (err) {
    _dbPromise = null
    throw err
  }
}

/** Safe getter — returns null when no database is configured. */
export async function tryGetDb(): Promise<Database | null> {
  if (!hasDatabase()) return null
  try {
    return await getDbAsync()
  } catch {
    return null
  }
}

/** @deprecated Prefer getDb() / getDbAsync() */
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver)
  },
})
