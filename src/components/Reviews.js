import { REVIEWS } from "../data";

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <p className="section__eyebrow">Guest notes</p>
      <h2 className="section__title" id="reviews-title">
        Why people come back.
      </h2>
      <p className="section__copy">
        Quiet mornings, clean rooms, and a path that puts you on the sand before
        coffee cools.
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
