import { useState } from 'react'
import { api } from '../lib/apiClient'
import type { DeviceSession, TransferChallenge, WebAuthnCredential } from '../lib/identity/types'

export function IdentityPanel() {
  const [credential, setCredential] = useState<WebAuthnCredential | null>(null)
  const [session, setSession] = useState<DeviceSession | null>(null)
  const [handshake, setHandshake] = useState<TransferChallenge | null>(null)
  const [ticketId, setTicketId] = useState('')
  const [status, setStatus] = useState('')
  const [log, setLog] = useState('Passkey + device-bound sessions protect high-value transfers.')

  const registerPasskey = async () => {
    try {
      const { options, credential: cred } = await api.registerPasskey()
      setCredential(cred)
      setLog(
        `WebAuthn registration challenge bound to ${options.rp.id}\ncredential ${cred.credentialId}`,
      )
      setStatus('Passkey registered on primary device')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Passkey registration failed')
    }
  }

  const openSession = async () => {
    try {
      const { session: sess } = await api.openSession()
      setSession(sess)
      setStatus('Device-bound session issued')
      setLog((prev) => `${prev}\nSession ${sess.sessionId} locked to ${sess.deviceId}`)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Session issue failed')
    }
  }

  const startTransfer = async () => {
    if (!session || !credential) {
      setStatus('Register a passkey and open a device session first')
      return
    }
    try {
      const { handshake: pending, ticketId: id } = await api.startTransfer(
        session.sessionId,
        session.token,
        ticketId || undefined,
      )
      setTicketId(id)
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
      const { handshake: approved } = await api.approveTransfer({
        handshakeId: handshake.handshakeId,
        credentialId: credential.credentialId,
        challenge: handshake.challenge,
        signCount: credential.signCount + 1,
      })
      setHandshake(approved)
      setCredential({ ...credential, signCount: credential.signCount + 1 })
      setStatus('Transfer approved via passkey — ledger ownership updated')
      setLog((prev) => `${prev}\nBiometric OK · ownership → user_bob`)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Approval failed')
    }
  }

  const simulateAto = async () => {
    if (!session) {
      setStatus('Open a session first')
      return
    }
    try {
      const stolen = await api.stealSession(session.sessionId, session.token)
      setStatus(
        stolen.ok
          ? 'Unexpected session accept'
          : `ATO blocked: ${stolen.reason} — token is device-bound`,
      )
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'ATO check failed')
    }
  }

  return (
    <section className="panel">
      <h2>Identity & biometric handshakes</h2>
      <p className="lede">
        Passkeys (WebAuthn/FIDO2), device-bound sessions, and out-of-band push confirmation
        stop account takeover from dumping forged transfers. Flows run through the API.
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
            <strong>Alice Nguyen</strong>{' '}
            <span className={`badge ${credential ? 'good' : 'warn'}`}>
              {credential ? 'passkey ready' : 'no passkey'}
            </span>
            <div className="meta">
              <span>primary device: device_alice_phone</span>
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
