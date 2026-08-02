import Image from "next/image";
import { CircleLink } from "@/components/home/CircleLink";

export function FeatureStories() {
  return (
    <section className="bg-white py-s9" aria-label="Featured stories">
      <div className="wrap flex flex-col gap-s10">
        <div className="grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
              alt="A child with family in a bright hospital hallway"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="mb-s4 text-2xl font-bold text-text sm:text-3xl">
              One of the world&apos;s best pediatric hospitals
            </h2>
            <p className="mb-s5 text-md font-light leading-relaxed text-text-body">
              Ranked the #1 pediatric hospital in the U.S. by{" "}
              <em>Newsweek</em> and recognized among the nation&apos;s best by{" "}
              <em>U.S. News &amp; World Report</em>, Boston Children&apos;s
              continues to set the standard in pediatric care.
            </p>
            <CircleLink href="/about">
              Discover why Boston Children&apos;s is trusted worldwide
            </CircleLink>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="mb-s4 text-2xl font-bold text-text sm:text-3xl">
              Leading programs &amp; services for every child
            </h2>
            <p className="mb-s5 text-md font-light leading-relaxed text-text-body">
              From world-renowned heart care to innovative neurology and rare
              disease programs, Boston Children&apos;s offers more than 300
              specialized programs and services designed just for kids.
            </p>
            <CircleLink href="/programs">
              Explore all programs &amp; services
            </CircleLink>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-md lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80"
              alt="A caregiver holding a smiling baby"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
