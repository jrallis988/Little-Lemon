import Link from "next/link";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { PERKS } from "@/lib/perks";

export default function PerksPage() {
  return (
    <MemberScreen
      eyebrow="Screen 60–63 · Partner perks"
      title="Member perks"
      subtitle="Brand discounts and offers available in the PF app."
    >
      <div className="space-y-2">
        {PERKS.map((perk) => (
          <Link key={perk.id} href={`/app/perks/${perk.id}`}>
            <MemberCard className="mb-2 transition hover:border-pf-purple">
              <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                {perk.partner}
              </p>
              <p className="mt-1 font-semibold text-pf-ink">{perk.title}</p>
              <p className="mt-1 text-xs text-pf-ink/55">{perk.summary}</p>
            </MemberCard>
          </Link>
        ))}
        <Link href="/app/perks/refer">
          <MemberCard className="transition hover:border-pf-purple">
            <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
              Screen 63
            </p>
            <p className="mt-1 font-semibold text-pf-ink">Refer a friend</p>
            <p className="mt-1 text-xs text-pf-ink/55">
              Share your code and track referrals in-app.
            </p>
          </MemberCard>
        </Link>
      </div>
    </MemberScreen>
  );
}
