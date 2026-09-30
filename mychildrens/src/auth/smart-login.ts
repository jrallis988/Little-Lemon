import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { loadFamilyChart } from "../fhir/client";
import {
  SMART_SCOPES,
  assertHttpsIssuer,
  fetchSmartConfiguration,
  nameFromUserInfo,
  parseTokenResponse,
} from "../fhir/oauth";
import type { FamilyChart } from "../domain/types";

WebBrowser.maybeCompleteAuthSession();

export function smartRedirectUri(): string {
  return AuthSession.makeRedirectUri({ scheme: "mychildrens", path: "redirect" });
}

export function configuredIssuer(): string {
  return process.env.EXPO_PUBLIC_FHIR_ISS ?? "";
}

export function configuredClientId(): string {
  return process.env.EXPO_PUBLIC_FHIR_CLIENT_ID ?? "";
}

export async function signInWithSmart(input: {
  iss: string;
  clientId: string;
}): Promise<{ chart: FamilyChart; iss: string; patientId: string; warnings: string[] }> {
  const iss = assertHttpsIssuer(input.iss);
  const clientId = input.clientId.trim();
  if (!clientId) throw new Error("Enter the client ID issued for this app.");

  const configuration = await fetchSmartConfiguration(iss);
  const redirectUri = smartRedirectUri();
  const request = new AuthSession.AuthRequest({
    clientId,
    redirectUri,
    scopes: [...SMART_SCOPES],
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
    extraParams: { aud: iss },
  });
  const result = await request.promptAsync({ authorizationEndpoint: configuration.authorization_endpoint });
  if (result.type !== "success") {
    throw new Error(result.type === "cancel" || result.type === "dismiss" ? "Sign-in was canceled." : "Sign-in did not finish.");
  }
  const code = result.params.code;
  if (!code || !request.codeVerifier) throw new Error("Sign-in did not return an authorization code.");

  const tokenResponse = await fetch(configuration.token_endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: request.codeVerifier,
    }).toString(),
  });
  const tokenJson: unknown = await tokenResponse.json().catch(() => null);
  if (!tokenResponse.ok) {
    const record = tokenJson && typeof tokenJson === "object" ? (tokenJson as Record<string, unknown>) : {};
    const message = typeof record.error_description === "string" ? record.error_description : typeof record.error === "string" ? record.error : null;
    throw new Error(message ?? `The token request failed (${tokenResponse.status}).`);
  }
  const token = parseTokenResponse(tokenJson);
  if (!token) {
    throw new Error("The health system did not return a patient id. Use a SMART standalone patient launch.");
  }

  let guardianName: string | undefined;
  if (configuration.userinfo_endpoint) {
    try {
      const userInfo = await fetch(configuration.userinfo_endpoint, {
        headers: { Authorization: `Bearer ${token.accessToken}`, Accept: "application/json" },
      });
      if (userInfo.ok) guardianName = nameFromUserInfo(await userInfo.json()) ?? undefined;
    } catch {
      guardianName = undefined;
    }
  }

  const loaded = await loadFamilyChart({
    iss,
    accessToken: token.accessToken,
    patientId: token.patientId,
    guardianName,
  });
  return { chart: loaded.chart, iss, patientId: token.patientId, warnings: loaded.warnings };
}
