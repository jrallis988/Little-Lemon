import About from "./components/About";
import BookingForm from "./components/BookingForm";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LiveRates from "./components/LiveRates";
import Location from "./components/Location";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import Rooms from "./components/Rooms";
import Shore from "./components/Shore";

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
        <Shore />
        <Reviews />
        <Location />
        <Faq />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
