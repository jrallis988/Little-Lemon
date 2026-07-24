"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import type { ReportTargetType } from "@/lib/types/database";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Textarea } from "./Textarea";

type ReportableTargetType = Extract<
  ReportTargetType,
  "profile" | "message" | "photo" | "comment"
>;

const targetLabels: Record<ReportableTargetType, string> = {
  profile: "profile",
  message: "message",
  photo: "photo",
  comment: "comment",
};

const reportReasons = [
  "Harassment or bullying",
  "Hate speech",
  "Spam or scam",
  "Nudity or sexual content",
  "Violence or threats",
  "Impersonation",
  "Other",
];

export interface ReportDialogSubmitPayload {
  targetType: ReportableTargetType;
  targetId?: string;
  reason: string;
  details: string | null;
}

export interface ReportDialogProps {
  isOpen: boolean;
  targetType: ReportableTargetType;
  onClose: () => void;
  onSubmit: (payload: ReportDialogSubmitPayload) => void | Promise<void>;
  targetId?: string;
  targetLabel?: string;
}

export function ReportDialog({
  isOpen,
  targetType,
  targetId,
  targetLabel,
  onClose,
  onSubmit,
}: ReportDialogProps) {
  const formId = useId();
  const reasonId = useId();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setReason("");
    setDetails("");
    setError(null);
    setSubmitting(false);
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!reason) {
      setError("Choose a reason before sending your report.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        targetType,
        targetId,
        reason,
        details: details.trim() || null,
      });
      onClose();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit this report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const readableTarget = targetLabel ?? targetLabels[targetType];

  return (
    <Modal
      isOpen={isOpen}
      title={`Report ${readableTarget}`}
      description="Tell the MyPlace moderation team what needs attention."
      onClose={onClose}
      footer={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            size="sm"
            variant="danger"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Submit report"}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor={reasonId}
            className="block text-xs font-semibold uppercase tracking-wide text-[#0f2744]"
          >
            Reason <span className="text-[#b42318]">*</span>
          </label>
          <select
            id={reasonId}
            value={reason}
            required
            onChange={(event) => setReason(event.target.value)}
            className="block min-h-9 w-full rounded-[4px] border border-[#c5d0dc] bg-white px-3 py-2 text-sm text-[#0f2744] shadow-[0_1px_2px_rgba(15,39,68,0.04)] focus:border-[#3b6ea5] focus:outline-none focus:ring-2 focus:ring-[#3b6ea5]/20"
          >
            <option value="">Select a reason</option>
            {reportReasons.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Textarea
          id={`${formId}-details`}
          label="Details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={5}
          hint="Optional, but specific details help moderators review faster."
          placeholder="Add usernames, dates, or context..."
        />
        {error ? (
          <p className="rounded-[4px] border border-[#b42318]/40 bg-[#b42318]/10 px-3 py-2 text-sm font-medium text-[#b42318]">
            {error}
          </p>
        ) : null}
      </form>
    </Modal>
  );
}
