import { Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { HomePage } from "@/pages/HomePage"
import { CatalogPage } from "@/pages/CatalogPage"
import { ProductDetailPage } from "@/pages/ProductDetailPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
