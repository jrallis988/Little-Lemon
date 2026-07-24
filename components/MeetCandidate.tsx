import { Ear, Handshake, Home } from "lucide-react";
import { candidate } from "@/lib/candidate";

const traits = [
  {
    icon: Home,
    title: "Deep local roots",
    body: "Raised in New Hampshire. Learned the value of a handshake deal, a hard winter, and neighbors who show up.",
  },
  {
    icon: Handshake,
    title: "Main Street experience",
    body: "Years in local commerce and operations—payroll, supply chains, and the real cost of doing business here.",
  },
  {
    icon: Ear,
    title: "Listening over rhetoric",
    body: "Town halls before talking points. Diner booths before cable hits. Policy that starts with what people actually say.",
  },
];

export function MeetCandidate() {
  return (
    <section
      id="meet"
      aria-labelledby="meet-heading"
      className="scroll-mt-20 bg-pine-800 text-pine-50"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
          Meet the candidate
        </p>
        <h2
          id="meet-heading"
          className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl"
        >
          Granite State grit. Local first.
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-pine-100">
            <p>
              {candidate.firstName} Hale grew up in New Hampshire—where you
              clear your own driveway, know the folks at the general store, and
              measure leaders by whether they keep their word.
            </p>
            <p>
              After working in local commerce and operations across the state,{" "}
              {candidate.firstName} saw firsthand how federal decisions land on
              diners, shops, farms, and families. Too often, Washington talks
              past the people who keep this place running.
            </p>
            <p>
              This campaign is simple: listen hard, protect what works, fix
              what&apos;s broken on cost of living and Main Street, and leave
              the partisan theater to someone else.
            </p>
          </div>

          <ul className="space-y-6">
            {traits.map((trait) => {
              const Icon = trait.icon;
              return (
                <li key={trait.title} className="flex gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-pine-700 text-amber-300"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {trait.title}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-pine-200">
                      {trait.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
