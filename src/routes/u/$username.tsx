import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/u/$username')({
  component: ProfilePage,
})

function ProfilePage() {
  const { username } = Route.useParams()

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="border border-[var(--line)] bg-[var(--surface)] p-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Digital green room
        </p>
        <h1 className="mt-1 font-display text-3xl">@{username}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Profiles show craft, schedule, home scene, and collaboration tags.
          Follower counts are intentionally omitted.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {['looking_for_spots', 'open_to_collab'].map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-[var(--wash)] px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]"
            >
              {tag.replaceAll('_', ' ')}
            </li>
          ))}
        </ul>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {['Clip archive', 'Upcoming shows', 'Lab drafts'].map((label) => (
          <div
            key={label}
            className="border border-dashed border-[var(--line)] p-4 text-sm text-[var(--muted)]"
          >
            {label}
          </div>
        ))}
      </section>
    </main>
  )
}
