import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import LiveRates from "./components/LiveRates";
import Shore from "./components/Shore";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Rooms />
        <LiveRates />
        <Shore />
        <Reviews />
        <Location />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
