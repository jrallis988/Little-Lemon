import Image from "next/image";
import Link from "next/link";
import { CircleLink } from "@/components/home/CircleLink";

/** Homepage “Latest from Boston Children’s” columns — synced to childrenshospital.org (Sept 2026). */
const columns = [
  {
    heading: "News Stories",
    image: "/images/latest/food-pantry-jamaica-plain.webp",
    alt: "Produce shelves at a community food pantry, with green bananas in the foreground",
    tag: "In the News",
    date: "September 17, 2026",
    title:
      "Watch: Boston Children's food pantry in Jamaica Plain now serves 1,600 people each week",
    source: "WCVB-TV",
    href: "/about/community",
    cta: "Visit the Newsroom",
  },
  {
    heading: "Latest Videos",
    image: "/images/latest/solu-cortef-injection.jpg",
    alt: "Video thumbnail: how to administer a Solu-Cortef injection",
    tag: "Conditions & Treatments",
    date: null,
    title: "How to administer a Solu-Cortef injection",
    body: "Review how to administer a Solu-Cortef injection in an emergency for a child with adrenal insufficiency. In this video, Natalie Reilly, a nurse in the Boston Children's Division of Endocrinology...",
    href: "/conditions",
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
    body: "Artificial intelligence is quickly becoming part of everyday life for children and teens. Many students now use AI tools like ChatGPT for homework, studying, writing, and answering questions, while others...",
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
