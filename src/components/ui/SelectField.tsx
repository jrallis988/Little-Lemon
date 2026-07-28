"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "@/components/ui/Icons";

export function SelectField({
  value,
  onValueChange,
  placeholder = "Select…",
  options,
  "aria-label": ariaLabel,
  className,
  id,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  "aria-label"?: string;
  className?: string;
  id?: string;
}) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex w-full items-center justify-between gap-2 rounded-sm border-[1.5px] border-border bg-white px-[13px] py-2.5 font-sans text-base font-light text-text outline-none transition-[border-color] duration-150 focus:border-ocean data-[placeholder]:text-text-ghost",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <IconChevronDown className="h-4 w-4 text-ocean" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-[950] max-h-[280px] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-sm border border-border bg-white shadow-md"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="cursor-pointer rounded-sm px-3 py-2 text-sm font-light text-text outline-none data-[highlighted]:bg-ocean/10 data-[highlighted]:text-ocean data-[state=checked]:font-bold"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
