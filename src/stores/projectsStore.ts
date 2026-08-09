import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { createId } from "@/lib/utils";
import type {
  CitationStyle,
  ResearchNote,
  ResearchProject,
  ResearchSource,
} from "@/types";

type ProjectsState = {
  projects: ResearchProject[];
  activeProjectId: string | null;
  setActiveProject: (id: string | null) => void;
  createProject: (input: {
    profileId: string;
    title: string;
    topic?: string;
  }) => string;
  renameProject: (id: string, title: string) => void;
  deleteProject: (id: string) => void;
  setCitationStyle: (id: string, style: CitationStyle) => void;
  addSource: (
    projectId: string,
    source: Omit<ResearchSource, "id" | "addedAt">,
  ) => void;
  removeSource: (projectId: string, sourceId: string) => void;
  addNote: (
    projectId: string,
    body: string,
    sourceId?: string,
  ) => void;
  removeNote: (projectId: string, noteId: string) => void;
  getProject: (id: string) => ResearchProject | undefined;
  projectsForProfile: (profileId: string) => ResearchProject[];
};

function touch(project: ResearchProject): ResearchProject {
  return { ...project, updatedAt: new Date().toISOString() };
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      setActiveProject: (id) => set({ activeProjectId: id }),
      createProject: ({ profileId, title, topic }) => {
        const id = createId("project");
        const now = new Date().toISOString();
        const project: ResearchProject = {
          id,
          profileId,
          title: title.trim() || "Untitled project",
          topic: (topic ?? title).trim(),
          createdAt: now,
          updatedAt: now,
          sources: [],
          notes: [],
          citationStyle: "mla",
        };
        set((state) => ({
          projects: [project, ...state.projects],
          activeProjectId: id,
        }));
        return id;
      },
      renameProject: (id, title) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? touch({ ...project, title: title.trim() || project.title })
              : project,
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          activeProjectId:
            state.activeProjectId === id ? null : state.activeProjectId,
        })),
      setCitationStyle: (id, style) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? touch({ ...project, citationStyle: style }) : project,
          ),
        })),
      addSource: (projectId, source) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;
            if (project.sources.some((item) => item.url === source.url)) {
              return project;
            }
            const next: ResearchSource = {
              ...source,
              id: createId("source"),
              addedAt: new Date().toISOString(),
            };
            return touch({
              ...project,
              sources: [next, ...project.sources],
            });
          }),
        })),
      removeSource: (projectId, sourceId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? touch({
                  ...project,
                  sources: project.sources.filter((s) => s.id !== sourceId),
                  notes: project.notes.filter((n) => n.sourceId !== sourceId),
                })
              : project,
          ),
        })),
      addNote: (projectId, body, sourceId) => {
        const trimmed = body.trim();
        if (!trimmed) return;
        const note: ResearchNote = {
          id: createId("note"),
          body: trimmed,
          createdAt: new Date().toISOString(),
          sourceId,
        };
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? touch({ ...project, notes: [note, ...project.notes] })
              : project,
          ),
        }));
      },
      removeNote: (projectId, noteId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? touch({
                  ...project,
                  notes: project.notes.filter((note) => note.id !== noteId),
                })
              : project,
          ),
        })),
      getProject: (id) => get().projects.find((project) => project.id === id),
      projectsForProfile: (profileId) =>
        get().projects.filter((project) => project.profileId === profileId),
    }),
    { name: STORAGE_KEYS.projects },
  ),
);

export function formatCitation(
  source: Pick<ResearchSource, "title" | "publisher" | "url" | "citation">,
  style: CitationStyle,
): string {
  if (source.citation?.trim()) {
    if (style === "apa" && !source.citation.includes("Retrieved")) {
      return `${source.citation} Retrieved from ${source.url}`;
    }
    return source.citation;
  }
  const publisher = source.publisher || source.url;
  if (style === "apa") {
    return `${publisher}. (${new Date().getFullYear()}). ${source.title}. ${source.url}`;
  }
  return `"${source.title}." ${publisher}, ${source.url}.`;
}
