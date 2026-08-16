import { createFileRoute } from '@tanstack/react-router'

const SEED_MICS = [
  {
    id: 'm1',
    title: 'Brick New Material',
    when: 'Tonight · 8:30p',
    where: 'The Red Brick · Williamsburg, Brooklyn',
    kind: 'Open mic',
    slots: 3,
  },
  {
    id: 'm2',
    title: 'Mirror Lottery',
    when: 'Tue · 9:00p',
    where: 'Mic & Mirror · Wicker Park, Chicago',
    kind: 'Open mic',
    slots: 8,
  },
  {
    id: 'm3',
    title: 'Velvet Weird Hour',
    when: 'Thu · 10:30p',
    where: 'Velvet Hour · East Austin',
    kind: 'Indie room',
    slots: 5,
  },
]

export const Route = createFileRoute('/mics/')({ component: MicsPage })

function MicsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
          Geo board
        </p>
        <h1 className="font-display text-3xl text-[var(--ink)]">Open mics</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Local rooms first. Sorted by start time — not popularity.
        </p>
      </header>
      <div className="space-y-3">
        {SEED_MICS.map((mic) => (
          <article
            key={mic.id}
            className="border border-[var(--line)] bg-[var(--surface)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
                  {mic.kind} · {mic.when}
                </p>
                <h2 className="mt-1 font-display text-2xl">{mic.title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{mic.where}</p>
              </div>
              <div className="border border-[var(--line)] px-2 py-1 text-center">
                <div className="font-display text-xl">{mic.slots}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  slots
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 rounded-md bg-[var(--ink)] px-3 py-2 text-sm font-semibold text-[var(--bg)]"
            >
              Claim slot
            </button>
          </article>
        ))}
      </div>
    </main>
  )
}
