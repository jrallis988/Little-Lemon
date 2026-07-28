import { Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { HomePage } from "@/pages/HomePage"
import { CatalogPage } from "@/pages/CatalogPage"
import { ProductDetailPage } from "@/pages/ProductDetailPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage"
import { StoreFinderPage } from "@/pages/StoreFinderPage"
import { WishlistPage } from "@/pages/WishlistPage"
import { AccountPage } from "@/pages/AccountPage"
import { ShippingReturnsPage } from "@/pages/ShippingReturnsPage"
import { OrderStatusPage } from "@/pages/OrderStatusPage"
import { GiftCardsPage } from "@/pages/GiftCardsPage"
import { MerchLandingPage } from "@/pages/MerchLandingPage"
import { BagPage } from "@/pages/BagPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
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
  )
}
