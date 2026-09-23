import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'

/**
 * Stripe webhook stub.
 * Wire signature verification with STRIPE_WEBHOOK_SECRET and update
 * oj_subscriptions / oj_tips when Checkout + Connect are live.
 */
export const Route = createFileRoute('/api/stripe/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
          return Response.json(
            {
              ok: false,
              mode: 'demo',
              message:
                'STRIPE_WEBHOOK_SECRET not set. Demo membership uses on-device unlocks.',
            },
            { status: 503 },
          )
        }

        const signature = request.headers.get('stripe-signature')
        if (!signature) {
          return Response.json({ error: 'Missing stripe-signature' }, { status: 400 })
        }

        // Placeholder: verify with stripe.webhooks.constructEvent when stripe SDK is added
        return Response.json({
          ok: true,
          received: true,
          note: 'Add stripe package + constructEvent, then upsert oj_subscriptions / oj_tips.',
        })
      },
    },
  },
})
