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
