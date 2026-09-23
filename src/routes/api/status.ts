import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'
import { hasDatabase, shouldUseNeonHttp } from '#/db/index'
import { stripeConfigured } from '#/lib/payments'

export const Route = createFileRoute('/api/status')({
  server: {
    handlers: {
      GET: () => {
        const databaseUrl = process.env.DATABASE_URL ?? ''
        return Response.json({
          service: 'oj-only-jokes',
          ok: true,
          mode: hasDatabase() ? 'database' : 'catalog-demo',
          features: {
            database: hasDatabase(),
            neonHttp: hasDatabase() ? shouldUseNeonHttp(databaseUrl) : false,
            betterAuth: Boolean(
              process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET,
            ),
            stripe: stripeConfigured(),
            stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
            r2: Boolean(process.env.R2_BUCKET || process.env.R2_ACCOUNT_ID),
          },
        })
      },
    },
  },
})
