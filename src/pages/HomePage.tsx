import { useSearchParams } from "react-router-dom";
import { AgeGate } from "../components/AgeGate";
import { Beers } from "../components/Beers";
import { CampusEventsEmbed } from "../components/CampusEventsEmbed";
import { Contact } from "../components/Contact";
import { Events } from "../components/Events";
import { Food } from "../components/Food";
import { Footer } from "../components/Footer";
import { Gallery } from "../components/Gallery";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { InstagramFeed } from "../components/InstagramFeed";
import { Newsletter } from "../components/Newsletter";
import { PageMeta } from "../components/PageMeta";
import { ShopLoyalty } from "../components/ShopLoyalty";
import { Story } from "../components/Story";
import { Taproom } from "../components/Taproom";
import { CartDrawer } from "../components/CartDrawer";

export function HomePage() {
  const [params] = useSearchParams();
  const menuOpen = params.get("menu") === "open";

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Smuttynose Brewing | Hampton, NH"
        description="New Hampshire craft beer since 1994. Visit Towle Farm in Hampton for the Backyard, restaurant, and what's pouring now."
        path="/"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-buoy focus:px-3 focus:py-2 focus:text-foam"
      >
        Skip to content
      </a>
      <AgeGate />
      <Header defaultMenuOpen={menuOpen} />
      <CartDrawer />
      <main id="main">
        <Hero />
        <Beers />
        <Events />
        <CampusEventsEmbed />
        <Food />
        <Gallery />
        <Taproom />
        <ShopLoyalty />
        <Contact />
        <Newsletter />
        <InstagramFeed />
        <Story />
      </main>
      <Footer />
    </div>
  );
}
