import { Link } from "react-router-dom";
import { campusHighlights, events } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

const gallery = [
  {
    src: "/media/campus-hero.jpg",
    alt: "NHTI campus quad with Student Center rotunda",
  },
  {
    src: "/media/student-life-shirts.jpg",
    alt: "NHTI students holding Lynx spirit shirts in the campus gymnasium",
  },
  {
    src: "/media/residence.jpg",
    alt: "Langley Hall arcade on the NHTI campus",
  },
];

function Campus() {
  usePageMeta({
    title: "Campus Life",
    description:
      "Residence halls, student life, clubs, and Lynx athletics on NHTI's 240-acre Concord campus.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Campus life</p>
        <h1>A full college experience on the Merrimack</h1>
        <p className="page-hero__lede">
          Live, learn, and compete on a 240-acre campus in New Hampshire&apos;s
          capital city — complete with residence halls, lynx athletics, and a
          lively student community.
        </p>
      </section>

      <section className="section student-life-feature" aria-label="Student life">
        <div className="student-life-feature__copy">
          <p className="eyebrow">Student life</p>
          <h2>Show up. Make friends. Wear the Lynx.</h2>
          <p>
            Orientation, clubs, spirit nights, and everyday hangouts in the
            Student Center — campus life at NHTI is built for belonging.
          </p>
          <Link to="/athletics" className="text-link">
            Explore Lynx athletics
          </Link>
        </div>
        <figure className="student-life-feature__media">
          <img
            src="/media/student-life-shirts.jpg"
            alt="Three NHTI students in the gymnasium holding navy Lynx spirit shirts"
            loading="lazy"
          />
        </figure>
      </section>

      <section className="campus-feature" aria-label="NHTI campus film">
        <video
          className="campus-feature__video"
          controls
          playsInline
          poster="/media/campus-hero-poster.jpg"
          preload="metadata"
        >
          <source src="/media/campus-hero-web.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="gallery" aria-label="Campus moments">
        {gallery.map((image) => (
          <figure key={image.src} className="gallery__item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="section">
        <div className="highlight-media-grid">
          {campusHighlights.map((item) => (
            <article key={item.title} className="highlight-media">
              <img src={item.image} alt="" loading="lazy" />
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="news-head">
          <h2>Upcoming on campus</h2>
          <Link to="/events" className="text-link">
            All events
          </Link>
        </div>
        <div className="event-list event-list--compact">
          {events.slice(0, 3).map((event) => (
            <article key={event.id} className="event-item">
              <div className="event-item__date">
                <time dateTime={event.date}>{event.displayDate}</time>
                <span>{event.time}</span>
              </div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>Come see it for yourself</h2>
          <p>
            From I-93 Exit 15 East to I-393 Exit 1 — follow the signs to 31
            College Drive, Concord.
          </p>
          <div className="hero__actions">
            <Link to="/admissions" className="btn btn--solid">
              Plan a visit
            </Link>
            <a
              className="btn btn--ghost"
              href="https://ccsnhmaps.college-tour.com/maps/map.php?ID=6"
              target="_blank"
              rel="noreferrer"
            >
              Virtual tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Campus;
