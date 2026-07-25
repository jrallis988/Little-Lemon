import { Beers } from "./components/Beers";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Taproom } from "./components/Taproom";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Beers />
        <Taproom />
        <Story />
      </main>
      <Footer />
    </div>
  );
}
