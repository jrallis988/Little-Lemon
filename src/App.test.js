import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand name in the hero", () => {
  render(<App />);
  expect(screen.getAllByText(/James Rallis/i).length).toBeGreaterThan(0);
});
