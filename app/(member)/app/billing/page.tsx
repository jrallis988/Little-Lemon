import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MemberCard,
  MemberLinkRow,
  MemberScreen,
} from "@/components/member/member-ui";
import { getSession } from "@/lib/auth";
import { getMembershipById } from "@/lib/memberships";
import { AlertTriangle, Ban, Snowflake } from "lucide-react";

export default async function BillingPage() {
  const session = await getSession();
  const membership = session?.membershipId
    ? await getMembershipById(session.membershipId)
    : null;

  const planLabel =
    membership?.plan === "classic"
      ? "Classic"
      : membership?.plan === "black-card"
        ? "Black Card"
        : session?.plan === "classic"
          ? "Classic"
          : "Black Card";
  const monthly = membership?.monthlyDues ?? 24.99;
  const last4 = membership?.payment.last4 ?? "4242";
  const brand = membership?.payment.brand ?? "Visa";

  return (
    <MemberScreen
      eyebrow="Screen 53–58 · Billing"
      title="Billing & membership"
      subtitle="Payment history, failed-payment retry, freeze, and cancel guides."
    >
      <MemberCard className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Plan</span>
          <span className="font-semibold">
            {planLabel} · ${monthly.toFixed(2)}/mo
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Status</span>
          <span className="font-semibold capitalize">
            {membership?.status ?? "active"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Card</span>
          <span className="font-semibold">
            {brand} •••• {last4}
          </span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button asChild variant="purple" className="flex-1">
            <Link href="/app/billing/retry">Retry payment</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/app/account">Manage</Link>
          </Button>
        </div>
      </MemberCard>

      <div className="mt-4 space-y-2">
        <MemberLinkRow
          href="/app/billing/retry"
          label="Failed payment retry"
          description="Screen 66 — update card and retry dues"
          icon={AlertTriangle}
        />
        <MemberLinkRow
          href="/app/billing/freeze"
          label="Freeze membership"
          description="Screen 56 — pause dues for travel or recovery"
          icon={Snowflake}
        />
        <MemberLinkRow
          href="/app/billing/cancel"
          label="Cancel guide"
          description="Screens 57–58 — what to know before you cancel"
          icon={Ban}
        />
      </div>
    </MemberScreen>
  );
}
