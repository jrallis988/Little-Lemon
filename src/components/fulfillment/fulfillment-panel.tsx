"use client";

import { useEffect, useState } from "react";
import { Loader2, Stethoscope, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FulfillmentHandoffResult } from "@/lib/fulfillment/handoff";
import { cn } from "@/lib/utils";

interface FulfillmentPanelProps {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: 30 | 90;
  pharmacyId?: string;
  zip?: string;
  className?: string;
}

/**
 * Telehealth / mail-order CTAs — shown only when partner endpoints are configured.
 */
export function FulfillmentPanel({
  drugId,
  strengthId,
  quantity,
  supplyDays,
  pharmacyId,
  zip,
  className,
}: FulfillmentPanelProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<FulfillmentHandoffResult | null>(null);
  const [partners, setPartners] = useState<{
    telehealth: boolean;
    mailOrder: boolean;
    show: boolean;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/config", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{
          partners: { telehealth: boolean; mailOrder: boolean };
          showFulfillmentPanel: boolean;
        }>;
      })
      .then((data) => {
        if (!data) {
          setPartners({ telehealth: false, mailOrder: false, show: false });
          return;
        }
        setPartners({
          telehealth: data.partners.telehealth,
          mailOrder: data.partners.mailOrder,
          show: data.showFulfillmentPanel,
        });
      })
      .catch(() => {
        setPartners({ telehealth: false, mailOrder: false, show: false });
      });
    return () => controller.abort();
  }, []);

  async function start(channel: "telehealth" | "mail_order" | "specialty_transfer") {
    setLoading(channel);
    setHandoff(null);
    try {
      const res = await fetch("/api/fulfillment/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          drugId,
          strengthId,
          quantity,
          supplyDays,
          pharmacyId,
          zip,
        }),
      });
      const data = (await res.json()) as {
        handoff?: FulfillmentHandoffResult;
        error?: string;
      };
      if (!res.ok || !data.handoff) throw new Error(data.error ?? "Handoff failed");
      setHandoff(data.handoff);
      if (data.handoff.ctaUrl && data.handoff.status === "ready") {
        window.open(data.handoff.ctaUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      setHandoff({
        channel,
        status: "partner_required",
        title: "Could not start handoff",
        body: "Try again, or fill locally with your Trump RX coupon.",
        ctaLabel: "OK",
      });
    } finally {
      setLoading(null);
    }
  }

  if (partners === null) {
    return null;
  }

  if (!partners.show) {
    return null;
  }

  return (
    <section
      className={cn(
        "space-y-3 rounded-2xl border border-border bg-card p-4",
        className
      )}
      aria-labelledby="fulfillment-heading"
    >
      <div>
        <h2
          id="fulfillment-heading"
          className="font-display text-xl font-semibold tracking-tight"
        >
          Close the loop
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Price discovery → prescription → pickup or doorstep. Retail coupon
          still works today.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {partners.telehealth && (
          <Button
            type="button"
            variant="secondary"
            className="min-h-11"
            disabled={!!loading}
            onClick={() => void start("telehealth")}
          >
            {loading === "telehealth" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Stethoscope />
            )}
            Telehealth visit
          </Button>
        )}
        {partners.mailOrder && (
          <>
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              disabled={!!loading}
              onClick={() => void start("mail_order")}
            >
              {loading === "mail_order" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Truck />
              )}
              Mail-order transfer
            </Button>
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              disabled={!!loading}
              onClick={() => void start("specialty_transfer")}
            >
              Specialty pharmacy
            </Button>
          </>
        )}
      </div>

      {handoff && (
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="font-semibold">{handoff.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{handoff.body}</p>
          {handoff.ctaUrl && handoff.status !== "ready" && (
            <a
              href={handoff.ctaUrl}
              className="mt-2 inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              {handoff.ctaLabel}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
