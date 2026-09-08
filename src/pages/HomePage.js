import Hero from "../components/Hero";
import Impact from "../components/Impact";
import Mission from "../components/Mission";
import Pillars from "../components/Pillars";
import Wellbeing from "../components/Wellbeing";
import Approach from "../components/Approach";
import HubInside from "../components/HubInside";
import Voices from "../components/Voices";
import PartnersRow from "../components/PartnersRow";
import NewsSection from "../components/NewsSection";
import Join from "../components/Join";
import ContactForm from "../components/ContactForm";
import usePageMeta from "../hooks/usePageMeta";

function HomePage() {
  usePageMeta({
    title: null,
    description:
      "Civic Bound helps young people belong, learn, and thrive through neighborhood hubs, coaching, and mental wellbeing support.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <Mission />
      <Pillars />
      <Wellbeing />
      <Impact />
      <Approach />
      <HubInside />
      <Voices />
      <PartnersRow />
      <NewsSection />
      <Join />
      <section id="contact" className="section-pad bg-paper-soft">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow-accent">Stay close</p>
            <h2 className="display mt-5 text-3xl md:text-5xl">
              Share our concerns? Learn more.
            </h2>
            <p className="lede mt-5">
              Sign up for hub openings, parent resources, and ways to serve,
              give, or partner in your community.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm heading="Join the Civic Bound list" context="learn" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
