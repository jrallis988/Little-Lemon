import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

export function LegalPage({
  title,
  eyebrow,
  lead,
  children,
}: {
  title: string;
  eyebrow: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero id="legal-hero" eyebrow={eyebrow} title={title} lead={lead} />
      <div className="wrap py-s7 pb-s10">
        <article className="prose-legal mx-auto max-w-[720px] space-y-s5 text-base font-light leading-relaxed text-text-body">
          {children}
        </article>
      </div>
    </>
  );
}
