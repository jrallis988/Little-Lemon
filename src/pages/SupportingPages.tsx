import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnniversaryBadge } from "../components/Logo";

type PageShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

function PageShell({ eyebrow, title, lead, children }: PageShellProps) {
  return (
    <main className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="section-shell">
        <AnniversaryBadge />
        <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          {eyebrow}
        </p>
        <h1
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          {lead}
        </p>
        <div className="mt-12">{children}</div>
        <p className="mt-12 font-sans text-sm text-ink/55">
          Part of <Link to="/" className="font-semibold text-cobalt-700">Weight Watchers 63 · 63 Years of You</Link>
        </p>
      </div>
    </main>
  );
}

export function ProgramsPage() {
  return (
    <PageShell
      eyebrow="Programs"
      title="Programs that evolved with you."
      lead="Core, coaching, community, and clinical support—built for real life across generations."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Core / Points",
            copy: "Flexible food framework for steady, sustainable progress.",
            image: "/images/food.jpg",
          },
          {
            title: "Community",
            copy: "Coach-led groups and digital circles that double results for those who engage.",
            image: "/images/campaign/meeting.jpg",
          },
          {
            title: "Med+",
            copy: "Clinical care and GLP-1 support when appropriate—never alone.",
            image: "/images/campaign/science.jpg",
          },
        ].map((item) => (
          <article key={item.title} className="overflow-hidden rounded-[1.5rem] border border-ink/8">
            <img src={item.image} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                {item.title}
              </h2>
              <p className="mt-2 font-sans text-sm text-ink/65">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export function StoriesPage() {
  return (
    <PageShell
      eyebrow="Success Stories"
      title="63 Years of You, continued."
      lead="Meaningful life moments across ages and backgrounds—celebrating people, not before-and-after tropes."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          "/images/campaign/portrait-a.jpg",
          "/images/campaign/portrait-b.jpg",
          "/images/campaign/portrait-c.jpg",
          "/images/campaign/portrait-d.jpg",
          "/images/campaign/family-cook.jpg",
          "/images/campaign/grocery.jpg",
        ].map((src, index) => (
          <figure key={src} className="overflow-hidden rounded-[1.5rem]">
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="bg-mist/60 px-4 py-3 font-serif text-sm text-ink/70">
              Chapter moment {index + 1} · Everyday healthy living
            </figcaption>
          </figure>
        ))}
      </div>
      <Link to="/find-your-year" className="mt-8 inline-flex font-sans text-sm font-semibold text-cobalt-700">
        Find Your Year →
      </Link>
    </PageShell>
  );
}

export function InnovationPage() {
  return (
    <PageShell
      eyebrow="Innovation"
      title="Tools change. Care stays."
      lead="Paper journals to AI coaching—innovation in service of healthier lives, not novelty."
    >
      <div className="space-y-8">
        {[
          ["Paper journals", "Mobile apps & dashboards", "/images/campaign/journal.jpg", "/images/campaign/phone.jpg"],
          ["Printed guides", "Personalized recommendations", "/images/archive/cookbook.jpg", "/images/food.jpg"],
          ["Meeting rooms only", "Hybrid workshops + wearables", "/images/archive/living-room.jpg", "/images/campaign/coaching.jpg"],
        ].map(([then, now, thenImg, nowImg]) => (
          <div key={then} className="grid gap-4 md:grid-cols-2">
            <div>
              <img src={thenImg} alt="" className="aspect-video w-full rounded-2xl object-cover grayscale" />
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-ink/45">Then · {then}</p>
            </div>
            <div>
              <img src={nowImg} alt="" className="aspect-video w-full rounded-2xl object-cover" />
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-cobalt-600">Now · {now}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research & Wellness"
      title="Science that keeps walking with people."
      lead="Behavioral coaching, nutrition, activity, and clinical support—including GLP-1—as one evolving practice."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Nutrition science updated across decades",
          "Behavioral coaching as a measurable lever",
          "Habit formation for real weeks, not perfect ones",
          "Activity, sleep, and recovery signals",
          "Personalized Modes and programs",
          "GLP-1 companionship with community",
        ].map((item) => (
          <p key={item} className="rounded-2xl border border-ink/8 bg-white px-5 py-4 font-sans text-sm text-ink/75">
            {item}
          </p>
        ))}
      </div>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Weight Watchers remained relevant by evolving."
      lead="Since 1963, the brand adapted through generations, lifestyles, technology, and nutrition science—while staying committed to healthier lives."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <img
          src="/images/campaign/multi-gen.jpg"
          alt="People across generations"
          className="rounded-[1.75rem] object-cover"
        />
        <div className="font-serif text-lg leading-relaxed text-ink/70">
          <p>
            This campaign is not nostalgia for its own sake. It is a documentary of adaptation:
            community first, then science, then tools—always in service of people choosing to begin
            again.
          </p>
          <p className="mt-4">
            Weight Watchers is the guide. The people are the story. That is Weight Watchers 63.
          </p>
          <Link to="/" className="mt-6 inline-flex font-sans text-sm font-semibold text-cobalt-700">
            Return to the campaign →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
