import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'

/**
 * Media upload stub.
 * When R2 bindings exist (wrangler r2_buckets), store the object and return a public URL.
 * Until then, clients keep using SVG posters / on-device publish.
 */
export const Route = createFileRoute('/api/media/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const hasR2 =
          Boolean(process.env.R2_BUCKET) ||
          Boolean(process.env.R2_ACCOUNT_ID)

        if (!hasR2) {
          return Response.json(
            {
              ok: false,
              mode: 'demo',
              message:
                'R2 not configured. Set R2_* env + wrangler r2_buckets, then retry upload.',
            },
            { status: 503 },
          )
        }

        const form = await request.formData().catch(() => null)
        const file = form?.get('file')
        if (!(file instanceof File)) {
          return Response.json({ error: 'file field required' }, { status: 400 })
        }

        // Placeholder — bind env.MEDIA_BUCKET.put(key, file.stream()) on Workers
        const key = `uploads/${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_')}`
        return Response.json({
          ok: true,
          mode: 'stub',
          key,
          contentType: file.type,
          size: file.size,
          note: 'Wire R2 binding put() in the Worker handler to persist bytes.',
        })
      },
    },
  },
})
