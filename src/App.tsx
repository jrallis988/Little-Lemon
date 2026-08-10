import { Suspense, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { track } from "@/lib/analytics"
import {
  AccountPage,
  BagPage,
  CatalogPage,
  CheckoutPage,
  DepartmentLandingPage,
  DesignSystemPage,
  FitQuizPage,
  GiftCardsPage,
  HomePage,
  MerchLandingPage,
  NotFoundPage,
  OrderConfirmationPage,
  OrderStatusPage,
  ProductDetailPage,
  ShippingReturnsPage,
  StoreFinderPage,
  WishlistPage,
} from "@/routes"

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

/**
 * Routing map (21 core screens — see src/data/screens.ts)
 *
 * Global:     /design-system
 * Home:       /
 * Catalog:    /catalog
 * PDP:        /product/:slug
 * Department: /department/:slug
 * Fit quiz:   /fit-quiz
 * Merch:      /shop/designer | /shop/under-50 | /shop/clearance
 * Utilities:  /stores /wishlist /account /gift-cards
 *             /shipping-returns /order-status
 * Commerce:   /bag /checkout /order-confirmation
 * Overlay:    SupportChat (AppShell)
 * Edge:       * → 404
 */
export default function App() {
  return (
    <>
      <AnalyticsListener />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="design-system" element={<DesignSystemPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="department/:slug" element={<DepartmentLandingPage />} />
            <Route path="fit-quiz" element={<FitQuizPage />} />
            <Route path="shop/:slug" element={<MerchLandingPage />} />
            <Route path="stores" element={<StoreFinderPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="gift-cards" element={<GiftCardsPage />} />
            <Route path="shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="order-status" element={<OrderStatusPage />} />
            <Route path="bag" element={<BagPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
