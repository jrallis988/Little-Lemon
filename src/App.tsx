import { AgeGate } from "./components/AgeGate";
import { Beers } from "./components/Beers";
import { Contact } from "./components/Contact";
import { Events } from "./components/Events";
import { Food } from "./components/Food";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Newsletter } from "./components/Newsletter";
import { ShopLoyalty } from "./components/ShopLoyalty";
import { Story } from "./components/Story";
import { Taproom } from "./components/Taproom";

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-buoy focus:px-3 focus:py-2 focus:text-foam"
      >
        Skip to content
      </a>
      <AgeGate />
      <Header />
      <main id="main">
        <Hero />
        <Beers />
        <Events />
        <Food />
        <Gallery />
        <Taproom />
        <ShopLoyalty />
        <Contact />
        <Newsletter />
        <Story />
      </main>
      <Footer />
    </div>
  );
}
