import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import AboutPage from "./pages/AboutPage";

test("renders brand name in the hero", () => {
  render(<App />);
  expect(screen.getAllByText(/James Rallis/i).length).toBeGreaterThan(0);
});

test("renders contact form fields", () => {
  render(<App />);
  expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument();
});

test("renders Little Lemon case study", () => {
  render(<App />);
  expect(screen.getByText(/Little Lemon — booking without the clutter/i)).toBeInTheDocument();
});

test("about page shows certifications", () => {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Credentials that back the craft/i)).toBeInTheDocument();
  expect(screen.getByText(/Meta Front-End Developer Professional Certificate/i)).toBeInTheDocument();
});
