export type IssueSlug =
  | "term-limits"
  | "economy-jobs"
  | "healthcare"
  | "veterans"
  | "education"
  | "environment-energy"
  | "wildlife"
  | "immigration"
  | "infrastructure";

export type IssuePriority = {
  title: string;
  body: string;
};

export type Issue = {
  slug: IssueSlug;
  title: string;
  subtitle: string;
  oneLiner: string;
  icon:
    | "clock"
    | "briefcase"
    | "heartPulse"
    | "shield"
    | "book"
    | "leaf"
    | "paw"
    | "globe"
    | "bridge";
  featured?: boolean;
  priorities: IssuePriority[];
  sectionHeading: string;
  body: string[];
  pullQuote?: string;
};

export const issues: Issue[] = [
  {
    slug: "term-limits",
    title: "Term Limits",
    subtitle: "Ending Career Politics and Returning Power to the People",
    oneLiner:
      "Congress was never meant to be a career. Nick supports a constitutional amendment capping the U.S. Senate at two terms and the House at six — and will voluntarily limit himself to two terms whether it passes or not.",
    icon: "clock",
    featured: true,
    priorities: [
      {
        title: "Two Terms Senate",
        body: "Cap U.S. Senate service at two six-year terms.",
      },
      {
        title: "Six Terms House",
        body: "Cap U.S. House service at six two-year terms.",
      },
      {
        title: "No Lobbying After",
        body: "Lifetime ban on lobbying by former members.",
      },
      {
        title: "Citizen Legislators",
        body: "Return Congress to public servants, not career politicians.",
      },
    ],
    sectionHeading: "Why Term Limits Matter",
    body: [
      "The Founders never intended Congress to be a career. Yet today, we have senators who have held the same seat for thirty, forty, sometimes fifty years — outlasting presidents, industries, and entire generations of voters. That’s not representation. That’s incumbency.",
      "Term limits break the grip of career politicians on the levers of power. They restore competitive elections, force real accountability, and open the door for citizen legislators — the teachers, veterans, small-business owners, and neighbors this country was built by. I’ll cosponsor a constitutional amendment limiting Senate service to two terms and House service to six, and I’ll voluntarily limit myself to two terms regardless of whether it passes.",
    ],
    pullQuote:
      "Congress was never meant to be a career. Limit the terms. Open the door.",
  },
  {
    slug: "economy-jobs",
    title: "Economy & Jobs",
    subtitle: "Cutting Costs and Bringing Good-Paying Jobs Back Home",
    oneLiner:
      "Cutting costs for NH families and bringing good-paying jobs back to the Granite State.",
    icon: "briefcase",
    priorities: [
      {
        title: "Lower Everyday Costs",
        body: "Fight policies that inflate housing, heat, groceries, and childcare.",
      },
      {
        title: "Good-Paying Jobs",
        body: "Bring manufacturing, trades, and skilled work back to New Hampshire.",
      },
      {
        title: "Small Business",
        body: "Cut red tape that hits Main Street harder than national chains.",
      },
      {
        title: "Workforce Training",
        body: "Fund pathways into real careers — not just degrees for debt.",
      },
    ],
    sectionHeading: "An Economy That Works in New Hampshire",
    body: [
      "Families shouldn’t need two jobs and a miracle to pay the electric bill. Nick will fight to cut costs that hit New Hampshire wallets first — energy, housing, and the price of getting to work.",
      "Good-paying jobs belong here. That means backing the shops, trades, and manufacturers that keep towns alive, and saying no to policies written for industries that never set foot in Rockingham County.",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    subtitle: "Lower Drug Prices. Protect Coverage. Tell the Truth About Costs.",
    oneLiner:
      "Lowering prescription drug prices and protecting coverage for every NH family.",
    icon: "heartPulse",
    priorities: [
      {
        title: "Prescription Prices",
        body: "Take on drug pricing that punishes seniors and working families.",
      },
      {
        title: "Protect Coverage",
        body: "Defend coverage people already rely on — don’t gamble with it.",
      },
      {
        title: "Rural Access",
        body: "Keep care reachable outside the I-93 corridor.",
      },
      {
        title: "Plain-English Costs",
        body: "Patients deserve to know what care costs before the bill arrives.",
      },
    ],
    sectionHeading: "Healthcare People Can Actually Afford",
    body: [
      "Nobody should ration insulin or skip a refill because of a spreadsheet in Washington. Nick will fight to lower prescription prices and protect the coverage New Hampshire families already depend on.",
      "That includes rural clinics, mental health access, and the kind of honesty about costs that career politicians avoid.",
    ],
  },
  {
    slug: "veterans",
    title: "Veterans",
    subtitle: "Keeping Every Promise Made to New Hampshire Veterans",
    oneLiner:
      "Keeping every promise made to our 90,000 New Hampshire veterans.",
    icon: "shield",
    priorities: [
      {
        title: "VA Care That Works",
        body: "Shorter wait times and real accountability when the system fails.",
      },
      {
        title: "Benefits Delivered",
        body: "Claims processed without making veterans fight for what they earned.",
      },
      {
        title: "Mental Health",
        body: "Expand access to mental health care without stigma or delay.",
      },
      {
        title: "Local Support",
        body: "Back NH veterans’ organizations and community care networks.",
      },
    ],
    sectionHeading: "Promises Kept — Not Campaign Season Talking Points",
    body: [
      "New Hampshire is home to about 90,000 veterans. They kept their end of the bargain. Washington too often hasn’t.",
      "Nick will treat veterans’ care and benefits as obligations — not optional press releases. Show up, fund what works, and fix what doesn’t.",
    ],
  },
  {
    slug: "education",
    title: "Education",
    subtitle: "Real Public School Education — Not Endless Testing",
    oneLiner:
      "Bringing back real public school education — the way it was in the 90s. Ending endless standardized testing, restoring art, music, civics, and shop class, and funding New Hampshire’s public schools so every kid gets a real education.",
    icon: "book",
    priorities: [
      {
        title: "End Testing Overload",
        body: "Stop treating kids like data points on a federal spreadsheet.",
      },
      {
        title: "Art, Music, Civics, Shop",
        body: "Restore the classes that make school worth showing up for.",
      },
      {
        title: "Fund Public Schools",
        body: "Give NH public schools the resources to teach — not just test.",
      },
      {
        title: "Local Control",
        body: "Parents, teachers, and towns should shape classrooms — not distant bureaucracies.",
      },
    ],
    sectionHeading: "Bring Back a Real Education",
    body: [
      "Nick wants public schools that look more like the ones that worked — art, music, civics, shop class — and less like a testing factory.",
      "Fund New Hampshire’s public schools so every kid gets a real education, and keep decisions close to the people who actually know the students.",
    ],
  },
  {
    slug: "environment-energy",
    title: "Environment & Energy",
    subtitle: "Protecting Our Natural Resources While Growing Our Economy",
    oneLiner:
      "Protecting New Hampshire’s natural resources while keeping energy affordable and growing good jobs.",
    icon: "leaf",
    priorities: [
      {
        title: "Clean Water",
        body: "Defend lakes, rivers, and drinking water from pollution and neglect.",
      },
      {
        title: "Clean Energy",
        body: "Support energy that lowers bills without punishing working towns.",
      },
      {
        title: "Conservation",
        body: "Protect forests, trails, and public lands people actually use.",
      },
      {
        title: "Green Jobs",
        body: "Grow work in conservation, efficiency, and clean industry here at home.",
      },
    ],
    sectionHeading: "Protect What Makes New Hampshire Worth Living In",
    body: [
      "Clean water, working forests, and affordable heat aren’t opposing goals. Nick will fight for conservation that respects the people who live here — and energy policy that doesn’t treat New Hampshire like a line item.",
      "Protect the outdoors. Keep the lights on. Grow jobs that stay in state.",
    ],
  },
  {
    slug: "wildlife",
    title: "Wildlife",
    subtitle: "Protecting New Hampshire’s Wildlife, Habitats, and Sporting Traditions",
    oneLiner:
      "Protect moose, loons, habitat, and the hunting and fishing traditions that define New Hampshire.",
    icon: "paw",
    priorities: [
      {
        title: "Native Species",
        body: "Protect moose, loons, bear, and native fish populations.",
      },
      {
        title: "Habitat",
        body: "Preserve forests, wetlands, and wildlife corridors.",
      },
      {
        title: "Sporting Traditions",
        body: "Defend NH hunting and fishing heritage.",
      },
      {
        title: "Fish & Game",
        body: "Fund NH Fish & Game and conservation officers.",
      },
    ],
    sectionHeading: "Wildlife Is Part of Who We Are",
    body: [
      "New Hampshire’s wildlife isn’t a backdrop — it’s a way of life. Moose in the North Country, loons on our lakes, black bear in our forests, brook trout in cold headwater streams. Generations of Granite Staters have hunted, fished, hiked, and lived alongside them. Protecting that heritage isn’t optional.",
      "Habitat loss, warming winters, and underfunded conservation programs are all putting pressure on native species. I’ll fight to fully fund NH Fish & Game, defend hunting and fishing traditions from federal overreach, and make sure the next generation of Granite Staters inherits the wild New Hampshire we know.",
    ],
  },
  {
    slug: "immigration",
    title: "Immigration",
    subtitle: "Secure Borders and Workable Immigration Policy",
    oneLiner: "Secure borders and workable immigration policy.",
    icon: "globe",
    priorities: [
      {
        title: "Secure Borders",
        body: "A country that can’t manage its borders can’t manage much else.",
      },
      {
        title: "Workable Process",
        body: "Legal immigration should be clear, enforceable, and fair.",
      },
      {
        title: "No Political Theater",
        body: "Stop using immigration as a fundraising slogan instead of a policy problem.",
      },
      {
        title: "Local Impacts",
        body: "Listen to towns dealing with real costs and capacity limits.",
      },
    ],
    sectionHeading: "Security Without Spin",
    body: [
      "Nick supports secure borders and an immigration system that works in practice — not in campaign ads.",
      "Enforce the law. Fix what’s broken. Tell voters the truth about tradeoffs instead of pretending every hard choice is simple.",
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    subtitle: "Rebuild NH Roads, Bridges, and Broadband",
    oneLiner: "Rebuild NH roads, bridges, and broadband.",
    icon: "bridge",
    priorities: [
      {
        title: "Roads & Bridges",
        body: "Fix the infrastructure people drive on every day.",
      },
      {
        title: "Broadband",
        body: "Finish the job so rural towns aren’t left offline.",
      },
      {
        title: "Accountability",
        body: "Money should buy results, not press conferences.",
      },
      {
        title: "Local Needs First",
        body: "Prioritize projects that matter to the towns that use them.",
      },
    ],
    sectionHeading: "Build What People Actually Use",
    body: [
      "Potholes, aging bridges, and dead zones aren’t abstract. They’re why people are late to work and kids can’t do homework.",
      "Nick will push infrastructure spending that shows up as paved roads, safe bridges, and real broadband — measured by results in New Hampshire towns, not by ribbon cuttings.",
    ],
  },
];

export function getIssue(slug: string): Issue | undefined {
  return issues.find((issue) => issue.slug === slug);
}

export const secondAmendmentHome = {
  overline: "Constitutional Rights",
  heading: "The Second Amendment",
  body: "Committed to upholding the Second Amendment and defending the constitutional right to keep and bear arms.",
  detail:
    "The right of the people to keep and bear arms is enumerated in the Constitution and shall not be infringed. Any legislation that diminishes this right must be scrutinized against the plain text, history, and tradition of the Second Amendment as interpreted by the United States Supreme Court.",
};
