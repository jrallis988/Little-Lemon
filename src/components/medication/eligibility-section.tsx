import type { EligibilityProfile } from "@/lib/program-catalog";

interface EligibilitySectionProps {
  eligibility: EligibilityProfile;
}

export function EligibilitySection({ eligibility }: EligibilitySectionProps) {
  return (
    <section
      aria-labelledby="eligibility-heading"
      className="rounded-lg border border-border bg-card p-4 sm:p-5"
    >
      <h2
        id="eligibility-heading"
        className="font-display text-xl font-semibold uppercase tracking-tight"
      >
        Eligibility &amp; insurance
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {eligibility.determinationNote}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold">Who may qualify</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {eligibility.whoMayQualify.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Who may not qualify</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {eligibility.whoMayNotQualify.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Insurance required?
          </dt>
          <dd className="mt-1 text-sm font-medium">
            {eligibility.insuranceRequired ? "Yes" : "No — not required for this option"}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Commercial insurance
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {eligibility.commercialInsurance}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Medicare
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {eligibility.medicare}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Medicaid
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {eligibility.medicaid}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3 sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Uninsured / self-pay
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {eligibility.uninsured}
          </dd>
        </div>
      </dl>

      {eligibility.manufacturerRestrictions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">
            Manufacturer / program restrictions
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {eligibility.manufacturerRestrictions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
