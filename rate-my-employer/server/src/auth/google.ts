type GoogleTokenInfo = {
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  error?: string;
  error_description?: string;
};

export async function verifyGoogleIdToken(idToken: string): Promise<{
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }

  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`,
  );
  const info = (await response.json()) as GoogleTokenInfo;
  if (!response.ok || info.error || !info.sub || !info.email) {
    throw new Error(info.error_description ?? info.error ?? 'Invalid Google ID token');
  }
  if (info.aud !== clientId) {
    throw new Error('Google token audience mismatch');
  }
  const verified =
    info.email_verified === true ||
    info.email_verified === 'true' ||
    info.email_verified === undefined;
  if (!verified) {
    throw new Error('Google email is not verified');
  }
  return {
    sub: info.sub,
    email: info.email.toLowerCase(),
    name: info.name,
    picture: info.picture,
  };
}

export function googleOAuthConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID);
}
