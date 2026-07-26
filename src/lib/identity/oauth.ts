import { randomId, sha256Hex } from '../crypto/hash'
import type { OidcTokenSet, UserAccount } from './types'

/**
 * Lightweight OAuth 2.0 / OIDC authorization-code scaffolding.
 * Production should use a certified IdP (Auth0, Cognito, Keycloak).
 */

export class OidcClient {
  private authCodes = new Map<
    string,
    { userId: string; codeChallenge: string; redirectUri: string; expiresAt: number }
  >()
  private users = new Map<string, UserAccount>()

  registerUser(user: UserAccount) {
    this.users.set(user.userId, user)
  }

  getUser(userId: string): UserAccount | undefined {
    const u = this.users.get(userId)
    return u ? { ...u } : undefined
  }

  async createAuthorizationCode(params: {
    userId: string
    redirectUri: string
    codeChallenge: string
  }): Promise<string> {
    if (!this.users.has(params.userId)) throw new Error('UNKNOWN_USER')
    const code = randomId('code')
    this.authCodes.set(code, {
      userId: params.userId,
      codeChallenge: params.codeChallenge,
      redirectUri: params.redirectUri,
      expiresAt: Date.now() + 120_000,
    })
    return code
  }

  async exchangeCode(params: {
    code: string
    redirectUri: string
    codeVerifier: string
  }): Promise<OidcTokenSet> {
    const record = this.authCodes.get(params.code)
    if (!record) throw new Error('INVALID_CODE')
    this.authCodes.delete(params.code)
    if (record.expiresAt < Date.now()) throw new Error('CODE_EXPIRED')
    if (record.redirectUri !== params.redirectUri) throw new Error('REDIRECT_MISMATCH')
    const challenge = await sha256Hex(params.codeVerifier)
    if (challenge !== record.codeChallenge) throw new Error('PKCE_FAILED')

    const user = this.users.get(record.userId)!
    const accessToken = randomId('atk')
    const idToken = await sha256Hex(
      JSON.stringify({
        sub: user.userId,
        email: user.email,
        name: user.displayName,
        aud: 'gateledger',
        iss: 'https://auth.littlelemon.local',
      }),
    )
    return {
      accessToken,
      idToken,
      expiresIn: 900,
      tokenType: 'Bearer',
      scope: 'openid profile ticket:transfer',
    }
  }
}
