import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'

/**
 * Stripe webhook.
 * With STRIPE_WEBHOOK_SECRET: verifies signature header presence and acknowledges
 * checkout.session.completed / invoice.paid for oj_subscriptions / oj_tips upserts.
 * Without secret: returns 503 so Stripe Dashboard retries are visible as misconfig.
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
          return Response.json(
            { error: 'Missing stripe-signature' },
            { status: 400 },
          )
        }

        const raw = await request.text()
        let eventType = 'unknown'
        let creatorId: string | undefined
        let kind: string | undefined
        try {
          const parsed = JSON.parse(raw) as {
            type?: string
            data?: {
              object?: {
                metadata?: { creatorId?: string; kind?: string }
              }
            }
          }
          eventType = parsed.type ?? 'unknown'
          creatorId = parsed.data?.object?.metadata?.creatorId
          kind = parsed.data?.object?.metadata?.kind
        } catch {
          return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
        }

        // Placeholder: verify with stripe.webhooks.constructEvent when stripe SDK is added.
        // Then upsert oj_subscriptions / oj_tips for checkout.session.completed.
        const handled =
          eventType === 'checkout.session.completed' ||
          eventType === 'invoice.paid' ||
          eventType === 'customer.subscription.deleted'

        return Response.json({
          ok: true,
          received: true,
          handled,
          eventType,
          creatorId: creatorId ?? null,
          kind: kind ?? null,
          note: handled
            ? 'Ack only — add constructEvent + DB upsert before going live.'
            : 'Event acknowledged; no oj_* mutation wired for this type yet.',
        })
      },
    },
  },
})
