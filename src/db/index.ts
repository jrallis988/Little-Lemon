import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.ts'

export type Database =
  | NeonHttpDatabase<typeof schema>
  | NodePgDatabase<typeof schema>

let _db: Database | null = null

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
  return /neon\.tech/i.test(url) || Boolean(process.env.CF_PAGES || process.env.WORKER)
}

/**
 * Lazy Drizzle client.
 * Falls back to the in-memory OJ catalog when DATABASE_URL is unset.
 */
export function getDb(): Database {
  if (_db) return _db
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }

  if (shouldUseNeonHttp(url)) {
    const sql = neon(url)
    _db = drizzleNeon(sql, { schema })
  } else {
    _db = drizzleNode(url, { schema })
  }
  return _db
}

/** Safe getter — returns null when no database is configured. */
export function tryGetDb(): Database | null {
  if (!hasDatabase()) return null
  try {
    return getDb()
  } catch {
    return null
  }
}

/** @deprecated Prefer getDb() so Workers bundles stay lazy */
export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver)
  },
})
