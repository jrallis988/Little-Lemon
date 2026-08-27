import { getFeaturedBooks, getAuthorSpotlight } from "@/data/books";
import { Hero } from "@/components/home/Hero";
import { FeaturedReleases } from "@/components/home/FeaturedReleases";
import { FindBookTeaser } from "@/components/home/FindBookTeaser";
import { FallReadingWeekTeaser } from "@/components/home/FallReadingWeekTeaser";
import { EducatorTeaser } from "@/components/home/EducatorTeaser";
import { AuthorSpotlight } from "@/components/home/AuthorSpotlight";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  const featuredBooks = getFeaturedBooks();
  const spotlightBook = getAuthorSpotlight();

  return (
    <>
      <Hero />
      <FeaturedReleases books={featuredBooks} />
      <FindBookTeaser />
      <FallReadingWeekTeaser />
      <EducatorTeaser />
      {spotlightBook && <AuthorSpotlight book={spotlightBook} />}
      <NewsletterSignup />
    </>
  );
}
