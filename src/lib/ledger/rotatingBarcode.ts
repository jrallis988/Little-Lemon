import { sha256Hex } from '../crypto/hash'

/** Rolling barcode window — screenshots expire when the step advances. */
export const BARCODE_STEP_MS = 15_000

export interface LiveBarcode {
  token: string
  step: number
  expiresAt: number
  validForMs: number
}

export async function rotatingToken(
  secret: string,
  atMs = Date.now(),
): Promise<LiveBarcode> {
  const step = Math.floor(atMs / BARCODE_STEP_MS)
  const token = (await sha256Hex(`${secret}|${step}`)).slice(0, 24)
  const expiresAt = (step + 1) * BARCODE_STEP_MS
  return {
    token,
    step,
    expiresAt,
    validForMs: Math.max(0, expiresAt - atMs),
  }
}

/** Allow ±skew steps for clock drift at the gate. */
export async function verifyRotatingToken(
  secret: string,
  presented: string,
  atMs = Date.now(),
  skew = 1,
): Promise<boolean> {
  const step = Math.floor(atMs / BARCODE_STEP_MS)
  for (let offset = -skew; offset <= skew; offset++) {
    const candidate = (await sha256Hex(`${secret}|${step + offset}`)).slice(0, 24)
    if (candidate === presented) return true
  }
  return false
}

/** Demo helper: token from N steps ago (simulates a frozen screenshot). */
export async function staleToken(
  secret: string,
  stepsAgo = 2,
  atMs = Date.now(),
): Promise<string> {
  const step = Math.floor(atMs / BARCODE_STEP_MS) - stepsAgo
  return (await sha256Hex(`${secret}|${step}`)).slice(0, 24)
}
