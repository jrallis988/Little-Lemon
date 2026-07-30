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

  expect(screen.getAllByRole("link", { name: "Academics" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Admissions" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Financial Aid" }).length).toBeGreaterThan(0);
  expect(
    screen.getAllByRole("link", { name: "Workforce Education" }).length
  ).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Campus Life" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Current Students" }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  expect(screen.getByRole("button", { name: /^search$/i })).toBeInTheDocument();
});

test("primary nav tabs route to their pages", () => {
  const routes = [
    {
      name: "Academics",
      path: "/academics",
      heading: /programs built for work and transfer/i,
    },
    {
      name: "Admissions",
      path: "/admissions",
      heading: /a clear path from curious to enrolled/i,
    },
    {
      name: "Financial Aid",
      path: "/financial-aid",
      heading: /make college affordable/i,
    },
    {
      name: "Campus Life",
      path: "/campus",
      heading: /a full college experience on the merrimack/i,
    },
    {
      name: "Workforce Education",
      path: "/workforce",
      heading: /train for the job new hampshire needs/i,
    },
    {
      name: "About",
      path: "/about",
      heading: /cultivating potential in every learner/i,
    },
    {
      name: "Contact",
      path: "/contact",
      heading: /we.?re here to help/i,
    },
  ];

  routes.forEach(({ name, path, heading }) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("link", { name }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    unmount();
  });
});

test("about dropdown groups leadership and office links", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /about submenu/i }));

  expect(
    screen.getByRole("group", { name: /leadership & offices/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/leadership & offices/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /president.?s office/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /marketing office/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /student success data/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /community resources/i })
  ).toBeInTheDocument();
});

test("search routes to academics with the query", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /^search$/i }));
  const input = screen.getByLabelText(/search programs/i);
  fireEvent.change(input, {
    target: { value: "Nursing" },
  });
  fireEvent.submit(input.closest("form"));

  expect(screen.getByRole("heading", { name: /^Nursing$/i })).toBeInTheDocument();
});

test("homepage shows eight campus resource tiles without hero duplicates", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("link", { name: /request info/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /event calendar/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /workforce education/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /early college/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^library$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^bookstore$/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /campus map/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /it helpdesk/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /apply and enroll/i })).not.toBeInTheDocument();
});

test("homepage community band highlights events instead of duplicate apply CTAs", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /keep learning on the merrimack/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /explore workforce training/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /see campus events/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /start your application/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /browse programs/i })).not.toBeInTheDocument();
});

test("footer includes CCSNH lockup, social icons, and policy links", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("img", {
      name: /community college system of new hampshire/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^facebook$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^instagram$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^linkedin$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^x$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^tiktok$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /non-discrimination policy/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /accessibility policy/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^sds$/i })).toBeInTheDocument();
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
