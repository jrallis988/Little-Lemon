import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigationStore } from "@/stores/navigationStore";
import { ROUTES } from "@/routes/paths";
import { MILO_NAME } from "@/brand/identity";

/** Screen 3 — Article / Content View with reader-mode sanitizer */
export function ArticleScreen() {
  const article = useNavigationStore((s) => s.activeArticle);
  const setMiloOpen = useNavigationStore((s) => s.setMiloOpen);
  const navigate = useNavigate();

  if (!article) {
    return (
      <section className="rounded-3xl bg-white/75 p-10 text-center shadow-soft">
        <p className="text-slate">No article is open.</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.home)}>
          Back to Surf Search
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl animate-fade-in pb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-navy-mist px-3 py-1 text-xs font-semibold text-navy">
          <BookOpen className="h-3.5 w-3.5 text-ocean" />
          Reader mode · ~{article.estimatedMinutes} min
          {article.fetchedLive ? " · live fetch" : " · structured"}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setMiloOpen(true)}>
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {MILO_NAME}
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            Close
          </Button>
        </div>
      </div>

      <article className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-soft md:p-12">
        <style>{`
          .surf-reader header .source {
            color: #288CC1;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }
          .surf-reader h1 {
            font-family: Sora, sans-serif;
            font-size: clamp(1.75rem, 3vw, 2.35rem);
            color: #234197;
            line-height: 1.2;
            margin-bottom: 1.5rem;
          }
          .surf-reader h2 {
            font-family: Sora, sans-serif;
            font-size: 1.1rem;
            color: #234197;
            margin: 1.25rem 0 0.5rem;
          }
          .surf-reader p {
            color: hsl(215 16% 34%);
            line-height: 1.75;
            margin-bottom: 1rem;
            font-size: 1.05rem;
          }
          .surf-reader ul {
            margin: 0.5rem 0 1rem 1.25rem;
            color: hsl(215 16% 34%);
          }
          .surf-reader .citation,
          .surf-reader .source-link {
            font-size: 0.9rem;
            color: hsl(215 16% 40%);
          }
          .surf-reader .calm-note {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid hsl(215 18% 88%);
            color: hsl(215 16% 46%);
            font-size: 0.9rem;
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
    </section>
  );
}
