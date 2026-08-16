import { createFileRoute } from '@tanstack/react-router'

const ROOMS = [
  {
    slug: 'brooklyn-green-room',
    name: 'Brooklyn Green Room',
    blurb: 'Spot swaps, rides to Brick, indie room logistics.',
  },
  {
    slug: 'chicago-late',
    name: 'Chicago Late',
    blurb: 'After-mic notes and lottery coordination.',
  },
  {
    slug: 'austin-weird',
    name: 'Austin Weird Hour',
    blurb: 'Alt / musical / unfinished welcome.',
  },
]

export const Route = createFileRoute('/rooms/')({ component: RoomsPage })

function RoomsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Logistics
        </p>
        <h1 className="font-display text-3xl text-[var(--ink)]">Green Rooms</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Regional chat spaces for coordination — not performative posting.
        </p>
      </header>
      <ul className="space-y-3">
        {ROOMS.map((room) => (
          <li
            key={room.slug}
            className="border border-[var(--line)] bg-[var(--surface)] p-4"
          >
            <h2 className="font-display text-xl">{room.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{room.blurb}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
