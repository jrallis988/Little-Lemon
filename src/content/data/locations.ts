import type { LocationDoc } from "@/content/types";

export const locations: LocationDoc[] = [
  {
    _type: "location",
    _id: "loc-longwood",
    slug: "longwood",
    name: "Main Campus — Longwood",
    shortName: "Longwood",
    address: "300 Longwood Avenue",
    city: "Boston",
    state: "MA",
    zip: "02115",
    phone: "(617) 355-6000",
    hours: "Open 24 hours for Emergency Department",
    clinicHours: "Monday–Friday, 8 a.m.–5 p.m.; specialty hours vary",
    imageUrl:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Patient and family parking is available in the Boston Children's garage at 333 Longwood Avenue. Valet service is available at the main entrance.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Hospital+300+Longwood+Avenue+Boston+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Hospital+300+Longwood+Avenue+Boston+MA",
    lat: 42.3369,
    lng: -71.1053,
    services: ["Emergency Department", "Specialty clinics", "Surgery", "Imaging"],
    hasEmergency: true,
    hasUrgentCare: false,
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-waltham",
    slug: "waltham",
    name: "Boston Children's Waltham",
    shortName: "Waltham",
    address: "9 Hope Avenue",
    city: "Waltham",
    state: "MA",
    zip: "02453",
    phone: "(781) 216-2000",
    hours: "Clinic hours vary by specialty",
    clinicHours: "Monday–Friday, 7:30 a.m.–8 p.m.; Saturday–Sunday urgent care hours vary",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Free patient parking is available in surface lots and the garage next to the main entrance.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Waltham+9+Hope+Avenue+Waltham+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Waltham+9+Hope+Avenue+Waltham+MA",
    lat: 42.3636,
    lng: -71.2625,
    services: ["Specialty clinics", "Urgent care", "Imaging", "Outpatient surgery"],
    hasUrgentCare: true,
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-needham",
    slug: "needham",
    name: "Boston Children's Needham",
    shortName: "Needham",
    address: "360 1st Avenue",
    city: "Needham",
    state: "MA",
    zip: "02494",
    phone: "(781) 216-2800",
    hours: "Clinic hours vary by specialty",
    clinicHours: "Monday–Friday, 8 a.m.–5 p.m.",
    imageUrl:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Free parking is available in the lot surrounding the building, with accessible spaces near the entrance.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Needham+360+1st+Avenue+Needham+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Needham+360+1st+Avenue+Needham+MA",
    lat: 42.2993,
    lng: -71.2217,
    services: ["Specialty clinics", "Imaging", "Rehabilitation"],
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-lexington",
    slug: "lexington",
    name: "Boston Children's Lexington",
    shortName: "Lexington",
    address: "482 Bedford Street",
    city: "Lexington",
    state: "MA",
    zip: "02420",
    phone: "(781) 216-3000",
    hours: "Clinic hours vary by specialty",
    clinicHours: "Monday–Friday, 8 a.m.–5 p.m.",
    imageUrl:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Complimentary patient parking is available directly outside the clinic.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Lexington+482+Bedford+Street+Lexington+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Lexington+482+Bedford+Street+Lexington+MA",
    lat: 42.4665,
    lng: -71.2421,
    services: ["Specialty clinics", "Primary care partnerships"],
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-peabody",
    slug: "peabody",
    name: "Boston Children's Peabody",
    shortName: "Peabody",
    address: "10 Centennial Drive",
    city: "Peabody",
    state: "MA",
    zip: "01960",
    phone: "(978) 538-3600",
    hours: "Urgent care and specialty hours vary",
    clinicHours: "Monday–Friday, 8 a.m.–5 p.m.; evening and weekend urgent care by schedule",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Free parking is available in the medical office park lot, including accessible spaces at the entrance.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Peabody+10+Centennial+Drive+Peabody+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Peabody+10+Centennial+Drive+Peabody+MA",
    lat: 42.5236,
    lng: -70.9537,
    services: ["Urgent care", "Specialty clinics"],
    hasUrgentCare: true,
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-weymouth",
    slug: "weymouth",
    name: "Boston Children's Weymouth",
    shortName: "Weymouth",
    address: "541 Main Street",
    city: "Weymouth",
    state: "MA",
    zip: "02190",
    phone: "(781) 216-3800",
    hours: "Clinic hours vary by specialty",
    clinicHours: "Monday–Friday, 8 a.m.–5 p.m.",
    imageUrl:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Free patient parking is available in the adjacent surface lot.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+Weymouth+541+Main+Street+Weymouth+MA",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Boston+Children%27s+Weymouth+541+Main+Street+Weymouth+MA",
    lat: 42.1995,
    lng: -70.9457,
    services: ["Specialty clinics", "Laboratory services", "Rehabilitation"],
    hasTelehealth: true,
  },
  {
    _type: "location",
    _id: "loc-north-dartmouth",
    slug: "north-dartmouth",
    name: "Boston Children's North Dartmouth",
    shortName: "North Dartmouth",
    address: "500 Faunce Corner Road",
    city: "North Dartmouth",
    state: "MA",
    zip: "02747",
    phone: "(781) 216-2400",
    hours: "Clinic hours vary by specialty",
    clinicHours: "Monday–Friday, 8 a.m.–4:30 p.m.",
    imageUrl:
      "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=1400&q=80",
    parking:
      "Free parking is available around the outpatient center, with drop-off at the main doors.",
    mapEmbedUrl:
      "https://www.google.com/maps/search/?api=1&query=Boston+Children%27s+North+Dartmouth+500+Faunce+Corner+Road",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=500+Faunce+Corner+Road+North+Dartmouth+MA",
    lat: 41.659,
    lng: -71.0358,
    services: ["Specialty clinics", "Cardiology", "Gastroenterology"],
    hasTelehealth: true,
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
