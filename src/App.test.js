import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders motel brand and booking CTA", () => {
  render(<App />);
  expect(screen.getAllByText(/Saltline Motel/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /book a stay/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /book your room by the water/i })).toBeInTheDocument();
});

test("renders reviews and location sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /why people come back/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /steps from the sand in seabreeze cove/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /open saltline motel location on openstreetmap/i })
  ).toBeInTheDocument();
});

test("renders room details controls", () => {
  render(<App />);
  expect(screen.getAllByRole("button", { name: /view details/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
});
