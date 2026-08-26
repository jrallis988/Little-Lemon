"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CATEGORIES = [
  { value: "price_incorrect", label: "Price appears incorrect" },
  { value: "pharmacy_rejected", label: "Pharmacy would not accept program" },
  {
    value: "medication_info_incorrect",
    label: "Medication information appears incorrect",
  },
  { value: "pharmacy_outdated", label: "Pharmacy information is outdated" },
  { value: "eligibility_unclear", label: "Eligibility information is unclear" },
  { value: "delivery_problem", label: "Delivery problem" },
  { value: "broken_link", label: "Broken link" },
  { value: "other", label: "Other" },
] as const;

interface ReportIssueButtonProps {
  drugId?: string;
  pharmacyId?: string;
  className?: string;
  variant?: "link" | "outline" | "ghost";
}

export function ReportIssueButton({
  drugId,
  pharmacyId,
  className,
  variant = "outline",
}: ReportIssueButtonProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>(CATEGORIES[0].value);
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/issue-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          details,
          email,
          pagePath: pathname,
          drugId,
          pharmacyId,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        referenceCode?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Could not submit report");
      setReference(data.referenceCode ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit report");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setReference(null);
          setError(null);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant={variant} size="sm" className={className} />
        }
      >
        <Flag className="size-3.5" aria-hidden />
        Report an issue
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-tight">
            Report an issue
          </DialogTitle>
        </DialogHeader>
        {reference ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Thanks — we received your report.</p>
            <p className="text-muted-foreground">
              Reference number:{" "}
              <span className="font-mono font-semibold text-foreground">
                {reference}
              </span>
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="issue-category">Category</Label>
              <select
                id="issue-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="issue-details">What happened?</Label>
              <textarea
                id="issue-details"
                required
                minLength={8}
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="issue-email">Email (optional)</Label>
              <Input
                id="issue-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={pending} className="w-full min-h-10">
              {pending && <Loader2 className="animate-spin" />}
              Submit report
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
