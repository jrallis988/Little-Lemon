export interface UserAccount {
  userId: string
  email: string
  displayName: string
  primaryDeviceId: string
}

export interface WebAuthnCredential {
  credentialId: string
  userId: string
  publicKeyPem: string
  signCount: number
  deviceLabel: string
  createdAt: string
}

export interface DeviceSession {
  sessionId: string
  userId: string
  deviceId: string
  token: string
  expiresAt: string
  revokedAt?: string
}

export interface TransferChallenge {
  handshakeId: string
  ticketId: string
  fromUserId: string
  toUserId: string
  challenge: string
  pushDeliveredToDeviceId: string
  expiresAt: string
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'EXPIRED'
}

export interface OidcTokenSet {
  accessToken: string
  idToken: string
  expiresIn: number
  tokenType: 'Bearer'
  scope: string
}
