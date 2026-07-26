import { randomChallenge, randomId } from '../crypto/hash'
import type { DeviceSessionService } from './sessionTokens'
import type { TransferChallenge, UserAccount } from './types'
import type { WebAuthnService } from './webauthn'

/**
 * High-value ticket transfers require out-of-band biometric confirmation
 * on the seller's primary registered hardware device.
 */
export class TransferHandshakeService {
  private challenges = new Map<string, TransferChallenge>()

  constructor(
    private readonly webauthn: WebAuthnService,
    private readonly sessions: DeviceSessionService,
  ) {}

  async initiate(params: {
    ticketId: string
    fromUser: UserAccount
    toUserId: string
    sessionId: string
    sessionToken: string
    deviceId: string
  }): Promise<TransferChallenge> {
    const sessionCheck = await this.sessions.verify(
      params.sessionId,
      params.sessionToken,
      params.deviceId,
    )
    if (!sessionCheck.ok) {
      throw new Error(`SESSION_${sessionCheck.reason}`)
    }
    if (sessionCheck.session.userId !== params.fromUser.userId) {
      throw new Error('SESSION_USER_MISMATCH')
    }
    if (params.deviceId !== params.fromUser.primaryDeviceId) {
      throw new Error('PRIMARY_DEVICE_REQUIRED')
    }

    const assertion = this.webauthn.beginAssertion(params.fromUser.userId)
    const handshake: TransferChallenge = {
      handshakeId: randomId('hs'),
      ticketId: params.ticketId,
      fromUserId: params.fromUser.userId,
      toUserId: params.toUserId,
      challenge: assertion.challenge,
      pushDeliveredToDeviceId: params.fromUser.primaryDeviceId,
      expiresAt: new Date(Date.now() + 120_000).toISOString(),
      status: 'PENDING',
    }
    this.challenges.set(handshake.handshakeId, handshake)
    return { ...handshake }
  }

  async confirmWithPasskey(params: {
    handshakeId: string
    credentialId: string
    challenge: string
    signatureDigest: string
    signCount: number
  }): Promise<TransferChallenge> {
    const handshake = this.challenges.get(params.handshakeId)
    if (!handshake) throw new Error('UNKNOWN_HANDSHAKE')
    if (handshake.status !== 'PENDING') throw new Error(`HANDSHAKE_${handshake.status}`)
    if (new Date(handshake.expiresAt).getTime() < Date.now()) {
      handshake.status = 'EXPIRED'
      throw new Error('HANDSHAKE_EXPIRED')
    }
    if (handshake.challenge !== params.challenge) {
      throw new Error('CHALLENGE_MISMATCH')
    }

    const assertion = await this.webauthn.finishAssertion(
      handshake.fromUserId,
      params.credentialId,
      params.challenge,
      params.signatureDigest,
      params.signCount,
    )
    if (!assertion.ok) {
      handshake.status = 'DENIED'
      throw new Error(`BIOMETRIC_${assertion.reason}`)
    }
    handshake.status = 'APPROVED'
    return { ...handshake }
  }

  get(handshakeId: string): TransferChallenge | undefined {
    const hs = this.challenges.get(handshakeId)
    return hs ? { ...hs } : undefined
  }

  /** Test helper for expired handshakes. */
  forceExpire(handshakeId: string) {
    const hs = this.challenges.get(handshakeId)
    if (hs) {
      hs.expiresAt = new Date(Date.now() - 1).toISOString()
    }
  }

  createDetachedChallenge(): string {
    return randomChallenge()
  }
}
