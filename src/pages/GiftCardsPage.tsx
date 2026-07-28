import { useState, type FormEvent } from "react"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { formatCurrency } from "@/lib/utils"

const AMOUNTS = [25, 50, 75, 100] as const

export function GiftCardsPage() {
  useDocumentMeta({
    title: "Gift Cards | Marshalls",
    description: "Marshalls gift cards — let them pick the finds.",
  })

  const [amount, setAmount] = useState<(typeof AMOUNTS)[number]>(50)
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [balanceCode, setBalanceCode] = useState("")
  const [balanceResult, setBalanceResult] = useState<string | null>(null)
  const [purchased, setPurchased] = useState(false)

  function buyCard(e: FormEvent) {
    e.preventDefault()
    setPurchased(true)
  }

  function checkBalance(e: FormEvent) {
    e.preventDefault()
    if (!balanceCode.trim()) return
    const seed = balanceCode.split("").reduce((n, c) => n + c.charCodeAt(0), 0)
    const remaining = ((seed % 20) + 1) * 5
    setBalanceResult(`Card ending ${balanceCode.slice(-4) || "0000"} · ${formatCurrency(remaining)} remaining`)
  }

  return (
    <div className="shelf-container py-8 md:py-12">
      <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
        <Gift className="h-3.5 w-3.5" /> Gifting
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-navy md:text-4xl">
        Gift cards
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        In case you wanna let them pick. Digital delivery for this prototype — no payment
        processed.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={buyCard}
          className="rounded-lg border border-border bg-surface p-5 shadow-soft"
        >
          <h2 className="font-display text-xl font-bold">Shop gift cards</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                className={
                  amount === value
                    ? "rounded-md border border-navy bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground"
                    : "rounded-md border border-border px-4 py-2 text-sm font-semibold hover:border-navy/40"
                }
              >
                {formatCurrency(value)}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="gift-to">
                To
              </label>
              <Input
                id="gift-to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="gift-from">
                From
              </label>
              <Input
                id="gift-from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full bg-navy hover:bg-navy/90">
            Add {formatCurrency(amount)} card
          </Button>
          {purchased && (
            <p className="mt-3 text-sm text-emerald-800">
              Gift card queued for {to} from {from}. (Demo only.)
            </p>
          )}
        </form>

        <form
          onSubmit={checkBalance}
          className="rounded-lg border border-border bg-surface-muted/40 p-5"
        >
          <h2 className="font-display text-xl font-bold">Check your balance</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a card or claim code to see a simulated remaining balance.
          </p>
          <Input
            value={balanceCode}
            onChange={(e) => setBalanceCode(e.target.value)}
            className="mt-4"
            placeholder="Card or claim code"
            aria-label="Gift card code"
          />
          <Button type="submit" variant="outline" className="mt-3">
            Check balance
          </Button>
          {balanceResult && (
            <p className="mt-3 text-sm font-semibold text-navy">{balanceResult}</p>
          )}
        </form>
      </div>
    </div>
  )
}
