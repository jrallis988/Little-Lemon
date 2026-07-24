"use client";

import * as React from "react";
import { Flag } from "lucide-react";

import type { ReportTargetType } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";

export interface ReportDialogProps {
  open: boolean;
  targetType: ReportTargetType;
  targetId: string;
  onClose: () => void;
  onSubmit: (payload: {
    targetType: ReportTargetType;
    targetId: string;
    reason: string;
    details?: string;
  }) => void | Promise<void>;
}

const reasons = [
  "Harassment or bullying",
  "Hate or abuse",
  "Spam or scam",
  "Impersonation",
  "Sexual content",
  "Self-harm concern",
  "Other safety issue",
];

export function ReportDialog({
  open,
  targetType,
  targetId,
  onClose,
  onSubmit,
}: ReportDialogProps) {
  const [reason, setReason] = React.useState(reasons[0]);
  const [details, setDetails] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setReason(reasons[0]);
    setDetails("");
  }, [open]);

  const submit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        targetType,
        targetId,
        reason,
        details: details.trim() || undefined,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Report ${targetType.replace("_", " ")}`}
      description="Reports help keep MyPlace safe. A moderator will review this item."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={submit} isLoading={submitting}>
            <Flag className="h-4 w-4" aria-hidden />
            Submit Report
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-navy-700">
            Reason
          </span>
          <select
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="h-9 w-full rounded-card border border-surface-border bg-white px-3 text-sm text-navy-900 shadow-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            {reasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <Textarea
          label="Additional details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={5}
          maxLength={1000}
          helperText={`${details.length}/1000 characters. Include context that will help moderators.`}
        />
      </div>
    </Dialog>
  );
}
