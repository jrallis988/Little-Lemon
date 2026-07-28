export const campuses = [
  {
    id: "Berlin",
    name: "Berlin Campus",
    label: "Berlin (Main Campus)",
    role: "Main Campus",
    addressLines: ["2020 Riverside Drive", "Berlin, NH 03570"],
    phone: "(603) 752-1113",
    phoneHref: "tel:6037521113",
    hours: "Monday–Friday, 8:00 AM – 5:00 PM (campus offices)",
    hoursNote: "Class times vary by program; labs and clinics may run evenings.",
    directions:
      "On Route 16, about three miles north of downtown Berlin. Parking is available on campus.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2020+Riverside+Drive+Berlin+NH+03570",
    pageUrl: "https://www.wmcc.edu/about/our-locations/berlin/",
  },
  {
    id: "Littleton",
    name: "Littleton Academic Center",
    label: "Littleton Academic Center",
    role: "Academic Center",
    addressLines: ["646 Union Street", "Littleton, NH 03561"],
    phone: "(603) 444-1326",
    phoneHref: "tel:6034441326",
    hours: "Monday–Friday (center hours)",
    hoursNote:
      "Home to Medical Assistant, Commercial Driver Training, Driver Education Instructor, and select general-education and career courses.",
    directions:
      "Located in Littleton with day and evening course options for North Country students.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=646+Union+Street+Littleton+NH+03561",
    pageUrl: "https://www.wmcc.edu/about/our-locations/littleton/",
  },
  {
    id: "North Conway",
    name: "North Conway Academic Center",
    label: "North Conway Academic Center",
    role: "Academic Center",
    addressLines: ["2541 White Mountain Highway", "North Conway, NH 03860"],
    phone: "(603) 356-7926",
    phoneHref: "tel:6033567926",
    hours: "Monday–Thursday (center hours)",
    hoursNote:
      "In North Conway Village (behind the TD Bank parking lot). Home to Veterinary Assistant and Massage Therapy, plus select transfer and career courses.",
    directions:
      "One block south of Grove Street / 0.2 miles north of Depot Street on White Mountain Highway.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2541+White+Mountain+Highway+North+Conway+NH+03860",
    pageUrl: "https://www.wmcc.edu/program-location/north-conway/",
  },
];

export const campusById = Object.fromEntries(
  campuses.map((campus) => [campus.id, campus])
);
