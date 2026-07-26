import { randomChallenge, randomId, sha256Hex } from '../crypto/hash'
import type { UserAccount, WebAuthnCredential } from './types'

/**
 * WebAuthn / FIDO2 scaffolding.
 * In production, use @simplewebauthn/server for attestation & assertion verify.
 * This module models registration + assertion with challenge binding so tests
 * can exercise the MFA pipeline without a hardware authenticator.
 */

export interface PublicKeyCredentialCreationOptionsJSON {
  challenge: string
  rp: { id: string; name: string }
  user: { id: string; name: string; displayName: string }
  pubKeyCredParams: Array<{ type: 'public-key'; alg: number }>
  timeout: number
  attestation: 'none'
  authenticatorSelection: {
    authenticatorAttachment: 'platform'
    userVerification: 'required'
    residentKey: 'preferred'
  }
}

export interface PublicKeyCredentialRequestOptionsJSON {
  challenge: string
  rpId: string
  allowCredentials: Array<{ type: 'public-key'; id: string }>
  userVerification: 'required'
  timeout: number
}

export class WebAuthnService {
  private credentials = new Map<string, WebAuthnCredential>()
  private pendingChallenges = new Map<string, { userId: string; challenge: string; expiresAt: number }>()

  constructor(
    private readonly rpId: string,
    private readonly rpName: string,
  ) {}

  beginRegistration(user: UserAccount): PublicKeyCredentialCreationOptionsJSON {
    const challenge = randomChallenge()
    this.pendingChallenges.set(user.userId, {
      userId: user.userId,
      challenge,
      expiresAt: Date.now() + 60_000,
    })
    return {
      challenge,
      rp: { id: this.rpId, name: this.rpName },
      user: {
        id: user.userId,
        name: user.email,
        displayName: user.displayName,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },
        { type: 'public-key', alg: -257 },
      ],
      timeout: 60_000,
      attestation: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
    }
  }

  async finishRegistration(
    userId: string,
    deviceLabel: string,
    clientChallenge: string,
    simulatedPublicKeyMaterial: string,
  ): Promise<WebAuthnCredential> {
    this.assertChallenge(userId, clientChallenge)
    const credentialId = randomId('cred')
    const credential: WebAuthnCredential = {
      credentialId,
      userId,
      publicKeyPem: `-----BEGIN PUBLIC KEY-----\n${simulatedPublicKeyMaterial}\n-----END PUBLIC KEY-----`,
      signCount: 0,
      deviceLabel,
      createdAt: new Date().toISOString(),
    }
    this.credentials.set(credentialId, credential)
    this.pendingChallenges.delete(userId)
    return { ...credential }
  }

  beginAssertion(userId: string): PublicKeyCredentialRequestOptionsJSON {
    const creds = [...this.credentials.values()].filter((c) => c.userId === userId)
    if (creds.length === 0) throw new Error('NO_CREDENTIALS')
    const challenge = randomChallenge()
    this.pendingChallenges.set(userId, {
      userId,
      challenge,
      expiresAt: Date.now() + 60_000,
    })
    return {
      challenge,
      rpId: this.rpId,
      allowCredentials: creds.map((c) => ({ type: 'public-key', id: c.credentialId })),
      userVerification: 'required',
      timeout: 60_000,
    }
  }

  /**
   * Simulated assertion: client must echo challenge and increment signCount
   * with a signature digest bound to credential + challenge.
   */
  async finishAssertion(
    userId: string,
    credentialId: string,
    clientChallenge: string,
    signatureDigest: string,
    reportedSignCount: number,
  ): Promise<{ ok: true; credentialId: string } | { ok: false; reason: string }> {
    try {
      this.assertChallenge(userId, clientChallenge)
    } catch (err) {
      return { ok: false, reason: err instanceof Error ? err.message : 'CHALLENGE_FAILED' }
    }
    const credential = this.credentials.get(credentialId)
    if (!credential || credential.userId !== userId) {
      return { ok: false, reason: 'UNKNOWN_CREDENTIAL' }
    }
    if (reportedSignCount <= credential.signCount) {
      return { ok: false, reason: 'SIGN_COUNT_REPLAY' }
    }
    const expected = await sha256Hex(`${credentialId}|${clientChallenge}|${credential.publicKeyPem}`)
    if (expected !== signatureDigest) {
      return { ok: false, reason: 'INVALID_SIGNATURE' }
    }
    credential.signCount = reportedSignCount
    this.pendingChallenges.delete(userId)
    return { ok: true, credentialId }
  }

  listCredentials(userId: string): WebAuthnCredential[] {
    return [...this.credentials.values()]
      .filter((c) => c.userId === userId)
      .map((c) => ({ ...c }))
  }

  async buildAssertionDigest(credentialId: string, challenge: string): Promise<string> {
    const credential = this.credentials.get(credentialId)
    if (!credential) throw new Error('UNKNOWN_CREDENTIAL')
    return sha256Hex(`${credentialId}|${challenge}|${credential.publicKeyPem}`)
  }

  private assertChallenge(userId: string, clientChallenge: string) {
    const pending = this.pendingChallenges.get(userId)
    if (!pending) throw new Error('NO_PENDING_CHALLENGE')
    if (pending.expiresAt < Date.now()) throw new Error('CHALLENGE_EXPIRED')
    if (pending.challenge !== clientChallenge) throw new Error('CHALLENGE_MISMATCH')
  }
}
