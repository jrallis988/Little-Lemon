import { faqs } from "@/lib/site";

type FaqSectionProps = {
  heading?: string;
  description?: string;
  className?: string;
};

export function FaqSection({
  heading = "Questions schools ask before buying",
  description = "Clear answers on pilots, pricing, implementation, and what happens after you reach out.",
  className = "bg-white",
}: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={className} id="faq">
      <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
        <p className="section-label">FAQ</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
          {description}
        </p>

        <dl className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6 sm:grid sm:grid-cols-[1fr_1.4fr] sm:gap-8">
              <dt className="text-lg font-bold text-navy">{faq.question}</dt>
              <dd className="mt-2 text-base leading-relaxed text-mute sm:mt-0">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
