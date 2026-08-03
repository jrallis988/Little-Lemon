import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { DesktopPrimaryNav, type NavItem } from "@/components/layout/DesktopPrimaryNav";

const sampleNav: NavItem[] = [
  {
    label: "Care",
    href: "/find-a-doctor",
    match: ["/find-a-doctor"],
    zones: [
      {
        title: "Get care",
        accent: true,
        links: [
          { label: "Find a Doctor", href: "/find-a-doctor" },
          { label: "Locations", href: "/locations" },
        ],
      },
      {
        title: "Programs",
        links: [{ label: "Programs A–Z", href: "/programs" }],
      },
      {
        title: "More",
        links: [{ label: "Emergency", href: "/emergency" }],
      },
    ],
  },
];

describe("DesktopPrimaryNav keyboard access", () => {
  it("opens mega menu content via keyboard on trigger", async () => {
    const user = userEvent.setup();
    render(<DesktopPrimaryNav items={sampleNav} />);

    const trigger = screen.getByRole("button", { name: /care/i });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(await screen.findByText("Find a Doctor")).toBeInTheDocument();
    expect(screen.getByText("Get care")).toBeInTheDocument();
  });

  it("has no critical axe violations in closed state", async () => {
    const { container } = render(<DesktopPrimaryNav items={sampleNav} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
