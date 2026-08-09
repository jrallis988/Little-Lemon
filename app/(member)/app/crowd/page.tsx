import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function CrowdPage() {
  return (
    <MemberScreen
      eyebrow="Screen 26–27 · Crowd Meter"
      title="Crowd Meter"
      subtitle="Live busyness for your home club. App-owned — never rebuilt on the website."
    >
      <MemberCard>
        <p className="text-sm font-semibold text-pf-ink">
          Planet Fitness Midtown
        </p>
        <p className="mt-3 font-display text-4xl text-pf-purple">Not too busy</p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-pf-mist">
          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-emerald-400 to-pf-yellow" />
        </div>
        <p className="mt-2 text-xs text-pf-ink/55">
          Updated just now · Best time window 9–11am
        </p>
      </MemberCard>
    </MemberScreen>
  );
}
