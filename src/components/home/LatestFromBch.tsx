import Image from "next/image";
import Link from "next/link";
import { CircleLink } from "@/components/home/CircleLink";

const columns = [
  {
    heading: "News Stories",
    image: "/images/latest/back-to-school-classroom.jpg",
    alt: "Children sit at desks in a classroom with several students raising their hands while a teacher stands at the front",
    tag: "In the News",
    date: "July 27, 2026",
    title: "Watch: Tips to ease back-to-school stress for kids",
    source: "WCVB-TV",
    href: "/about",
    cta: "Visit the Newsroom",
  },
  {
    heading: "Latest Videos",
    image: "/images/latest/isabella-family.jpg",
    alt: "A smiling young patient in red glasses and a red dress with her parents in a bright hospital atrium",
    tag: "Programs & Services",
    date: null,
    title: "Isabella’s journey with bronchopulmonary dysplasia",
    body: "Meet Isabella and her family as they share how specialized lung care at Boston Children’s helped her thrive.",
    href: "/programs",
    cta: "See All Videos",
  },
  {
    heading: "Podcasts",
    image: "/images/latest/parentcast-ai-episode.jpg",
    alt: "Parent podcast artwork: My child is using AI a lot. Should I be worried?",
    tag: null,
    date: null,
    title: "My child is using AI a lot. Should I be worried?",
    meta: "Parentcast: Season 4, Episode 5 | 31 min",
    body: "Artificial intelligence is quickly becoming part of everyday life for children and teens. Many students now use AI tools like ChatGPT for homework, studying, writing, and answering questions.",
    href: "/patients-families",
    cta: "Check Out All Episodes",
  },
];

export function LatestFromBch() {
  return (
    <section className="bg-white py-s9" aria-labelledby="latest-heading">
      <div className="wrap">
        <h2
          id="latest-heading"
          className="mb-s7 text-2xl font-bold text-text sm:text-3xl"
        >
          Latest from Boston Children&apos;s
        </h2>

        <div className="grid grid-cols-1 gap-s7 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col">
              <h3 className="mb-s4 text-lg font-bold text-text">{col.heading}</h3>
              <article className="flex flex-1 flex-col">
                <div className="relative mb-s4 aspect-[16/10] overflow-hidden rounded-md">
                  <Image
                    src={col.image}
                    alt={col.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                {col.tag ? (
                  <span className="mb-s2 inline-flex self-start rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-text">
                    {col.tag}
                  </span>
                ) : null}
                {col.date ? (
                  <p className="mb-s2 text-sm text-text-meta">{col.date}</p>
                ) : null}
                <Link
                  href={col.href}
                  className="mb-s2 text-lg font-bold leading-snug text-ocean no-underline hover:underline"
                >
                  {col.title}
                </Link>
                {"meta" in col && col.meta ? (
                  <p className="mb-s2 text-sm font-bold text-blue">{col.meta}</p>
                ) : null}
                {"body" in col && col.body ? (
                  <p className="mb-s3 text-sm font-light leading-relaxed text-text-body">
                    {col.body}
                  </p>
                ) : null}
                {"source" in col && col.source ? (
                  <p className="mb-s3 text-xs italic text-text-meta">
                    {col.source}
                  </p>
                ) : null}
                <div className="mt-auto pt-s3">
                  <CircleLink href={col.href}>{col.cta}</CircleLink>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
