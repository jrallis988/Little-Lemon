const SUPPORTED = new Set(['USD', 'EUR', 'GBP'])

export function normalizeCurrency(code: string): string {
  return code.trim().toUpperCase()
}

export function assertSupportedCurrency(code: string): string {
  const normalized = normalizeCurrency(code)
  if (!SUPPORTED.has(normalized)) {
    throw new Error(`UNSUPPORTED_CURRENCY:${normalized}`)
  }
  return normalized
}

/**
 * Reject currency / amount manipulation: client cannot underpay or switch FX mid-hold.
 */
export function assertPriceMatchesListing(
  offeredCents: number,
  listingCents: number,
  offeredCurrency: string,
  listingCurrency: string,
) {
  if (!Number.isInteger(offeredCents) || offeredCents <= 0) {
    throw new Error('INVALID_AMOUNT')
  }
  if (normalizeCurrency(offeredCurrency) !== normalizeCurrency(listingCurrency)) {
    throw new Error('CURRENCY_MISMATCH')
  }
  if (offeredCents !== listingCents) {
    throw new Error('PRICE_TAMPER')
  }
}
