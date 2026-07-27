import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { createId } from "@/lib/utils";
import type { Citation, Highlight, Project, ProjectNote, ProjectPage } from "@/types";

type ProjectsState = {
  projects: Project[];
  createProject: (title: string, description?: string) => Project;
  addPageToProject: (projectId: string, page: Omit<ProjectPage, "id" | "addedAt">) => void;
  addNoteToProject: (projectId: string, text: string) => void;
  addHighlightToProject: (projectId: string, highlight: Omit<Highlight, "id" | "createdAt">) => void;
  addCitationToProject: (projectId: string, citation: Omit<Citation, "id">) => void;
};

function touch(project: Project): Project {
  return { ...project, updatedAt: new Date().toISOString() };
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      createProject: (title, description) => {
        const now = new Date().toISOString();
        const project: Project = {
          id: createId("project"),
          title: title.trim(),
          description: description?.trim() || undefined,
          pages: [],
          notes: [],
          highlights: [],
          citations: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ projects: [project, ...state.projects] }));
        return project;
      },
      addPageToProject: (projectId, page) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;
            if (project.pages.some((entry) => entry.url === page.url)) {
              return project;
            }
            return touch({
              ...project,
              pages: [
                {
                  ...page,
                  id: createId("page"),
                  addedAt: new Date().toISOString(),
                },
                ...project.pages,
              ],
            });
          }),
        })),
      addNoteToProject: (projectId, text) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) return project;
            const note: ProjectNote = {
              id: createId("note"),
              text,
              createdAt: new Date().toISOString(),
            };
            return touch({ ...project, notes: [note, ...project.notes] });
          }),
        })),
      addHighlightToProject: (projectId, highlight) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? touch({
                  ...project,
                  highlights: [
                    {
                      ...highlight,
                      id: createId("highlight"),
                      createdAt: new Date().toISOString(),
                    },
                    ...project.highlights,
                  ],
                })
              : project,
          ),
        })),
      addCitationToProject: (projectId, citation) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? touch({
                  ...project,
                  citations: [
                    { ...citation, id: createId("citation") },
                    ...project.citations,
                  ],
                })
              : project,
          ),
        })),
    }),
    { name: STORAGE_KEYS.projects },
  ),
);
