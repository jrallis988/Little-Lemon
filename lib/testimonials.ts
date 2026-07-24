export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  town: string;
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "sarah",
    quote:
      "Nick is the candidate who actually shows up. Not just at election time — all the time. He was on my porch in March asking what mattered to me, and I hadn’t even signed anything yet.",
    name: "Sarah M.",
    town: "Portsmouth, NH",
    featured: true,
  },
  {
    id: "tom",
    quote:
      "I’ve never voted write-in before. But I’ve never had a candidate worth fighting for before.",
    name: "Tom R.",
    town: "Concord, NH",
  },
  {
    id: "linda",
    quote:
      "No corporate money. No party machine. Just a neighbor who gives a damn.",
    name: "Linda K.",
    town: "Manchester, NH",
  },
];
