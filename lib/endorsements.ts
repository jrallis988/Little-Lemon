export type Endorsement = {
  id: string;
  name: string;
  role: string;
  quote: string;
  placeholder?: boolean;
};

export const endorsements: Endorsement[] = [
  {
    id: "placeholder-1",
    name: "Endorsement coming soon",
    role: "New Hampshire community leader",
    quote:
      "Named endorsements from real supporters will appear here as they are confirmed.",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    name: "Endorsement coming soon",
    role: "Local business owner",
    quote:
      "This page is ready for real names, titles, and quotes from people standing with Nick.",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    name: "Endorsement coming soon",
    role: "Veteran / civic leader",
    quote:
      "Until then, the campaign’s commitment stays the same: people over politics, neighbor by neighbor.",
    placeholder: true,
  },
];
