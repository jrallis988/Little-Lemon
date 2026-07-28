import { FindYourYear } from "../components/FindYourYear";
import { PageMeta } from "../components/PageMeta";

export function FindYourYearPage() {
  return (
    <main id="main-content">
      <PageMeta
        title="Find Your Year | Weight Watchers 63"
        description="Enter your birth year or journey year and see how your story sits inside Weight Watchers 63 — 63 Years of You."
        path="/find-your-year"
        image="/images/campaign/portrait-featured.jpg"
      />
      <FindYourYear />
    </main>
  );
}
