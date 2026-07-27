export const SITE = {
  name: "Saltline Motel",
  tagline: "Sleep where the tide turns.",
  phone: "(831) 555-0148",
  phoneHref: "tel:+18315550148",
  email: "stay@saltlinemotel.com",
  address: "118 Shore Road, Seabreeze Cove, CA 95060",
  addressShort: "118 Shore Road, Seabreeze Cove",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-122.035%2C36.955%2C-121.995%2C36.975&layer=mapnik&marker=36.965%2C-122.015",
  mapLink:
    "https://www.openstreetmap.org/?mlat=36.965&mlon=-122.015#map=15/36.965/-122.015",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
};

export const ROOMS = [
  {
    id: "ocean-king",
    name: "Ocean King",
    rate: 189,
    rateLabel: "From $189 / night",
    sleeps: 2,
    size: "320 sq ft",
    description:
      "A wide room with a private balcony facing the break. Morning light, salt air, and a king bed made for long sleeps.",
    image: "/images/room-ocean-king.jpg",
    imageAlt: "Bright motel room with ocean-facing window and king bed",
    gallery: [
      {
        src: "/images/room-ocean-king.jpg",
        alt: "Ocean King room with king bed and coastal light",
      },
      {
        src: "/images/room-ocean-king-2.jpg",
        alt: "Ocean King bedding detail with soft morning light",
      },
    ],
    amenities: [
      "King bed",
      "Private balcony",
      "Ocean view",
      "Wi‑Fi",
      "AC / heat",
      "Ensuite shower",
    ],
  },
  {
    id: "dune-double",
    name: "Dune Double",
    rate: 149,
    rateLabel: "From $149 / night",
    sleeps: 4,
    size: "290 sq ft",
    description:
      "Two plush doubles for friends or family, a few sandy steps from the path that leads straight to the beach.",
    image: "/images/room-dune-double.jpg",
    imageAlt: "Cozy guest room with twin beds and soft coastal light",
    gallery: [
      {
        src: "/images/room-dune-double.jpg",
        alt: "Dune Double room with two beds",
      },
      {
        src: "/images/room-dune-double-2.jpg",
        alt: "Dune Double seating area near the window",
      },
    ],
    amenities: [
      "Two double beds",
      "Garden view",
      "Wi‑Fi",
      "AC / heat",
      "Mini fridge",
      "Blackout curtains",
    ],
  },
  {
    id: "tide-suite",
    name: "Tide Suite",
    rate: 239,
    rateLabel: "From $239 / night",
    sleeps: 4,
    size: "480 sq ft",
    description:
      "Our largest stay: sitting nook, kitchenette, and a wraparound porch for watching the tide slip out.",
    image: "/images/room-tide-suite.jpg",
    imageAlt: "Suite living area with soft seating near large windows",
    gallery: [
      {
        src: "/images/room-tide-suite.jpg",
        alt: "Tide Suite living area with lounge seating",
      },
      {
        src: "/images/room-tide-suite-2.jpg",
        alt: "Tide Suite bedroom with wide windows",
      },
    ],
    amenities: [
      "King bed + sofa bed",
      "Kitchenette",
      "Wraparound porch",
      "Wi‑Fi",
      "AC / heat",
      "Coffee maker",
    ],
  },
];

export const AMENITIES = [
  {
    title: "Beach path access",
    detail: "A private boardwalk puts you on the sand in under a minute.",
  },
  {
    title: "Sunrise coffee",
    detail: "Complimentary drip and pastries from 6:30 to 10:00 each morning.",
  },
  {
    title: "Outdoor showers",
    detail: "Rinse the salt off before you step back into your room.",
  },
  {
    title: "Bikes & boards",
    detail: "Cruiser bikes and soft-tops available for guests, weather permitting.",
  },
];

export const REVIEWS = [
  {
    id: "r1",
    quote:
      "We fell asleep to the surf and woke up with coffee on the balcony. Exactly the quiet beach stay we needed.",
    name: "Maya R.",
    detail: "Ocean King · June stay",
  },
  {
    id: "r2",
    quote:
      "The boardwalk made mornings easy with the kids. Rooms were spotless and the staff remembered our names.",
    name: "Chris & Ana L.",
    detail: "Dune Double · August stay",
  },
  {
    id: "r3",
    quote:
      "Tide Suite felt like a tiny home by the water. Porch sunsets became the whole trip.",
    name: "Jordan P.",
    detail: "Tide Suite · October stay",
  },
];

export const NEARBY = [
  {
    title: "Seabreeze Main Beach",
    detail: "2-minute walk — soft sand, gentle break, lifeguards in summer.",
  },
  {
    title: "Harbor Walk",
    detail: "12-minute bike — fish tacos, bait shop coffee, evening lights.",
  },
  {
    title: "Cypress Point Trail",
    detail: "10-minute drive — bluff views and a quiet loop for sunset.",
  },
];

export const POLICIES = [
  {
    id: "cancellation",
    title: "Cancellation",
    body: "Free cancellation up to 48 hours before check-in. Later changes may be charged one night.",
  },
  {
    id: "pets",
    title: "Pets",
    body: "Dogs welcome in Dune Double with a $35 cleaning fee. Please keep pets leashed on motel grounds.",
  },
  {
    id: "parking",
    title: "Parking",
    body: "Free on-site parking for one vehicle per room. Additional spots available on Shore Road.",
  },
  {
    id: "checkin",
    title: "Check-in & out",
    body: `Check-in from ${SITE.checkIn}. Check-out by ${SITE.checkOut}. Early arrival depends on same-day availability.`,
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
