import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16).default("dev-trump-rx-change-me-in-production-32chars"),
  AUTH_URL: z.string().url().optional(),
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
  NEXT_PUBLIC_APP_URL: z.string().default("http://127.0.0.1:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Trump RX"),
});

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
  }
  cached = parsed.data;
  return cached;
}

export function isStripeConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_PLUS_PRICE_ID);
}
