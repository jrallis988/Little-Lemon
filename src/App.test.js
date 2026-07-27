import { fireEvent, render, screen } from "@testing-library/react";
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
  expect(screen.getByLabelText(/nhti campus quad/i)).toBeInTheDocument();
});

test("filters academic programs by search", () => {
  render(
    <MemoryRouter initialEntries={["/academics"]}>
      <App />
    </MemoryRouter>
  );

  const search = screen.getByPlaceholderText(/search by program/i);
  fireEvent.change(search, { target: { value: "Nursing" } });

  expect(screen.getByRole("heading", { name: "Nursing" })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Accounting" })
  ).not.toBeInTheDocument();
});

test("validates admissions inquiry form", () => {
  render(
    <MemoryRouter initialEntries={["/admissions"]}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));
  expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
