import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AboutPage from "./pages/AboutPage";
import LabPage from "./pages/LabPage";
import EngineeringPage from "./pages/EngineeringPage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectPage from "./pages/ProjectPage";

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

test("lab page lists Foam Drift", () => {
  render(
    <MemoryRouter>
      <LabPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Experiments, prototypes & things I’m building/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Foam Drift/i).length).toBeGreaterThan(0);
});

test("engineering page explains how I build", () => {
  render(
    <MemoryRouter>
      <EngineeringPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/How I build for the web/i)).toBeInTheDocument();
  expect(screen.getByText(/From design to deployment/i)).toBeInTheDocument();
});

test("resume page shows professional summary", () => {
  render(
    <MemoryRouter>
      <ResumePage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Download Resume/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Front-End Engineer & Multimedia Designer/i).length).toBeGreaterThan(0);
});

test("project detail page loads Little Lemon case study", async () => {
  render(
    <MemoryRouter initialEntries={["/work/little-lemon"]}>
      <Routes>
        <Route path="/work/:slug" element={<ProjectPage slug="little-lemon" />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /Little Lemon/i })).toBeInTheDocument();
  });
  expect(screen.getByText(/What needed to change/i)).toBeInTheDocument();
});

test("404 page offers home and work links", () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Looks like this page went missing/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Return Home/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View Work/i })).toBeInTheDocument();
});
