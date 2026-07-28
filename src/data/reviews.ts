import type { ProductQuestion, ProductReview } from "@/types"

/** Mock review bank — assigned by hashing product id for stable PDP content. */
const REVIEW_POOL: ProductReview[] = [
  {
    id: "r1",
    author: "Megan T.",
    rating: 5,
    title: "Wow price, looks expensive",
    body: "Quality feels way above what I paid. Fit is true to size and the fabric held up after washing.",
    date: "2026-06-12",
    verified: true,
    helpful: 18,
  },
  {
    id: "r2",
    author: "Jordan P.",
    rating: 4,
    title: "Great find — grab it fast",
    body: "Exactly as pictured. Wish there were more sizes left in my store, but online checkout was easy.",
    date: "2026-05-28",
    verified: true,
    helpful: 9,
  },
  {
    id: "r3",
    author: "Alicia R.",
    rating: 5,
    title: "Designer look for less",
    body: "Got so many compliments. Compare-at was wild — Marshalls came through again.",
    date: "2026-07-02",
    verified: true,
    helpful: 24,
  },
  {
    id: "r4",
    author: "Chris M.",
    rating: 3,
    title: "Nice, runs slightly small",
    body: "Liked the style. Sized up and it was perfect. Color is a touch brighter in person.",
    date: "2026-04-19",
    verified: false,
    helpful: 6,
  },
  {
    id: "r5",
    author: "Priya S.",
    rating: 5,
    title: "Everyday staple",
    body: "Soft, flattering, and pairs with everything. Already looking for another color.",
    date: "2026-06-30",
    verified: true,
    helpful: 11,
  },
  {
    id: "r6",
    author: "Sam K.",
    rating: 4,
    title: "Solid pickup option",
    body: "Reserved in store and it was ready the same day. Packaging was clean and item was tagged correctly.",
    date: "2026-07-08",
    verified: true,
    helpful: 7,
  },
]

const QUESTION_POOL: ProductQuestion[] = [
  {
    id: "q1",
    question: "Does this run true to size?",
    asker: "Taylor",
    answer:
      "Most shoppers say yes. If you’re between sizes, size up for a more relaxed fit.",
    answeredBy: "Marshalls Style Team",
    date: "2026-06-01",
  },
  {
    id: "q2",
    question: "Can I return this in store?",
    asker: "Alex",
    answer:
      "Yes — bring your receipt or order confirmation for an in-store return within 30 days.",
    answeredBy: "Marshalls Customer Care",
    date: "2026-05-14",
  },
  {
    id: "q3",
    question: "Is the compare-at price realistic?",
    asker: "Riley",
    answer:
      "Compare-at reflects the brand’s suggested retail when we received the goods. Actual savings vary by market.",
    answeredBy: "Marshalls Customer Care",
    date: "2026-04-22",
  },
]

function hashId(id: string) {
  return id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
}

export function getReviewsForProduct(productId: string): ProductReview[] {
  const start = hashId(productId) % REVIEW_POOL.length
  return [0, 1, 2].map((offset) => {
    const review = REVIEW_POOL[(start + offset) % REVIEW_POOL.length]!
    return { ...review, id: `${productId}-${review.id}` }
  })
}

export function getQuestionsForProduct(productId: string): ProductQuestion[] {
  const start = hashId(productId) % QUESTION_POOL.length
  return [0, 1].map((offset) => {
    const question = QUESTION_POOL[(start + offset) % QUESTION_POOL.length]!
    return { ...question, id: `${productId}-${question.id}` }
  })
}

export function averageRating(reviews: ProductReview[]) {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}
