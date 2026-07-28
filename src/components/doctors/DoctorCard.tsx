import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconUser } from "@/components/ui/Icons";
import type { Doctor } from "@/lib/data/doctors";
import { cn } from "@/lib/cn";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const profileHref = `/find-a-doctor/${doctor.slug}`;

  return (
    <article
      className={cn(
        "flex flex-col gap-s3 rounded-md border border-border bg-white p-s4 transition-all duration-ease hover:border-border-strong hover:shadow-sm",
        doctor.featured && "border-t-[3px] border-t-ocean",
      )}
      role="listitem"
      aria-label={doctor.name}
    >
      <Link href={profileHref} className="flex items-start gap-s3 no-underline">
        <div
          className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-surface-2"
          aria-hidden="true"
        >
          <IconUser className="text-text-meta" />
        </div>
        <div>
          <span className="mb-0.5 block text-base font-bold text-text">
            {doctor.name}
          </span>
          <span className="block text-sm font-light text-text-body">
            {doctor.title}
          </span>
        </div>
      </Link>

      <div className="flex flex-wrap gap-1">
        {doctor.tags.map((tag, i) => (
          <Badge
            key={tag}
            variant={i === doctor.tags.length - 1 ? "gray" : "ocean"}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-[5px]">
        <span
          className={cn(
            "h-[7px] w-[7px] shrink-0 rounded-full",
            doctor.acceptingNewPatients ? "bg-green" : "bg-text-meta",
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "text-xs font-semibold",
            doctor.acceptingNewPatients
              ? "text-success-text"
              : "text-text-meta",
          )}
        >
          {doctor.acceptingNewPatients
            ? `Accepting new patients${
                doctor.languages.length > 1
                  ? ` · Speaks ${doctor.languages.join(", ")}`
                  : ""
              }`
            : "Not currently accepting new patients"}
        </span>
      </div>

      {doctor.acceptingNewPatients ? (
        <Button href="/appointments/request" variant="primary" fullWidth>
          Request an Appointment
        </Button>
      ) : (
        <Button href="/appointments/request" variant="outline" fullWidth>
          Join Waitlist
        </Button>
      )}

      <Link
        href={profileHref}
        className="block text-center text-sm font-semibold text-ocean no-underline hover:underline"
        aria-label={`View full profile for ${doctor.name}`}
      >
        View full profile
      </Link>
    </article>
  );
}
