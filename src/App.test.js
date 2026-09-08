import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Contact from "./pages/Contact";

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

test("renders athletics hub", () => {
  render(
    <MemoryRouter initialEntries={["/athletics"]}>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByRole("heading", { name: /Athletics — Compete as a Heron/i })
  ).toBeInTheDocument();
});

test("contact form queues an inquiry with a reference id", async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Full name/i), {
    target: { value: "Alex Heron" },
  });
  fireEvent.change(screen.getByLabelText(/^Email/i), {
    target: { value: "alex@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Topic/i), {
    target: { value: "Admissions" },
  });
  fireEvent.change(screen.getByLabelText(/Message/i), {
    target: { value: "I want to visit campus this fall." },
  });
  fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

  await waitFor(() => {
    expect(screen.getByText(/Message received/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/GBCC-/i)).toBeInTheDocument();
});
