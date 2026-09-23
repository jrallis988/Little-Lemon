import { siteConfig } from "../data/siteConfig";

const STORAGE_KEY = "gbcc.inquiries.v1";

function createReferenceId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GBCC-${stamp}-${rand}`;
}

export function listInquiries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function persistLocally(inquiry) {
  const existing = listInquiries();
  existing.unshift(inquiry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
}

/**
 * Submits an inquiry to the configured production endpoint when available,
 * and always keeps a local confirmation record for the applicant.
 */
export async function submitInquiry(payload) {
  if (!payload?.email || !payload?.name) {
    throw new Error("Missing required inquiry fields.");
  }

  const inquiry = {
    id: createReferenceId(),
    createdAt: new Date().toISOString(),
    status: "queued",
    destination: siteConfig.formDestination,
    transport: "local",
    ...payload,
  };

  if (siteConfig.formEndpoint) {
    const response = await fetch(siteConfig.formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...inquiry,
        _subject: `GBCC website inquiry — ${inquiry.topic || "General"}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to reach admissions right now. Please try again or call (603) 427-7600.");
    }

    inquiry.status = "submitted";
    inquiry.transport = "api";
  } else {
    // Demo / staging fallback when no CRM endpoint is configured yet.
    await new Promise((resolve) => setTimeout(resolve, 550));
    inquiry.status = "queued-local";
    inquiry.transport = "local";
  }

  persistLocally(inquiry);
  return inquiry;
}
