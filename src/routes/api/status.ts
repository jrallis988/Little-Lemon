import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'
import { hasDatabase, shouldUseNeonHttp } from '#/db/index'
import { stripeConfigured } from '#/lib/payments'

export const Route = createFileRoute('/api/status')({
  server: {
    handlers: {
      GET: () => {
        const databaseUrl = process.env.DATABASE_URL ?? ''
        const build = process.env.CF_VERSION_METADATA
          ? 'cloudflare'
          : process.env.NODE_ENV === 'production'
            ? 'production'
            : 'development'

        return Response.json({
          service: process.env.SERVICE_NAME ?? 'oj-only-jokes',
          ok: true,
          build,
          mode: hasDatabase() ? 'database' : 'catalog-demo',
          time: new Date().toISOString(),
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
          routes: {
            checkout: '/api/stripe/checkout',
            webhook: '/api/stripe/webhook',
            upload: '/api/media/upload',
            auth: '/api/auth',
          },
        })
      },
    },
  },
})
