import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { isSanityConfigured } from "@/lib/cms/client";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    site: siteConfig.name,
    mode: siteConfig.mode,
    official: siteConfig.isOfficial,
    cms: isSanityConfigured ? "sanity" : "local",
    intake: {
      webhook: Boolean(process.env.INTAKE_WEBHOOK_URL),
      email: Boolean(process.env.RESEND_API_KEY),
      durable: Boolean(
        process.env.UPSTASH_REDIS_REST_URL &&
          process.env.UPSTASH_REDIS_REST_TOKEN,
      ),
      ops: Boolean(process.env.INTAKE_OPS_SECRET),
    },
    monitoring: {
      sentry: Boolean(process.env.SENTRY_DSN),
      analytics: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID),
    },
    timestamp: new Date().toISOString(),
  });
}
