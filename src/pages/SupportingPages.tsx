import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  innovationArc,
  innovationBeats,
  programPathways,
  researchTopics,
  stories,
  storyDecadeFilters,
} from "../data/campaign";
import { AnniversaryBadge } from "../components/Logo";
import { PageMeta } from "../components/PageMeta";

type PageShellProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  metaTitle: string;
  metaDescription: string;
  path: string;
  image?: string;
};

function PageShell({
  eyebrow,
  title,
  lead,
  children,
  metaTitle,
  metaDescription,
  path,
  image,
}: PageShellProps) {
  return (
    <main id="main-content" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <PageMeta title={metaTitle} description={metaDescription} path={path} image={image} />
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
          Part of{" "}
          <Link to="/" className="font-semibold text-cobalt-700">
            Weight Watchers 63 · 63 Years of You
          </Link>
        </p>
      </div>
    </main>
  );
}

export function ProgramsPage() {
  return (
    <PageShell
      eyebrow="Today's Weight Watchers"
      title="What Weight Watchers offers today."
      lead="63 years of learning what support looks like—across nutrition, coaching, digital tools, and clinician-supported pathways."
      metaTitle="Today's Weight Watchers | Weight Watchers 63"
      metaDescription="Explore nutrition, coaching, digital tools, and educational medical-support pathways in Weight Watchers 63."
      path="/programs"
      image="/images/campaign/hero-market.jpg"
    >
      <p className="mb-8 max-w-2xl font-serif text-lg text-ink/70">
        Clear pathways for real life—connected by one idea: support that evolves with people.{" "}
        <Link to="/#plan-matrix" className="font-semibold text-cobalt-700">
          Compare concept plans on the homepage →
        </Link>
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {programPathways.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white">
            <img src={item.image} alt={item.imageAlt} className="aspect-[16/9] w-full object-cover" />
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                {item.title}
              </h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{item.summary}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2 font-sans text-sm text-ink/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export function StoriesPage() {
  const [filter, setFilter] = useState<(typeof storyDecadeFilters)[number]>("All");
  const featured = stories[0];
  const filtered = useMemo(() => {
    if (filter === "All") return stories;
    if (filter === "Today") return stories.filter((story) => story.decade === "2020s");
    return stories.filter((story) => story.decade === filter);
  }, [filter]);

  return (
    <PageShell
      eyebrow="63 Years of You"
      title="Every year has a story."
      lead="Portrait-led chapters across decades, generations, life stages, and wellness goals—celebrating people, not before-and-after tropes."
      metaTitle="63 Years of You | Weight Watchers 63"
      metaDescription="Member stories across decades and life stages from the Weight Watchers 63 campaign."
      path="/stories"
      image="/images/campaign/portrait-featured.jpg"
    >
      <article className="grid overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white lg:grid-cols-2">
        <img
          src={featured.image}
          alt={`Portrait of ${featured.name}`}
          className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
        />
        <div className="p-6 sm:p-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">
            Featured member story
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink" style={{ fontWeight: 700 }}>
            {featured.name}
          </h2>
          <p className="mt-1 font-sans text-sm text-ink/50">
            {featured.decade} · {featured.lifeStage} · {featured.goal}
          </p>
          <blockquote className="mt-4 font-serif text-2xl leading-snug text-ink">
            “{featured.quote}”
          </blockquote>
          <p className="mt-4 font-sans text-sm text-ink/65">{featured.moment}</p>
        </div>
      </article>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter stories by decade">
        {storyDecadeFilters.map((decade) => (
          <button
            key={decade}
            type="button"
            role="tab"
            aria-selected={filter === decade}
            onClick={() => setFilter(decade)}
            className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
              filter === decade ? "bg-cobalt-600 text-white" : "bg-mist text-ink/70 hover:bg-cobalt-100"
            }`}
          >
            {decade}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {filtered.map((story) => (
          <article key={story.id} className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white">
            <img
              src={story.image}
              alt={`Portrait representing ${story.name}`}
              className="aspect-[4/3] w-full object-cover object-top"
            />
            <div className="p-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                {story.name} · {story.decade}
              </p>
              <p className="mt-1 font-sans text-xs text-cobalt-700">
                {story.category} · {story.lifeStage} · {story.goal}
              </p>
              <blockquote className="mt-3 font-serif text-lg text-ink">“{story.quote}”</blockquote>
              <p className="mt-3 font-sans text-sm font-semibold text-cobalt-700">Read story</p>
            </div>
          </article>
        ))}
      </div>

      <Link
        to="/find-your-year"
        className="mt-10 inline-flex rounded-2xl bg-cobalt-600 px-6 py-3.5 font-sans text-sm font-semibold text-white"
      >
        Find Your Year
      </Link>
    </PageShell>
  );
}

export function InnovationPage() {
  const [active, setActive] = useState(0);
  const beat = innovationBeats[active];

  return (
    <PageShell
      eyebrow="63 Years of Innovation"
      title="The tools changed. The purpose didn’t."
      lead="From paper trackers to a personalized wellness platform—innovation in service of healthier lives."
      metaTitle="63 Years of Innovation | Weight Watchers 63"
      metaDescription="A then-and-now journey from paper journals to connected, personalized Weight Watchers tools."
      path="/innovation"
      image="/images/campaign/phone.jpg"
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {innovationArc.map((step, index) => (
          <li key={step.label} className="overflow-hidden rounded-[1.25rem] border border-ink/8 bg-white">
            <img src={step.image} alt="" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ink/40">
                Step {index + 1} · {step.era}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                {step.label}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
          Drag attention across then and now
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {innovationBeats.map((item, index) => (
            <button
              key={item.then}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
                active === index ? "bg-cobalt-600 text-white" : "bg-mist text-ink/70 hover:bg-cobalt-100"
              }`}
            >
              {item.then} → {item.now}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <img
              src={beat.thenImage}
              alt={beat.thenAlt}
              className="aspect-video w-full rounded-2xl object-cover grayscale"
            />
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-ink/45">Then · {beat.then}</p>
          </div>
          <div>
            <img src={beat.nowImage} alt={beat.nowAlt} className="aspect-video w-full rounded-2xl object-cover" />
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-cobalt-600">Now · {beat.now}</p>
          </div>
        </div>
        <p className="mt-4 font-serif text-xl text-ink/75">{beat.detail}</p>
      </div>
    </PageShell>
  );
}

export function ResearchPage() {
  return (
    <PageShell
      eyebrow="63 Years of Science"
      title="Science changes. So do we."
      lead="Nutrition, behavior, movement, coaching, personalization, and educational framing for modern medical support—without unverified claims."
      metaTitle="63 Years of Science | Weight Watchers 63"
      metaDescription="Explore Weight Watchers 63 research themes across nutrition, behavior, coaching, and educational medical support."
      path="/research"
      image="/images/campaign/science.jpg"
    >
      <div className="rounded-[1.5rem] border border-ink/8 bg-mist/60 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
          How to read this page
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70">
          Lifestyle guidance and clinician-supported care are related but not the same. Where GLP-1
          or medical support appears, it is educational context only—not a prescription, diagnosis,
          or promise of outcomes.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {researchTopics.map((topic) => (
          <article key={topic.title} className="overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white">
            <img src={topic.image} alt={topic.imageAlt} className="aspect-[16/9] w-full object-cover" />
            <div className="p-5">
              <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                {topic.title}
              </h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{topic.copy}</p>
            </div>
          </article>
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
      metaTitle="About Weight Watchers 63 | 63 Years of You"
      metaDescription="Learn how Weight Watchers 63 tells the story of a brand that evolved alongside the people it serves."
      path="/about"
      image="/images/campaign/kitchen-cook.jpg"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <img
          src="/images/campaign/kitchen-cook.jpg"
          alt="A member cooking at home with fresh lemons, greens, and colorful cookware"
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
