import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Civic Bound brand", () => {
  render(<App />);
  expect(screen.getAllByText(/Civic/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Bound/i).length).toBeGreaterThan(0);
});
