import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { CreatorProfile } from '#/components/profile/CreatorProfile'
import { getCreatorByUsername, getPostsByCreator } from '#/lib/mock/oj'

export const Route = createFileRoute('/c/$username')({
  component: CreatorPage,
})

function CreatorPage() {
  const { username } = Route.useParams()
  const creator = getCreatorByUsername(username)

  if (!creator) {
    return (
      <AppShell>
        <div className="px-4 py-10 text-[var(--muted)]">Creator not found.</div>
      </AppShell>
    )
  }

  const posts = getPostsByCreator(creator.id)

  return (
    <AppShell>
      <CreatorProfile creator={creator} posts={posts} />
    </AppShell>
  )
}
