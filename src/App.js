import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import LabPage from "./pages/LabPage";
import EngineeringPage from "./pages/EngineeringPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";

function ProjectRoute() {
  const { slug } = useParams();
  return <ProjectPage slug={slug} />;
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/:slug" element={<ProjectRoute />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/engineering" element={<EngineeringPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
