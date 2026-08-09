import { getSession } from "@/lib/auth";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default async function KeytagPage() {
  const session = await getSession();
  const name = session
    ? [session.firstName, session.lastName].filter(Boolean).join(" ") || "Member"
    : "Member";
  const plan =
    session?.plan === "classic"
      ? "Classic"
      : session?.plan === "black-card"
        ? "Black Card"
        : "Member";
  const code = session?.membershipId?.replace("PF-", "") ?? "4829 1104 7731";

  return (
    <MemberScreen
      eyebrow="Screen 33–35 · Digital keytag"
      title="Digital keytag"
      subtitle="Barcode / QR for door entry. Cached offline in the member app shell."
    >
      <MemberCard className="bg-pf-purple text-center text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-yellow">
          Planet Fitness
        </p>
        <p className="mt-2 font-display text-2xl">{name}</p>
        <p className="text-sm text-white/70">
          {plan} · {session?.clubName ?? "Home club"}
        </p>
        <div className="mx-auto mt-5 h-24 w-full max-w-[14rem] rounded-xl bg-[repeating-linear-gradient(90deg,#111_0_2px,#fff_2px_4px)]" />
        <p className="mt-3 font-mono text-lg tracking-[0.35em]">{code}</p>
        <p className="mt-3 text-[11px] text-white/60">
          Brightness boost + offline cache ready (screens 34–35)
        </p>
      </MemberCard>
    </MemberScreen>
  );
}
