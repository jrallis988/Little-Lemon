import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import Shore from "./components/Shore";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Rooms />
        <Shore />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
