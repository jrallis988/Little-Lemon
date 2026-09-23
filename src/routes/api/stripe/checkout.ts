import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'
import { createStripeCheckoutSession } from '#/lib/payments'

export const Route = createFileRoute('/api/stripe/checkout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as {
          kind?: 'subscribe' | 'tip'
          creatorId?: string
          creatorName?: string
          amount?: number
          label?: string
          successUrl?: string
          cancelUrl?: string
          customerEmail?: string
        } | null

        if (
          !body?.kind ||
          !body.creatorId ||
          !body.creatorName ||
          typeof body.amount !== 'number' ||
          !body.label
        ) {
          return Response.json(
            { error: 'kind, creatorId, creatorName, amount, label required' },
            { status: 400 },
          )
        }

        const result = await createStripeCheckoutSession({
          kind: body.kind,
          creatorId: body.creatorId,
          creatorName: body.creatorName,
          amount: body.amount,
          label: body.label,
          successUrl: body.successUrl,
          cancelUrl: body.cancelUrl,
          customerEmail: body.customerEmail,
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
