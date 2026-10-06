import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'

/**
 * Media upload.
 * Demo (no R2): accept the file metadata and return a demo media key/URL so
 * publish can attach a placeholder without failing the client.
 * With R2_*: stub put() hook — wire env.MEDIA_BUCKET.put on Workers.
 */
export const Route = createFileRoute('/api/media/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const hasR2 =
          Boolean(process.env.R2_BUCKET) || Boolean(process.env.R2_ACCOUNT_ID)

        const form = await request.formData().catch(() => null)
        const file = form?.get('file')
        if (!(file instanceof File)) {
          return Response.json({ error: 'file field required' }, { status: 400 })
        }

        const safeName = file.name.replace(/[^\w.-]+/g, '_') || 'upload.bin'
        const key = `uploads/${Date.now()}-${safeName}`

        if (!hasR2) {
          return Response.json({
            ok: true,
            mode: 'demo',
            key,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
            url: `/og.svg?demo=${encodeURIComponent(key)}`,
            message:
              'Demo upload — bytes not stored. Set R2_* + wrangler r2_buckets for real put().',
          })
        }

        // Placeholder — bind env.MEDIA_BUCKET.put(key, file.stream()) on Workers
        return Response.json({
          ok: true,
          mode: 'stub',
          key,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
          url: `https://media.example/${key}`,
          note: 'Wire R2 binding put() in the Worker handler to persist bytes.',
        })
      },
    },
  },
})
