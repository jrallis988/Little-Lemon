import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders NHTI brand in the hero", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByText("NHTI").length).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { name: /learn where new hampshire works/i })
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(/nhti campus quad/i)
  ).toBeInTheDocument();
});
