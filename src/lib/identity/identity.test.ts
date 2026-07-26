import { describe, expect, it } from 'vitest'
import { OidcClient } from './oauth'
import { DeviceSessionService } from './sessionTokens'
import { TransferHandshakeService } from './transferHandshake'
import type { UserAccount } from './types'
import { WebAuthnService } from './webauthn'
import { sha256Hex } from '../crypto/hash'

const alice: UserAccount = {
  userId: 'user_alice',
  email: 'alice@example.com',
  displayName: 'Alice',
  primaryDeviceId: 'device_alice_phone',
}

describe('WebAuthn / passkey MFA pipeline', () => {
  it('registers a platform authenticator and asserts with increasing signCount', async () => {
    const webauthn = new WebAuthnService('littlelemon.local', 'Little Lemon GateLedger')
    const creation = webauthn.beginRegistration(alice)
    const credential = await webauthn.finishRegistration(
      alice.userId,
      'Alice iPhone',
      creation.challenge,
      'SIMULATED_PUBLIC_KEY_MATERIAL',
    )

    const assertion = webauthn.beginAssertion(alice.userId)
    const digest = await webauthn.buildAssertionDigest(credential.credentialId, assertion.challenge)
    const ok = await webauthn.finishAssertion(
      alice.userId,
      credential.credentialId,
      assertion.challenge,
      digest,
      1,
    )
    expect(ok).toEqual({ ok: true, credentialId: credential.credentialId })

    const next = webauthn.beginAssertion(alice.userId)
    const nextDigest = await webauthn.buildAssertionDigest(
      credential.credentialId,
      next.challenge,
    )
    const replay = await webauthn.finishAssertion(
      alice.userId,
      credential.credentialId,
      next.challenge,
      nextDigest,
      1,
    )
    expect(replay).toEqual({ ok: false, reason: 'SIGN_COUNT_REPLAY' })
  })

  it('binds sessions to a device and rejects stolen tokens on another device', async () => {
    const sessions = new DeviceSessionService()
    const session = await sessions.issue(alice.userId, alice.primaryDeviceId)
    const good = await sessions.verify(session.sessionId, session.token, alice.primaryDeviceId)
    expect(good.ok).toBe(true)

    const stolen = await sessions.verify(session.sessionId, session.token, 'attacker_laptop')
    expect(stolen).toEqual({ ok: false, reason: 'DEVICE_MISMATCH' })
  })

  it('requires primary-device biometric handshake before high-value transfer approval', async () => {
    const webauthn = new WebAuthnService('littlelemon.local', 'Little Lemon GateLedger')
    const sessions = new DeviceSessionService()
    const handshakes = new TransferHandshakeService(webauthn, sessions)

    const creation = webauthn.beginRegistration(alice)
    const credential = await webauthn.finishRegistration(
      alice.userId,
      'Alice iPhone',
      creation.challenge,
      'SIMULATED_PUBLIC_KEY_MATERIAL',
    )
    const secondarySession = await sessions.issue(alice.userId, 'other_device')
    await expect(
      handshakes.initiate({
        ticketId: 'tkt_1',
        fromUser: alice,
        toUserId: 'user_bob',
        sessionId: secondarySession.sessionId,
        sessionToken: secondarySession.token,
        deviceId: 'other_device',
      }),
    ).rejects.toThrow('PRIMARY_DEVICE_REQUIRED')

    const session = await sessions.issue(alice.userId, alice.primaryDeviceId)
    const pending = await handshakes.initiate({
      ticketId: 'tkt_1',
      fromUser: alice,
      toUserId: 'user_bob',
      sessionId: session.sessionId,
      sessionToken: session.token,
      deviceId: alice.primaryDeviceId,
    })
    expect(pending.status).toBe('PENDING')
    expect(pending.pushDeliveredToDeviceId).toBe(alice.primaryDeviceId)

    const digest = await webauthn.buildAssertionDigest(
      credential.credentialId,
      pending.challenge,
    )
    const approved = await handshakes.confirmWithPasskey({
      handshakeId: pending.handshakeId,
      credentialId: credential.credentialId,
      challenge: pending.challenge,
      signatureDigest: digest,
      signCount: 1,
    })
    expect(approved.status).toBe('APPROVED')
  })

  it('exchanges OAuth/OIDC auth codes with PKCE', async () => {
    const oidc = new OidcClient()
    oidc.registerUser(alice)
    const verifier = 'pkce_verifier_value_for_alice_transfer_flow'
    const challenge = await sha256Hex(verifier)
    const code = await oidc.createAuthorizationCode({
      userId: alice.userId,
      redirectUri: 'https://app.littlelemon.local/callback',
      codeChallenge: challenge,
    })
    const tokens = await oidc.exchangeCode({
      code,
      redirectUri: 'https://app.littlelemon.local/callback',
      codeVerifier: verifier,
    })
    expect(tokens.tokenType).toBe('Bearer')
    expect(tokens.scope).toContain('ticket:transfer')
    expect(tokens.accessToken).toMatch(/^atk_/)
  })
})
