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

/**
 * Persists an inquiry locally and simulates an async CRM handoff.
 * In production, replace the body of this function with a POST to your form API.
 */
export async function submitInquiry(payload) {
  await new Promise((resolve) => setTimeout(resolve, 650));

  if (!payload?.email || !payload?.name) {
    throw new Error("Missing required inquiry fields.");
  }

  const inquiry = {
    id: createReferenceId(),
    createdAt: new Date().toISOString(),
    status: "queued",
    destination: "askgreatbay@ccsnh.edu",
    ...payload,
  };

  const existing = listInquiries();
  existing.unshift(inquiry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));

  return inquiry;
}
