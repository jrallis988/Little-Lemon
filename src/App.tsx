import { Navigate, Route, Routes } from "react-router-dom"
import { AppShell } from "@/components/layout/AppShell"
import { HomePage } from "@/pages/HomePage"
import { CatalogPage } from "@/pages/CatalogPage"
import { ProductDetailPage } from "@/pages/ProductDetailPage"

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
