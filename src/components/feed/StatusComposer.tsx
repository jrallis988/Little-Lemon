"use client";

import { FormEvent, useId, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils/cn";

const MAX_STATUS_LENGTH = 280;

export interface StatusComposerProps {
  onSubmit: (body: string) => void | Promise<void>;
  isSubmitting?: boolean;
  placeholder?: string;
  className?: string;
}

export function StatusComposer({
  onSubmit,
  isSubmitting = false,
  placeholder = "What are you up to?",
  className,
}: StatusComposerProps) {
  const textareaId = useId();
  const [body, setBody] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);

  const trimmedBody = body.trim();
  const characterCount = body.length;
  const submitting = isSubmitting || localSubmitting;
  const isOverLimit = characterCount > MAX_STATUS_LENGTH;
  const disabled = trimmedBody.length === 0 || submitting || isOverLimit;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;

    setLocalSubmitting(true);
    try {
      await onSubmit(trimmedBody);
      setBody("");
    } finally {
      setLocalSubmitting(false);
    }
  }

  return (
    <form className={cn("mp-card space-y-3 p-4", className)} onSubmit={handleSubmit}>
      <Textarea
        id={textareaId}
        label="Post a status"
        value={body}
        maxLength={MAX_STATUS_LENGTH}
        rows={3}
        placeholder={placeholder}
        disabled={submitting}
        onChange={(event) => setBody(event.target.value)}
      />

      <div className="flex items-center justify-between gap-3">
        <p
          className={cn(
            "text-xs font-semibold",
            isOverLimit ? "text-[#b42318]" : "text-[#6E6E6E]"
          )}
          aria-live="polite"
        >
          {characterCount}/{MAX_STATUS_LENGTH}
        </p>
        <Button type="submit" disabled={disabled}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {submitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}

export default StatusComposer;
