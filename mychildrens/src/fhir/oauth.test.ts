import assert from "node:assert/strict";
import test from "node:test";
import {
  SMART_SCOPES,
  assertHttpsIssuer,
  buildAuthorizeUrl,
  fetchSmartConfiguration,
  nameFromUserInfo,
  parseTokenResponse,
  scopesAreReadOnly,
} from "./oauth";

test("authorize URL carries PKCE, the FHIR audience, and read scopes", () => {
  const url = new URL(
    buildAuthorizeUrl({
      authorizationEndpoint: "https://ehr.example.org/oauth2/authorize",
      clientId: "client-123",
      redirectUri: "mychildrens://redirect",
      aud: "https://ehr.example.org/fhir",
      state: "state-1",
      codeChallenge: "challenge",
    }),
  );
  assert.equal(url.searchParams.get("aud"), "https://ehr.example.org/fhir");
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.equal(url.searchParams.get("client_id"), "client-123");
  assert.equal(url.searchParams.get("scope"), SMART_SCOPES.join(" "));
  assert.equal(scopesAreReadOnly(SMART_SCOPES), true);
  assert.equal(scopesAreReadOnly(["patient/Patient.write"]), false);
});

test("issuer must be https and token parsing requires a patient id", () => {
  assert.equal(assertHttpsIssuer("https://ehr.example.org/fhir/"), "https://ehr.example.org/fhir");
  assert.throws(() => assertHttpsIssuer("http://ehr.example.org/fhir"), /https/);
  assert.equal(parseTokenResponse({ access_token: "token", patient: "pt1" })?.patientId, "pt1");
  assert.equal(parseTokenResponse({ access_token: "token" }), null);
  assert.equal(nameFromUserInfo({ given_name: "Jordan", family_name: "Hale" }), "Jordan Hale");
});

test("SMART discovery reads the well-known document", async () => {
  const fetchImpl: typeof fetch = async (input) => {
    assert.equal(String(input), "https://ehr.example.org/fhir/.well-known/smart-configuration");
    return new Response(
      JSON.stringify({
        authorization_endpoint: "https://ehr.example.org/oauth2/authorize",
        token_endpoint: "https://ehr.example.org/oauth2/token",
      }),
      { status: 200 },
    );
  };
  const config = await fetchSmartConfiguration("https://ehr.example.org/fhir", fetchImpl);
  assert.equal(config.token_endpoint, "https://ehr.example.org/oauth2/token");
});
