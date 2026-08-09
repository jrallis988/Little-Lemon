import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function PerksPage() {
  return (
    <MemberScreen
      eyebrow="Screen 60–63 · Partner perks"
      title="Member perks"
      subtitle="Brand discounts and offers available in the PF app."
    >
      <div className="space-y-2">
        {["Gymshark", "Apple Music", "Partner Rewards"].map((perk) => (
          <MemberCard key={perk}>
            <p className="font-semibold text-pf-ink">{perk}</p>
            <p className="mt-1 text-xs text-pf-ink/55">
              Open in app for current terms and redemption.
            </p>
          </MemberCard>
        ))}
      </div>
    </MemberScreen>
  );
}
