import { REVIEWS, SITE } from "../data";

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <p className="section__eyebrow">Guest notes</p>
      <h2 className="section__title" id="reviews-title">
        Why guests choose Seascape.
      </h2>
      <p className="section__copy">
        Highlights from travelers on{" "}
        <a className="text-link" href={SITE.tripadvisorUrl} target="_blank" rel="noreferrer">
          TripAdvisor
        </a>
        —clean rooms, friendly help, and the beach across the street.
      </p>

      <p className="reviews__proof">
        <a
          className="reviews__badge"
          href={SITE.tripadvisorUrl}
          target="_blank"
          rel="noreferrer"
        >
          Read guest reviews on TripAdvisor
        </a>
      </p>

      <ul className="reviews__list">
        {REVIEWS.map((review) => (
          <li key={review.id}>
            <blockquote>
              <p>“{review.quote}”</p>
              <footer>
                <cite>{review.name}</cite>
                <span>{review.detail}</span>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
