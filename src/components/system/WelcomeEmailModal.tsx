import { useEffect, useState, type FormEvent } from "react"
import { useAccountStore } from "@/stores/accountStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const DISMISS_KEY = "marshalls-email-modal-dismissed"

export function WelcomeEmailModal() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const subscribeEmail = useAccountStore((s) => s.subscribeEmail)

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return
    } catch {
      return
    }
    const id = window.setTimeout(() => setOpen(true), 1800)
    return () => window.clearTimeout(id)
  }, [])

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    subscribeEmail(email)
    setDone(true)
    try {
      localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      /* ignore */
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? dismiss() : setOpen(next))}>
      <DialogContent className="max-w-md rounded-none border-border p-6 sm:rounded-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold italic text-navy">
            Shipping&apos;s on us.
          </DialogTitle>
          <DialogDescription className="text-base text-navy/80">
            Sign up for email and your first order ships free.*
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="space-y-4">
            <p className="text-sm">You’re in — thanks for joining Marshalls email.</p>
            <Button className="w-full bg-navy hover:bg-navy/90" onClick={dismiss}>
              Start shopping
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="welcome-email" className="text-sm font-medium text-navy">
                Email Address <span className="text-primary">*</span>
              </label>
              <Input
                id="welcome-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 border-navy/40 focus-visible:ring-navy"
              />
            </div>
            <Button type="submit" className="w-full bg-navy hover:bg-navy/90">
              GET FREE SHIPPING
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-navy underline"
              onClick={dismiss}
            >
              I don&apos;t want free shipping
            </button>
            <p className="text-2xs leading-relaxed text-muted-foreground">
              By signing up you agree to our Terms of Use and Privacy Statement. Offer
              details subject to change.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
