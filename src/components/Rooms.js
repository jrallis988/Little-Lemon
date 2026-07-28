import { useState } from "react";
import { ROOMS, SITE } from "../data";
import Picture from "./Picture";
import RoomModal from "./RoomModal";

export default function Rooms() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section" id="rooms" aria-labelledby="rooms-title">
      <p className="section__eyebrow">Rooms</p>
      <h2 className="section__title" id="rooms-title">
        Clean, comfortable rooms by the beach.
      </h2>
      <p className="section__copy">
        About {SITE.roomCount} rooms with air-conditioning, refrigerators,
        microwaves, cable, and free Wi‑Fi—steps from North Beach at Plaice Cove.{" "}
        {SITE.typicalRateNote}
      </p>

      <div className="rooms">
        {ROOMS.map((room) => (
          <article className="room" key={room.id}>
            <button
              type="button"
              className="room__media room__media-btn"
              onClick={() => setSelected(room)}
              aria-label={`View details for ${room.name}`}
            >
              <Picture src={room.image} alt={room.imageAlt} loading="lazy" />
            </button>
            <div className="room__body">
              <h3>{room.name}</h3>
              <p className="room__meta">
                {room.beds} · Sleeps {room.sleeps} · {room.rateLabel}
              </p>
              <p className="room__desc">{room.description}</p>
              <ul className="amenity-list amenity-list--compact">
                {room.amenities.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="room__actions">
                <a
                  className="btn btn-ocean"
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book {room.name}
                </a>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSelected(room)}
                >
                  View details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <RoomModal room={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
