import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import {
  ROOMS,
  SITE,
  estimateTotal,
  isRoomAvailable,
} from "../data";

const today = () => new Date().toISOString().slice(0, 10);

const schema = Yup.object({
  name: Yup.string().trim().required("Please enter your name"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().trim().required("Phone number helps us confirm"),
  checkIn: Yup.string().required("Choose a check-in date"),
  checkOut: Yup.string()
    .required("Choose a check-out date")
    .test(
      "after-check-in",
      "Check-out must be after check-in",
      function afterCheckIn(value) {
        const { checkIn } = this.parent;
        if (!value || !checkIn) return true;
        return value > checkIn;
      }
    ),
  room: Yup.string()
    .required("Select a room")
    .test(
      "available",
      "Those dates are unavailable for this room — try another room or dates",
      function available(value) {
        const { checkIn, checkOut } = this.parent;
        if (!value || !checkIn || !checkOut || checkOut <= checkIn) return true;
        return isRoomAvailable(value, checkIn, checkOut);
      }
    ),
  guests: Yup.number()
    .min(1, "At least one guest")
    .max(6, "For larger groups, call the front desk")
    .required("How many guests?"),
  notes: Yup.string().max(400, "Keep notes under 400 characters"),
});

function roomFromHash() {
  if (typeof window === "undefined") return ROOMS[0].id;
  const hash = window.location.hash;
  const query = hash.includes("?") ? hash.split("?")[1] : "";
  const params = new URLSearchParams(query);
  const room = params.get("room");
  return ROOMS.some((item) => item.id === room) ? room : ROOMS[0].id;
}

function buildMailto(values) {
  const room = ROOMS.find((item) => item.id === values.room);
  const estimate = estimateTotal(values.room, values.checkIn, values.checkOut);
  const subject = encodeURIComponent(
    `Booking request: ${room?.name || "Room"} (${values.checkIn} → ${values.checkOut})`
  );
  const body = encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Room: ${room?.name}`,
      `Guests: ${values.guests}`,
      `Check-in: ${values.checkIn}`,
      `Check-out: ${values.checkOut}`,
      estimate
        ? `Estimate: ${estimate.nights} night(s) × $${estimate.rate} = $${estimate.total}`
        : null,
      values.notes ? `Notes: ${values.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

async function submitBooking(values) {
  const formspreeId = process.env.REACT_APP_FORMSPREE_ID;
  const room = ROOMS.find((item) => item.id === values.room);
  const estimate = estimateTotal(values.room, values.checkIn, values.checkOut);

  if (formspreeId) {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        roomName: room?.name,
        estimate,
        _subject: `Saltline booking: ${room?.name}`,
      }),
    });
    if (!response.ok) {
      throw new Error("We couldn’t send that request. Please try again or call us.");
    }
    return { method: "formspree" };
  }

  window.location.href = buildMailto(values);
  return { method: "mailto" };
}

export default function BookingForm() {
  const [roomId, setRoomId] = useState(roomFromHash);

  useEffect(() => {
    const sync = () => setRoomId(roomFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      room: roomId,
      guests: 2,
      notes: "",
    }),
    [roomId]
  );

  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <p className="section__eyebrow">Reservations</p>
      <h2 className="section__title" id="booking-title">
        Book your room by the water.
      </h2>
      <p className="section__copy">
        Check dates for availability, then send a request. We’ll confirm by email
        within a few hours.
      </p>

      <div className="booking__layout">
        <div className="booking__panel">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, helpers) => {
              try {
                const result = await submitBooking(values);
                helpers.setStatus({
                  success: true,
                  summary: values,
                  method: result.method,
                });
              } catch (error) {
                helpers.setStatus({
                  success: false,
                  error: error.message || "Something went wrong.",
                });
              } finally {
                helpers.setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, resetForm, values, setStatus }) => {
              const estimate = estimateTotal(
                values.room,
                values.checkIn,
                values.checkOut
              );
              const available =
                values.checkIn &&
                values.checkOut &&
                values.checkOut > values.checkIn
                  ? isRoomAvailable(values.room, values.checkIn, values.checkOut)
                  : null;

              if (status?.success) {
                return (
                  <div className="success" role="status">
                    <h3>Request ready</h3>
                    <p>
                      Thanks, {status.summary.name}.{" "}
                      {status.method === "formspree"
                        ? `We received your request and will email ${status.summary.email} to confirm.`
                        : `Your email draft to ${SITE.email} should be open — send it to finish the request.`}
                    </p>
                    <p>
                      {ROOMS.find((room) => room.id === status.summary.room)?.name}{" "}
                      from {status.summary.checkIn} to {status.summary.checkOut}.
                    </p>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() =>
                        resetForm({ values: initialValues, status: undefined })
                      }
                    >
                      Make another request
                    </button>
                  </div>
                );
              }

              return (
                <Form className="booking__form" noValidate>
                  {status?.error ? (
                    <div className="form-alert" role="alert">
                      {status.error}
                    </div>
                  ) : null}

                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="name">Full name</label>
                      <Field id="name" name="name" type="text" autoComplete="name" />
                      <ErrorMessage className="field__error" component="div" name="name" />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                      />
                      <ErrorMessage className="field__error" component="div" name="email" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="phone">Phone</label>
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                      />
                      <ErrorMessage className="field__error" component="div" name="phone" />
                    </div>
                    <div className="field">
                      <label htmlFor="guests">Guests</label>
                      <Field id="guests" name="guests" type="number" min="1" max="6" />
                      <ErrorMessage className="field__error" component="div" name="guests" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="checkIn">Check-in</label>
                      <Field
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        min={today()}
                        onFocus={() => setStatus(undefined)}
                      />
                      <ErrorMessage className="field__error" component="div" name="checkIn" />
                    </div>
                    <div className="field">
                      <label htmlFor="checkOut">Check-out</label>
                      <Field
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        min={values.checkIn || today()}
                        onFocus={() => setStatus(undefined)}
                      />
                      <ErrorMessage className="field__error" component="div" name="checkOut" />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="room">Room</label>
                    <Field id="room" name="room" as="select">
                      {ROOMS.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — {room.rateLabel}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage className="field__error" component="div" name="room" />
                  </div>

                  {available === true && estimate ? (
                    <p className="availability availability--ok" role="status">
                      Available · {estimate.nights} night
                      {estimate.nights === 1 ? "" : "s"} · estimated ${estimate.total}
                    </p>
                  ) : null}
                  {available === false ? (
                    <p className="availability availability--no" role="status">
                      Those dates are booked for this room. Pick another room or
                      shift your dates.
                    </p>
                  ) : null}

                  <div className="field">
                    <label htmlFor="notes">Notes (optional)</label>
                    <Field
                      id="notes"
                      name="notes"
                      as="textarea"
                      placeholder="Early check-in, crib, ground-floor preference…"
                    />
                    <ErrorMessage className="field__error" component="div" name="notes" />
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Request booking"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <aside className="booking__aside">
          <p className="booking__note">
            Check-in from {SITE.checkIn} · Check-out by {SITE.checkOut} · Free
            cancellation up to 48 hours before arrival.
          </p>
          <div className="booking__contact">
            <strong>Prefer to call?</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.addressShort}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
