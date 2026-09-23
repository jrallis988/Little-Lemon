import { courses } from "./courses";
import { flattenNavLinks } from "./navigation";
import { programs } from "./programs";
import { eventItems, newsItems } from "./siteContent";

/** Flat searchable index across major site content */
export function buildSearchIndex() {
  const pages = flattenNavLinks().map((link) => ({
    type: "Page",
    title: link.label,
    summary: `Navigate to ${link.label}`,
    to: link.to,
  }));

  const programItems = programs.map((program) => ({
    type: "Program",
    title: program.title,
    summary: `${program.credential} · ${program.location || "Portsmouth"}`,
    to: `/academics/programs/${program.id}`,
  }));

  const courseItems = courses.map((course) => ({
    type: "Course",
    title: `${course.code} — ${course.title}`,
    summary: course.description,
    to: "/academics/course-descriptions",
  }));

  const news = newsItems.map((item) => ({
    type: "News",
    title: item.title,
    summary: item.summary,
    to: `/news/${item.id}`,
  }));

  const events = eventItems.map((item) => ({
    type: "Event",
    title: item.title,
    summary: `${item.date} · ${item.summary}`,
    to: `/events/${item.id}`,
  }));

  return [...pages, ...programItems, ...courseItems, ...news, ...events];
}

export function searchSite(query, limit = 40) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return buildSearchIndex()
    .map((item) => {
      const haystack = `${item.type} ${item.title} ${item.summary}`.toLowerCase();
      let score = 0;
      if (item.title.toLowerCase().includes(q)) score += 5;
      if (haystack.includes(q)) score += 2;
      q.split(/\s+/).forEach((token) => {
        if (haystack.includes(token)) score += 1;
      });
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
