export function asset(path) {
  const base = process.env.PUBLIC_URL || "";
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE = {
  name: "Seascape Inn",
  shortName: "Seascape Inn",
  tagline: "Beachfront at Plaice Cove, Hampton NH.",
  phone: "(603) 926-1750",
  phoneHref: "tel:+16039261750",
  email: "seascapeinn@hotmail.com",
  website: "https://seascapeinnhamptonnh.com/",
  bookingUrl: "https://guest.rezstream.com/search/seascape-inn",
  tripadvisorUrl:
    "https://www.tripadvisor.com/Hotel_Review-g46111-d667889-Reviews-Seascape_Inn_at_Plaice_Cove-Hampton_New_Hampshire.html",
  address: "955 Ocean Boulevard, Hampton, NH 03842",
  addressShort: "955 Ocean Blvd, Hampton, NH",
  neighborhood: "Plaice Cove · North Beach",
  roomCount: 20,
  founded: 1953,
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-70.801%2C42.938%2C-70.782%2C42.948&layer=mapnik&marker=42.94326%2C-70.79161",
  mapLink:
    "https://www.openstreetmap.org/?mlat=42.94326&mlon=-70.79161#map=16/42.94326/-70.79161",
  social: {
    facebook: "https://www.facebook.com/seascape.inn.1",
  },
  checkIn: "3:00 PM",
  checkOut: "10:00 AM",
  hours: "Front desk 8:30 AM – 10:00 PM",
  typicalRateNote:
    "Rates often run around $165/night depending on dates — use the live booking calendar for exact pricing.",
};

export function buildBookingUrl({ checkIn, checkOut, guests = 2 } = {}) {
  const url = new URL(SITE.bookingUrl);
  if (checkIn) url.searchParams.set("ArrivalDate", checkIn);
  if (checkOut) url.searchParams.set("DepartureDate", checkOut);
  if (guests) url.searchParams.set("Adults", String(guests));
  return url.toString();
}

export const ROOMS = [
  {
    id: "queen",
    name: "Standard Queen",
    beds: "1 queen bed",
    rate: 165,
    rateLabel: "Typically from ~$165 / night",
    sleeps: 2,
    size: "Standard room",
    description:
      "A clean queen room with the essentials for a North Beach stay—air-conditioning, fridge, microwave, cable TV, and free Wi‑Fi.",
    image: asset("/images/room-queen.jpg"),
    imageAlt: "Seascape Inn queen guest room with coastal bedding",
    gallery: [
      {
        src: asset("/images/room-queen.jpg"),
        alt: "Queen room with beach-themed wall art",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Seascape Inn courtyard with room balconies",
      },
    ],
    amenities: [
      "Queen bed",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
      "Private bath",
    ],
  },
  {
    id: "two-doubles",
    name: "Standard Two Doubles",
    beds: "2 double beds",
    rate: 165,
    rateLabel: "Typically from ~$165 / night",
    sleeps: 4,
    size: "Standard room",
    description:
      "Two double beds for friends or family—steps from North Beach and a quieter stretch of Ocean Boulevard than the main Hampton strip.",
    image: asset("/images/room-doubles.jpg"),
    imageAlt: "Guest room with two double beds at Seascape Inn",
    gallery: [
      {
        src: asset("/images/room-doubles.jpg"),
        alt: "Two-bed guest room with matching quilts",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Courtyard seating outside guest rooms",
      },
    ],
    amenities: [
      "Two double beds",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
      "Private bath",
    ],
  },
  {
    id: "economy",
    name: "Economy Room",
    beds: "1 double + 1 single",
    rate: 145,
    rateLabel: "Typically from ~$145 / night",
    sleeps: 3,
    size: "Economy room",
    description:
      "A practical layout with a double and a single bed—good value for a short Hampton getaway near the sand.",
    image: asset("/images/room-economy.jpg"),
    imageAlt: "Economy room with double and twin beds",
    gallery: [
      {
        src: asset("/images/room-economy.jpg"),
        alt: "Economy room with colorful quilts and twin plus double bed",
      },
      {
        src: asset("/images/seascape-hampton-beach.jpg"),
        alt: "Hampton Beach area with dune grass",
      },
    ],
    amenities: [
      "Double + single bed",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
    ],
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    beds: "2 queen beds",
    rate: 195,
    rateLabel: "Typically from ~$195 / night",
    sleeps: 4,
    size: "Junior suite",
    description:
      "Extra space with two queen beds for a longer stay—still across from the beach with gazebo and BBQ access on the lawn.",
    image: asset("/images/gazebo-bbq.jpg"),
    imageAlt: "Gazebo and BBQ lawn for suite guests",
    gallery: [
      {
        src: asset("/images/gazebo-bbq.jpg"),
        alt: "Gazebo and barbecue area at Seascape Inn",
      },
      {
        src: asset("/images/room-doubles.jpg"),
        alt: "Spacious two-bed room layout",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Inn exterior and courtyard",
      },
    ],
    amenities: [
      "Two queen beds",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
      "Extra space",
    ],
  },
];

export const AMENITIES = [
  {
    title: "Beach across the street",
    detail:
      "North Beach at Plaice Cove is a short walk from your door—about three miles north of the main Hampton Beach boardwalk.",
  },
  {
    title: "Pet-friendly stays",
    detail:
      "One dog up to 40 lbs welcome. Use the on-site pet park or walk about 300 feet to the beach.",
  },
  {
    title: "Gazebo & BBQ lawn",
    detail:
      "Guest BBQ area and gazebo on the lawn—an easy outdoor hang after the beach.",
  },
  {
    title: "Year-round inn",
    detail:
      "About 20 rooms open year-round, with weekly and monthly winter options. AC, fridge, microwave, cable, and free Wi‑Fi in every room.",
  },
];

/** Positive guest notes only — drawn from public TripAdvisor praise. */
export const REVIEWS = [
  {
    id: "r1",
    quote:
      "I was very pleased to find the room very clean and updated. The beach was right across the street, and the front office staff were so accommodating.",
    name: "Anne C.",
    detail: "TripAdvisor · Family stay",
  },
  {
    id: "r2",
    quote:
      "Although small, the rooms were cozy and the location quiet. Access to the beach was quick and convenient.",
    name: "Stefan M.",
    detail: "TripAdvisor · Couple stay",
  },
  {
    id: "r3",
    quote:
      "Seascape is an incredible and quiet place with direct access to a beautiful sandy beach. The staff is really friendly and the rooms were so clean.",
    name: "Karine L.",
    detail: "TripAdvisor · Friends trip",
  },
];

export const NEARBY = [
  {
    title: "North Beach / Plaice Cove",
    detail: "Across Ocean Boulevard — sandy beach for walks, sunsets, and dogs.",
  },
  {
    title: "Hampton Beach center",
    detail: "About 2.5–3 miles south — Casino Ballroom, shops, and the main boardwalk.",
  },
  {
    title: "Portsmouth & Pease",
    detail: "Roughly 10 miles to Portsmouth International at Pease; easy day trip for downtown Portsmouth.",
  },
];

export const POLICIES = [
  {
    id: "booking",
    title: "Online booking",
    body: "Book through RezStream, then call the office at (603) 926-1750 to confirm. Online reservations must be verified by the motel for accuracy.",
  },
  {
    id: "pets",
    title: "Pets",
    body: "Dogs only — one dog up to 40 lbs. Pet park on site; beach walks across the street.",
  },
  {
    id: "checkin",
    title: "Check-in & out",
    body: `Check-in from ${SITE.checkIn}. Check-out by ${SITE.checkOut} EST. Front desk ${SITE.hours.replace("Front desk ", "")}.`,
  },
  {
    id: "payment",
    title: "Payment & smoking",
    body: "Major credit cards accepted. Room charges are typically charged in full (no deposit). Non-smoking property with one designated outdoor smoking area.",
  },
];

export const GALLERY = [
  {
    src: asset("/images/seascape-photo2.jpg"),
    alt: "Sunrise over North Beach near Seascape Inn",
  },
  {
    src: asset("/images/exterior-courtyard.jpg"),
    alt: "Seascape Inn courtyard and guest room balconies",
  },
  {
    src: asset("/images/nh-seawall.jpg"),
    alt: "Hampton Beach sea wall and sandy shore",
  },
  {
    src: asset("/images/gazebo-bbq.jpg"),
    alt: "Gazebo and guest BBQ lawn at Seascape Inn",
  },
  {
    src: asset("/images/room-doubles.jpg"),
    alt: "Guest room with two beds at Seascape Inn",
  },
  {
    src: asset("/images/nh-boardwalk.jpg"),
    alt: "Boardwalk and beach scene at Hampton Beach, New Hampshire",
  },
  {
    src: asset("/images/seascape-vacancy.jpg"),
    alt: "Seascape Inn sign along Ocean Boulevard",
  },
  {
    src: asset("/images/coast-view.jpg"),
    alt: "Coastal view near Hampton Beach",
  },
  {
    src: asset("/images/nh-north-view.jpg"),
    alt: "View of Hampton Beach looking south from the north end",
  },
  {
    src: asset("/images/seascape-hampton-beach.jpg"),
    alt: "Welcome to Hampton Beach sign with dune grass",
  },
];

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export function estimateTotal(roomId, checkIn, checkOut) {
  const room = ROOMS.find((item) => item.id === roomId);
  const nights = nightsBetween(checkIn, checkOut);
  if (!room || !nights) return null;
  return { nights, total: nights * room.rate, rate: room.rate };
}
