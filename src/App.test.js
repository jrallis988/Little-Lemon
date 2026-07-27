import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders Disney+ brand hubs including Disney Jr tile", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Disney\+/i).length).toBeGreaterThan(0);
  const jrHub = screen.getByLabelText(/Disney Jr\. brand hub/i);
  expect(jrHub).toBeInTheDocument();
  expect(jrHub).toHaveAttribute("href", "/disney-jr");
  expect(screen.getByLabelText(/^Disney brand hub$/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: /Academy Rock/i })).toBeInTheDocument();
});

test("brand row order places Disney Jr immediately after Disney", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  const brandRow = document.getElementById("brands");
  const hubs = [...brandRow.querySelectorAll("[data-brand-index]")];
  const order = hubs.map((el) => el.getAttribute("aria-label"));
  expect(order).toEqual([
    "Disney brand hub",
    "Disney Jr. brand hub",
    "Pixar brand hub",
    "Marvel brand hub",
    "Star Wars brand hub",
    "National Geographic brand hub",
  ]);
  expect(hubs[0].tabIndex).toBeLessThanOrEqual(0);
  expect(hubs[1].tabIndex).toBeLessThanOrEqual(0);
  expect(Number(hubs[0].dataset.brandIndex)).toBe(0);
  expect(Number(hubs[1].dataset.brandIndex)).toBe(1);
});

test("Disney Jr brand tile routes to standalone hub", () => {
  render(
    <MemoryRouter initialEntries={["/disney-jr"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1, name: /Disney\s*Jr/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Characters Kids Love/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Continuous Play/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Recently Watched/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Play Academy Rock/i })).toBeInTheDocument();
});

test("renders Academy Rock show page", () => {
  render(
    <MemoryRouter initialEntries={["/academy-rock"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1, name: /Academy Rock/i })).toBeInTheDocument();
  expect(screen.getAllByText(/First Day Jams/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("button", { name: /Play Episode 1/i })).toBeInTheDocument();
});
