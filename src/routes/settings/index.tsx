import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl">Settings</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Home scene, collaboration tags, privacy, and safety controls. Auth via
        Better Auth — see <code>.env.example</code>.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-[var(--ink-soft)]">
        <li className="border border-[var(--line)] bg-[var(--surface)] p-3">
          Home city / region (drives local feed + mics)
        </li>
        <li className="border border-[var(--line)] bg-[var(--surface)] p-3">
          Collaboration tags
        </li>
        <li className="border border-[var(--line)] bg-[var(--surface)] p-3">
          Blocks & reports
        </li>
      </ul>
    </main>
  )
}
