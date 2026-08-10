import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { BeerDetailPage } from "./pages/BeerDetailPage";
import { FinderPage } from "./pages/FinderPage";
import { HomePage } from "./pages/HomePage";
import { PrivateEventsPage } from "./pages/PrivateEventsPage";
import { ShopPage } from "./pages/ShopPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers/:slug" element={<BeerDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/finder" element={<FinderPage />} />
          <Route path="/events/private" element={<PrivateEventsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
