import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { OnboardingProvider } from "./context/OnboardingProvider";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { FindYourYearPage } from "./pages/FindYourYearPage";
import { HomePage } from "./pages/HomePage";
import { WhatsNextPage } from "./pages/WhatsNextPage";
import {
  AboutPage,
  InnovationPage,
  ProgramsPage,
  ResearchPage,
  StoriesPage,
} from "./pages/SupportingPages";

export default function App() {
  // Portfolio-static embed (`VITE_BASE=/ww63/dist/`) uses HashRouter so deep links
  // work without server rewrites. Standalone Vercel deploy keeps BrowserRouter.
  const embedded = import.meta.env.BASE_URL !== "/";
  const Router = embedded ? HashRouter : BrowserRouter;
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

  return (
    <Router basename={embedded ? undefined : basename}>
      <OnboardingProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-2xl focus:bg-white focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:font-semibold focus:text-ink focus:shadow-glow"
        >
          Skip to main content
        </a>
        <div className="min-h-screen bg-paper text-ink">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/63" element={<HomePage />} />
            <Route path="/find-your-year" element={<FindYourYearPage />} />
            <Route path="/whats-next" element={<WhatsNextPage />} />
            <Route path="/case-study" element={<CaseStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/innovation" element={<InnovationPage />} />
            <Route path="/research" element={<ResearchPage />} />
          </Routes>
          <Footer />
        </div>
      </OnboardingProvider>
    </Router>
  );
}
