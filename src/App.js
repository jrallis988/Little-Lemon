import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import ProgramDetail from "./pages/ProgramDetail";
import AdmissionsHub from "./pages/admissions/AdmissionsHub";
import HowToApply from "./pages/admissions/HowToApply";
import Visit from "./pages/admissions/Visit";
import Tuition from "./pages/admissions/Tuition";
import FinancialAid from "./pages/admissions/FinancialAid";
import StudentExperience from "./pages/StudentExperience";
import Workforce from "./pages/Workforce";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Sitemap from "./pages/Sitemap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="academics/programs/:programId" element={<ProgramDetail />} />
        <Route path="admissions" element={<AdmissionsHub />} />
        <Route path="admissions/how-to-apply" element={<HowToApply />} />
        <Route path="admissions/visit" element={<Visit />} />
        <Route path="admissions/tuition" element={<Tuition />} />
        <Route path="admissions/financial-aid" element={<FinancialAid />} />
        <Route path="student-experience" element={<StudentExperience />} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="about" element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="sitemap" element={<Sitemap />} />
      </Route>
    </Routes>
  );
}

export default App;
