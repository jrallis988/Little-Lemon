export type Endorsement = {
  id: string;
  name: string;
  role: string;
  quote: string;
  placeholder?: boolean;
};

/** Sample quotes for the endorsements layout — not real endorsements. */
export const endorsements: Endorsement[] = [
  {
    id: "sample-1",
    name: "Maria L.",
    role: "Small-business owner, Dover",
    quote:
      "Finally a campaign that talks about my payroll and my rent in the same sentence — not a party script.",
  },
  {
    id: "sample-2",
    name: "James P.",
    role: "Veteran, Rochester",
    quote:
      "I don’t need another career politician. I need someone who will pick up the phone for Granite State vets.",
  },
  {
    id: "sample-3",
    name: "Aisha K.",
    role: "Teacher, Nashua",
    quote:
      "Independent doesn’t mean unserious. It means you can work with anyone if the idea helps our kids.",
  },
];
