import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Join } from "./components/Join";
import { Modes } from "./components/Modes";
import { Pathways } from "./components/Pathways";
import { Tools } from "./components/Tools";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <Pathways />
        <Modes />
        <Tools />
        <Community />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
