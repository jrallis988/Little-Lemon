import type { Metadata } from "next";
import { IntakeInbox } from "@/components/ops/IntakeInbox";

export const metadata: Metadata = {
  title: "Intake inbox",
  robots: { index: false, follow: false },
};

export default function OpsIntakePage() {
  return <IntakeInbox />;
}
