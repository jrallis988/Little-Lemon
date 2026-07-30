import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand name in the hero", () => {
  render(<App />);
  expect(screen.getAllByText(/James Rallis/i).length).toBeGreaterThan(0);
});

test("renders contact form fields", () => {
  render(<App />);
  expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument();
});

test("renders Little Lemon case study", () => {
  render(<App />);
  expect(screen.getByText(/Little Lemon — booking without the clutter/i)).toBeInTheDocument();
});
