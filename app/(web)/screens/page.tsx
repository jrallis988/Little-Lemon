import Link from "next/link";
import { SCREENS, screensBySurface, type ScreenDef } from "@/lib/screens";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Product map",
  robots: { index: false, follow: false },
};

const statusVariant = {
  live: "success" as const,
  scaffold: "yellow" as const,
  planned: "muted" as const,
};

/** Primary launch surface — depth over breadth. */
const CORE_IDS = new Set([
  1, 2, 3, 4, 10, 11, 12, 13, 14, // web acquisition + join
  21, 22, 23, 26, 28, 33, 53, 59, // member essentials
]);

function ScreenList({
  items,
  empty,
}: {
  items: ScreenDef[];
  empty: string;
}) {
  if (!items.length) {
    return <p className="mt-3 text-sm text-pf-ink/55">{empty}</p>;
  }
  return (
    <ul className="mt-3 divide-y divide-pf-line rounded-2xl border border-pf-line bg-white">
      {items.map((screen) => (
        <li
          key={screen.id}
          className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
        >
          <span>
            <span className="font-mono text-xs text-pf-ink/45">
              {screen.code}
            </span>{" "}
            <Link
              href={screen.route}
              className="font-semibold text-pf-ink hover:text-pf-purple"
            >
              {screen.name}
            </Link>
            <span className="ml-2 text-xs text-pf-ink/40">{screen.surface}</span>
          </span>
          <Badge variant={statusVariant[screen.status]}>{screen.status}</Badge>
        </li>
      ))}
    </ul>
  );
}

export default function ScreenRegistryPage() {
  const web = screensBySurface("web");
  const app = screensBySurface("app");
  const core = SCREENS.filter((s) => CORE_IDS.has(s.id));
  const roadmap = SCREENS.filter((s) => !CORE_IDS.has(s.id));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Product map
      </p>
      <h1 className="mt-1 font-display text-4xl tracking-tight text-pf-ink">
        Core product vs roadmap
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-pf-ink/65">
        {SCREENS.length} screens total. Launch focus is the acquisition funnel
        and a small member-utility set — not every scaffold route.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-pf-ink">
          Core · ship first ({core.length})
        </h2>
        <ScreenList items={core} empty="No core screens." />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-pf-ink">
          Roadmap · later depth ({roadmap.length})
        </h2>
        <p className="mt-1 text-sm text-pf-ink/55">
          Kept for product mapping. Treat as backlog unless marked critical.
        </p>
        <ScreenList items={roadmap} empty="No roadmap screens." />
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-pf-ink">
            Web · Acquisition ({web.length})
          </h2>
          <ScreenList items={web} empty="" />
        </div>
        <div>
          <h2 className="font-display text-xl text-pf-ink">
            App · Member utility ({app.length})
          </h2>
          <ScreenList items={app} empty="" />
        </div>
      </section>
    </div>
  );
}
