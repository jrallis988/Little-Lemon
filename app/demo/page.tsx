import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import type { LeadType } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Request a Morgan Bright product demo or pricing conversation for your classroom, school, or district.",
};

type DemoPageProps = {
  searchParams?: Promise<{
    type?: string;
    plan?: string;
  }>;
};

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const params = (await searchParams) ?? {};
  const type: LeadType = params.type === "pricing" ? "pricing" : "demo";
  const defaultPlan = params.plan ?? "Not sure yet";

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
                we confirm goals, timeline, and the right license tier.
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
    </>
  );
}
