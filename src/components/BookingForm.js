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

async function submitInquiry(values) {
  const room = ROOMS.find((item) => item.id === values.room);
  const estimate = estimateTotal(values.room, values.checkIn, values.checkOut);
  const formspreeId = process.env.REACT_APP_FORMSPREE_ID;

  const payload = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    checkIn: values.checkIn,
    checkOut: values.checkOut,
    guests: values.guests,
    room: values.room,
    roomName: room?.name,
    notes: values.notes || "None",
    estimate: estimate
      ? `${estimate.nights} night(s) × ~$${estimate.rate} ≈ $${estimate.total}`
      : "n/a",
    _subject: `Seascape Inn inquiry: ${room?.name || "Room"}`,
  };

  if (formspreeId) {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(
        `We couldn’t send that request. Call ${SITE.phone} or email ${SITE.email}.`
      );
    }
    return { method: "formspree" };
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        _template: "table",
        _captcha: "false",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `We couldn’t send that request. Call ${SITE.phone} or email ${SITE.email}.`
    );
  }

  return { method: "formsubmit" };
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
      <p className="section__eyebrow">Contact</p>
      <h2 className="section__title" id="booking-title">
        Got a question?
      </h2>
      <p className="section__copy">
        Need more information about a stay, pets, or dates? Send a quick note and
        the front desk will follow up.
      </p>

      <div className="booking__layout">
        <div className="booking__panel">
          <h3 className="booking__panel-title">Send a message</h3>
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
                    <h3>Inquiry sent</h3>
                    <p>
                      Thanks, {status.summary.name}. We received your note and
                      will reply to {status.summary.email}.
                    </p>
                    <p>
                      For the fastest confirmation, also book online or call{" "}
                      {SITE.phone}.
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
                    {isSubmitting ? "Sending…" : "Send message"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <aside className="booking__aside">
          <p className="booking__note">
            Check-in from {SITE.checkIn} · Check-out by {SITE.checkOut} EST.
            Online bookings must be confirmed with the office.
          </p>
          <div className="booking__contact">
            <strong>Reach the front desk</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.addressShort}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
