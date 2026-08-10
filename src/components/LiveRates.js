import { useMemo, useState } from "react";
import {
  SITE,
  SEASONAL_RATES,
  buildBookingUrl,
  estimateTotal,
  nightsBetween,
} from "../data";

const today = () => new Date().toISOString().slice(0, 10);

function addDays(iso, days) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function LiveRates() {
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(addDays(today(), 2));
  const [guests, setGuests] = useState(2);

  const nights = nightsBetween(checkIn, checkOut);
  const sample = estimateTotal("queen", checkIn, checkOut);
  const bookingHref = useMemo(
    () => buildBookingUrl({ checkIn, checkOut, guests }),
    [checkIn, checkOut, guests]
  );
  const invalid = !checkIn || !checkOut || checkOut <= checkIn;

  return (
    <section className="section rates" id="rates" aria-labelledby="rates-title">
      <p className="section__eyebrow">Live rates</p>
      <h2 className="section__title" id="rates-title">
        Check exact prices for your dates.
      </h2>
      <p className="section__copy">
        Seasonal ranges below are a guide. Open the live calendar for unit-by-unit
        availability and final pricing. {SITE.typicalRateNote}
      </p>

      <ul className="season-list">
        {SEASONAL_RATES.map((season) => (
          <li key={season.id}>
            <strong>{season.name}</strong>
            <span className="season-list__when">{season.when}</span>
            <span className="season-list__range">{season.range}</span>
            <span className="season-list__note">{season.note}</span>
          </li>
        ))}
      </ul>

      <div className="rates__form">
        <div className="form-row">
          <div className="field">
            <label htmlFor="rates-checkIn">Check-in</label>
            <input
              id="rates-checkIn"
              type="date"
              min={today()}
              value={checkIn}
              onChange={(event) => {
                const next = event.target.value;
                setCheckIn(next);
                if (checkOut <= next) setCheckOut(addDays(next, 1));
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="rates-checkOut">Check-out</label>
            <input
              id="rates-checkOut"
              type="date"
              min={addDays(checkIn || today(), 1)}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="rates-guests">Guests</label>
            <input
              id="rates-guests"
              type="number"
              min="1"
              max="6"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value) || 1)}
            />
          </div>
        </div>

        <p className="rates__hint" role="status">
          {invalid
            ? "Choose a check-out date after check-in."
            : sample
              ? `${nights} night${nights === 1 ? "" : "s"} · rough estimate from ~$${sample.rate}/night ≈ $${sample.total} before taxes.`
              : "Pick dates to check live rates."}
        </p>

        <div className="rates__actions">
          {invalid ? (
            <button className="btn btn-primary" type="button" disabled>
              Open live calendar
            </button>
          ) : (
            <a
              className="btn btn-primary"
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
            >
              Open live calendar
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
