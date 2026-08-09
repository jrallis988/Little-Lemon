import Link from "next/link";
import { SCREENS, screensBySurface } from "@/lib/screens";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Screen registry",
  robots: { index: false, follow: false },
};

const statusVariant = {
  live: "success" as const,
  scaffold: "yellow" as const,
  planned: "muted" as const,
};

export default function ScreenRegistryPage() {
  const web = screensBySurface("web");
  const app = screensBySurface("app");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Architecture
      </p>
      <h1 className="mt-1 font-display text-4xl tracking-tight text-pf-ink">
        Master screen registry
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-pf-ink/65">
        {SCREENS.length} screens across public web acquisition and member-app
        utility. Website owns join/discovery;{" "}
        <Link href="/app" className="font-semibold text-pf-purple underline">
          /app
        </Link>{" "}
        owns day-to-day member tools.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-pf-ink">
          Web 01–20 · Acquisition
        </h2>
        <ul className="mt-3 divide-y divide-pf-line rounded-2xl border border-pf-line bg-white">
          {web.map((screen) => (
            <li
              key={screen.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <span>
                <span className="font-mono text-xs text-pf-ink/45">
                  {screen.code}
                </span>{" "}
                <Link href={screen.route} className="font-semibold text-pf-ink hover:text-pf-purple">
                  {screen.name}
                </Link>
              </span>
              <Badge variant={statusVariant[screen.status]}>{screen.status}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-pf-ink">
          App 21–85 · Member utility
        </h2>
        <ul className="mt-3 divide-y divide-pf-line rounded-2xl border border-pf-line bg-white">
          {app.map((screen) => (
            <li
              key={screen.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <span>
                <span className="font-mono text-xs text-pf-ink/45">
                  {screen.code}
                </span>{" "}
                <Link href={screen.route} className="font-semibold text-pf-ink hover:text-pf-purple">
                  {screen.name}
                </Link>
              </span>
              <Badge variant={statusVariant[screen.status]}>{screen.status}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
