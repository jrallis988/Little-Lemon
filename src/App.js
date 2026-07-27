import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Approach from "./components/Approach";
import Impact from "./components/Impact";
import Join from "./components/Join";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Approach />
        <Impact />
        <Join />
      </main>
      <Footer />
    </div>
  );
}

export default App;
