import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import ProgramDetail from "./pages/ProgramDetail";
import AcademicResources from "./pages/academics/AcademicResources";
import AcademicCalendar from "./pages/academics/AcademicCalendar";
import CourseDescriptions from "./pages/academics/CourseDescriptions";
import CourseSchedule from "./pages/academics/CourseSchedule";
import AdmissionsHub from "./pages/admissions/AdmissionsHub";
import HowToApply from "./pages/admissions/HowToApply";
import Visit from "./pages/admissions/Visit";
import Tuition from "./pages/admissions/Tuition";
import FinancialAid from "./pages/admissions/FinancialAid";
import StudentExperience from "./pages/StudentExperience";
import Athletics from "./pages/Athletics";
import Workforce from "./pages/Workforce";
import About from "./pages/About";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Contact from "./pages/Contact";
import Directory from "./pages/Directory";
import Sitemap from "./pages/Sitemap";
import ContentPage from "./pages/ContentPage";
import { contentPagePaths } from "./data/pageContent";
import {
  academicsSectionNav,
  admissionsSectionNav,
  studentSectionNav,
  workforceSectionNav,
  aboutSectionNav,
  campusNav,
} from "./data/navigation";

function sectionFor(path) {
  if (path.startsWith("/academics")) return [academicsSectionNav, "Academics"];
  if (path.startsWith("/admissions")) return [admissionsSectionNav, "Admissions & Aid"];
  if (path.startsWith("/student-experience") || path === "/athletics") {
    return [studentSectionNav, "Student Experience"];
  }
  if (path.startsWith("/workforce")) return [workforceSectionNav, "Workforce"];
  if (path.startsWith("/about")) return [aboutSectionNav, "About"];
  if (path.startsWith("/campus") || path === "/events") {
    return [campusNav, "Campus"];
  }
  return [null, "Section"];
}

const contentRoutes = contentPagePaths.map((path) => {
  const [nav, label] = sectionFor(path);
  const routePath = path.replace(/^\//, "");
  return {
    path: routePath,
    element: (
      <ContentPage path={path} sectionNav={nav} sectionLabel={label} />
    ),
  };
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="academics/resources" element={<AcademicResources />} />
        <Route path="academics/calendar" element={<AcademicCalendar />} />
        <Route path="academics/course-descriptions" element={<CourseDescriptions />} />
        <Route path="academics/course-schedule" element={<CourseSchedule />} />
        <Route path="academics/programs/:programId" element={<ProgramDetail />} />
        <Route path="admissions" element={<AdmissionsHub />} />
        <Route path="admissions/how-to-apply" element={<HowToApply />} />
        <Route path="admissions/visit" element={<Visit />} />
        <Route path="admissions/tuition" element={<Tuition />} />
        <Route path="admissions/financial-aid" element={<FinancialAid />} />
        <Route path="student-experience" element={<StudentExperience />} />
        <Route path="athletics" element={<Athletics />} />
        <Route path="workforce" element={<Workforce />} />
        <Route path="about" element={<About />} />
        <Route path="news" element={<News />} />
        <Route path="news/:newsId" element={<NewsDetail />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="directory" element={<Directory />} />
        <Route path="sitemap" element={<Sitemap />} />
        {contentRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
