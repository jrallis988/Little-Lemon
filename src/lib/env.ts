import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

/**
 * Production requires strong AUTH_SECRET and AUTH_URL.
 * Development keeps a documented fallback so local seed/dev still boots.
 */
const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
    DATABASE_URL: z
      .string()
      .min(1, "DATABASE_URL is required (sqlite file:./dev.db or postgres://…)"),
    AUTH_SECRET: isProd
      ? z
          .string()
          .min(32, "AUTH_SECRET must be at least 32 characters in production")
      : z
          .string()
          .min(16)
          .default("dev-trump-rx-change-me-in-production-32chars"),
    AUTH_URL: isProd
      ? z.string().url("AUTH_URL must be a valid absolute URL in production")
      : z.string().url().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    TRUMPRX_BIN: z.string().default("610020"),
    TRUMPRX_PCN: z.string().default("TRUMPRX"),
    TRUMPRX_GROUP: z.string().default("TRXSAVE"),
    COUPON_TTL_HOURS: z.coerce.number().default(72),
    PRICING_PROVIDER: z.enum(["network", "external"]).default("network"),
    PRICING_API_URL: z.string().url().optional(),
    PRICING_API_KEY: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PLUS_PRICE_ID: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    ALERTS_CRON_SECRET: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),
    TWILIO_ACCOUNT_SID: z.string().optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    TWILIO_FROM_NUMBER: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().default("http://127.0.0.1:3000"),
    NEXT_PUBLIC_APP_NAME: z.string().default("Trump RX"),
  })
  .superRefine((val, ctx) => {
    if (val.PRICING_PROVIDER === "external" && !val.PRICING_API_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["PRICING_API_URL"],
        message: "PRICING_API_URL is required when PRICING_PROVIDER=external",
      });
    }
    if (val.STRIPE_SECRET_KEY && !val.STRIPE_PLUS_PRICE_ID) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["STRIPE_PLUS_PRICE_ID"],
        message: "STRIPE_PLUS_PRICE_ID is required when Stripe is enabled",
      });
    }
  });

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("[env]", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
  }
  cached = parsed.data;
  return cached;
}

/** Soft parse for health checks — never throws. */
export function peekEnv():
  | { ok: true; env: AppEnv }
  | { ok: false; errors: Record<string, string[] | undefined> } {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  return { ok: true, env: parsed.data };
}

export function isStripeConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_PLUS_PRICE_ID);
}

export function isStripeWebhookConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
}

export function isResendConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL);
}

export function isTwilioConfigured(): boolean {
  const env = getEnv();
  return Boolean(
    env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM_NUMBER
  );
}

export function databaseProviderFromUrl(url: string): "sqlite" | "postgres" {
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    return "postgres";
  }
  return "sqlite";
}
