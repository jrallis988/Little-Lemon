import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders River Valley brand and soar headline", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByRole("img", { name: /river valley community college/i }).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { name: /soar into your future/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /apply now/i })).toBeInTheDocument();
  expect(screen.getByText(/what’s happening/i)).toBeInTheDocument();
});

test("renders a rich program detail page", () => {
  render(
    <MemoryRouter initialEntries={["/programs/nursing"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /nursing — rn & lpn/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/typical length/i)).toBeInTheDocument();
  expect(screen.getByText(/before you begin/i)).toBeInTheDocument();
  expect(screen.getByText(/where this pathway can lead/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /plan a campus visit/i })).toBeInTheDocument();
});

test("filters programs by campus", () => {
  render(
    <MemoryRouter initialEntries={["/programs"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/showing/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /find the pathway/i })).toBeInTheDocument();
});

test("renders tuition estimate tools", () => {
  render(
    <MemoryRouter initialEntries={["/financial-aid"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/rough annual tuition calculator/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /school code 007560/i })
  ).toBeInTheDocument();
  expect(screen.getAllByText(/new hampshire resident/i).length).toBeGreaterThan(0);
});

test("renders expanded catalog pathways", () => {
  render(
    <MemoryRouter initialEntries={["/programs/medical-laboratory-technician"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /medical laboratory technician/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/selective admission:/i)).toBeInTheDocument();
});

test("renders CCSNH portal links on student life", () => {
  render(
    <MemoryRouter initialEntries={["/student-life"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("link", { name: /my rvcc/i }).length).toBeGreaterThan(0);
  expect(
    screen.getAllByRole("link", { name: /ccsnh online resources/i }).length
  ).toBeGreaterThan(0);
});
