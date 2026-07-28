import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Focus from "./components/Focus";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useReveal from "./hooks/useReveal";

function App() {
  const revealRef = useReveal();

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "5rem";
  }, []);

  return (
    <div ref={revealRef} className="min-h-screen bg-ink font-body">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Focus />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
