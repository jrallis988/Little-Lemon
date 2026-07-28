import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { FindYourYearPage } from "./pages/FindYourYearPage";
import { HomePage } from "./pages/HomePage";
import {
  AboutPage,
  InnovationPage,
  ProgramsPage,
  ResearchPage,
  StoriesPage,
} from "./pages/SupportingPages";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper text-ink">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-your-year" element={<FindYourYearPage />} />
          <Route path="/63" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/research" element={<ResearchPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
