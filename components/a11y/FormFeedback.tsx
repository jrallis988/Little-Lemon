"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FieldErrors = Record<string, string>;

export function useAccessibleForm() {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const firstErrorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (status === "error" && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [status, fieldErrors, formError]);

  function reportErrors(errors: FieldErrors, summary?: string) {
    setFieldErrors(errors);
    const keys = Object.keys(errors);
    setFormError(summary || (keys.length ? "Please fix the highlighted fields." : ""));
    setStatus("error");
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(
        keys[0] ? `[data-field="${keys[0]}"]` : `[id="${statusId}"]`
      );
      firstErrorRef.current = el;
      el?.focus();
    });
  }

  function reportSuccess(message = "Submitted successfully.") {
    setFieldErrors({});
    setStatus("success");
    setFormError(message);
  }

  function fieldProps(name: string) {
    const err = fieldErrors[name];
    const errId = `${statusId}-${name}`;
    return {
      "data-field": name,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? errId : undefined,
      "aria-required": true as const,
    };
  }

  function FieldError({ name }: { name: string }) {
    const err = fieldErrors[name];
    if (!err) return null;
    return (
      <p id={`${statusId}-${name}`} className="mt-1 text-sm font-medium text-red" role="alert">
        {err}
      </p>
    );
  }

  function StatusRegion({ successMessage }: { successMessage: string }) {
    if (status === "idle") return null;
    const isSuccess = status === "success";
    return (
      <div
        id={statusId}
        role={isSuccess ? "status" : "alert"}
        aria-live={isSuccess ? "polite" : "assertive"}
        tabIndex={-1}
        className={`flex items-start gap-2 rounded-sm px-3 py-2.5 text-sm outline-none ${
          isSuccess ? "bg-paper text-navy" : "bg-paper text-red"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        ) : (
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        )}
        <span>{isSuccess ? successMessage : formError}</span>
      </div>
    );
  }

  return {
    statusId,
    status,
    fieldProps,
    FieldError,
    StatusRegion,
    reportErrors,
    reportSuccess,
  };
}

export function RequiredMark() {
  return (
    <span className="text-red" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function RequiredLegend() {
  return (
    <p className="text-sm text-slate-muted">
      Required fields are marked with an asterisk (<span className="text-red">*</span>).
    </p>
  );
}
