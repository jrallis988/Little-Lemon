import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import { ROOMS, SITE, estimateTotal } from "../data";

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
  room: Yup.string().required("Select a room"),
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
    `Stay inquiry: ${room?.name || "Room"} (${values.checkIn} → ${values.checkOut})`
  );
  const body = encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Room interest: ${room?.name}`,
      `Guests: ${values.guests}`,
      `Check-in: ${values.checkIn}`,
      `Check-out: ${values.checkOut}`,
      estimate
        ? `Rough estimate (not a quote): ${estimate.nights} night(s) × ~$${estimate.rate} = ~$${estimate.total}`
        : null,
      values.notes ? `Notes: ${values.notes}` : null,
      "",
      "Sent from the Seascape Inn website inquiry form.",
    ]
      .filter((line) => line !== null)
      .join("\n")
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

async function submitInquiry(values) {
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
        _subject: `Seascape Inn inquiry: ${room?.name}`,
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
        Check live rates and availability on the inn’s booking system, then call{" "}
        {SITE.phone} to confirm. {SITE.typicalRateNote}
      </p>

      <div className="booking__live">
        <a
          className="btn btn-primary"
          href={SITE.bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          Check availability & book
        </a>
        <a className="btn btn-ghost" href="#rates">
          Pick dates for live rates
        </a>
        <a className="btn btn-ghost" href={SITE.phoneHref}>
          Call {SITE.phone}
        </a>
      </div>

      <div className="booking__layout">
        <div className="booking__panel">
          <h3 className="booking__panel-title">Or send a quick inquiry</h3>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={async (values, helpers) => {
              try {
                const result = await submitInquiry(values);
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

              if (status?.success) {
                return (
                  <div className="success" role="status">
                    <h3>Inquiry ready</h3>
                    <p>
                      Thanks, {status.summary.name}.{" "}
                      {status.method === "formspree"
                        ? `We received your note and will reply to ${status.summary.email}.`
                        : `Your email draft to ${SITE.email} should be open — send it to reach the inn.`}
                    </p>
                    <p>
                      For the fastest confirmation, also book or call via the
                      buttons above.
                    </p>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() =>
                        resetForm({ values: initialValues, status: undefined })
                      }
                    >
                      Send another inquiry
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
                    <label htmlFor="room">Room interest</label>
                    <Field id="room" name="room" as="select">
                      {ROOMS.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — {room.beds}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage className="field__error" component="div" name="room" />
                  </div>

                  {estimate ? (
                    <p className="availability availability--ok" role="status">
                      Rough estimate only: {estimate.nights} night
                      {estimate.nights === 1 ? "" : "s"} · about ${estimate.total}.
                      Live rates may differ.
                    </p>
                  ) : null}

                  <div className="field">
                    <label htmlFor="notes">Notes (optional)</label>
                    <Field
                      id="notes"
                      name="notes"
                      as="textarea"
                      placeholder="Pet dog under 40 lbs, early arrival, ground-floor preference…"
                    />
                    <ErrorMessage className="field__error" component="div" name="notes" />
                  </div>

                  <button className="btn btn-ocean" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : "Send inquiry"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <aside className="booking__aside">
          <p className="booking__note">
            Check-in from {SITE.checkIn} · Check-out by {SITE.checkOut} EST ·
            Online bookings must be confirmed with the office.
          </p>
          <div className="booking__contact">
            <strong>Prefer to call?</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.addressShort}</span>
            <a
              className="text-link"
              href={SITE.bookingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open RezStream booking
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
