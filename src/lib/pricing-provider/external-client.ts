import { getEnv } from "@/lib/env";
import type {
  ExternalPricingQuoteRequest,
  ExternalPricingQuoteResponse,
  PricingProviderClient,
} from "@/lib/pricing-provider/types";

/**
 * Modular HTTP client for PRICING_PROVIDER=external.
 * Point PRICING_API_URL at your PBM/switch quote API:
 *   POST {PRICING_API_URL}/v1/quotes
 */
export class ExternalPricingClient implements PricingProviderClient {
  readonly name = "external";

  constructor(
    private readonly baseUrl: string,
    private readonly apiKey?: string
  ) {}

  async getQuotes(
    request: ExternalPricingQuoteRequest
  ): Promise<ExternalPricingQuoteResponse> {
    const res = await fetch(`${this.baseUrl.replace(/\/$/, "")}/v1/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        "X-Request-Id": request.requestId ?? crypto.randomUUID(),
      },
      body: JSON.stringify(request),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `External pricing HTTP ${res.status}: ${text.slice(0, 200)}`
      );
    }

    const data = (await res.json()) as ExternalPricingQuoteResponse;
    if (!data || !Array.isArray(data.offers)) {
      throw new Error("External pricing response missing offers[]");
    }
    return {
      ...data,
      provider: data.provider ?? "external",
      quotedAt: data.quotedAt ?? new Date().toISOString(),
    };
  }
}

export function createExternalPricingClient(): ExternalPricingClient | null {
  const env = getEnv();
  if (!env.PRICING_API_URL) return null;
  return new ExternalPricingClient(env.PRICING_API_URL, env.PRICING_API_KEY);
}
