import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders motel brand and booking CTA", () => {
  render(<App />);
  expect(screen.getAllByText(/Saltline Motel/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /book a stay/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /book your room by the water/i })).toBeInTheDocument();
});
