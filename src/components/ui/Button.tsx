import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const variants = {
  primary:
    "bg-blue text-white border-blue hover:bg-nav-dark hover:border-nav-dark hover:text-white",
  ocean:
    "bg-ocean text-white border-ocean hover:bg-[#005f9e] hover:border-[#005f9e] hover:text-white",
  outline:
    "bg-transparent text-blue border-blue hover:bg-blue hover:text-white",
  "outline-ocean":
    "bg-transparent text-ocean border-ocean hover:bg-ocean hover:text-white",
  "ghost-white":
    "bg-transparent text-white/80 border-white/35 hover:bg-white/10 hover:text-white hover:border-white/60",
  emergency:
    "bg-emergency text-white border-emergency hover:bg-[#b80000] hover:border-[#b80000] hover:text-white",
} as const;

const sizes = {
  sm: "px-4 py-[7px] text-sm min-h-9",
  md: "px-[22px] py-[11px] text-base min-h-11",
  lg: "px-7 py-3.5 text-md min-h-12",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type Common = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Common &
  Omit<ComponentPropsWithoutRef<"button">, keyof Common> & {
    href?: undefined;
  };

type ButtonAsLink = Common &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof Common> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-s2 whitespace-nowrap rounded-sm border-2 font-bold leading-[1.3] transition-all duration-ease no-underline hover:no-underline",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
