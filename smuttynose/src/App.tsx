import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "./components/Analytics";
import { CartProvider } from "./context/CartContext";
import { BeKindPage } from "./pages/BeKindPage";
import { BeerDetailPage } from "./pages/BeerDetailPage";
import { BeersPage } from "./pages/BeersPage";
import { FinderPage } from "./pages/FinderPage";
import { HomePage } from "./pages/HomePage";
import { PrivateEventsPage } from "./pages/PrivateEventsPage";
import { ReleasesPage } from "./pages/ReleasesPage";
import { ShopPage } from "./pages/ShopPage";
import { VisitPage } from "./pages/VisitPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Analytics />
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeersPage />} />
          <Route path="/beers/:slug" element={<BeerDetailPage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/finder" element={<FinderPage />} />
          <Route path="/events/private" element={<PrivateEventsPage />} />
          <Route path="/be-kind" element={<BeKindPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
