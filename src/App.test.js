import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders White Mountains brand on the home page", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByAltText(/White Mountains Community College/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /White Mountains Community College/i,
    })
  ).toBeInTheDocument();
  const applyLinks = screen.getAllByRole("link", { name: /apply/i });
  expect(
    applyLinks.some(
      (link) => link.getAttribute("href") === "https://ccsnh.my.site.com/apply/"
    )
  ).toBe(true);

  await waitFor(() => {
    expect(document.title).toMatch(/Discover Your Path in the White Mountains/i);
  });
});

test("sets academics SEO title and syncs filter query params", async () => {
  render(
    <MemoryRouter
      initialEntries={[
        "/academics?category=health-sciences-and-services&campus=berlin",
      ]}
    >
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(document.title).toMatch(/Academic Programs & Degrees/i);
  });

  expect(screen.getByDisplayValue(/Health Sciences and Services/i)).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(/Berlin \(Main Campus\)/i)
  ).toBeInTheDocument();
});

test("renders 404 for unknown routes and invalid programs", async () => {
  const { unmount } = render(
    <MemoryRouter initialEntries={["/this-page-does-not-exist"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Page not found/i })
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(document.title).toMatch(/Page Not Found/i);
  });
  unmount();

  render(
    <MemoryRouter initialEntries={["/academics/programs/unknown-major"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Program not found/i })
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(document.title).toMatch(/Page Not Found/i);
  });
});

test("sets nursing program SEO title", async () => {
  render(
    <MemoryRouter initialEntries={["/academics/programs/nursing"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(document.title).toMatch(/Registered Nursing \(AS\) Program/i);
  });
});

test("site search finds nursing program results", async () => {
  render(
    <MemoryRouter initialEntries={["/search?q=nursing"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Find programs and pages/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^Nursing$/i })).toHaveAttribute(
    "href",
    "/academics/programs/nursing"
  );
  await waitFor(() => {
    expect(document.title).toMatch(/^Search \|/i);
  });
});

test("program pages include program specifics and accessible apply link", async () => {
  render(
    <MemoryRouter initialEntries={["/academics/programs/accounting"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Program specifics/i })
  ).toBeInTheDocument();
  expect(
    screen.getAllByText(/Credential: Associate in Science/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getAllByText(/opens in new window/i).length
  ).toBeGreaterThan(0);
});

test("footer includes student privacy legal link", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const privacy = screen.getByRole("link", { name: /Student Privacy \(FERPA\)/i });
  expect(privacy).toHaveAttribute(
    "href",
    "https://www.wmcc.edu/about/institutional-information/consumer-information/"
  );
});

test("visit page points to live events calendar without fabricated dates", () => {
  render(
    <MemoryRouter initialEntries={["/admissions/visit"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Campus Open Houses/i })
  ).toBeInTheDocument();
  expect(screen.queryByText(/October 15, 2026/i)).not.toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /events calendar/i }).length
  ).toBeGreaterThan(0);
});

test("sets open graph image and organization JSON-LD", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(
      document.querySelector('meta[property="og:image"]')?.getAttribute("content")
    ).toMatch(/campus-exterior\.jpg/);
  });
  expect(document.getElementById("wmcc-jsonld-org")).toBeTruthy();
  expect(document.getElementById("wmcc-jsonld-org").textContent).toMatch(
    /CollegeOrUniversity/
  );
});
