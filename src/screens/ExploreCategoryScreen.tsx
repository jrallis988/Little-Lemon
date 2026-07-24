import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCategoryById } from "@/data/curatedContent";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";

/** Screen 5 — Explore Drill-Down via React routing */
export function ExploreCategoryScreen() {
  const { categoryId = "" } = useParams();
  const category = getCategoryById(categoryId);
  const { search, goHome } = useUrlInterceptor();

  if (!category) {
    return (
      <section className="rounded-3xl bg-white/75 p-10 text-center shadow-soft">
        <p className="text-slate">That explore path wasn’t found.</p>
        <Button className="mt-4" onClick={goHome}>
          Back to Surf Search
        </Button>
      </section>
    );
  }

  return (
    <section className="animate-fade-in pb-16">
      <div
        className="mb-8 h-2 w-24 rounded-full"
        style={{ backgroundColor: category.accent }}
      />
      <h1 className="font-display text-4xl font-semibold text-navy">
        {category.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate">{category.description}</p>

      <div className="mt-10 max-w-xl rounded-3xl border border-white/60 bg-white/75 p-6 shadow-soft">
        <p className="text-sm font-medium text-slate-deep">Suggested search</p>
        <p className="mt-2 font-display text-2xl text-navy">
          “{category.searchPrompt}”
        </p>
        <p className="mt-3 text-sm text-slate">
          This opens Surf Search with curated educational results — never a
          content feed.
        </p>
        <Button
          className="mt-6"
          size="lg"
          onClick={() => search(category.searchPrompt)}
        >
          Search this theme
        </Button>
      </div>
    </section>
  );
}
