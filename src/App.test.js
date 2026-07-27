import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders Disney Jr brand on home", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Disney/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /Watch Academy Rock/i })).toBeInTheDocument();
});

test("renders Academy Rock show page", () => {
  render(
    <MemoryRouter initialEntries={["/academy-rock"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1, name: /Academy Rock/i })).toBeInTheDocument();
  expect(screen.getAllByText(/First Day Jams/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("button", { name: /Play episode 1/i })).toBeInTheDocument();
});
