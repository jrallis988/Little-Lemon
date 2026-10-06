import { createServerFn } from '@tanstack/react-start'
import {
  loadCreatorByUsername,
  loadCreators,
  loadPublicFeed,
} from '#/server/oj'

/** Server-only OJ loaders — keep Postgres / pg out of the browser bundle. */

export const fetchPublicFeed = createServerFn({ method: 'GET' }).handler(
  async () => loadPublicFeed(),
)

export const fetchCreators = createServerFn({ method: 'GET' }).handler(
  async () => loadCreators(),
)

export const fetchCreatorByUsername = createServerFn({ method: 'GET' })
  .validator((username: unknown) => {
    if (typeof username !== 'string' || !username.trim()) {
      throw new Error('username required')
    }
    return username.trim()
  })
  .handler(async ({ data }) => loadCreatorByUsername(data))
