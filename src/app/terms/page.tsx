import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using Trump RX prescription discount services.",
};

const SECTIONS = [
  {
    title: "Discount service; not insurance",
    body: "Trump RX provides prescription cash-discount information and coupons. It is not health insurance, does not pay or reimburse medical claims, and is not a Medicare, Medicaid, or other government benefit. A coupon generally cannot be combined with insurance. Compare the coupon price with your insurance copay before purchasing.",
  },
  {
    title: "No government affiliation",
    body: "Trump RX is not affiliated with, endorsed by, or operated by the United States government or TrumpRx.gov unless a specific page expressly states that a relationship has been licensed or authorized. Names and marks belong to their respective owners.",
  },
  {
    title: "Prices, coupons, and pharmacy acceptance",
    body: "Displayed prices are estimates and may change without notice. Your final price is determined by the pharmacy based on the prescription presented. Coupons may expire, be withdrawn, or apply only to specific drugs, strengths, quantities, or pharmacies. Participation and acceptance vary by pharmacy; call the pharmacy if you need confirmation before traveling.",
  },
  {
    title: "Your account",
    body: "You are responsible for accurate account information, safeguarding your credentials, and activity under your account. Do not use the service to obtain controlled substances unlawfully, submit false information, interfere with the platform, or violate pharmacy or healthcare laws.",
  },
  {
    title: "Membership billing",
    body: "Trump RX Plus is an optional recurring subscription billed at the price and interval shown at checkout. When live billing is enabled, your subscription renews automatically until canceled. Cancellation stops future renewals but does not ordinarily refund the current billing period except where required by law. Development environments may activate Plus locally without a charge.",
  },
  {
    title: "Medical and pharmacy decisions",
    body: "Trump RX does not provide medical advice, diagnose conditions, prescribe medication, guarantee inventory, or recommend changing treatment. Questions about medication, substitutions, interactions, and insurance should be directed to a qualified clinician, pharmacist, or plan administrator.",
  },
  {
    title: "Service availability and liability",
    body: "The service is provided “as is” and “as available.” To the fullest extent permitted by law, Trump RX disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or punitive damages, lost savings, unavailable inventory, pharmacy refusal, or reliance on an estimated price. Trump RX’s aggregate liability will not exceed the greater of amounts you paid during the previous six months or $100.",
  },
  {
    title: "Changes and termination",
    body: "We may update these terms, prices, participating networks, or service features, and may suspend access needed to protect users, comply with law, or prevent misuse. Continued use after updated terms take effect constitutes acceptance. If you do not agree, stop using the service and cancel any membership.",
  },
] as const;

export default function TermsPage() {
  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-muted-foreground">
            Effective July 28, 2026. By using Trump RX, you agree to these terms.
          </p>
        </header>

        <div className="mt-8 space-y-7">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
