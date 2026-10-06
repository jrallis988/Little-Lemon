"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, Ban, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MemberCard,
  MemberLinkRow,
  MemberScreen,
} from "@/components/member/member-ui";

type Membership = {
  id: string;
  status: string;
  plan: string;
  monthlyDues: number;
  nextBillAt: string | null;
  payment: { brand: string; last4: string };
};

type Invoice = {
  id: string;
  description: string;
  amountCents: number;
  status: string;
  createdAt: string;
};

export default function BillingPage() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    void fetch("/api/billing")
      .then((r) => r.json())
      .then((data: { membership?: Membership | null; invoices?: Invoice[] }) => {
        setMembership(data.membership ?? null);
        setInvoices(data.invoices ?? []);
      });
  }, []);

  const planLabel =
    membership?.plan === "classic"
      ? "Classic"
      : membership?.plan === "black-card"
        ? "Black Card"
        : "Member";

  return (
    <MemberScreen
      eyebrow="Screen 53–58 · Billing"
      title="Billing & membership"
      subtitle="History, failed-payment retry, freeze, and cancel guides."
    >
      <MemberCard className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Plan</span>
          <span className="font-semibold">
            {planLabel}
            {membership ? ` · $${membership.monthlyDues.toFixed(2)}/mo` : ""}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Status</span>
          <span className="font-semibold capitalize">
            {membership?.status ?? "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Card</span>
          <span className="font-semibold">
            {membership
              ? `${membership.payment.brand} •••• ${membership.payment.last4}`
              : "Not on file"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pf-ink/60">Next bill</span>
          <span className="font-semibold">
            {membership?.nextBillAt
              ? new Date(membership.nextBillAt).toLocaleDateString()
              : "—"}
          </span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button asChild variant="purple" className="flex-1">
            <Link href="/app/billing/retry">Retry / update card</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => {
              void fetch("/api/billing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "simulate_failure" }),
              }).then(() => window.location.reload());
            }}
          >
            Simulate fail
          </Button>
        </div>
      </MemberCard>

      <div className="mt-4 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
          Screen 54 · History
        </p>
        {invoices.length === 0 ? (
          <MemberCard>
            <p className="text-sm text-pf-ink/55">No invoices yet.</p>
          </MemberCard>
        ) : (
          invoices.map((invoice) => (
            <MemberCard key={invoice.id}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div>
                  <p className="font-semibold text-pf-ink">{invoice.description}</p>
                  <p className="text-xs text-pf-ink/55">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(invoice.amountCents / 100).toFixed(2)}
                  </p>
                  <p className="text-xs capitalize text-pf-purple">
                    {invoice.status}
                  </p>
                </div>
              </div>
            </MemberCard>
          ))
        )}
      </div>

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
