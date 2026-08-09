import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function KeytagPage() {
  return (
    <MemberScreen
      eyebrow="Screen 33–35 · Digital keytag"
      title="Digital keytag"
      subtitle="Barcode / QR for door entry. Always available offline-ready in the app shell."
    >
      <MemberCard className="bg-pf-purple text-center text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
          Planet Fitness
        </p>
        <p className="mt-2 font-display text-2xl">Alex Rivera</p>
        <p className="text-sm text-white/70">Black Card · Midtown</p>
        <div className="mx-auto mt-5 h-24 w-full max-w-[14rem] rounded-xl bg-[repeating-linear-gradient(90deg,#111_0_2px,#fff_2px_4px)]" />
        <p className="mt-3 font-mono text-lg tracking-[0.35em]">4829 1104 7731</p>
      </MemberCard>
    </MemberScreen>
  );
}
