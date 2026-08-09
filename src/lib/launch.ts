import {
  databaseProviderFromUrl,
  isResendConfigured,
  isStripeConfigured,
  isStripeWebhookConfigured,
  isTwilioConfigured,
  peekEnv,
} from "@/lib/env";

export type LaunchItemStatus = "ready" | "pending" | "optional" | "manual";

export interface LaunchItem {
  id: string;
  title: string;
  status: LaunchItemStatus;
  detail: string;
  envKeys?: string[];
  href?: string;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Compute go-live readiness from environment + integration flags. */
export function buildLaunchChecklist(): {
  items: LaunchItem[];
  score: { ready: number; total: number; percent: number };
  productionBlocked: boolean;
} {
  const peek = peekEnv();
  const dbUrl = process.env.DATABASE_URL ?? "";
  const dbProvider = dbUrl ? databaseProviderFromUrl(dbUrl) : "unknown";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const httpsApp =
    appUrl.startsWith("https://") ||
    appUrl.includes("localhost") ||
    appUrl.includes("127.0.0.1");

  const items: LaunchItem[] = [
    {
      id: "auth_secret",
      title: "Auth secret",
      status:
        peek.ok && (process.env.AUTH_SECRET?.length ?? 0) >= 32
          ? "ready"
          : "pending",
      detail:
        (process.env.AUTH_SECRET?.length ?? 0) >= 32
          ? "AUTH_SECRET is set (≥32 chars)."
          : "Generate with: openssl rand -base64 32",
      envKeys: ["AUTH_SECRET", "AUTH_URL"],
    },
    {
      id: "postgres",
      title: "PostgreSQL database",
      status: dbProvider === "postgres" ? "ready" : "pending",
      detail:
        dbProvider === "postgres"
          ? "DATABASE_URL points at Postgres."
          : "Production requires postgresql://… — see docs/DEPLOY.md and npm run db:use-postgres",
      envKeys: ["DATABASE_URL"],
      href: "/admin/launch",
    },
    {
      id: "https",
      title: "Public HTTPS URL",
      status: httpsApp && !appUrl.includes("localhost") ? "ready" : "pending",
      detail:
        httpsApp && !appUrl.includes("localhost")
          ? `App URL: ${appUrl}`
          : "Set NEXT_PUBLIC_APP_URL and AUTH_URL to your HTTPS domain.",
      envKeys: ["NEXT_PUBLIC_APP_URL", "AUTH_URL"],
    },
    {
      id: "admin_chat",
      title: "Chat staffing (ADMIN_EMAILS + Resend)",
      status:
        adminEmails().length > 0 && isResendConfigured() ? "ready" : "pending",
      detail:
        adminEmails().length > 0 && isResendConfigured()
          ? `Notifying ${adminEmails().length} admin email(s) on new chats.`
          : "Set ADMIN_EMAILS and Resend (RESEND_API_KEY + RESEND_FROM_EMAIL).",
      envKeys: ["ADMIN_EMAILS", "RESEND_API_KEY", "RESEND_FROM_EMAIL", "ADMIN_SMS_TO"],
      href: "/admin/messages",
    },
    {
      id: "stripe",
      title: "Stripe membership billing",
      status: isStripeConfigured() && isStripeWebhookConfigured() ? "ready" : "pending",
      detail: isStripeConfigured()
        ? isStripeWebhookConfigured()
          ? "Stripe checkout + webhook secret configured."
          : "Stripe keys set — add STRIPE_WEBHOOK_SECRET for webhooks."
        : "Set STRIPE_SECRET_KEY, STRIPE_PLUS_PRICE_ID, STRIPE_WEBHOOK_SECRET.",
      envKeys: [
        "STRIPE_SECRET_KEY",
        "STRIPE_PLUS_PRICE_ID",
        "STRIPE_WEBHOOK_SECRET",
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      ],
      href: "/membership",
    },
    {
      id: "switch",
      title: "Live Smart Switch / PBM",
      status: process.env.SWITCH_API_URL ? "ready" : "pending",
      detail: process.env.SWITCH_API_URL
        ? `SWITCH_API_URL set · BIN ${process.env.TRUMPRX_BIN ?? "—"}`
        : "Register BIN/PCN/Group, then set SWITCH_API_URL (+ optional SWITCH_API_KEY).",
      envKeys: ["SWITCH_API_URL", "SWITCH_API_KEY", "TRUMPRX_BIN", "TRUMPRX_PCN", "TRUMPRX_GROUP"],
    },
    {
      id: "pricing",
      title: "Live pharmacy pricing feed",
      status:
        process.env.PRICING_PROVIDER === "external" &&
        Boolean(process.env.PRICING_API_URL)
          ? "ready"
          : "pending",
      detail:
        process.env.PRICING_PROVIDER === "external"
          ? "External pricing provider enabled."
          : "Using contracted network quotes. Set PRICING_PROVIDER=external + PRICING_API_URL for live feed.",
      envKeys: ["PRICING_PROVIDER", "PRICING_API_URL", "PRICING_API_KEY"],
    },
    {
      id: "alerts",
      title: "Price alert delivery (email/SMS)",
      status:
        isResendConfigured() || isTwilioConfigured() ? "ready" : "optional",
      detail: isResendConfigured()
        ? isTwilioConfigured()
          ? "Resend + Twilio ready."
          : "Resend ready (Twilio optional for SMS)."
        : "Optional — configure Resend and/or Twilio for alert delivery.",
      envKeys: [
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "TWILIO_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN",
        "TWILIO_FROM_NUMBER",
        "ALERTS_CRON_SECRET",
      ],
    },
    {
      id: "telehealth",
      title: "Telehealth / mail-order partners",
      status:
        process.env.TELEHEALTH_PARTNER_URL || process.env.MAIL_ORDER_PARTNER_URL
          ? "ready"
          : "optional",
      detail:
        process.env.TELEHEALTH_PARTNER_URL || process.env.MAIL_ORDER_PARTNER_URL
          ? "At least one fulfillment partner URL is set."
          : "Optional — CTAs stay hidden until URLs are set.",
      envKeys: ["TELEHEALTH_PARTNER_URL", "MAIL_ORDER_PARTNER_URL"],
    },
    {
      id: "sentry",
      title: "Error reporting (Sentry)",
      status: process.env.SENTRY_DSN ? "ready" : "optional",
      detail: process.env.SENTRY_DSN
        ? "SENTRY_DSN configured."
        : "Optional — set SENTRY_DSN for exception capture.",
      envKeys: ["SENTRY_DSN"],
    },
    {
      id: "legal",
      title: "Legal / brand counsel review",
      status: "manual",
      detail:
        "Counsel must review Terms, Privacy, and brand naming. Track completion on Launch Control.",
      href: "/admin/launch#legal",
    },
  ];

  const must = items.filter((i) =>
    [
      "auth_secret",
      "postgres",
      "https",
      "admin_chat",
      "stripe",
      "switch",
      "pricing",
      "legal",
    ].includes(i.id)
  );
  const autoMust = must.filter((i) => i.id !== "legal");
  const autoReady = autoMust.filter((i) => i.status === "ready").length;

  return {
    items,
    score: {
      ready: autoReady,
      total: autoMust.length,
      percent: Math.round((autoReady / Math.max(autoMust.length, 1)) * 100),
    },
    productionBlocked: autoMust.some((i) => i.status === "pending"),
  };
}
