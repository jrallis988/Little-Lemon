import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { track } from "@/lib/analytics"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Department } from "@/types"

type Answers = {
  department: Department | ""
  fit: "slim" | "regular" | "relaxed" | ""
  vibe: "elevated" | "casual" | "athletic" | ""
  budget: "under50" | "mid" | "splurge" | ""
}

const steps: {
  key: keyof Answers
  title: string
  options: { value: string; label: string; hint: string }[]
}[] = [
  {
    key: "department",
    title: "Who are we shopping for?",
    options: [
      { value: "Women", label: "Women", hint: "Dresses, denim, workwear" },
      { value: "Men", label: "Men", hint: "Tees, chinos, outerwear" },
      { value: "Kids", label: "Kids", hint: "Boys, girls, and baby finds" },
    ],
  },
  {
    key: "fit",
    title: "How do you like things to fit?",
    options: [
      { value: "slim", label: "Slim / tailored", hint: "Closer through the body" },
      { value: "regular", label: "Regular", hint: "Classic Marshalls fit" },
      { value: "relaxed", label: "Relaxed", hint: "Easy, room to move" },
    ],
  },
  {
    key: "vibe",
    title: "What’s the vibe?",
    options: [
      { value: "elevated", label: "Elevated", hint: "Office to dinner" },
      { value: "casual", label: "Casual", hint: "Weekends & errands" },
      { value: "athletic", label: "Athletic", hint: "Move & travel" },
    ],
  },
  {
    key: "budget",
    title: "Where should prices land?",
    options: [
      { value: "under50", label: "Under $50", hint: "Treasure-hunt steals" },
      { value: "mid", label: "$50–$100", hint: "Sweet-spot designer finds" },
      { value: "splurge", label: "$100+", hint: "Worth-it statement pieces" },
    ],
  },
]

function matchesDepartment(department: Department, answer: Department | "") {
  if (!answer) return true
  if (answer === "Kids") {
    return (
      department === "Kids" ||
      department === "Boys" ||
      department === "Girls" ||
      department === "Juniors"
    )
  }
  return department === answer
}

export function FitQuizPage() {
  useDocumentMeta({
    title: "Size & Fit Quiz | Marshalls",
    description: "Answer a few questions and get a Marshalls edit tailored to your fit.",
  })

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    department: "",
    fit: "",
    vibe: "",
    budget: "",
  })
  const [done, setDone] = useState(false)

  const current = steps[step]!

  const picks = useMemo(() => {
    if (!done) return []
    return PRODUCTS.filter((p) => {
      if (!matchesDepartment(p.department, answers.department)) return false
      if (answers.budget === "under50" && p.price >= 50) return false
      if (answers.budget === "mid" && (p.price < 50 || p.price > 100)) return false
      if (answers.budget === "splurge" && p.price < 100) return false
      if (answers.vibe === "elevated") {
        return (
          p.brandTier === "Designer" ||
          p.brandTier === "Contemporary" ||
          p.tags.some((t) => /work|linen|leather|tailor|occasion/i.test(t))
        )
      }
      if (answers.vibe === "athletic") {
        return (
          /shoe|sneaker|active|hoodie|fleece/i.test(p.category) ||
          p.tags.some((t) => /active|sneaker|fleece|sport/i.test(t))
        )
      }
      return true
    })
      .sort((a, b) => {
        const aScore = a.isNew ? 1 : 0
        const bScore = b.isNew ? 1 : 0
        return bScore - aScore || a.price - b.price
      })
      .slice(0, 8)
  }, [answers, done])

  function choose(value: string) {
    const key = current.key
    const next = { ...answers, [key]: value } as Answers
    setAnswers(next)
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
    } else {
      setDone(true)
      track("fit_quiz_complete", {
        department: next.department,
        fit: next.fit,
        vibe: next.vibe,
        budget: next.budget,
      })
    }
  }

  return (
    <div>
      <div className="shelf-container max-w-3xl py-10 md:py-14">
        <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
          Size & fit quiz
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
          Find your Marshalls fit
        </h1>
        <p className="mt-2 text-muted-foreground">
          Four quick questions. We’ll surface pieces that match how you actually dress.
        </p>

        {!done ? (
          <div className="mt-8">
            <div className="mb-4 flex gap-1" aria-hidden>
              {steps.map((_, i) => (
                <div
                  key={steps[i]!.key}
                  className={`h-1 flex-1 rounded-full ${
                    i <= step ? "bg-navy" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold text-foreground">{current.title}</h2>
            <div className="mt-4 grid gap-3" role="list">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => choose(opt.value)}
                  className="rounded-md border border-border bg-surface px-4 py-4 text-left shadow-soft transition hover:border-navy/40"
                >
                  <p className="font-semibold text-foreground">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.hint}</p>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-4 text-sm font-semibold text-navy underline-offset-2 hover:underline"
              >
                Back
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex items-start gap-3 rounded-md border border-navy/20 bg-sky-soft px-4 py-3">
              <Check className="mt-0.5 h-5 w-5 text-navy" />
              <div>
                <p className="font-semibold text-foreground">Your edit is ready</p>
                <p className="text-sm text-muted-foreground">
                  {answers.department} · {answers.fit} fit · {answers.vibe} ·{" "}
                  {answers.budget === "under50"
                    ? "under $50"
                    : answers.budget === "mid"
                      ? "$50–$100"
                      : "$100+"}
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {picks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {picks.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                No exact matches — try retaking with a wider budget.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={
                  answers.department
                    ? `/catalog?department=${encodeURIComponent(answers.department)}`
                    : "/catalog"
                }
                className="inline-flex h-10 items-center rounded-full bg-navy px-5 text-sm font-semibold text-navy-foreground no-underline"
              >
                Shop full {answers.department || "catalog"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setDone(false)
                  setStep(0)
                  setAnswers({ department: "", fit: "", vibe: "", budget: "" })
                }}
                className="inline-flex h-10 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold"
              >
                Retake quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
