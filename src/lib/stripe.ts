import Stripe from "stripe";
import { getEnv, isStripeConfigured } from "@/lib/env";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!isStripeConfigured()) return null;
  if (stripe) return stripe;
  const env = getEnv();
  stripe = new Stripe(env.STRIPE_SECRET_KEY!);
  return stripe;
}
