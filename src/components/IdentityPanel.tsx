import { useState } from 'react'
import type { DemoPlatform } from '../lib/demoStore'
import { users } from '../lib/demoStore'
import type { DeviceSession, TransferChallenge, WebAuthnCredential } from '../lib/identity/types'

interface Props {
  platform: DemoPlatform
}

export function IdentityPanel({ platform }: Props) {
  const { webauthn, sessions, handshakes, ledger } = platform
  const [credential, setCredential] = useState<WebAuthnCredential | null>(null)
  const [session, setSession] = useState<DeviceSession | null>(null)
  const [handshake, setHandshake] = useState<TransferChallenge | null>(null)
  const [ticketId, setTicketId] = useState('')
  const [status, setStatus] = useState('')
  const [log, setLog] = useState('Passkey + device-bound sessions protect high-value transfers.')

  const registerPasskey = async () => {
    const options = webauthn.beginRegistration(users.alice)
    const cred = await webauthn.finishRegistration(
      users.alice.userId,
      'Alice primary phone',
      options.challenge,
      btoa('alice-platform-authenticator'),
    )
    setCredential(cred)
    setLog(
      `WebAuthn registration challenge bound to ${options.rp.id}\ncredential ${cred.credentialId}`,
    )
    setStatus('Passkey registered on primary device')
  }

  const openSession = async () => {
    const sess = await sessions.issue(users.alice.userId, users.alice.primaryDeviceId)
    setSession(sess)
    setStatus('Device-bound session issued')
    setLog((prev) => `${prev}\nSession ${sess.sessionId} locked to ${sess.deviceId}`)
  }

  const ensureTicket = async () => {
    if (ticketId && ledger.getTicket(ticketId)) return ticketId
    const { ticket } = await ledger.issueTicket({
      eventId: 'evt_little_lemon_night',
      ownerUserId: users.alice.userId,
      seatLabel: 'VIP-1',
    })
    setTicketId(ticket.ticketId)
    return ticket.ticketId
  }

  const startTransfer = async () => {
    if (!session || !credential) {
      setStatus('Register a passkey and open a device session first')
      return
    }
    try {
      const id = await ensureTicket()
      const pending = await handshakes.initiate({
        ticketId: id,
        fromUser: users.alice,
        toUserId: users.bob.userId,
        sessionId: session.sessionId,
        sessionToken: session.token,
        deviceId: users.alice.primaryDeviceId,
      })
      setHandshake(pending)
      setStatus('Push sent to primary device — biometric confirmation required')
      setLog(
        `Transfer handshake ${pending.handshakeId}\npush → ${pending.pushDeliveredToDeviceId}\nchallenge ${pending.challenge.slice(0, 24)}…`,
      )
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Transfer init failed')
    }
  }

  const approveTransfer = async () => {
    if (!handshake || !credential) return
    try {
      const digest = await webauthn.buildAssertionDigest(
        credential.credentialId,
        handshake.challenge,
      )
      const approved = await handshakes.confirmWithPasskey({
        handshakeId: handshake.handshakeId,
        credentialId: credential.credentialId,
        challenge: handshake.challenge,
        signatureDigest: digest,
        signCount: credential.signCount + 1,
      })
      setHandshake(approved)
      setCredential({ ...credential, signCount: credential.signCount + 1 })
      await ledger.transferTicket({
        ticketId: handshake.ticketId,
        fromUserId: users.alice.userId,
        toUserId: users.bob.userId,
        handshakeId: approved.handshakeId,
      })
      setStatus('Transfer approved via passkey — ledger ownership updated')
      setLog((prev) => `${prev}\nBiometric OK · ownership → ${users.bob.userId}`)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Approval failed')
    }
  }

  const simulateAto = async () => {
    if (!session) {
      setStatus('Open a session first')
      return
    }
    const stolen = await sessions.verify(
      session.sessionId,
      session.token,
      'attacker_device_clone',
    )
    setStatus(
      stolen.ok
        ? 'Unexpected session accept'
        : `ATO blocked: ${stolen.reason} — token is device-bound`,
    )
  }

  return (
    <section className="panel">
      <h2>Identity & biometric handshakes</h2>
      <p className="lede">
        Passkeys (WebAuthn/FIDO2), device-bound sessions, and out-of-band push confirmation
        stop account takeover from dumping forged transfers.
      </p>
      <div className="grid-2">
        <div className="stack">
          <div className="actions">
            <button type="button" onClick={() => void registerPasskey()}>
              Register passkey
            </button>
            <button type="button" className="secondary" onClick={() => void openSession()}>
              Bind device session
            </button>
            <button type="button" className="secondary" onClick={() => void startTransfer()}>
              Start transfer MFA
            </button>
            <button
              type="button"
              onClick={() => void approveTransfer()}
              disabled={!handshake || handshake.status !== 'PENDING'}
            >
              Approve with biometric
            </button>
            <button type="button" className="danger" onClick={() => void simulateAto()}>
              Steal session (ATO)
            </button>
          </div>
          <div className="ticket">
            <strong>{users.alice.displayName}</strong>{' '}
            <span className={`badge ${credential ? 'good' : 'warn'}`}>
              {credential ? 'passkey ready' : 'no passkey'}
            </span>
            <div className="meta">
              <span>primary device: {users.alice.primaryDeviceId}</span>
              <span>session: {session?.sessionId ?? 'none'}</span>
              <span>handshake: {handshake?.status ?? 'none'}</span>
              <span>ticket: {ticketId || 'will issue on transfer'}</span>
            </div>
          </div>
          <p className="status-line" role="status">
            {status}
          </p>
        </div>
        <div className="field">
          <label>OIDC / MFA trace</label>
          <div className="log">{log}</div>
        </div>
      </div>
    </section>
  )
}
