import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders motel brand and booking CTA", () => {
  render(<App />);
  expect(screen.getAllByText(/Seascape Inn/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /book a stay/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /book your room by the water/i })).toBeInTheDocument();
});

test("renders about, reviews, and location sections", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /a north beach inn since 1953/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /why guests choose seascape/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /steps from north beach in hampton, nh/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /fun things to do nearby/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/portsmouth market square/i)).toBeInTheDocument();
  expect(
    screen.getByRole("region", {
      name: /interactive map of seascape inn in hampton, new hampshire/i,
    })
  ).toBeInTheDocument();
});

test("renders live rates, rooms, seasonal guide, and contact details", () => {
  render(<App />);
  expect(screen.getAllByRole("button", { name: /view details/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /tripadvisor/i }).length).toBeGreaterThan(0);
  expect(
    screen.getByRole("link", { name: /check availability & book/i })
  ).toHaveAttribute("href", expect.stringContaining("rezstream.com"));
  expect(screen.getAllByText(/seascapeinn@hotmail.com/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /standard queen/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /check exact prices for your dates/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/about \$165–\$240 \/ night/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /see live rates & book/i })
  ).toBeInTheDocument();
  expect(
    screen.getByTitle(/seascape inn live booking calendar/i)
  ).toBeInTheDocument();
  expect(screen.getAllByText(/beach across the street/i).length).toBeGreaterThan(0);
});
