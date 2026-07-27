import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CampaignPage } from "./pages/CampaignPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper text-ink">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/63" element={<CampaignPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
