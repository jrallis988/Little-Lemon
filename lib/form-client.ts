export type FormSubmitResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function postCampaignForm(
  body: Record<string, string>,
): Promise<FormSubmitResult> {
  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await res.json().catch(() => ({}))) as FormSubmitResult;
  if (!res.ok) {
    return {
      ok: false,
      error: payload.error || "Something went wrong. Please try again.",
      fieldErrors: payload.fieldErrors,
    };
  }
  return { ok: true };
}
