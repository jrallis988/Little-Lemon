import { useMemo, useState } from "react";
import { buildBookingUrl } from "../data";

const today = () => new Date().toISOString().slice(0, 10);

function addDays(iso, days) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function BookingBar() {
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(addDays(today(), 2));
  const [guests, setGuests] = useState(2);

  const invalid = !checkIn || !checkOut || checkOut <= checkIn;
  const bookingHref = useMemo(
    () => buildBookingUrl({ checkIn, checkOut, guests }),
    [checkIn, checkOut, guests]
  );

  return (
    <div className="booking-bar" aria-label="Quick booking">
      <form
        className="booking-bar__form"
        onSubmit={(event) => {
          event.preventDefault();
          if (invalid) return;
          window.open(bookingHref, "_blank", "noopener,noreferrer");
        }}
      >
        <p className="booking-bar__label">
          <span>Book your</span>
          <strong>stay</strong>
        </p>

        <div className="booking-bar__fields">
          <div className="booking-bar__field">
            <label htmlFor="bar-checkIn">Check-in</label>
            <input
              id="bar-checkIn"
              type="date"
              min={today()}
              value={checkIn}
              onChange={(event) => {
                const next = event.target.value;
                setCheckIn(next);
                if (checkOut <= next) setCheckOut(addDays(next, 1));
              }}
              required
            />
          </div>

          <div className="booking-bar__field">
            <label htmlFor="bar-checkOut">Check-out</label>
            <input
              id="bar-checkOut"
              type="date"
              min={addDays(checkIn || today(), 1)}
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              required
            />
          </div>

          <div className="booking-bar__field booking-bar__field--guests">
            <label htmlFor="bar-guests">Guests</label>
            <input
              id="bar-guests"
              type="number"
              min="1"
              max="6"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value) || 1)}
              required
            />
          </div>
        </div>

        <div className="booking-bar__actions">
          <button className="btn btn-primary" type="submit" disabled={invalid}>
            Check availability
          </button>
          <a className="booking-bar__rates" href="#rates">
            Live rates
          </a>
        </div>
      </form>
      {invalid ? (
        <p className="booking-bar__hint" role="status">
          Choose a check-out after check-in.
        </p>
      ) : (
        <p className="booking-bar__hint">
          Opens the live booking calendar with your dates.
        </p>
      )}
    </div>
  );
}
