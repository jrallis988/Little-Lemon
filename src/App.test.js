import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders Great Bay brand on the home page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getAllByText(/Great Bay Community College/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { name: /Start here\. Go anywhere\./i })
  ).toBeInTheDocument();
  expect(screen.getByText(/What sets Great Bay apart/i)).toBeInTheDocument();
  expect(screen.getByText(/News and Events/i)).toBeInTheDocument();
});
