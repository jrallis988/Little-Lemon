import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { LibraryProvider } from "./library/LibraryContext";
import Home from "./pages/Home";
import AcademyRock from "./pages/AcademyRock";
import DisneyJrHub from "./pages/DisneyJrHub";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <LibraryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disney-jr" element={<DisneyJrHub />} />
          <Route path="/academy-rock" element={<AcademyRock />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Layout>
    </LibraryProvider>
  );
}

export default App;
