import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Academics = lazy(() => import("./pages/Academics"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Admissions = lazy(() => import("./pages/Admissions"));
const FinancialAid = lazy(() => import("./pages/FinancialAid"));
const Campus = lazy(() => import("./pages/Campus"));
const Athletics = lazy(() => import("./pages/Athletics"));
const Workforce = lazy(() => import("./pages/Workforce"));
const Events = lazy(() => import("./pages/Events"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <section className="page-hero" aria-busy="true">
      <p className="eyebrow">NHTI</p>
      <h1>Loading…</h1>
      <p className="page-hero__lede">Bringing the next page into view.</p>
    </section>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="academics" element={<Academics />} />
          <Route path="academics/:programId" element={<ProgramDetail />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="financial-aid" element={<FinancialAid />} />
          <Route path="campus" element={<Campus />} />
          <Route path="athletics" element={<Athletics />} />
          <Route path="workforce" element={<Workforce />} />
          <Route path="events" element={<Events />} />
          <Route path="news" element={<News />} />
          <Route path="news/:newsId" element={<NewsDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
