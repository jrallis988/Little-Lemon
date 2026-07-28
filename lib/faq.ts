export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

export const NH_ELECTIONS_URL = "https://www.sos.nh.gov/elections";
export const NH_SOS_HOME_URL = "https://www.sos.nh.gov/";

export const writeInFaqs: FaqItem[] = [
  {
    id: "what-is-write-in",
    question: "What is a write-in candidate?",
    answer: [
      "A write-in candidate is someone voters can support by writing the candidate’s name on the ballot in the space provided for write-in votes, instead of (or in addition to options for) selecting a name that is already printed on the ballot.",
      "Exact ballot layout and instructions can vary by locality. Always follow the instructions printed on your ballot and any guidance from your local election officials.",
    ],
  },
  {
    id: "how-to-cast",
    question: "How do I correctly cast a write-in vote?",
    answer: [
      "In general, voters look for the write-in line for the office they are voting for and write the candidate’s name clearly in that space, following the ballot’s instructions.",
      "For this campaign, Nick Varga is asking supporters to write in “Nick Varga” on the General Election ballot on November 3, 2026.",
      "This website’s guidance is informational. For official casting instructions, use New Hampshire Secretary of State election resources and your local clerks.",
    ],
  },
  {
    id: "spelling",
    question: "Does spelling matter?",
    answer: [
      "Clear, legible writing helps election officials determine voter intent. Using the candidate’s full name as commonly listed — “Nick Varga” — is the safest approach.",
      "Rules about how write-in votes are counted and how close a spelling must be are set by election law and local practice. This site does not provide a definitive legal interpretation. If you have a specific counting question, contact your local election officials or the New Hampshire Secretary of State.",
    ],
  },
  {
    id: "where-on-ballot",
    question: "Where do I write the candidate’s name on the ballot?",
    answer: [
      "Most ballots include a write-in line for each office. Write the name on the write-in line for U.S. Senate (or the office listed), according to the instructions on your ballot.",
      "Because ballot designs differ, rely on the instructions printed on your ballot and official election materials for your town or city.",
    ],
  },
  {
    id: "counts-same",
    question: "Does a write-in vote count the same as a printed candidate vote?",
    answer: [
      "A properly cast write-in vote is a vote for that office. How write-ins are tallied and reported is governed by New Hampshire election procedures.",
      "For authoritative information on counting and canvassing, refer to official New Hampshire election resources rather than campaign materials alone.",
    ],
  },
  {
    id: "independent",
    question: "What happens if the candidate is running as an independent?",
    answer: [
      "Nick Varga is running as an independent write-in candidate for U.S. Senate from New Hampshire. That means his name may not appear pre-printed on the General Election ballot the way a major-party nominee’s name often does.",
      "Supporters who want to vote for him should follow write-in instructions on the General Election ballot. Confirm ballot details with official sources closer to Election Day.",
    ],
  },
  {
    id: "primary-vs-general",
    question: "What is the difference between the primary and the general election?",
    answer: [
      "A primary election typically nominates party candidates. The general election is the final statewide vote that decides who holds the office.",
      "For this campaign, the date that matters for voting for Nick Varga is the General Election on November 3, 2026.",
    ],
  },
  {
    id: "need-primary",
    question: "Does the candidate need to win a primary?",
    answer: [
      "Nick Varga is not asking voters to treat a primary win as the path for this campaign. He is running as an independent write-in focused on the General Election.",
      "Primary rules and ballot access rules are set by law. For official candidate and ballot-access information, see the New Hampshire Secretary of State.",
    ],
  },
  {
    id: "qualify",
    question: "How does a write-in candidate qualify or become recognized?",
    answer: [
      "Qualification, filing, and recognition requirements for candidates and write-in results are established by New Hampshire and federal election law.",
      "This FAQ does not replace official guidance. For authoritative information on running for office, ballot access, and how write-in votes are handled, use the New Hampshire Secretary of State’s election pages.",
    ],
  },
  {
    id: "official-info",
    question: "Where can voters find official New Hampshire election information?",
    answer: [
      "Start with the New Hampshire Secretary of State Elections page for voter information, election calendars, and official resources.",
      "You can also contact your local town or city clerk for ballot-specific questions, polling places, and absentee voting details.",
    ],
  },
];
