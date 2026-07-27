import { FormEvent, useState } from "react";
import { BookMarked, FilePlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBrowserStore } from "@/stores/browserStore";
import { useProjectsStore } from "@/stores/projectsStore";

export function ProjectsScreen() {
  const projects = useProjectsStore((state) => state.projects);
  const createProject = useProjectsStore((state) => state.createProject);
  const addPageToProject = useProjectsStore((state) => state.addPageToProject);
  const activeTab = useBrowserStore((state) => state.getActiveTab());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onCreate = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    createProject(trimmed, description);
    setTitle("");
    setDescription("");
  };

  return (
    <section className="animate-fade-in space-y-8 pb-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Projects
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Research collections
        </h1>
        <p className="mt-3 text-slate">
          Save real pages, notes, highlights, and citations locally. Projects are
          empty until you create them.
        </p>
      </header>

      <form
        onSubmit={onCreate}
        className="max-w-2xl rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft"
      >
        <div className="mb-4 flex items-center gap-2 text-navy">
          <Plus className="h-5 w-5" />
          <h2 className="font-display text-xl font-semibold">Create project</h2>
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="project-title">Project title</Label>
            <Input
              id="project-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ocean habitats report"
            />
          </div>
          <div>
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional research goal"
            />
          </div>
          <Button type="submit">Create project</Button>
        </div>
      </form>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ocean/40 bg-white/60 p-10 text-center shadow-soft">
          <BookMarked className="mx-auto h-10 w-10 text-ocean" />
          <h2 className="mt-4 font-display text-2xl font-semibold text-navy">
            No projects yet
          </h2>
          <p className="mt-2 text-sm text-slate">
            Create a project, then add the current learning page from a web tab.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy">
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className="mt-2 text-sm text-slate">{project.description}</p>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!activeTab || activeTab.kind !== "web"}
                  onClick={() => {
                    if (!activeTab || activeTab.kind !== "web") return;
                    addPageToProject(project.id, {
                      title: activeTab.title,
                      url: activeTab.url,
                    });
                  }}
                >
                  <FilePlus className="mr-2 h-4 w-4" />
                  Add current page
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs text-slate">
                <Stat label="Pages" value={project.pages.length} />
                <Stat label="Notes" value={project.notes.length} />
                <Stat label="Highlights" value={project.highlights.length} />
                <Stat label="Citations" value={project.citations.length} />
              </div>

              <ul className="mt-5 space-y-2">
                {project.pages.length === 0 ? (
                  <li className="rounded-2xl bg-cream/70 px-3 py-2 text-sm text-slate">
                    No saved pages yet.
                  </li>
                ) : (
                  project.pages.slice(0, 5).map((page) => (
                    <li
                      key={page.id}
                      className="rounded-2xl bg-cream/70 px-3 py-2"
                    >
                      <p className="truncate text-sm font-semibold text-navy">
                        {page.title}
                      </p>
                      <p className="truncate text-xs text-slate">{page.url}</p>
                    </li>
                  ))
                )}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-cream/70 px-2 py-3">
      <p className="font-display text-xl font-semibold text-navy">{value}</p>
      <p>{label}</p>
    </div>
  );
}
