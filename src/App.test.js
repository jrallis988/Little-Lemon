import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders motel brand and booking CTA", () => {
  render(<App />);
  expect(screen.getAllByText(/Seascape Inn/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /book a stay/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /book your room by the water/i })).toBeInTheDocument();
});

test("renders reviews and location sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /why guests choose seascape/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /steps from north beach in hampton, nh/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /open seascape inn location on openstreetmap/i })
  ).toBeInTheDocument();
});

test("renders real booking and contact details", () => {
  render(<App />);
  expect(screen.getAllByRole("button", { name: /view details/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /tripadvisor/i }).length).toBeGreaterThan(0);
  expect(
    screen.getByRole("link", { name: /check availability & book/i })
  ).toHaveAttribute("href", expect.stringContaining("rezstream.com"));
  expect(screen.getByText(/seascapeinn@hotmail.com/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /standard queen/i })).toBeInTheDocument();
});
