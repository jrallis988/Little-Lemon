export type FaqLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  links?: FaqLink[];
};

export const NH_ELECTIONS_URL = "https://www.sos.nh.gov/elections";
export const NH_SOS_HOME_URL = "https://www.sos.nh.gov/";
/** Official ballot-marking guidance used by NH clerks (write-in + fill oval). */
export const NH_BALLOT_INSTRUCTIONS_NOTE =
  "New Hampshire ballot instructions tell voters: to vote for a person whose name is not printed on the ballot, write the name in the write-in space and completely fill in the oval to the right of that choice.";

export const faqs: FaqItem[] = [
  {
    id: "who-is-nick",
    question: "Who is Nick Varga?",
    answer: [
      "Nick Varga is an independent write-in candidate for U.S. Senate from New Hampshire. He’s from Newmarket in Rockingham County — a Granite Stater first, not a career politician.",
      "His campaign is built neighbor by neighbor around a simple idea: People Over Politics.",
    ],
    links: [{ href: "/meet-nick", label: "Meet Nick" }],
  },
  {
    id: "why-running",
    question: "Why is Nick running for U.S. Senate?",
    answer: [
      "Nick watched Washington stop listening to everyday New Hampshire families — and decided that if nobody else was going to run without answering to party bosses or big donors, he would.",
      "He’s running to put New Hampshire families first: good jobs, affordable healthcare, veterans who are taken care of, and a government that works for people, not special interests.",
    ],
    links: [{ href: "/meet-nick", label: "Why he’s running" }],
  },
  {
    id: "why-independent",
    question: "Why is he running as an Independent?",
    answer: [
      "Nick believes both major parties spend too much time protecting their own power and not enough time solving problems for the people who live here.",
      "Running as an independent means this campaign doesn’t answer to party bosses. It answers to New Hampshire voters — and it focuses on the General Election, not party primaries.",
    ],
    links: [{ href: "/violet-party", label: "About the Violet Party" }],
  },
  {
    id: "what-he-stands-for",
    question: "What does Nick stand for?",
    answer: [
      "Integrity over insider access. Independence over party loyalty. Neighbors over donors.",
      "In practice, that means term limits, lower costs for families, stronger support for veterans, practical approaches to healthcare and education, and a refusal to treat public office like a business opportunity.",
    ],
    links: [{ href: "/issues", label: "Explore the issues" }],
  },
  {
    id: "priorities",
    question: "What are his major priorities for New Hampshire?",
    answer: [
      "Nick’s platform starts with term limits — ending career politics — and continues through the issues that hit Granite State households hardest: the economy and jobs, healthcare costs, veterans, education, energy and the environment, wildlife, immigration, and infrastructure.",
      "Each issue page lays out concrete priorities in plain language.",
    ],
    links: [{ href: "/issues", label: "Full issues list" }],
  },
  {
    id: "differentiation",
    question: "How is Nick different from the major-party candidates?",
    answer: [
      "He’s not running as a Democrat or a Republican. He isn’t asking voters to pick a team — he’s asking them to pick a neighbor who won’t be bought.",
      "This campaign doesn’t take corporate PAC money or dark money, doesn’t answer to party machines, and is built to work across party lines for New Hampshire instead of scoring points for Washington.",
    ],
    links: [
      { href: "/transparency", label: "Campaign transparency" },
      { href: "/meet-nick", label: "Meet Nick" },
    ],
  },
  {
    id: "donations",
    question: "What is Nick’s position on campaign donations and funding?",
    answer: [
      "This campaign accepts no corporate PAC money, no dark money, and no lobbyist contributions. Support comes from individuals — mostly Granite Staters.",
      "This website does not collect online donations. The best ways to help right now are volunteering, sharing Nick’s story, and making sure neighbors know how to vote for him on Election Day.",
    ],
    links: [{ href: "/transparency", label: "How the campaign is funded" }],
  },
  {
    id: "qualifications",
    question: "What are Nick’s qualifications and experience?",
    answer: [
      "Nick is a Newmarket native who knows Rockingham County and the day-to-day pressures facing New Hampshire families. He is not a career politician — and that’s intentional.",
      "He’s the founder of the Violet Party, an independent effort focused on people over party. For the fuller story of who he is and why he’s running, start with Meet Nick.",
    ],
    links: [
      { href: "/meet-nick", label: "Meet Nick" },
      { href: "/violet-party", label: "Violet Party" },
    ],
  },
  {
    id: "across-party-lines",
    question: "How does Nick intend to work across party lines?",
    answer: [
      "Independence isn’t about picking fights with everyone — it’s about being free to work with anyone when the idea is good for New Hampshire.",
      "Nick’s approach is practical: listen first, judge ideas on their merits, and refuse to let party loyalty block common-sense solutions on costs, jobs, veterans, and infrastructure.",
    ],
    links: [{ href: "/issues", label: "See where he stands" }],
  },
  {
    id: "meet-him",
    question: "How can voters meet Nick?",
    answer: [
      "Check the Events page for upcoming town halls, meet-and-greets, and kitchen-table conversations across the state.",
      "If you’d like Nick to visit your community, you can request a stop through Come to My Town.",
    ],
    links: [
      { href: "/events", label: "Upcoming events" },
      { href: "/come-to-my-town", label: "Request a visit" },
    ],
  },
  {
    id: "volunteer-support",
    question: "How can people volunteer or otherwise support the campaign?",
    answer: [
      "Volunteers are the backbone of this campaign — door-knocking, phone banking, events, digital help, and neighbor-to-neighbor outreach.",
      "You can sign up on the Volunteer page, join Team Varga for updates, invite Nick to your town, or simply share how to vote for him with friends and family.",
    ],
    links: [
      { href: "/volunteer", label: "Volunteer" },
      { href: "/#join", label: "Join Team Varga" },
      { href: "/come-to-my-town", label: "Come to My Town" },
    ],
  },
  {
    id: "contact",
    question: "How can voters contact the campaign?",
    answer: [
      "Use the Contact page for questions, press, and general outreach. You can also reach the campaign by email or phone listed there.",
      "For quick website questions, the chat helper on this site can point you to the right page. For a human teammate, choose Live Campaign Support when available.",
    ],
    links: [{ href: "/contact", label: "Contact the campaign" }],
  },
  {
    id: "how-to-vote",
    question: "How do I vote for Nick in the General Election?",
    answer: [
      "On Tuesday, November 3, 2026, vote on your General Election ballot. Find the U.S. Senate race, use the write-in line, and write “Nick Varga” clearly.",
      "New Hampshire ballot instructions tell voters: to vote for a person whose name is not printed on the ballot, write the name in the write-in space and completely fill in the oval to the right of that choice. Always follow the instructions printed on your ballot.",
      "For polling places, absentee voting, registration, and other official details, use New Hampshire Secretary of State election resources or your local clerk. This FAQ is campaign information — not a substitute for official guidance.",
    ],
    links: [
      { href: "/how-to-vote", label: "How to Vote (step by step)" },
      {
        href: NH_ELECTIONS_URL,
        label: "NH Secretary of State — Elections",
        external: true,
      },
    ],
  },
];
