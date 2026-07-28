import { useMemo } from "react"
import { AlertTriangle, Check, CreditCard, PackageCheck, Truck } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
import { PRODUCTS } from "@/data/products"
import { useCartStore } from "@/stores/cartStore"
import {
  useCheckoutStore,
  type CheckoutStep,
} from "@/stores/checkoutStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const PROMOS: Record<string, { label: string; percentOff: number }> = {
  FIND20: { label: "Extra 20% off", percentOff: 20 },
  HAPPY10: { label: "Welcome 10% off", percentOff: 10 },
}

const STEPS: { value: CheckoutStep; label: string }[] = [
  { value: 1, label: "Shipping" },
  { value: 2, label: "Payment" },
  { value: 3, label: "Review" },
]

function CheckoutProgress({ step }: { step: CheckoutStep }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Checkout progress">
      {STEPS.map((item) => (
        <li
          key={item.value}
          className={`border-t-2 pt-2 text-xs font-semibold ${
            item.value <= step
              ? "border-primary text-foreground"
              : "border-border text-muted-foreground"
          }`}
          aria-current={item.value === step ? "step" : undefined}
        >
          <span className="mr-1 tabular">{item.value}.</span>
          {item.label}
        </li>
      ))}
    </ol>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <label className="space-y-1.5 text-sm font-medium">
      <span>{label}</span>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required
      />
    </label>
  )
}

export function CheckoutPage() {
  useDocumentMeta({
    title: "Guest Checkout | Marshalls",
    description: "Complete your Marshalls guest checkout.",
  })

  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const clearCart = useCartStore((state) => state.clearCart)
  const shipping = useCheckoutStore((state) => state.shipping)
  const payment = useCheckoutStore((state) => state.payment)
  const step = useCheckoutStore((state) => state.step)
  const setShippingField = useCheckoutStore((state) => state.setShippingField)
  const setPaymentField = useCheckoutStore((state) => state.setPaymentField)
  const setStep = useCheckoutStore((state) => state.setStep)
  const completeOrder = useCheckoutStore((state) => state.completeOrder)

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const product = PRODUCTS.find((candidate) => candidate.id === item.productId)
        if (!product) return []
        const colorway = product.colorways.find(
          (candidate) => candidate.id === item.colorwayId,
        )
        const selectedSize = product.sizes.find(
          (candidate) => candidate.label === item.size,
        )
        return [{ item, product, colorway, selectedSize }]
      }),
    [items],
  )

  if (items.length === 0) {
    return <Navigate to="/catalog" replace />
  }

  const hasOutOfStock =
    lines.length !== items.length ||
    lines.some(
      ({ product, selectedSize }) =>
        product.inventory === "out_of_stock" || selectedSize?.available !== true,
    )
  const promo = promoCode ? PROMOS[promoCode] : null
  const invalidPromo = Boolean(promoCode && !promo)
  const subtotal = lines.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  )
  const promoDiscount = promo ? subtotal * (promo.percentOff / 100) : 0
  const discountedSubtotal = Math.max(0, subtotal - promoDiscount)
  const shippingCost = subtotal >= 89 ? 0 : 8.99
  const tax = discountedSubtotal * 0.08875
  const total = discountedSubtotal + shippingCost + tax

  const placeOrder = () => {
    if (hasOutOfStock) return
    const order = {
      id: `MSH-${Date.now().toString().slice(-8)}`,
      placedAt: Date.now(),
      shipping: { ...shipping },
      lines: lines.map(({ item, product, colorway }) => ({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        image: product.images[0] ?? "",
        size: item.size,
        color: colorway?.name ?? item.colorwayId,
        quantity: item.quantity,
        price: product.price,
      })),
      subtotal,
      promoCode: promo ? promoCode : null,
      promoDiscount,
      shippingCost,
      tax,
      total,
    }
    completeOrder(order)
    clearCart()
    navigate("/order-confirmation")
  }

  return (
    <div className="shelf-container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            Secure guest checkout
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Checkout
          </h1>
        </div>

        <CheckoutProgress step={step} />

        {hasOutOfStock && (
          <div
            role="alert"
            className="mt-6 flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">An item in your bag is no longer available.</p>
              <p className="mt-1">
                Return to your bag and remove the sold-out item before placing your order.
              </p>
            </div>
          </div>
        )}

        {invalidPromo && (
          <div
            role="alert"
            className="mt-4 rounded-md border border-border bg-surface-muted p-4 text-sm"
          >
            Promo code <strong>{promoCode}</strong> is not valid and will not be
            applied. You can remove it from your bag.
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <section className="rounded-lg border border-border bg-surface p-5 shadow-soft md:p-7">
            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setStep(2)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold">Shipping details</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field
                      label="Full name"
                      name="name"
                      value={shipping.name}
                      onChange={(value) => setShippingField("name", value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={shipping.email}
                      onChange={(value) => setShippingField("email", value)}
                      autoComplete="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Street address"
                      name="address"
                      value={shipping.address}
                      onChange={(value) => setShippingField("address", value)}
                      autoComplete="street-address"
                    />
                  </div>
                  <Field
                    label="City"
                    name="city"
                    value={shipping.city}
                    onChange={(value) => setShippingField("city", value)}
                    autoComplete="address-level2"
                  />
                  <Field
                    label="State"
                    name="state"
                    value={shipping.state}
                    onChange={(value) => setShippingField("state", value)}
                    autoComplete="address-level1"
                  />
                  <Field
                    label="ZIP code"
                    name="zip"
                    value={shipping.zip}
                    onChange={(value) => setShippingField("zip", value)}
                    autoComplete="postal-code"
                  />
                </div>
                <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto">
                  Continue to payment
                </Button>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setStep(3)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold">Payment</h2>
                </div>
                <div className="rounded-md border border-sky-200 bg-sky-soft p-3 text-xs text-navy">
                  Demo checkout only — no payment is processed or collected.
                </div>
                <div className="mt-5 space-y-4">
                  <label className="block space-y-1.5 text-sm font-medium">
                    <span>Card number</span>
                    <Input
                      value={payment.cardNumber}
                      readOnly
                      aria-describedby="demo-card-help"
                    />
                    <span
                      id="demo-card-help"
                      className="block text-xs font-normal text-muted-foreground"
                    >
                      A masked placeholder is used for this demo.
                    </span>
                  </label>
                  <Field
                    label="Name on card"
                    name="nameOnCard"
                    value={payment.nameOnCard}
                    onChange={(value) => setPaymentField("nameOnCard", value)}
                    autoComplete="cc-name"
                  />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" size="lg">
                    Review order
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <PackageCheck className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold">Review your order</h2>
                </div>
                <ul className="divide-y divide-border">
                  {lines.map(({ item, product, colorway }) => (
                    <li
                      key={`${item.productId}-${item.size}-${item.colorwayId}`}
                      className="flex gap-3 py-4 first:pt-0"
                    >
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-24 w-20 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {product.brand}
                        </p>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {colorway?.name} · Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold tabular">
                        {formatCurrency(product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-md bg-surface-muted p-4 text-sm">
                  <p className="font-semibold">{shipping.name}</p>
                  <p className="text-muted-foreground">
                    {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}
                  </p>
                  <p className="mt-1 text-muted-foreground">{shipping.email}</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={placeOrder}
                    disabled={hasOutOfStock}
                  >
                    Place demo order
                  </Button>
                </div>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-lg border border-border bg-surface p-5 shadow-soft lg:sticky lg:top-[calc(var(--chrome-offset)+1rem)]">
            <h2 className="font-display text-lg font-bold">Order summary</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular">{formatCurrency(subtotal)}</dd>
              </div>
              {promo && (
                <div className="flex justify-between text-primary">
                  <dt>{promo.label} ({promoCode})</dt>
                  <dd className="tabular">−{formatCurrency(promoDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping estimate</dt>
                <dd className="tabular">
                  {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated tax (8.875%)</dt>
                <dd className="tabular">{formatCurrency(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <dt>Total</dt>
                <dd className="tabular">{formatCurrency(total)}</dd>
              </div>
            </dl>
            {subtotal < 89 && (
              <p className="mt-4 text-xs text-muted-foreground">
                Add {formatCurrency(89 - subtotal)} more for free shipping.
              </p>
            )}
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-[hsl(var(--inventory-in))]" />
              Free in-store returns
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
