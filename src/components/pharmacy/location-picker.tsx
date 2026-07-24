"use client";

import { useState } from "react";
import { Loader2, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocationStore } from "@/lib/store/location-store";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
  compact?: boolean;
  className?: string;
}

export function LocationPicker({ compact = false, className }: LocationPickerProps) {
  const location = useLocationStore((s) => s.location);
  const setZip = useLocationStore((s) => s.setZip);
  const requestBrowserGeolocation = useLocationStore(
    (s) => s.requestBrowserGeolocation
  );
  const [zipInput, setZipInput] = useState(location.zip);
  const [message, setMessage] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  async function onLocate() {
    setLocating(true);
    setMessage(null);
    const result = await requestBrowserGeolocation();
    setLocating(false);
    if (!result.ok) setMessage(result.message ?? "Could not get location.");
    else setMessage("Using your current location for pharmacy distances.");
  }

  function onApplyZip(e: React.FormEvent) {
    e.preventDefault();
    const ok = setZip(zipInput);
    setMessage(ok ? `Showing pharmacies near ${zipInput}` : "Enter a valid 5-digit ZIP.");
  }

  if (compact) {
    return (
      <form
        onSubmit={onApplyZip}
        className={cn("flex items-center gap-1.5", className)}
        aria-label="Update ZIP code"
      >
        <MapPin className="size-4 text-primary" aria-hidden />
        <Input
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          aria-label="ZIP code"
          className="h-8 w-[5.5rem] text-sm"
        />
        <Button type="submit" size="sm" variant="secondary">
          Go
        </Button>
      </form>
    );
  }

  return (
    <div className={cn("space-y-3 rounded-xl border border-border bg-card p-4", className)}>
      <div>
        <p className="text-sm font-semibold text-foreground">Your location</p>
        <p className="text-sm text-muted-foreground">{location.label}</p>
      </div>
      <form onSubmit={onApplyZip} className="flex flex-wrap items-end gap-2">
        <div className="min-w-[8rem] flex-1 space-y-1.5">
          <Label htmlFor="zip-input">ZIP code</Label>
          <Input
            id="zip-input"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="10001"
          />
        </div>
        <Button type="submit" variant="secondary">
          Update
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onLocate}
          disabled={locating}
          aria-label="Use my current location"
        >
          {locating ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Navigation />
          )}
          Near me
        </Button>
      </form>
      {message && (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
