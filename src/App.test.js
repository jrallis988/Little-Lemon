import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders River Valley brand in the hero", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByText(/River Valley Community College/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { name: /soar into your future/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /apply now/i })).toBeInTheDocument();
});

test("renders a program detail page", () => {
  render(
    <MemoryRouter initialEntries={["/programs/nursing"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /nursing — rn & lpn/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/pathway overview/i)).toBeInTheDocument();
});

test("renders financial aid page", () => {
  render(
    <MemoryRouter initialEntries={["/financial-aid"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /make college affordable/i })
  ).toBeInTheDocument();
});
