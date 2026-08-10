import { lazy } from "react"

/**
 * Central lazy page imports for the Marshalls prototype.
 * AppShell wraps all consumer-facing routes in App.tsx.
 */

export const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
)
export const DesignSystemPage = lazy(() =>
  import("@/pages/DesignSystemPage").then((m) => ({ default: m.DesignSystemPage })),
)
export const CatalogPage = lazy(() =>
  import("@/pages/CatalogPage").then((m) => ({ default: m.CatalogPage })),
)
export const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })),
)
export const DepartmentLandingPage = lazy(() =>
  import("@/pages/DepartmentLandingPage").then((m) => ({
    default: m.DepartmentLandingPage,
  })),
)
export const FitQuizPage = lazy(() =>
  import("@/pages/FitQuizPage").then((m) => ({ default: m.FitQuizPage })),
)
export const MerchLandingPage = lazy(() =>
  import("@/pages/MerchLandingPage").then((m) => ({ default: m.MerchLandingPage })),
)
export const StoreFinderPage = lazy(() =>
  import("@/pages/StoreFinderPage").then((m) => ({ default: m.StoreFinderPage })),
)
export const WishlistPage = lazy(() =>
  import("@/pages/WishlistPage").then((m) => ({ default: m.WishlistPage })),
)
export const AccountPage = lazy(() =>
  import("@/pages/AccountPage").then((m) => ({ default: m.AccountPage })),
)
export const GiftCardsPage = lazy(() =>
  import("@/pages/GiftCardsPage").then((m) => ({ default: m.GiftCardsPage })),
)
export const ShippingReturnsPage = lazy(() =>
  import("@/pages/ShippingReturnsPage").then((m) => ({
    default: m.ShippingReturnsPage,
  })),
)
export const OrderStatusPage = lazy(() =>
  import("@/pages/OrderStatusPage").then((m) => ({ default: m.OrderStatusPage })),
)
export const BagPage = lazy(() =>
  import("@/pages/BagPage").then((m) => ({ default: m.BagPage })),
)
export const CheckoutPage = lazy(() =>
  import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
)
export const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmationPage").then((m) => ({
    default: m.OrderConfirmationPage,
  })),
)
export const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
)

/** Canonical path map — mirrors the SCREEN registry */
export const ROUTE_MAP = {
  designSystem: "/design-system",
  home: "/",
  catalog: "/catalog",
  product: "/product/:slug",
  department: "/department/:slug",
  fitQuiz: "/fit-quiz",
  merch: "/shop/:slug",
  stores: "/stores",
  wishlist: "/wishlist",
  account: "/account",
  giftCards: "/gift-cards",
  shippingReturns: "/shipping-returns",
  orderStatus: "/order-status",
  bag: "/bag",
  checkout: "/checkout",
  orderConfirmation: "/order-confirmation",
} as const
