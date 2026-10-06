import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'
import { createStripeConnectOnboarding } from '#/lib/payments'

export const Route = createFileRoute('/api/stripe/connect')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as {
          returnUrl?: string
          refreshUrl?: string
          email?: string
        } | null

        const result = await createStripeConnectOnboarding({
          returnUrl: body?.returnUrl,
          refreshUrl: body?.refreshUrl,
          email: body?.email,
        })

        const status =
          result.status === 'error'
            ? 502
            : result.status === 'needs_stripe'
              ? 503
              : 200

        return Response.json(result, { status })
      },
    },
  },
})
