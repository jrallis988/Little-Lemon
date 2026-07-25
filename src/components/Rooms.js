import { ROOMS } from "../data";

export default function Rooms() {
  return (
    <section className="section" id="rooms" aria-labelledby="rooms-title">
      <p className="section__eyebrow">Rooms</p>
      <h2 className="section__title" id="rooms-title">
        Simple stays with the ocean close.
      </h2>
      <p className="section__copy">
        Every room is cleaned daily, stocked with soft towels, and a short walk
        from the water.
      </p>

      <div className="rooms">
        {ROOMS.map((room) => (
          <article className="room" key={room.id}>
            <div className="room__media">
              <img src={room.image} alt={room.imageAlt} loading="lazy" />
            </div>
            <div className="room__body">
              <h3>{room.name}</h3>
              <p className="room__meta">{room.rate}</p>
              <p className="room__desc">{room.description}</p>
              <div className="room__actions">
                <a className="btn btn-ocean" href="#booking">
                  Book {room.name}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
