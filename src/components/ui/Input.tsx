import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-[5px] block text-sm font-bold text-text", className)}
    >
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-sm border-[1.5px] border-border bg-white px-[13px] py-2.5 font-sans text-base font-light text-text outline-none transition-[border-color] duration-150 placeholder:text-text-ghost focus:border-ocean",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      className={cn(
        "w-full rounded-sm border-[1.5px] border-border bg-white px-[13px] py-2.5 font-sans text-base font-light text-text outline-none transition-[border-color] duration-150 focus:border-ocean",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
