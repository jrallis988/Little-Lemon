import { lazy, Suspense, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { track } from "@/lib/analytics"

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
)
const CatalogPage = lazy(() =>
  import("@/pages/CatalogPage").then((m) => ({ default: m.CatalogPage })),
)
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })),
)
const CheckoutPage = lazy(() =>
  import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
)
const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmationPage").then((m) => ({
    default: m.OrderConfirmationPage,
  })),
)
const StoreFinderPage = lazy(() =>
  import("@/pages/StoreFinderPage").then((m) => ({ default: m.StoreFinderPage })),
)
const WishlistPage = lazy(() =>
  import("@/pages/WishlistPage").then((m) => ({ default: m.WishlistPage })),
)
const AccountPage = lazy(() =>
  import("@/pages/AccountPage").then((m) => ({ default: m.AccountPage })),
)
const ShippingReturnsPage = lazy(() =>
  import("@/pages/ShippingReturnsPage").then((m) => ({
    default: m.ShippingReturnsPage,
  })),
)
const OrderStatusPage = lazy(() =>
  import("@/pages/OrderStatusPage").then((m) => ({ default: m.OrderStatusPage })),
)
const GiftCardsPage = lazy(() =>
  import("@/pages/GiftCardsPage").then((m) => ({ default: m.GiftCardsPage })),
)
const MerchLandingPage = lazy(() =>
  import("@/pages/MerchLandingPage").then((m) => ({ default: m.MerchLandingPage })),
)
const BagPage = lazy(() =>
  import("@/pages/BagPage").then((m) => ({ default: m.BagPage })),
)
const DepartmentLandingPage = lazy(() =>
  import("@/pages/DepartmentLandingPage").then((m) => ({
    default: m.DepartmentLandingPage,
  })),
)
const FitQuizPage = lazy(() =>
  import("@/pages/FitQuizPage").then((m) => ({ default: m.FitQuizPage })),
)
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
)

function RouteFallback() {
  return (
    <div
      className="shelf-container flex min-h-[40vh] items-center justify-center py-16"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  )
}

function AnalyticsListener() {
  const location = useLocation()
  useEffect(() => {
    track("page_view", { path: location.pathname + location.search })
  }, [location.pathname, location.search])
  return null
}

export default function App() {
  return (
    <>
      <AnalyticsListener />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="department/:slug" element={<DepartmentLandingPage />} />
            <Route path="fit-quiz" element={<FitQuizPage />} />
            <Route path="stores" element={<StoreFinderPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="bag" element={<BagPage />} />
            <Route path="shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="order-status" element={<OrderStatusPage />} />
            <Route path="gift-cards" element={<GiftCardsPage />} />
            <Route path="shop/:slug" element={<MerchLandingPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
