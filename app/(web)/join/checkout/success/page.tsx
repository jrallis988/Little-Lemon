import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getMembershipById,
  updateMembershipPayment,
} from "@/lib/memberships";
import { retrieveCheckoutSession } from "@/lib/payments";

type Props = {
  searchParams: Promise<{
    session_id?: string;
    membershipId?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const membershipId = params.membershipId?.trim();
  const sessionId = params.session_id?.trim();

  if (!membershipId) {
    redirect("/join");
  }

  let membership = await getMembershipById(membershipId);
  if (!membership) {
    redirect("/join");
  }

  if (sessionId && membership.status !== "active") {
    const session = await retrieveCheckoutSession(sessionId);
    if (session?.payment_status === "paid") {
      const paymentIntent =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? session.id;
      membership =
        (await updateMembershipPayment(membershipId, {
          paymentStatus: "stripe_authorized",
          status: "active",
          processor: "stripe",
          processorReference: paymentIntent,
          brand: "Card",
          last4: "****",
          nameOnCard:
            session.customer_details?.name ?? membership.payment.nameOnCard,
        })) ?? membership;
    }
  }

  const paid =
    membership.status === "active" &&
    membership.paymentStatus === "stripe_authorized";

  // Paid checkouts land on the shared confirmation handoff.
  if (paid) {
    redirect(`/join/confirmation/${membership.id}`);
  }

  const email = encodeURIComponent(membership.member.email);
  const loginHref = `/app/login?email=${email}&mode=forgot&next=${encodeURIComponent("/app/check-in")}&from=join`;

  return (
    <div className="mx-auto max-w-lg px-4 py-12 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Stripe Checkout
      </p>
      <h1 className="pf-type-section mt-2 text-pf-ink">Almost there</h1>
      <p className="mt-3 text-sm text-pf-ink/65">
        We’re still waiting on Stripe confirmation for membership{" "}
        <span className="font-semibold text-pf-ink">{membership.id}</span> at{" "}
        {membership.clubName}. Refresh in a moment or open your confirmation
        page.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button asChild variant="purple">
          <Link href={`/join/confirmation/${membership.id}`}>
            View confirmation
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={loginHref}>Set password &amp; check in</Link>
        </Button>
      </div>
    </div>
  );
}
