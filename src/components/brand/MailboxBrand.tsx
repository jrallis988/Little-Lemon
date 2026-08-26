import { cn } from "@/lib/utils";

export function MailboxLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src="/mailbox-mascot.png"
      alt=""
      width={size}
      height={size}
      className={cn("select-none object-contain", className)}
      draggable={false}
    />
  );
}

export function DoodleBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute left-6 top-8 size-8 text-brand/25"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.8 5.4L19 9.2l-5.2 1.8L12 16.4l-1.8-5.4L5 9.2l5.2-1.8L12 2z" />
      </svg>
      <svg
        className="absolute right-10 top-16 size-7 text-primary/20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M14 3l7 7-9 9H5v-7l9-9z" />
        <path d="M12 5l7 7" />
      </svg>
      <svg
        className="absolute bottom-20 left-10 size-8 text-pending/35"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M8 4h8v6a4 4 0 01-8 0V4z" />
        <path d="M6 20h12" />
        <path d="M12 14v6" />
      </svg>
      <svg
        className="absolute bottom-12 right-16 size-7 text-safe/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 8l-9 9-4-4" />
        <rect x="3" y="3" width="10" height="14" rx="1.5" />
      </svg>
    </div>
  );
}
