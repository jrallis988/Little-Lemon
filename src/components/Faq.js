import { FAQ_SECTIONS, SITE } from "../data";

export default function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <p className="section__eyebrow">FAQ</p>
      <h2 className="section__title" id="faq-title">
        Questions before you book.
      </h2>
      <p className="section__copy">
        Reservations, policies, amenities, and getting here—answered in one
        place. Still unsure? Call{" "}
        <a className="text-link" href={SITE.phoneHref}>
          {SITE.phone}
        </a>
        .
      </p>

      <div className="faq__groups">
        {FAQ_SECTIONS.map((group) => (
          <div className="faq__group" key={group.id}>
            <h3 className="faq__group-title">{group.title}</h3>
            <div className="faq__list">
              {group.items.map((item) => (
                <details className="faq__item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
