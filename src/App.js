import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import HubsPage from "./pages/HubsPage";
import GetSupportPage from "./pages/GetSupportPage";
import StoriesPage from "./pages/StoriesPage";
import PartnersPage from "./pages/PartnersPage";
import LeadershipPage from "./pages/LeadershipPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="hubs" element={<HubsPage />} />
        <Route path="get-support" element={<GetSupportPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
      </Route>
    </Routes>
  );
}

export default App;
