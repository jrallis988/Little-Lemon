export type Issue = {
  id: string;
  title: string;
  summary: string;
  icon: "wallet" | "store" | "mountain" | "book";
  points: string[];
};

export const issues: Issue[] = [
  {
    id: "living-costs",
    title: "Lowering Living Costs",
    summary:
      "Housing, groceries, heat, and childcare should not force Granite Staters out of the communities they built.",
    icon: "wallet",
    points: [
      "Support housing supply near job centers without gutting local character",
      "Lower energy bills through weatherization and competitive electricity markets",
      "Protect prescription and grocery affordability for working families and seniors",
      "Expand childcare capacity so parents can stay in the workforce",
    ],
  },
  {
    id: "small-business",
    title: "Supporting Small Business & Retail Workforces",
    summary:
      "Main Street shops, diners, and local manufacturers keep New Hampshire independent—and they need a partner in Washington.",
    icon: "store",
    points: [
      "Cut red tape that hits mom-and-pop operators harder than big chains",
      "Defend fair competition so local retailers can thrive",
      "Invest in workforce training tied to real NH employers",
      "Strengthen rural broadband so every shop can reach customers online",
    ],
  },
  {
    id: "public-lands",
    title: "Protecting Public Lands",
    summary:
      "From the White Mountains to the Seacoast, our outdoors are an economic engine and a way of life—not a bargaining chip.",
    icon: "mountain",
    points: [
      "Defend White Mountain National Forest access and conservation partnerships",
      "Support working forests, clean lakes, and responsible recreation",
      "Hold polluters accountable without punishing family farms and timber jobs",
      "Keep public lands public—no silent sell-offs to distant interests",
    ],
  },
  {
    id: "education",
    title: "Localized Education",
    summary:
      "New Hampshire’s strength is local control. Parents, teachers, and towns—not distant bureaucracies—should shape our schools.",
    icon: "book",
    points: [
      "Protect local school board authority and parental involvement",
      "Fund career and technical education that leads to good NH jobs",
      "Support rural schools so geography never equals lower opportunity",
      "Keep federal education policy practical, transparent, and limited",
    ],
  },
];
