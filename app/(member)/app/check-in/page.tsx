import { getSession } from "@/lib/auth";
import { CheckInFlow } from "@/components/member/check-in-flow";
import { MemberScreen } from "@/components/member/member-ui";

export default async function CheckInPage() {
  const session = await getSession();
  const name = session
    ? [session.firstName, session.lastName].filter(Boolean).join(" ")
    : "Member";

  return (
    <MemberScreen
      eyebrow="Screen 28–32 · Check-in"
      title="Check in"
      subtitle="Scan or show your digital keytag at the door. Website does not own this flow."
    >
      <CheckInFlow
        memberName={name}
        clubName={session?.clubName ?? "Planet Fitness"}
      />
    </MemberScreen>
  );
}
