import type { Metadata } from "next";
import { FaqSection } from "@/components/FaqSection";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { normalizePlanInterest, type LeadType } from "@/lib/leads";

type DemoPageProps = {
  searchParams?: Promise<{
    type?: string;
    plan?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: DemoPageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const isPricing = params.type === "pricing";
  return {
    title: isPricing ? "Get Pricing" : "Request a Demo",
    description: isPricing
      ? "Request Morgan Bright pricing guidance for Classroom, School, or District licenses."
      : "Request a Morgan Bright product demo for your classroom, school, or district.",
  };
}

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const params = (await searchParams) ?? {};
  const type: LeadType = params.type === "pricing" ? "pricing" : "demo";
  const defaultPlan = normalizePlanInterest(params.plan);

  return (
    <>
      <PageHero
        eyebrow={type === "pricing" ? "Pricing" : "Demo"}
        title={
          type === "pricing"
            ? "Get pricing for your classroom, school, or district."
            : "See Morgan Bright in action."
        }
        description={
          type === "pricing"
            ? "Tell us about your setting and seat needs. Sales will follow up with plan recommendations and pricing guidance."
            : "Book a walkthrough of diagnostics, adaptive modules, and progress dashboards with our team."
        }
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy">What happens next</h2>
            <ol className="mt-6 space-y-4 text-base leading-relaxed text-mute">
              <li>
                <span className="font-semibold text-navy">1. Submit the form</span>
                {" — "}
                share your role, organization, and plan interest.
              </li>
              <li>
                <span className="font-semibold text-navy">2. Sales follow-up</span>
                {" — "}
                we confirm goals, timeline, and the right license tier within one
                business day.
              </li>
              <li>
                <span className="font-semibold text-navy">3. Demo or quote</span>
                {" — "}
                get a product walkthrough, pricing guidance, or both.
              </li>
            </ol>
          </div>

          <LeadForm
            type={type}
            defaultPlan={defaultPlan}
            title={type === "pricing" ? "Pricing request" : "Demo request"}
            submitLabel={
              type === "pricing" ? "Request pricing" : "Request demo"
            }
          />
        </div>
      </section>

      <FaqSection className="bg-paper-warm" />
    </>
  );
}
