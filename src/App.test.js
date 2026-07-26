import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders White Mountains brand on the home page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByAltText(/White Mountains Community College/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { name: /Explore Our Programs/i })
  ).toBeInTheDocument();
});
