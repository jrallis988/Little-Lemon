"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { PHOTO_OFFERS } from "@/lib/data/stores";
import { useSelectedStore } from "@/lib/store/store-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PhotoOrderForm() {
  const { store } = useSelectedStore();
  const [offerId, setOfferId] = useState<string>(PHOTO_OFFERS[0].id);
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!fileName) {
      setError("Choose a photo file to upload.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter an email for pickup notifications.");
      return;
    }
    const id = `PH-${Date.now().toString().slice(-6)}`;
    setConfirmation(id);
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-health/25 bg-surface-elevated/90 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 size-7 text-health" aria-hidden />
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Photo order submitted
            </h2>
            <p className="mt-2 text-muted-foreground">
              Order #{confirmation} · pickup at {store.name}. Files stay on your
              device in this demo.
            </p>
          </div>
        </div>
        <Button className="mt-6" variant="outline" onClick={() => setConfirmation(null)}>
          Place another order
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-border/80 bg-surface-elevated/90 p-6"
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        Start a photo order
      </h2>
      <div className="space-y-2">
        <Label htmlFor="offer">Offer</Label>
        <select
          id="offer"
          className="flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
          value={offerId}
          onChange={(event) => setOfferId(event.target.value)}
        >
          {PHOTO_OFFERS.map((offer) => (
            <option key={offer.id} value={offer.id}>
              {offer.title}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo-file">Upload photos</Label>
        <Input
          id="photo-file"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            const files = event.target.files;
            setFileName(
              files && files.length > 0
                ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
                : null,
            );
          }}
        />
        {fileName ? (
          <p className="text-xs text-muted-foreground">{fileName}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="qty">Quantity / sets</Label>
          <Input
            id="qty"
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo-email">Email</Label>
          <Input
            id="photo-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Pickup store: <span className="font-medium text-foreground">{store.name}</span>
      </p>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        className="bg-brand text-brand-foreground hover:bg-brand/90"
      >
        Submit photo order
      </Button>
    </form>
  );
}
