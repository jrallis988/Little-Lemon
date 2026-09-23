import { describe, expect, it } from 'vitest'
import {
  BARCODE_STEP_MS,
  rotatingToken,
  staleToken,
  verifyRotatingToken,
} from './rotatingBarcode'

describe('rotating barcodes', () => {
  it('issues a time-bound token that verifies in the current window', async () => {
    const secret = 'bc_seed_demo'
    const now = 1_700_000_000_000
    const live = await rotatingToken(secret, now)
    expect(live.token).toHaveLength(24)
    expect(live.validForMs).toBeGreaterThan(0)
    await expect(verifyRotatingToken(secret, live.token, now)).resolves.toBe(true)
  })

  it('rejects a screenshot from a prior step outside skew', async () => {
    const secret = 'bc_seed_demo'
    const now = 1_700_000_030_000
    const frozen = await staleToken(secret, 2, now)
    await expect(verifyRotatingToken(secret, frozen, now, 1)).resolves.toBe(false)
  })

  it('rotates to a different token after the step advances', async () => {
    const secret = 'bc_seed_demo'
    const t0 = 1_700_000_000_000
    const first = await rotatingToken(secret, t0)
    const second = await rotatingToken(secret, t0 + BARCODE_STEP_MS)
    expect(first.token).not.toBe(second.token)
    await expect(verifyRotatingToken(secret, first.token, t0 + BARCODE_STEP_MS, 0)).resolves.toBe(
      false,
    )
  })
})
