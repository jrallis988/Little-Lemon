import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Campus from "./pages/Campus";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="campus" element={<Campus />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
