import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AcademyRock from "./pages/AcademyRock";
import DisneyJrHub from "./pages/DisneyJrHub";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disney-jr" element={<DisneyJrHub />} />
        <Route path="/academy-rock" element={<AcademyRock />} />
      </Routes>
    </Layout>
  );
}

export default App;
