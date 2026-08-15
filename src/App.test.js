import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders Civic Bound brand on home", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Civic/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Bound/i).length).toBeGreaterThan(0);
});

test("renders hubs locator page", () => {
  render(
    <MemoryRouter initialEntries={["/hubs"]}>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByText(/Find a Neighborhood Resource Hub near you/i)
  ).toBeInTheDocument();
});

test("renders volunteer boundaries page", () => {
  render(
    <MemoryRouter initialEntries={["/volunteers"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/What volunteers are not/i)).toBeInTheDocument();
});
