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
      "Granite Staters are working harder than ever just to make ends meet. Housing, heat, groceries, and childcare should not force people out of the towns they love.",
    icon: "wallet",
    points: [
      "Cut the housing bottleneck near job centers without gutting local character",
      "Lower energy bills through weatherization, LIHEAP protections, and competitive markets",
      "Take on prescription and grocery costs that punish working families and seniors",
      "Expand childcare capacity so parents can stay in the workforce",
    ],
  },
  {
    id: "small-business",
    title: "Supporting Small Business & Retail Workforces",
    summary:
      "From family hardware stores to diners and manufacturers, Main Street keeps New Hampshire independent—and it needs a partner in Washington, not another lecture.",
    icon: "store",
    points: [
      "Slash red tape that hits mom-and-pop operators harder than national chains",
      "Defend fair competition so local retailers can thrive on Main Street",
      "Invest in workforce training tied to real New Hampshire employers",
      "Finish the job on rural broadband so every shop can reach customers online",
    ],
  },
  {
    id: "public-lands",
    title: "Protecting Public Lands",
    summary:
      "White Mountains trails, clean lakes, and working forests are an economic engine and a way of life—not a bargaining chip for distant interests.",
    icon: "mountain",
    points: [
      "Defend White Mountain National Forest access and conservation partnerships",
      "Support working forests, clean lakes, and responsible year-round recreation",
      "Hold polluters accountable without punishing family farms and timber jobs",
      "Keep public lands public—no quiet sell-offs",
    ],
  },
  {
    id: "education",
    title: "Localized Education",
    summary:
      "New Hampshire’s strength is local control. Parents, teachers, and towns—not distant bureaucracies—should shape our classrooms.",
    icon: "book",
    points: [
      "Protect local school board authority and real parental involvement",
      "Fund career and technical education that leads to good NH jobs",
      "Support rural schools so geography never equals lower opportunity",
      "Keep federal education policy practical, transparent, and limited",
    ],
  },
];
