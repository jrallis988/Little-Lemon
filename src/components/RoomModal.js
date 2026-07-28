import { useEffect, useId, useRef } from "react";
import { SITE } from "../data";
import Picture from "./Picture";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function RoomModal({ room, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!room) return undefined;
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
        ref={dialogRef}
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
          {room.gallery.map((shot, index) => (
            <Picture
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="modal__body">
          <p className="section__eyebrow">Room details</p>
          <h2 id={titleId}>{room.name}</h2>
          <p className="room__meta">
            {room.beds} · Sleeps {room.sleeps} · {room.rateLabel}
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
              href={SITE.bookingUrl}
              target="_blank"
              rel="noreferrer"
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
