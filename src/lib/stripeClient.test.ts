import { describe, expect, it } from 'vitest'
import { checkoutReturnUrl, parseCheckoutReturn } from './stripeClient'

describe('stripeClient helpers', () => {
  it('builds a checkout return URL with tab + payment markers', () => {
    expect(checkoutReturnUrl('http://localhost:5173')).toBe(
      'http://localhost:5173/?tab=checkout&payment=return',
    )
  })

  it('parses Stripe redirect query params', () => {
    const parsed = parseCheckoutReturn(
      '?tab=checkout&payment=return&payment_intent=pi_123&redirect_status=succeeded',
    )
    expect(parsed).toEqual({
      intentId: 'pi_123',
      redirectStatus: 'succeeded',
      isReturn: true,
    })
  })

  it('treats missing payment markers as not a return', () => {
    expect(parseCheckoutReturn('')).toEqual({
      intentId: undefined,
      redirectStatus: undefined,
      isReturn: false,
    })
  })
})
