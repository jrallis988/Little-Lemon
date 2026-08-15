import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import HubsPage from "./pages/HubsPage";
import GetSupportPage from "./pages/GetSupportPage";
import StoriesPage from "./pages/StoriesPage";
import PartnersPage from "./pages/PartnersPage";
import LeadershipPage from "./pages/LeadershipPage";
import VolunteersPage from "./pages/VolunteersPage";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="hubs" element={<HubsPage />} />
        <Route path="get-support" element={<GetSupportPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="volunteers" element={<VolunteersPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="news" element={<NewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
