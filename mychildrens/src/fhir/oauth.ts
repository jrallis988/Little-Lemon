export const SMART_SCOPES = [
  "launch/patient",
  "openid",
  "fhirUser",
  "patient/Patient.read",
  "patient/Appointment.read",
  "patient/Observation.read",
  "patient/MedicationRequest.read",
  "patient/Immunization.read",
  "patient/AllergyIntolerance.read",
  "patient/Condition.read",
  "patient/Communication.read",
  "patient/CareTeam.read",
  "patient/Invoice.read",
] as const;

const SCOPE_DESCRIPTIONS: Record<(typeof SMART_SCOPES)[number], string> = {
  "launch/patient": "Which patient record you are opening",
  openid: "Your sign-in identity",
  fhirUser: "The user linked to this login",
  "patient/Patient.read": "Name, birthday, and record number",
  "patient/Appointment.read": "Visits",
  "patient/Observation.read": "Results and growth measurements",
  "patient/MedicationRequest.read": "Medicines",
  "patient/Immunization.read": "Vaccines",
  "patient/AllergyIntolerance.read": "Allergies",
  "patient/Condition.read": "Conditions",
  "patient/Communication.read": "Messages",
  "patient/CareTeam.read": "Care team",
  "patient/Invoice.read": "Billing statements, when the server provides them",
};

export function scopeDescriptions(): { scope: string; label: string }[] {
  return SMART_SCOPES.map((scope) => ({ scope, label: SCOPE_DESCRIPTIONS[scope] }));
}

export function scopesAreReadOnly(scopes: readonly string[]): boolean {
  return scopes.every(
    (scope) => !scope.includes(".write") && !scope.startsWith("system/") && !scope.startsWith("user/"),
  );
}

export function assertHttpsIssuer(iss: string): string {
  const trimmed = iss.trim();
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error("Enter a full FHIR base URL, including https://.");
  }
  if (url.protocol !== "https:") throw new Error("The FHIR base URL must start with https://.");
  if (!url.host) throw new Error("Enter a full FHIR base URL, including https://.");
  return trimmed.replace(/\/+$/, "");
}

export interface SmartConfiguration {
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
}

export function parseSmartConfiguration(json: unknown): SmartConfiguration | null {
  if (!json || typeof json !== "object") return null;
  const record = json as Record<string, unknown>;
  if (typeof record.authorization_endpoint !== "string" || typeof record.token_endpoint !== "string") return null;
  return {
    authorization_endpoint: record.authorization_endpoint,
    token_endpoint: record.token_endpoint,
    userinfo_endpoint: typeof record.userinfo_endpoint === "string" ? record.userinfo_endpoint : undefined,
  };
}

export async function fetchSmartConfiguration(iss: string, fetchImpl: typeof fetch = fetch): Promise<SmartConfiguration> {
  const base = assertHttpsIssuer(iss);
  const response = await fetchImpl(`${base}/.well-known/smart-configuration`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Could not read SMART configuration (${response.status}). Check the FHIR base URL.`);
  }
  const parsed = parseSmartConfiguration(await response.json());
  if (!parsed) throw new Error("This server did not return SMART authorization endpoints.");
  return parsed;
}

export function smartAuthorizeParams(input: {
  clientId: string;
  redirectUri: string;
  aud: string;
  state: string;
  codeChallenge: string;
  scopes?: readonly string[];
}): URLSearchParams {
  return new URLSearchParams({
    response_type: "code",
    client_id: input.clientId,
    redirect_uri: input.redirectUri,
    scope: (input.scopes ?? SMART_SCOPES).join(" "),
    state: input.state,
    aud: input.aud,
    code_challenge: input.codeChallenge,
    code_challenge_method: "S256",
  });
}

export function buildAuthorizeUrl(input: {
  authorizationEndpoint: string;
  clientId: string;
  redirectUri: string;
  aud: string;
  state: string;
  codeChallenge: string;
  scopes?: readonly string[];
}): string {
  const url = new URL(input.authorizationEndpoint);
  const params = smartAuthorizeParams(input);
  params.forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

export function parseTokenResponse(json: unknown): { accessToken: string; patientId: string } | null {
  if (!json || typeof json !== "object") return null;
  const record = json as Record<string, unknown>;
  if (typeof record.access_token !== "string" || typeof record.patient !== "string") return null;
  if (!record.access_token || !record.patient) return null;
  return { accessToken: record.access_token, patientId: record.patient };
}

export function nameFromUserInfo(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const record = json as Record<string, unknown>;
  if (typeof record.name === "string" && record.name.trim()) return record.name.trim();
  const given = typeof record.given_name === "string" ? record.given_name.trim() : "";
  const family = typeof record.family_name === "string" ? record.family_name.trim() : "";
  const combined = [given, family].filter(Boolean).join(" ");
  return combined || null;
}
