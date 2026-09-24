import { useSearchParams } from "react-router-dom";
import { AgeGate } from "../components/AgeGate";
import { Beers } from "../components/Beers";
import { CartDrawer } from "../components/CartDrawer";
import { Contact } from "../components/Contact";
import { Events } from "../components/Events";
import { Food } from "../components/Food";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { InstagramFeed } from "../components/InstagramFeed";
import { Newsletter } from "../components/Newsletter";
import { PageMeta } from "../components/PageMeta";
import { ShopLoyalty } from "../components/ShopLoyalty";
import { SkipLink } from "../components/SkipLink";
import { Story } from "../components/Story";
import { Taproom } from "../components/Taproom";

export function HomePage() {
  const [params] = useSearchParams();
  const menuOpen = params.get("menu") === "open";

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Smuttynose Brewing | Hampton, NH"
        description="New Hampshire’s original craft brewery since 1994. Visit Towle Farm in Hampton for the Backyard, restaurant, and what’s pouring now."
        path="/"
      />
      <SkipLink />
      <AgeGate />
      <Header defaultMenuOpen={menuOpen} />
      <CartDrawer />
      <main id="main">
        <Hero />
        <Story />
        <Beers />
        <Events />
        <Food />
        <Taproom />
        <ShopLoyalty />
        <InstagramFeed />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
