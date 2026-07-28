import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AppointmentWizard } from "@/components/appointments/AppointmentWizard";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description:
    "Request an appointment at Boston Children's Hospital — condition, insurance, location, and contact details.",
};

export default function AppointmentRequestPage() {
  return (
    <>
      <PageHero
        id="appt-heading"
        eyebrow="New patients"
        title="Request an Appointment"
        lead="Tell us what care you need, your insurance, and preferred location. This prototype generates a mock reference ticket — no real appointment is booked."
      />
      <AppointmentWizard />
    </>
  );
}
