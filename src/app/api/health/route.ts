import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { isSanityConfigured } from "@/lib/cms/client";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    site: siteConfig.name,
    mode: siteConfig.mode,
    cms: isSanityConfigured ? "sanity" : "local",
    intake: {
      webhook: Boolean(process.env.INTAKE_WEBHOOK_URL),
      email: Boolean(process.env.RESEND_API_KEY),
    },
    timestamp: new Date().toISOString(),
  });
}
