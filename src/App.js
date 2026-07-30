import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import ProgramDetail from "./pages/ProgramDetail";
import Admissions from "./pages/Admissions";
import FinancialAid from "./pages/FinancialAid";
import Campus from "./pages/Campus";
import ResidenceLife from "./pages/ResidenceLife";
import Athletics from "./pages/Athletics";
import Workforce from "./pages/Workforce";
import Events from "./pages/Events";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="academics/:programId" element={<ProgramDetail />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="financial-aid" element={<FinancialAid />} />
        <Route path="campus" element={<Campus />} />
        <Route path="residence-life" element={<ResidenceLife />} />
        <Route path="athletics" element={<Athletics />} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="events" element={<Events />} />
        <Route path="news" element={<News />} />
        <Route path="news/:newsId" element={<NewsDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
