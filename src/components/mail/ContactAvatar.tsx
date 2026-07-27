import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import type { Contact } from "@/types/mail";
import { cn } from "@/lib/utils";

interface ContactAvatarProps {
  contact: Contact;
  size?: "sm" | "md" | "lg";
  showSafetyDot?: boolean;
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
};

export function ContactAvatar({
  contact,
  size = "md",
  showSafetyDot = true,
  className,
}: ContactAvatarProps) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <Avatar className={sizes[size]}>
        <AvatarFallback
          style={{ backgroundColor: contact.avatarColor }}
          className="text-white"
        >
          {contact.initials}
        </AvatarFallback>
      </Avatar>
      {showSafetyDot && contact.safety !== "unknown" && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-card"
          aria-hidden
        >
          <span className="h-2.5 w-2.5 rounded-full bg-safe" />
        </span>
      )}
      {showSafetyDot && contact.safety === "unknown" && (
        <span className="sr-only">
          <SafetyBadge level="unknown" />
        </span>
      )}
    </div>
  );
}
