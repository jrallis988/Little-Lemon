import { randomId, sha256Hex } from '../crypto/hash'
import type { DeviceSession } from './types'

/** Device-bound session tokens — not portable across hardware. */

export class DeviceSessionService {
  private sessions = new Map<string, DeviceSession>()

  async issue(userId: string, deviceId: string, ttlMs = 3_600_000): Promise<DeviceSession> {
    const token = randomId('dst')
    const session: DeviceSession = {
      sessionId: randomId('sess'),
      userId,
      deviceId,
      token,
      expiresAt: new Date(Date.now() + ttlMs).toISOString(),
    }
    this.sessions.set(session.sessionId, session)
    return { ...session }
  }

  async verify(
    sessionId: string,
    token: string,
    deviceId: string,
  ): Promise<{ ok: true; session: DeviceSession } | { ok: false; reason: string }> {
    const session = this.sessions.get(sessionId)
    if (!session) return { ok: false, reason: 'UNKNOWN_SESSION' }
    if (session.revokedAt) return { ok: false, reason: 'REVOKED' }
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      return { ok: false, reason: 'EXPIRED' }
    }
    if (session.deviceId !== deviceId) {
      return { ok: false, reason: 'DEVICE_MISMATCH' }
    }
    if (session.token !== token) {
      return { ok: false, reason: 'TOKEN_MISMATCH' }
    }
    return { ok: true, session: { ...session } }
  }

  revoke(sessionId: string) {
    const session = this.sessions.get(sessionId)
    if (session) session.revokedAt = new Date().toISOString()
  }

  async tokenFingerprint(token: string): Promise<string> {
    return sha256Hex(token)
  }
}
