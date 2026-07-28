export const OFFICE_HOURS =
  "Monday–Thursday: 8:00 AM – 6:00 PM · Friday: 8:00 AM – 4:00 PM";

export const campuses = [
  {
    id: "Berlin",
    name: "Berlin Campus",
    label: "Berlin (Main Campus)",
    role: "Main Campus",
    addressLines: ["2020 Riverside Drive", "Berlin, NH 03570"],
    phone: "(603) 752-1113",
    phoneHref: "tel:6037521113",
    hours: OFFICE_HOURS,
    hoursNote:
      "Main campus offices follow these hours. Class, lab, and clinical times vary by program.",
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
    hours: OFFICE_HOURS,
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
    role: "Academic Center · Mount Washington Valley",
    addressLines: [
      "Mount Washington Valley presence",
      "North Conway, NH",
    ],
    phone: "(603) 447-3282",
    phoneHref: "tel:6034473282",
    hours: OFFICE_HOURS,
    hoursNote:
      "Serves the Mount Washington Valley with advising support and selected program pathways. Call for current class offerings and visit information.",
    directions:
      "Contact the North Conway Academic Center for current location details, parking, and visit scheduling in the Mount Washington Valley.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=North+Conway+NH+White+Mountains+Community+College",
    pageUrl: "https://www.wmcc.edu/program-location/north-conway/",
  },
];

export const campusById = Object.fromEntries(
  campuses.map((campus) => [campus.id, campus])
);
