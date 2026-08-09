import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ComingSoonNote,
  MemberCard,
  MemberScreen,
} from "@/components/member/member-ui";

export default function BillingPage() {
  return (
    <MemberScreen
      eyebrow="Screen 53–58 · Billing"
      title="Billing & membership"
      subtitle="Payment history, failed-payment retry, freeze, and cancel guides."
    >
      <MemberCard className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Plan</span>
          <span className="font-semibold">Black Card · $24.99/mo</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Next bill</span>
          <span className="font-semibold">Sep 17, 2026</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Card</span>
          <span className="font-semibold">Visa •••• 4242</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button asChild variant="purple" className="flex-1">
            <Link href="/app/billing">View history</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/app/account">Manage</Link>
          </Button>
        </div>
      </MemberCard>
      <div className="mt-4 space-y-2">
        <ComingSoonNote screen="66 failed payment retry" />
        <ComingSoonNote screen="freeze / cancel guided flows" />
      </div>
    </MemberScreen>
  );
}
