import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '#/components/layout/AppShell'
import { CreatorProfile } from '#/components/profile/CreatorProfile'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { loadCreatorByUsername } from '#/server/oj'

export const Route = createFileRoute('/c/$username')({
  loader: ({ params }) => loadCreatorByUsername(params.username),
  component: CreatorPage,
})

function CreatorPage() {
  const data = Route.useLoaderData()

  if (!data) {
    return (
      <AppShell>
        <div className="px-4 py-10 text-[var(--muted)]">Creator not found.</div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <CreatorProfile creator={data.creator} posts={data.posts} />
      <SiteFooter />
    </AppShell>
  )
}
