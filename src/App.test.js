import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("renders motel brand and booking CTA", () => {
  render(<App />);
  expect(screen.getAllByText(/Seascape Inn/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /got a question/i })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /check availability/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/quick booking/i)).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /live rates/i }).length).toBeGreaterThan(0);
});

test("renders about, reviews, location, faq, and legal sections", () => {
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
    screen.getByRole("heading", { name: /questions before you book/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/how can i make a reservation/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /weekly & monthly winter stays/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /read guest reviews on tripadvisor/i })
  ).toBeInTheDocument();
  expect(screen.getAllByText(/^cookie policy$/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/^privacy policy$/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /cookies on this site/i })).toBeInTheDocument();
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
  expect(screen.getAllByText(/seascapeinn@hotmail.com/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /standard queen/i })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /check exact prices for your dates/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/about \$165–\$240 \/ night/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /check winter dates/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /open live calendar/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /send a message/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /see live rates & book/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /update calendar/i })).not.toBeInTheDocument();
  expect(screen.queryByTitle(/seascape inn live booking calendar/i)).not.toBeInTheDocument();
  expect(screen.getAllByText(/beach across the street/i).length).toBeGreaterThan(0);
});
