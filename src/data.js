export const SITE = {
  name: "Seascape Inn",
  shortName: "Seascape Inn",
  tagline: "Beachfront at Plaice Cove, Hampton NH.",
  phone: "(603) 926-1750",
  phoneHref: "tel:+16039261750",
  email: "stay@seascapeinnhamptonnh.com",
  website: "https://seascapeinnhamptonnh.com/",
  tripadvisorUrl:
    "https://www.tripadvisor.com/Hotel_Review-g46111-d667889-Reviews-Seascape_Inn_at_Plaice_Cove-Hampton_New_Hampshire.html",
  address: "955 Ocean Boulevard, Hampton, NH 03842",
  addressShort: "955 Ocean Blvd, Hampton, NH",
  neighborhood: "Plaice Cove · North Beach",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-70.801%2C42.938%2C-70.782%2C42.948&layer=mapnik&marker=42.94326%2C-70.79161",
  mapLink:
    "https://www.openstreetmap.org/?mlat=42.94326&mlon=-70.79161#map=16/42.94326/-70.79161",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  hours: "Front desk 8:30 AM – 10:00 PM",
};

export const ROOMS = [
  {
    id: "ocean-king",
    name: "Ocean King",
    rate: 189,
    rateLabel: "From $189 / night",
    sleeps: 2,
    size: "Comfortable king room",
    description:
      "A bright, cozy room with coastal touches—made for quiet nights after a day on North Beach, right across the street.",
    image: "/images/seascape-beach.jpg",
    imageAlt: "Seascape Inn guest room with white bedding and beach-themed wall art",
    gallery: [
      {
        src: "/images/seascape-beach.jpg",
        alt: "Clean guest room with two beds and BEACH letter wall art",
      },
      {
        src: "/images/room-ocean-king-2.jpg",
        alt: "Soft bedding detail in a bright coastal guest room",
      },
    ],
    amenities: [
      "King or double setup",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
    ],
  },
  {
    id: "dune-double",
    name: "Cove Double",
    rate: 149,
    rateLabel: "From $149 / night",
    sleeps: 4,
    size: "Two-bed room",
    description:
      "A practical room for friends or family—close to the sand, the gazebo lawn, and the quiet stretch of Plaice Cove.",
    image: "/images/room-dune-double.jpg",
    imageAlt: "Guest room with two beds and soft coastal light",
    gallery: [
      {
        src: "/images/room-dune-double.jpg",
        alt: "Cove Double room with two beds",
      },
      {
        src: "/images/seascape-vacancy.jpg",
        alt: "Seascape Inn exterior along Ocean Boulevard",
      },
    ],
    amenities: [
      "Two beds",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
    ],
  },
  {
    id: "tide-suite",
    name: "Plaice Cove Stay",
    rate: 219,
    rateLabel: "From $219 / night",
    sleeps: 4,
    size: "Our roomiest option",
    description:
      "Extra space for a longer Hampton getaway—still steps from the beach path and a short drive from the main Hampton Beach strip.",
    image: "/images/room-tide-suite.jpg",
    imageAlt: "Spacious suite-style seating area near large windows",
    gallery: [
      {
        src: "/images/room-tide-suite.jpg",
        alt: "Sitting area in a larger Seascape Inn room",
      },
      {
        src: "/images/room-tide-suite-2.jpg",
        alt: "Bedroom with wide windows and soft daylight",
      },
    ],
    amenities: [
      "Extra space",
      "Air-conditioning",
      "Refrigerator",
      "Microwave",
      "Cable TV",
      "Free Wi‑Fi",
    ],
  },
];

export const AMENITIES = [
  {
    title: "Beach across the street",
    detail:
      "North Beach at Plaice Cove is a quick walk from your door—sandy, open, and quieter than the main boardwalk.",
  },
  {
    title: "Pet-friendly stays",
    detail:
      "Bring one dog (up to 40 lbs). Guests love the on-site pet park and beach walks right across Ocean Boulevard.",
  },
  {
    title: "Gazebo & BBQ lawn",
    detail:
      "Relax under the gazebo or cook out on the guest BBQ—an easy outdoor hang after the beach.",
  },
  {
    title: "Year-round inn",
    detail:
      "Open all year with weekly and monthly winter options. Rooms include AC, fridge, microwave, cable, and free Wi‑Fi.",
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
    detail: "Across Ocean Boulevard — long sandy beach for walks, sunsets, and dogs.",
  },
  {
    title: "Hampton Beach center",
    detail: "About 3 miles south — Casino Ballroom, shops, and the main boardwalk scene.",
  },
  {
    title: "Portsmouth & Pease",
    detail: "Easy day trip north for dining and downtown Portsmouth; Pease airport nearby.",
  },
];

export const POLICIES = [
  {
    id: "pets",
    title: "Pets",
    body: "Pet-friendly inn: one dog up to 40 lbs. Enjoy the pet park on site and beach walks across the street.",
  },
  {
    id: "checkin",
    title: "Check-in & out",
    body: `Check-in from ${SITE.checkIn}. Check-out by ${SITE.checkOut}. Front desk hours ${SITE.hours.replace("Front desk ", "")}.`,
  },
  {
    id: "cancellation",
    title: "Cancellation",
    body: "Free cancellation up to 48 hours before check-in when possible. Call the inn to confirm your reservation details.",
  },
  {
    id: "parking",
    title: "Parking",
    body: "On-site parking for guests along Ocean Boulevard at Plaice Cove / North Beach.",
  },
];

export const GALLERY = [
  {
    src: "/images/seascape-photo2.jpg",
    alt: "Sunrise over North Beach near Seascape Inn",
  },
  {
    src: "/images/nh-seawall.jpg",
    alt: "Hampton Beach sea wall and sandy shore",
  },
  {
    src: "/images/seascape-gazebo.jpg",
    alt: "Gazebo and guest BBQ lawn at Seascape Inn",
  },
  {
    src: "/images/nh-boardwalk.jpg",
    alt: "Boardwalk and beach scene at Hampton Beach, New Hampshire",
  },
  {
    src: "/images/seascape-vacancy.jpg",
    alt: "Seascape Inn sign along Ocean Boulevard",
  },
  {
    src: "/images/nh-north-view.jpg",
    alt: "View of Hampton Beach looking south from the north end",
  },
  {
    src: "/images/seascape-hampton-beach.jpg",
    alt: "Welcome to Hampton Beach sign with dune grass",
  },
  {
    src: "/images/seascape-dog-beach.jpg",
    alt: "Busy summer day on the sand near Hampton Beach",
  },
];

/** Mock blocked ranges used for availability checks (ISO dates). */
export const BLOCKED_DATES = {
  "ocean-king": [
    { start: "2026-08-12", end: "2026-08-16" },
    { start: "2026-09-04", end: "2026-09-07" },
  ],
  "dune-double": [{ start: "2026-08-20", end: "2026-08-23" }],
  "tide-suite": [{ start: "2026-07-30", end: "2026-08-03" }],
};

export function rangesOverlap(checkIn, checkOut, start, end) {
  return checkIn < end && checkOut > start;
}

export function isRoomAvailable(roomId, checkIn, checkOut) {
  if (!checkIn || !checkOut || checkOut <= checkIn) return false;
  const blocks = BLOCKED_DATES[roomId] || [];
  return !blocks.some((block) =>
    rangesOverlap(checkIn, checkOut, block.start, block.end)
  );
}

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
