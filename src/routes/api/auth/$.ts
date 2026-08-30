import { createFileRoute } from '@tanstack/react-router'
import '#/start-types'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!process.env.DATABASE_URL) {
          return Response.json(
            {
              error:
                'Better Auth requires DATABASE_URL. Use in-app demo auth until Postgres is connected.',
            },
            { status: 503 },
          )
        }
        const { auth } = await import('#/lib/auth')
        return auth.handler(request)
      },
      POST: async ({ request }) => {
        if (!process.env.DATABASE_URL) {
          return Response.json(
            {
              error:
                'Better Auth requires DATABASE_URL. Use in-app demo auth until Postgres is connected.',
            },
            { status: 503 },
          )
        }
        const { auth } = await import('#/lib/auth')
        return auth.handler(request)
      },
    },
  },
})
