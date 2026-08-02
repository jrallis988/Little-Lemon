import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { Button } from "@/components/ui/Button";
import { historyMilestones } from "@/content/data/history";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "A media-integrated historical archive of Boston Children’s Hospital from 1869 through 2025, alongside the pediatric legacy of Boston City Hospital and Boston Medical Center.",
};

const mediaCount = historyMilestones.filter((m) => m.imageUrl).length;

export default function HistoryPage() {
  return (
    <>
      <PageHero
        id="history-heading"
        eyebrow="About Us · Historical archive"
        title="Our history"
        lead="A continuous, multi-decade timeline of Boston Children’s Hospital — from the 1869 founding through Longwood, anesthesia breakthroughs, and 2025 — woven with the pediatric service legacy of Boston City Hospital and Boston Medical Center."
        actions={
          <>
            <Button href="/about" variant="ghost-white">
              Back to About Us
            </Button>
            <Button href="/about/community" variant="ghost-white">
              Community health
            </Button>
          </>
        }
      />

      <section className="border-b border-border bg-surface py-s6">
        <div className="wrap grid grid-cols-1 gap-s4 sm:grid-cols-3">
          <div>
            <div className="text-2xl font-black text-blue">1864–2025</div>
            <p className="mt-1 text-sm font-light text-text-body">
              Chronological span across BCH and Boston City Hospital / BMC
              pediatric milestones
            </p>
          </div>
          <div>
            <div className="text-2xl font-black text-blue">
              {historyMilestones.length}
            </div>
            <p className="mt-1 text-sm font-light text-text-body">
              Archive entries with no decade gaps from founding eras to today
            </p>
          </div>
          <div>
            <div className="text-2xl font-black text-blue">{mediaCount}</div>
            <p className="mt-1 text-sm font-light text-text-body">
              Dedicated image slots with archival-style captions
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-s8" aria-labelledby="legacy-heading">
        <div className="mx-auto mb-s8 max-w-[760px]">
          <span className="eyebrow">Two institutional lineages</span>
          <h2 id="legacy-heading" className="mt-s2 text-2xl font-bold text-ocean">
            Boston Children’s — and Boston’s public pediatric legacy
          </h2>
          <p className="mt-s3 text-md font-light leading-relaxed text-text-body">
            This archive follows Boston Children’s Hospital from its 1869
            founding, the 1882 Huntington Avenue relocation, the 1914 Longwood
            Avenue campus, and 1935 pediatric anesthesia innovations through
            2025. It also records the pediatric service story of Boston City
            Hospital / Boston Medical Center — including the 1864 founding, Dr.
            Martin J. English’s 1923 pediatric service, the 1932 Mary E. Curley
            Pavilion, Reach Out and Read, and the 1996 BMC merger — so visitors
            can see how Boston’s children’s care ecosystem grew decade by decade.
          </p>
        </div>

        <div className="mb-s6 flex flex-wrap gap-s3 text-xs font-bold uppercase tracking-[0.06em]">
          <span className="rounded-full bg-ocean/10 px-3 py-1 text-ocean">
            Boston Children’s Hospital
          </span>
          <span className="rounded-full bg-bay/15 px-3 py-1 text-bay">
            Boston City Hospital / BMC
          </span>
        </div>

        <HistoryTimeline />

        <p className="mx-auto mt-s6 max-w-[720px] text-center text-xs font-light leading-relaxed text-text-meta">
          Image slots use documentary stand-ins with archival-style captions for
          staging. Replace with authorized museum or institutional archive assets
          before an official public launch.
        </p>
      </section>

      <div className="wrap pb-s10">
        <div className="flex flex-wrap justify-center gap-s3">
          <Button href="/about/leadership" variant="outline">
            Leadership
          </Button>
          <Button href="/about/community" variant="outline">
            Community health
          </Button>
          <Button href="/locations" variant="outline">
            Locations
          </Button>
        </div>
      </div>
    </>
  );
}
