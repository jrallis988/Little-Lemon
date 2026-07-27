import { Beers } from "./components/Beers";
import { Events } from "./components/Events";
import { Food } from "./components/Food";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ShopLoyalty } from "./components/ShopLoyalty";
import { Story } from "./components/Story";
import { Taproom } from "./components/Taproom";

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-buoy focus:px-3 focus:py-2 focus:text-foam"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Beers />
        <Events />
        <Food />
        <Taproom />
        <ShopLoyalty />
        <Story />
      </main>
      <Footer />
    </div>
  );
}
