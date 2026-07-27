import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders City Year brand", () => {
  render(<App />);
  expect(screen.getAllByText(/City/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Year/i).length).toBeGreaterThan(0);
});
