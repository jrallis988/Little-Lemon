import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ROOMS } from "../data";

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

const initialValues = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  room: ROOMS[0].id,
  guests: 2,
  notes: "",
};

export default function BookingForm() {
  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <p className="section__eyebrow">Reservations</p>
      <h2 className="section__title" id="booking-title">
        Book your room by the water.
      </h2>
      <p className="section__copy">
        Send a request and we’ll confirm availability within a few hours.
      </p>

      <div className="booking__layout">
        <div className="booking__panel">
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, helpers) => {
              helpers.setStatus({
                success: true,
                summary: values,
              });
              helpers.setSubmitting(false);
            }}
          >
            {({ isSubmitting, status, resetForm }) =>
              status?.success ? (
                <div className="success" role="status">
                  <h3>Request received</h3>
                  <p>
                    Thanks, {status.summary.name}. We’ll email{" "}
                    {status.summary.email} to confirm your{" "}
                    {ROOMS.find((room) => room.id === status.summary.room)?.name}{" "}
                    stay from {status.summary.checkIn} to {status.summary.checkOut}.
                  </p>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => resetForm({ values: initialValues, status: undefined })}
                  >
                    Make another request
                  </button>
                </div>
              ) : (
                <Form className="booking__form" noValidate>
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
                      />
                      <ErrorMessage className="field__error" component="div" name="checkIn" />
                    </div>
                    <div className="field">
                      <label htmlFor="checkOut">Check-out</label>
                      <Field
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        min={today()}
                      />
                      <ErrorMessage className="field__error" component="div" name="checkOut" />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="room">Room</label>
                    <Field id="room" name="room" as="select">
                      {ROOMS.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} — {room.rate}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage className="field__error" component="div" name="room" />
                  </div>

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
              )
            }
          </Formik>
        </div>

        <aside className="booking__aside">
          <p className="booking__note">
            Check-in from 3:00 PM · Check-out by 11:00 AM · Free cancellation up
            to 48 hours before arrival.
          </p>
          <div className="booking__contact">
            <strong>Prefer to call?</strong>
            <span>(831) 555-0148</span>
            <span>stay@saltlinemotel.com</span>
            <span>118 Shore Road, Seabreeze Cove</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
