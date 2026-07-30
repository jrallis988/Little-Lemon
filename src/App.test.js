import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

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

  expect(screen.getByRole("heading", { name: /^Nursing$/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: /^Accounting$/i })
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

test("renders athletics page with Lynx branding", () => {
  render(
    <MemoryRouter initialEntries={["/athletics"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("NHTI Lynx")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /always lynx season/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /lynx athletics logo with snarling lynx head/i })
  ).toBeInTheDocument();
});

test("primary nav matches NHTI menu categories", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("link", { name: "Financial Aid" }).length).toBeGreaterThan(0);
  expect(
    screen.getAllByRole("link", { name: "Workforce Education" }).length
  ).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Campus Life" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Current Students" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Contact Us" }).length).toBeGreaterThan(0);
});

test("shows student life shirts photo on campus page", () => {
  render(
    <MemoryRouter initialEntries={["/campus"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("img", {
      name: /holding navy lynx spirit shirts/i,
    })
  ).toBeInTheDocument();
});

test("submits a valid admissions inquiry", async () => {
  render(
    <MemoryRouter initialEntries={["/admissions"]}>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/^first name$/i), {
    target: { value: "Alex" },
  });
  fireEvent.change(screen.getByLabelText(/^last name$/i), {
    target: { value: "Rivera" },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: "alex@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/program interest/i), {
    target: { value: "Nursing" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

  await waitFor(() => {
    expect(screen.getByText(/inquiry received/i)).toBeInTheDocument();
  });
  expect(global.fetch).toHaveBeenCalled();
});
