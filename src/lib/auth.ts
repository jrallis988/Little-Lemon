/**
 * Better Auth — enabled when DATABASE_URL is present.
 * Without a database (Workers temp preview), demo auth in the UI is used.
 */

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { getDb } from '#/db/index'
import * as schema from '#/db/schema'

function createAuth() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is required for Better Auth. Use demo auth in the UI until Postgres is connected.',
    )
  }

  return betterAuth({
    database: drizzleAdapter(getDb(), {
      provider: 'pg',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [tanstackStartCookies()],
  })
}

let _auth: ReturnType<typeof createAuth> | null = null

export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_target, prop, receiver) {
    if (!_auth) _auth = createAuth()
    return Reflect.get(_auth, prop, receiver)
  },
})
