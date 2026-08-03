import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Here for every child. Learn about Boston Children’s Hospital’s mission, teaching hospital model, leadership, history, and community commitment.",
};

const missionPillars = [
  {
    title: "Highest-quality care",
    body: "Provide the highest quality of health care for children of all ages and conditions — from the rarest diseases to the most common injuries.",
  },
  {
    title: "Research & discovery",
    body: "Lead the way in pediatric research and discovery so breakthroughs move quickly from the lab to a child’s bedside.",
  },
  {
    title: "Educate future leaders",
    body: "Educate the next generation of leaders in pediatric health care as a teaching hospital of Harvard Medical School.",
  },
  {
    title: "Community well-being",
    body: "Enhance the health and well-being of children and families in our local community through equity-focused programs and partnerships.",
  },
];

const exploreLinks = [
  {
    title: "Locations",
    body: "Main campus and neighborhood sites across Greater Boston.",
    href: "/locations",
  },
  {
    title: "Leadership",
    body: "Meet the executives guiding clinical care, research, and community work.",
    href: "/about/leadership",
  },
  {
    title: "Our history",
    body: "From 1869 to today — more than 150 years of pediatric innovation.",
    href: "/about/history",
  },
  {
    title: "Community health",
    body: "Anchor strategy, equity commitments, and local partnerships.",
    href: "/about/community",
  },
  {
    title: "International patients",
    body: "Destination medicine, visit coordination, and language support for families traveling for care.",
    href: "/international",
  },
  {
    title: "Research hub",
    body: "Clinical trials, labs, and discovery programs.",
    href: "/research",
  },
  {
    title: "Programs & services",
    body: "Specialty programs built around complex pediatric needs.",
    href: "/programs",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        id="about-heading"
        eyebrow="About Us"
        title="Here for every child."
        lead="At Boston Children’s Hospital, we combine compassion, innovation, and world-leading expertise to care for children of all ages and conditions — from the rarest diseases to the most common injuries."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Request an Appointment
            </Button>
            <Button href="/professionals/second-opinion" variant="ghost-white">
              Request a Second Opinion
            </Button>
          </>
        }
      />

      <div className="wrap py-s7 pb-s10">
        <Notice className="mb-s7">
          <p>
            Content adapted from the public{" "}
            <a
              href="https://www.childrenshospital.org/about-us"
              className="font-semibold text-ocean underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Boston Children&apos;s Hospital About Us
            </a>{" "}
            overview for this redesign platform.
          </p>
        </Notice>

        <section className="mb-s10" aria-labelledby="overview-heading">
          <div className="grid grid-cols-1 items-center gap-s7 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Overview</span>
              <h2
                id="overview-heading"
                className="mb-s4 mt-s2 text-2xl font-bold text-ocean"
              >
                Groundbreaking care, research, and hope for families worldwide.
              </h2>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                Our specialists deliver advanced treatments, advance pediatric
                research, and support families from across the globe. For more
                than 150 years, Boston Children&apos;s has kept the same vision:
                to advance pediatric care worldwide.
              </p>
              <div className="flex flex-wrap gap-s3">
                <Button href="/locations" variant="outline">
                  Our locations
                </Button>
                <Button href="/programs" variant="outline">
                  Clinical programs
                </Button>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80"
                alt="Clinicians collaborating in a modern pediatric care setting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mb-s10" aria-labelledby="mission-heading">
          <span className="eyebrow">Our mission</span>
          <h2
            id="mission-heading"
            className="mb-s3 mt-s2 max-w-[720px] text-2xl font-bold text-ocean"
          >
            A four-part mission guiding care, discovery, education, and community.
          </h2>
          <p className="mb-s6 max-w-[720px] text-md font-light text-text-body">
            For over 150 years, Boston Children&apos;s Hospital has maintained
            the same vision: to advance pediatric care worldwide.
          </p>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
            {missionPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="rounded-md border border-border bg-white p-s5"
              >
                <div className="mb-s2 text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
                  0{index + 1}
                </div>
                <h3 className="mb-s2 text-lg font-bold text-blue">
                  {pillar.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-text-body">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div
          className="mb-s10 rounded-md bg-blue py-s7"
          role="region"
          aria-label="Hospital highlights"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { num: "1869", label: "Year founded" },
              { num: "150+", label: "Years advancing pediatric care" },
              { num: "4", label: "Mission pillars" },
            ].map((stat, i) => (
              <div
                key={stat.num}
                className={`px-s7 py-s6 text-center ${
                  i < 2
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <span className="mb-2 block text-[clamp(36px,5vw,58px)] font-black leading-none tracking-[-0.03em] text-white">
                  {stat.num}
                </span>
                <span className="text-sm font-light text-white/85">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <section className="mb-s10" aria-labelledby="teaching-heading">
          <div className="grid grid-cols-1 items-start gap-s7 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Teaching hospital</span>
              <h2
                id="teaching-heading"
                className="mb-s4 mt-s2 text-2xl font-bold text-ocean"
              >
                Training the next generation of pediatric leaders.
              </h2>
              <p className="mb-s4 text-md font-light leading-[1.75] text-text-body">
                Boston Children&apos;s is a teaching hospital, which means that
                doctors, nurses, and other health care professionals who are in
                training may care for your child. Each trainee works under the
                supervision of a qualified senior professional.
              </p>
              <p className="mb-s5 text-md font-light leading-[1.75] text-text-body">
                We believe these teams add to the quality of your child&apos;s
                care — bringing fresh perspective, deep supervision, and a
                culture of continuous learning.
              </p>
              <Button href="/about/leadership" variant="outline">
                Meet our leadership
              </Button>
            </div>
            <div className="rounded-md border border-border bg-surface p-s6">
              <h3 className="mb-s3 text-lg font-bold text-blue">
                Get connected
              </h3>
              <p className="mb-s4 text-sm font-light text-text-body">
                Questions about care, referrals, or visiting Boston
                Children&apos;s? Our teams are here to help families and
                referring clinicians find the right next step.
              </p>
              <ul className="mb-s5 flex flex-col gap-2 text-sm font-light text-text-body">
                <li>
                  <strong className="font-bold text-text">Phone:</strong>{" "}
                  (617) 355-6000
                </li>
                <li>
                  <strong className="font-bold text-text">Weekdays:</strong>{" "}
                  Monday–Friday, 7:00 am – 8:00 pm
                </li>
                <li>
                  <strong className="font-bold text-text">Saturday:</strong>{" "}
                  9:30 am – 6:00 pm
                </li>
              </ul>
              <div className="flex flex-wrap gap-s3">
                <Button href="/appointments/request" variant="ocean" size="sm">
                  Request an Appointment
                </Button>
                <Button
                  href="/professionals/second-opinion"
                  variant="outline"
                  size="sm"
                >
                  Second Opinion
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="international"
          className="mb-s10 scroll-mt-28"
          aria-labelledby="intl-about-heading"
        >
          <span className="eyebrow">International</span>
          <h2
            id="intl-about-heading"
            className="mb-s3 mt-s2 max-w-[720px] text-2xl font-bold text-ocean"
          >
            Supporting families who travel for pediatric care.
          </h2>
          <p className="mb-s4 max-w-[720px] text-md font-light leading-[1.75] text-text-body">
            Boston Children&apos;s welcomes international families through
            destination medicine, visit coordination, and specialty programs.
            Use our site language hubs for general reading, and request a
            medical interpreter when you need live clinical support during
            appointments.
          </p>
          <div className="mb-s5 grid grid-cols-1 gap-s4 md:grid-cols-2">
            <article className="rounded-md border border-border bg-white p-s5">
              <h3 className="mb-s2 text-lg font-bold text-blue">
                Site language &amp; translation
              </h3>
              <p className="mb-s3 text-sm font-light leading-relaxed text-text-body">
                Choose Español or 中文 resource hubs—or your browser&apos;s
                built-in translation—for everyday website reading. These options
                help families browse programs, locations, and visit tips in a
                preferred language.
              </p>
              <div className="flex flex-wrap gap-s2">
                <Button href="/es" variant="outline" size="sm">
                  Español
                </Button>
                <Button href="/zh" variant="outline" size="sm">
                  中文
                </Button>
              </div>
            </article>
            <article className="rounded-md border border-border bg-white p-s5">
              <h3 className="mb-s2 text-lg font-bold text-blue">
                Medical interpreters
              </h3>
              <p className="mb-s3 text-sm font-light leading-relaxed text-text-body">
                Human interpreters support live clinical conversations—
                appointments, care planning, and medical coordination—so
                families and clinicians share accurate information in the
                moment.
              </p>
              <Button href="/international" variant="ocean" size="sm">
                International patient services
              </Button>
            </article>
          </div>
        </section>

        <section aria-labelledby="explore-heading">
          <span className="eyebrow">Explore About Us</span>
          <h2
            id="explore-heading"
            className="mb-s6 mt-s2 text-2xl font-bold text-ocean"
          >
            Leadership, history, community, and more
          </h2>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
            {exploreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-md"
              >
                <span className="mb-s2 block text-lg font-bold text-blue">
                  {item.title}
                </span>
                <span className="block text-sm font-light text-text-body">
                  {item.body}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
