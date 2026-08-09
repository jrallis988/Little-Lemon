import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MemberScreen({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4 py-5", className)}>
      {eyebrow ? (
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-purple">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-1 font-display text-3xl tracking-tight text-pf-ink">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1.5 text-sm text-pf-ink/65">{subtitle}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function MemberCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-pf-line bg-white p-4 shadow-[0_8px_20px_-16px_rgba(61,9,88,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MemberLinkRow({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-pf-line bg-white px-3 py-3 transition hover:border-pf-purple"
    >
      {Icon ? (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pf-mist text-pf-purple">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-pf-ink">{label}</span>
        {description ? (
          <span className="block text-xs text-pf-ink/55">{description}</span>
        ) : null}
      </span>
      <ChevronRight className="h-4 w-4 text-pf-ink/35" aria-hidden />
    </Link>
  );
}

export function ComingSoonNote({ screen }: { screen: string }) {
  return (
    <p className="rounded-2xl bg-pf-purple-soft px-3 py-2 text-xs text-pf-purple">
      Scaffold for <span className="font-semibold">{screen}</span> — utility
      owned by the member app segment.
    </p>
  );
}
