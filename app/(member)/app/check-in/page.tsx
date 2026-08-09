import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function CheckInPage() {
  return (
    <MemberScreen
      eyebrow="Screen 28–32 · Check-in"
      title="Check in"
      subtitle="Scan or show your digital keytag at the door. Website does not own this flow."
    >
      <MemberCard className="text-center">
        <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-pf-mist">
          <div className="grid h-36 w-36 place-items-center rounded-2xl border-2 border-dashed border-pf-purple/40 bg-white font-display text-4xl text-pf-purple">
            QR
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold text-pf-ink">Ready to scan</p>
        <p className="mt-1 text-xs text-pf-ink/55">
          States scaffolded: idle · scanning · success · club full · offline
        </p>
      </MemberCard>
    </MemberScreen>
  );
}
