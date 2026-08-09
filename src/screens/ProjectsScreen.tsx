import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookMarked, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  formatCitation,
  useProjectsStore,
} from "@/stores/projectsStore";
import { useProfileStore } from "@/stores/profileStore";
import { ROUTES } from "@/routes/paths";
import type { CitationStyle } from "@/types";

/** Research projects list + active project workspace */
export function ProjectsScreen() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.getActiveProfile());
  const projects = useProjectsStore((s) => s.projects);
  const createProject = useProjectsStore((s) => s.createProject);
  const deleteProject = useProjectsStore((s) => s.deleteProject);
  const renameProject = useProjectsStore((s) => s.renameProject);
  const setCitationStyle = useProjectsStore((s) => s.setCitationStyle);
  const removeSource = useProjectsStore((s) => s.removeSource);
  const addNote = useProjectsStore((s) => s.addNote);
  const removeNote = useProjectsStore((s) => s.removeNote);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const mine = useMemo(
    () =>
      projects.filter((project) => project.profileId === (profile?.id ?? "")),
    [projects, profile?.id],
  );
  const active = mine.find((project) => project.id === projectId) ?? null;

  const onCreate = (event: FormEvent) => {
    event.preventDefault();
    if (!profile) return;
    const id = createProject({
      profileId: profile.id,
      title: title || "New research project",
      topic: title,
    });
    setTitle("");
    navigate(`/projects/${id}`);
  };

  if (!profile) {
    return (
      <section className="rounded-3xl bg-white/75 p-8 text-center shadow-soft">
        <p className="text-slate">Choose a student profile first.</p>
        <Button className="mt-4" onClick={() => navigate(ROUTES.profile)}>
          Open profiles
        </Button>
      </section>
    );
  }

  if (active) {
    return (
      <section className="animate-fade-in pb-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
              Research project
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
              {active.title}
            </h1>
            <p className="mt-1 text-sm text-slate">
              {active.sources.length} source
              {active.sources.length === 1 ? "" : "s"} · {active.notes.length}{" "}
              note{active.notes.length === 1 ? "" : "s"}
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate(ROUTES.projects)}>
            All projects
          </Button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <label className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-soft">
            <Label htmlFor="project-title">Project title</Label>
            <Input
              id="project-title"
              className="mt-2"
              value={active.title}
              onChange={(event) => renameProject(active.id, event.target.value)}
            />
          </label>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-soft">
            <Label>Citation style</Label>
            <div className="mt-2 flex gap-2">
              {(["mla", "apa"] as CitationStyle[]).map((style) => (
                <Button
                  key={style}
                  size="sm"
                  variant={active.citationStyle === style ? "default" : "secondary"}
                  onClick={() => setCitationStyle(active.id, style)}
                >
                  {style.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">
              Saved sources
            </h2>
            <div className="mt-3 space-y-3">
              {active.sources.length === 0 && (
                <p className="rounded-2xl bg-white/70 p-4 text-sm text-slate">
                  Save sources from academic search with “Save to project”.
                </p>
              )}
              {active.sources.map((source) => (
                <article
                  key={source.id}
                  className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-soft"
                >
                  <h3 className="font-semibold text-navy">{source.title}</h3>
                  <p className="mt-1 text-xs text-slate">{source.domain}</p>
                  <p className="mt-2 text-sm text-slate">{source.abstractText}</p>
                  <p className="mt-2 text-xs text-slate-deep">
                    {formatCitation(source, active.citationStyle)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `${ROUTES.article}?url=${encodeURIComponent(source.url)}`,
                        )
                      }
                    >
                      Open
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSource(active.id, source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-navy">
              Notes
            </h2>
            <form
              className="mt-3 space-y-2"
              onSubmit={(event) => {
                event.preventDefault();
                addNote(active.id, note);
                setNote("");
              }}
            >
              <Input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Write a research note in your own words…"
              />
              <Button type="submit" size="sm">
                Add note
              </Button>
            </form>
            <div className="mt-3 space-y-2">
              {active.notes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-white/80 p-3 text-sm text-slate shadow-soft"
                >
                  <p className="whitespace-pre-wrap">{item.body}</p>
                  <button
                    type="button"
                    className="text-slate hover:text-navy"
                    onClick={() => removeNote(active.id, item.id)}
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {active.sources.length > 0 && (
              <div className="mt-8 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-navy">
                  Citation list ({active.citationStyle.toUpperCase()})
                </h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate">
                  {active.sources.map((source) => (
                    <li key={source.id}>
                      {formatCitation(source, active.citationStyle)}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in pb-16">
      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Research
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Projects
        </h1>
        <p className="mt-3 text-slate">
          Collect trusted sources, take notes, and build a citation list for{" "}
          {profile.displayName}.
        </p>
      </header>

      <form
        onSubmit={onCreate}
        className="mb-8 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Project title (e.g. Plate Tectonics report)"
        />
        <Button type="submit">
          <Plus className="mr-1.5 h-4 w-4" />
          New project
        </Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {mine.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-soft transition hover:bg-white"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-mist text-navy">
              <BookMarked className="h-5 w-5" />
            </div>
            <h2 className="font-display text-xl font-semibold text-navy">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-slate">
              {project.sources.length} sources · {project.notes.length} notes
            </p>
          </Link>
        ))}
        {mine.length === 0 && (
          <p className="rounded-3xl bg-white/70 p-6 text-slate shadow-soft sm:col-span-2">
            No projects yet. Create one, then save sources from search results.
          </p>
        )}
      </div>

      {mine.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate">Manage</h3>
          <ul className="mt-2 space-y-2">
            {mine.map((project) => (
              <li
                key={`del-${project.id}`}
                className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2 text-sm"
              >
                <span className="text-navy">{project.title}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
