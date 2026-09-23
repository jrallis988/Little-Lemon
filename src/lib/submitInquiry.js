const FORM_EMAIL =
  process.env.REACT_APP_FORM_EMAIL || "NHTIadmissions@ccsnh.edu";

export async function submitInquiry(values) {
  if (values.company) {
    // Honeypot filled — treat as spam without contacting the endpoint.
    return { ok: true, spam: true };
  }

  const endpoint =
    process.env.REACT_APP_FORM_ENDPOINT ||
    `https://formsubmit.co/ajax/${FORM_EMAIL}`;

  const { company, ...fields } = values;
  const payload = {
    ...fields,
    _subject: `NHTI website inquiry — ${fields.interest || "General"}`,
    _template: "table",
    _captcha: "false",
    _honey: "",
  };

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
