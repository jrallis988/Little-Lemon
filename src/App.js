import About from "./components/About";
import Analytics from "./components/Analytics";
import BookingForm from "./components/BookingForm";
import CookieConsent from "./components/CookieConsent";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LiveRates from "./components/LiveRates";
import Location from "./components/Location";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import Rooms from "./components/Rooms";
import Shore from "./components/Shore";
import WinterStay from "./components/WinterStay";

function App() {
  return (
    <div className="App">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Rooms />
        <LiveRates />
        <WinterStay />
        <Shore />
        <Reviews />
        <Location />
        <Faq />
        <BookingForm />
      </main>
      <Footer />
      <CookieConsent />
      <Analytics />
    </div>
  );
}

export default App;
