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
