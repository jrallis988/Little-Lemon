import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Work from "../components/Work";
import CaseStudy from "../components/CaseStudy";
import Playground from "../components/Playground";
import About from "../components/About";
import Bring from "../components/Bring";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

export default function Home() {
  const revealRef = useReveal();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "5rem";
  }, []);

  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return undefined;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <div ref={revealRef} className="min-h-screen bg-ink font-body">
      <Nav />
      <main>
        <Hero />
        <Work />
        <CaseStudy />
        <Playground />
        <About />
        <Bring />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
