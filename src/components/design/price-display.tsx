import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/pricing";

interface PriceDisplayProps {
  couponPrice: number;
  retailPrice?: number;
  savingsAmount?: number;
  savingsPercent?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showMembershipHint?: boolean;
}

/** Canonical price hierarchy: coupon biggest, retail struck, savings accent. */
export function PriceDisplay({
  couponPrice,
  retailPrice,
  savingsAmount,
  savingsPercent,
  size = "md",
  className,
  showMembershipHint = false,
}: PriceDisplayProps) {
  return (
    <div className={cn("text-right", className)}>
      <p
        className={cn(
          size === "lg" && "trx-price-lg",
          size === "md" && "trx-price-md",
          size === "sm" && "trx-price text-xl leading-none"
        )}
      >
        {formatCurrency(couponPrice)}
      </p>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
        with coupon
        {showMembershipHint ? " · free" : ""}
      </p>
      {typeof retailPrice === "number" && (
        <p className="trx-retail mt-1">{formatCurrency(retailPrice)}</p>
      )}
      {typeof savingsAmount === "number" && savingsAmount > 0 && (
        <p className="trx-save mt-0.5">
          Save {formatCurrency(savingsAmount)}
          {typeof savingsPercent === "number" ? ` (${savingsPercent}%)` : ""}
        </p>
      )}
    </div>
  );
}
