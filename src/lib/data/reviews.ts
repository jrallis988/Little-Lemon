import type { ProductReview } from "@/lib/types";

export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productId: "p-101",
    author: "Maya R.",
    rating: 5,
    title: "Everyday staple",
    body: "Thick without feeling greasy. Pickup was ready in under an hour.",
    postedAt: "2026-06-12",
  },
  {
    id: "rev-2",
    productId: "p-101",
    author: "Chris P.",
    rating: 4,
    title: "Great for dry winter skin",
    body: "A little goes a long way. Wish the jar were easier to travel with.",
    postedAt: "2026-05-02",
  },
  {
    id: "rev-3",
    productId: "p-102",
    author: "Elena L.",
    rating: 5,
    title: "Easy daily vitamin",
    body: "Softgels are easy to swallow. Member price made stocking up worth it.",
    postedAt: "2026-07-01",
  },
  {
    id: "rev-4",
    productId: "p-103",
    author: "Jordan L.",
    rating: 5,
    title: "No white cast",
    body: "Wear this under makeup daily. Same-day pickup saved a beach trip.",
    postedAt: "2026-07-18",
  },
  {
    id: "rev-5",
    productId: "p-104",
    author: "Sam K.",
    rating: 4,
    title: "Works fast",
    body: "Reliable for headaches. Keep a box in the travel kit.",
    postedAt: "2026-04-22",
  },
  {
    id: "rev-6",
    productId: "p-107",
    author: "Priya N.",
    rating: 5,
    title: "Kids actually like these",
    body: "Gummies taste fine and the bottle lasted our whole family trip.",
    postedAt: "2026-06-30",
  },
];

export function getReviewsForProduct(productId: string): ProductReview[] {
  return PRODUCT_REVIEWS.filter((review) => review.productId === productId);
}
