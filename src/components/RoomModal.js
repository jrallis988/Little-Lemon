import { useEffect, useId, useRef } from "react";

export default function RoomModal({ room, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!room) return undefined;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close room details"
        >
          Close
        </button>

        <div className="modal__gallery">
          {room.gallery.map((shot) => (
            <img key={shot.src} src={shot.src} alt={shot.alt} />
          ))}
        </div>

        <div className="modal__body">
          <p className="section__eyebrow">Room details</p>
          <h2 id={titleId}>{room.name}</h2>
          <p className="room__meta">
            {room.rateLabel} · Sleeps {room.sleeps} · {room.size}
          </p>
          <p className="modal__copy">{room.description}</p>

          <ul className="amenity-list">
            {room.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="modal__actions">
            <a
              className="btn btn-primary"
              href={`#booking?room=${room.id}`}
              onClick={onClose}
            >
              Book {room.name}
            </a>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
