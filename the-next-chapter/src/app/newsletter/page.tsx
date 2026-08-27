import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The Next Chapter Newsletter — seasonal reading recommendations and publisher news.",
};

export default function NewsletterPage() {
  return (
    <ComingSoonPage
      title="The Next Chapter Newsletter"
      description="Three seasonal editions — September, October, and November — are coming in the next development phase."
    />
  );
}
