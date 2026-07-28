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
  lat: 42.94326,
  lon: -70.79161,
  mapLink:
    "https://www.openstreetmap.org/?mlat=42.94326&mlon=-70.79161#map=16/42.94326/-70.79161",
  social: {
    facebook: "https://www.facebook.com/seascape.inn.1",
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  hours: "Front desk 8:30 AM – 10:00 PM",
  typicalRateNote:
    "Use the live calendar below for exact pricing — seasonal ranges are a guide only.",
  trustLine: [
    "Beach across the street",
    "Pet-friendly",
    "Open year-round",
    "About 20 rooms",
  ],
  history: {
    eyebrow: "Our story",
    title: "A North Beach inn since 1953.",
    copy:
      "Founded as the Seascape Motel in 1953 by Hartley C. Rice and later run by longtime resident managers, Seascape Inn still sits three miles north of the main Hampton Beach strip—in quiet Plaice Cove, steps from North Beach.",
    points: [
      "Family-style beach inn with roughly 20 rooms",
      "Quieter North Beach location on Ocean Boulevard",
      "Gazebo lawn, guest BBQ, and a small pet park",
      "Year-round stays, including weekly and monthly winter options",
    ],
  },
};

/** Seasonal guidance based on public “fair value / ~$165 typical” comps. */
export const SEASONAL_RATES = [
  {
    id: "summer",
    name: "Summer",
    when: "June – early September",
    range: "About $165–$240 / night",
    note: "Peak beach weeks book earliest — confirm live rates for weekends and holidays.",
  },
  {
    id: "shoulder",
    name: "Spring & fall",
    when: "April – May · mid-September – October",
    range: "About $120–$180 / night",
    note: "Quieter cove stays with easier parking and cooler beach walks.",
  },
  {
    id: "winter",
    name: "Winter",
    when: "November – March",
    range: "About $90–$150 / night",
    note: "Weekly and monthly winter rentals available — call the office for longer stays.",
  },
];

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
        src: asset("/images/seascape-vacancy.jpg"),
        alt: "Seascape Inn roadside sign",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Courtyard outside guest rooms",
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
        src: asset("/images/view-from-inn.jpg"),
        alt: "Ocean view near the inn property",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Room balconies and courtyard seating",
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
        alt: "Economy room with colorful quilts",
      },
      {
        src: asset("/images/seascape-exterior.jpg"),
        alt: "Seascape Inn exterior along Ocean Boulevard",
      },
      {
        src: asset("/images/seascape-hampton-beach.jpg"),
        alt: "North Beach / Hampton Beach area signage",
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
        src: asset("/images/view-from-inn.jpg"),
        alt: "Water view near Plaice Cove",
      },
      {
        src: asset("/images/exterior-courtyard.jpg"),
        alt: "Inn courtyard and guest walkways",
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

/** Fun day-trip ideas around Hampton Beach & the NH Seacoast. */
export const THINGS_TO_DO = [
  {
    title: "Walk North Beach at Plaice Cove",
    detail:
      "Cross Ocean Boulevard and you’re on the sand—quieter than the main strip, great for sunrise and dog walks.",
    when: "Steps away",
  },
  {
    title: "Hampton Beach boardwalk & Casino Ballroom",
    detail:
      "Arcade lights, shops, and live shows at the historic Casino Ballroom about 3 miles south on Ocean Blvd.",
    when: "About 3 miles",
  },
  {
    title: "Seashell Stage summer concerts",
    detail:
      "Free outdoor music on the Hampton Beach Seashell stage most summer evenings—bring a blanket or grab a bench.",
    when: "Summer evenings",
  },
  {
    title: "Hampton Beach State Park",
    detail:
      "Swim, picnic, and catch the long ocean views at the south end of the beach—easy parking for a full beach day.",
    when: "About 4 miles",
  },
  {
    title: "Rye Harbor & whale watches",
    detail:
      "Head up the coast for harbor views, lobster shacks, and seasonal whale-watching boats out of Rye.",
    when: "About 10 minutes",
  },
  {
    title: "Odiorne Point & Seacoast Science Center",
    detail:
      "Tide pools, rocky shoreline trails, and the Seacoast Science Center—perfect for kids and rainy-day backups.",
    when: "About 15 minutes",
  },
  {
    title: "Portsmouth Market Square",
    detail:
      "Brick sidewalks, waterfront restaurants, breweries, and Prescott Park— an easy evening out about 20 minutes north.",
    when: "About 20 minutes",
  },
  {
    title: "Water Country",
    detail:
      "New England’s largest water park in nearby Rochester—a classic hot-day outing for families.",
    when: "About 25 minutes · Seasonal",
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
    body: "Dogs only — one dog up to 40 lbs. Pet park on site; beach walks across the street. Prior registration required.",
  },
  {
    id: "checkin",
    title: "Check-in & out",
    body: `Check-in from ${SITE.checkIn}. Check-out by ${SITE.checkOut} EST. Front desk ${SITE.hours.replace("Front desk ", "")}.`,
  },
  {
    id: "payment",
    title: "Payment & smoking",
    body: "Major credit cards accepted. Deposit or payment terms appear at checkout and on your confirmation — confirm with the front desk if unsure. Non-smoking indoors with a designated outdoor smoking area.",
  },
];

export const FAQ_SECTIONS = [
  {
    id: "reservations",
    title: "Reservations",
    items: [
      {
        question: "How can I make a reservation?",
        answer:
          "Click Book a stay on this site, enter your dates, choose a room, and follow the prompts on our RezStream booking calendar. You can also reserve by calling the front desk at (603) 926-1750.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations must be made within the time frame on your booking confirmation to qualify for a refund. Late cancellations or no-shows forfeit the deposit or the full charge of the reservation.",
      },
      {
        question: "Is a deposit required to reserve a room?",
        answer:
          "A deposit or full payment may be due at booking as shown during online checkout. Confirm the exact amount and timing on your reservation confirmation or with the front desk.",
      },
      {
        question: "What forms of payment do you accept?",
        answer:
          "We accept all major credit cards and approved digital payment methods securely through our booking platform.",
      },
      {
        question: "Is there a minimum stay requirement?",
        answer:
          "Minimum stay requirements may apply during peak seasons, holidays, or weekends. Check your dates in the booking calendar for any active requirements.",
      },
    ],
  },
  {
    id: "policies",
    title: "Hotel policies",
    items: [
      {
        question: "What are your check-in and check-out times?",
        answer: `Check-in begins at ${SITE.checkIn}, and check-out is by ${SITE.checkOut}. Always confirm times on your reservation confirmation.`,
      },
      {
        question: "What is the minimum age to check in?",
        answer:
          "Guests must be at least 18 years of age with a valid government-issued photo ID to check in and reserve a room.",
      },
      {
        question: "Does the hotel allow pets?",
        answer:
          "Yes — dogs only, one dog up to 40 lbs. Prior registration is required, and guests must follow our pet guidelines. Use the on-site pet park or walk about 300 feet to the beach.",
      },
      {
        question: "Can I check in early and check out late?",
        answer:
          "Early check-ins and late check-outs are subject to availability and must be requested in advance. Additional fees may apply for late departures.",
      },
      {
        question: "What is your smoking policy?",
        answer:
          "Seascape Inn is strictly non-smoking indoors. Tobacco, cannabis, and e-cigarettes are prohibited in rooms and common areas. A designated outdoor smoking area is provided.",
      },
      {
        question: "Are children allowed?",
        answer:
          "Yes, families are welcome. Minors must be accompanied by an adult parent or guardian at all times.",
      },
    ],
  },
  {
    id: "amenities",
    title: "Amenities",
    items: [
      {
        question: "What amenities are available during my stay?",
        answer:
          "Comfortable rooms with free Wi‑Fi, parking, in-room fridge and microwave, cable TV, a gazebo lawn with guest BBQ, and a small pet park—plus North Beach across the street.",
      },
      {
        question: "Is parking free?",
        answer: "Yes. Complimentary on-site parking is available for registered guests.",
      },
      {
        question: "Do you have a pool?",
        answer:
          "No pool on site — but North Beach at Plaice Cove is just across Ocean Boulevard.",
      },
      {
        question: "Do you serve breakfast?",
        answer:
          "Complimentary continental breakfast may be offered depending on season and staffing. Please confirm current breakfast details with the front desk when you book or check in.",
      },
      {
        question: "Is there Wi‑Fi available? Is it free?",
        answer:
          "Yes. High-speed wireless internet is available throughout the property and is free for all registered guests.",
      },
    ],
  },
  {
    id: "direct-booking",
    title: "Direct booking benefits",
    items: [
      {
        question: "Does booking directly on your website ensure I get the best rate?",
        answer:
          "Yes. Booking directly through Seascape Inn gives you our best available rate and direct customer support—without third-party booking friction.",
      },
      {
        question: "What are the benefits of booking direct?",
        answer:
          "Transparent pricing, direct communication with our front desk for special requests, and access to the best available rates.",
      },
      {
        question: "Is it easier to change or cancel when booking direct?",
        answer:
          "Yes. Managing your reservation with us is usually smoother for modifications or cancellations than booking through a third-party travel site.",
      },
      {
        question: "How do I make sure I book direct?",
        answer:
          "Use this website’s Book a stay / Rates calendar, or call the front desk at (603) 926-1750.",
      },
    ],
  },
  {
    id: "location-faq",
    title: "Location",
    items: [
      {
        question: "What’s the closest airport?",
        answer:
          "The closest regional option is Portsmouth International Airport at Pease (PSM). Boston Logan (BOS) and Manchester-Boston Regional (MHT) are also within a convenient drive.",
      },
      {
        question: "How close is the hotel to the beach?",
        answer:
          "North Beach at Plaice Cove is right across Ocean Boulevard—steps from your door at 955 Ocean Blvd.",
      },
      {
        question: "Are there activities within walking distance?",
        answer:
          "Yes. Guests can walk to the beach, coastal paths, and nearby stretches of Ocean Boulevard for dining and scenic walks.",
      },
      {
        question: "What is there to do in the area?",
        answer:
          "Coastal exploration, the Hampton Beach boardwalk and Casino Ballroom, seasonal events, restaurants, Portsmouth day trips, Rye Harbor, and outdoor recreation—see our Things to do list above.",
      },
      {
        question: "Is there public transportation nearby?",
        answer:
          "Local transit options and ride services are available in the area to help you get around the Seacoast.",
      },
    ],
  },
  {
    id: "vouchers",
    title: "Vouchers & future credits",
    items: [
      {
        question: "Do you offer physical or digital gift cards?",
        answer:
          "We do not currently offer traditional gift cards for purchase. We can provide custom digital stay vouchers and promotional resort credits for returning guests or special packages—contact our team to learn more about gifting a stay.",
      },
      {
        question: "How can a stay credit or future voucher be redeemed?",
        answer:
          "Apply vouchers and stay credits toward room reservations by referencing your unique voucher code when booking with our front desk team.",
      },
    ],
  },
];

export const COOKIE_POLICY = {
  title: "Cookie policy",
  updated: "July 28, 2026",
  intro:
    "Welcome to Seascape Inn. This Cookie Policy explains how we use cookies and similar tracking technologies on our website to recognize you when you visit, remember your preferences, and support our booking and reservation platform.",
  sections: [
    {
      title: "What are cookies?",
      body: "Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work efficiently, as well as to provide reporting information.",
    },
    {
      title: "How we use cookies",
      body: "We use cookies for several essential purposes:",
      bullets: [
        "Essential & session cookies — Required to operate our website, maintain your secure session, and process room reservations safely.",
        "Functional cookies — Used to remember your preferences and settings (such as language or check-in details) to enhance your experience.",
        "Analytical & performance cookies — Help us understand how visitors interact with our website by collecting and reporting information anonymously, so we can improve site performance. These load only if you opt in.",
      ],
    },
    {
      title: "Managing or disabling cookies",
      body: "Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. You can also use the cookie banner on this site to accept essential-only cookies or manage analytics preferences. Disabling essential or session cookies may prevent you from completing a reservation.",
    },
    {
      title: "Updates to this cookie policy",
      body: "We may update this Cookie Policy from time to time to reflect operational, legal, or regulatory changes. Please revisit this page periodically to stay informed about our use of cookies.",
    },
    {
      title: "Contact us",
      body: `If you have questions about our use of cookies, please call ${SITE.phone} or email ${SITE.email}.`,
    },
  ],
};

export const PRIVACY_POLICY = {
  title: "Privacy policy",
  updated: "July 28, 2026",
  intro:
    "This Privacy Policy describes how Seascape Inn collects, uses, and protects information when you visit our website, send an inquiry, or book a stay.",
  sections: [
    {
      title: "Information we collect",
      body: "We may collect contact details and stay information you provide (such as name, email, phone, preferred dates, room preference, and notes), plus technical data needed to run the site (such as IP address, browser type, and pages visited when analytics are enabled).",
    },
    {
      title: "How we use information",
      body: "We use your information to respond to inquiries, process and confirm reservations, communicate about your stay, improve the website, and meet legal or operational requirements.",
    },
    {
      title: "Sharing",
      body: "We share information with service providers needed to operate booking and communications (for example RezStream for reservations and Formsubmit/Formspree for inquiry delivery). We do not sell personal information.",
    },
    {
      title: "Data retention & security",
      body: "We keep reservation and inquiry information only as long as needed for guest service and business records. We use reasonable safeguards, but no online transmission is fully secure.",
    },
    {
      title: "Your choices",
      body: "You may request access, correction, or deletion of inquiry details by contacting us. You can also manage analytics cookies through the cookie banner or your browser settings.",
    },
    {
      title: "Contact",
      body: `Questions about privacy: call ${SITE.phone} or email ${SITE.email}. Seascape Inn, ${SITE.address}.`,
    },
  ],
};

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
    src: asset("/images/view-from-inn.jpg"),
    alt: "Ocean view near Plaice Cove",
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
