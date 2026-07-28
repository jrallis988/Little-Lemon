import type {
  LocationContext,
  PriceComparisonRow,
  SupplyDays,
} from "@/lib/types";

/** Request payload for an external PBM / switch pricing feed. */
export interface ExternalPricingQuoteRequest {
  drugId: string;
  strengthId: string;
  /** Optional NDC when available from catalog. */
  ndc?: string;
  quantity: number;
  supplyDays: SupplyDays;
  zip: string;
  latitude: number;
  longitude: number;
  radiusMiles?: number;
  plusMember?: boolean;
  /** Opaque correlation id for partner logs. */
  requestId?: string;
}

/** Normalized pharmacy offer returned by an external feed. */
export interface ExternalPricingOffer {
  pharmacyId: string;
  pharmacyName?: string;
  ncpdpId?: string;
  npi?: string;
  couponPrice: number;
  retailPrice: number;
  currency?: "USD";
  inStock?: boolean;
  distanceMiles?: number;
  bin?: string;
  pcn?: string;
  group?: string;
  memberId?: string;
  barcodeValue?: string;
  quotedAt?: string;
  expiresAt?: string;
}

export interface ExternalPricingQuoteResponse {
  requestId?: string;
  provider: string;
  quotedAt: string;
  offers: ExternalPricingOffer[];
  /** Partner-specific diagnostics (never shown to end users). */
  meta?: Record<string, unknown>;
}

export interface PricingProviderClient {
  readonly name: string;
  getQuotes(
    request: ExternalPricingQuoteRequest
  ): Promise<ExternalPricingQuoteResponse>;
}

export type QuoteParams = {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  location: LocationContext;
  plusMember?: boolean;
  radiusMiles?: number;
  ndc?: string;
};

/** Map partner response into Trump RX comparison rows (partial — pharmacy fill-in by caller). */
export type ExternalQuoteMapper = (
  response: ExternalPricingQuoteResponse,
  params: QuoteParams
) => Promise<PriceComparisonRow[]>;
