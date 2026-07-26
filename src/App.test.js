import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders River Valley brand in the hero", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByText(/River Valley Community College/i).length
  ).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /soar into your future/i })).toBeInTheDocument();
});
