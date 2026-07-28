const FORM_EMAIL =
  process.env.REACT_APP_FORM_EMAIL || "NHTIadmissions@ccsnh.edu";

export async function submitInquiry(values) {
  const endpoint =
    process.env.REACT_APP_FORM_ENDPOINT ||
    `https://formsubmit.co/ajax/${FORM_EMAIL}`;

  const payload = {
    ...values,
    _subject: `NHTI website inquiry — ${values.interest || "General"}`,
    _template: "table",
    _captcha: "false",
  };

  // Keep a local copy for demos / offline review.
  try {
    const existing = JSON.parse(localStorage.getItem("nhtiInquiries") || "[]");
    existing.push({ ...values, submittedAt: new Date().toISOString() });
    localStorage.setItem("nhtiInquiries", JSON.stringify(existing.slice(-25)));
  } catch {
    // Ignore storage failures (private mode, etc.)
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Unable to submit inquiry right now.");
  }

  return response.json().catch(() => ({ ok: true }));
}
