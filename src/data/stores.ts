export type StoreLocation = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  hours: string
  distanceMi: number
  services: string[]
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "store-union",
    name: "Marshalls Union Square",
    address: "129 W 14th St",
    city: "New York",
    state: "NY",
    zip: "10011",
    phone: "(212) 555-0142",
    hours: "Mon–Sat 9:30am–9pm · Sun 10am–8pm",
    distanceMi: 0.8,
    services: ["BOPIS", "In-store returns", "Curbside"],
  },
  {
    id: "store-soho",
    name: "Marshalls SoHo",
    address: "500 Broadway",
    city: "New York",
    state: "NY",
    zip: "10012",
    phone: "(212) 555-0188",
    hours: "Mon–Sat 10am–9pm · Sun 11am–8pm",
    distanceMi: 1.4,
    services: ["BOPIS", "In-store returns"],
  },
  {
    id: "store-bk",
    name: "Marshalls Downtown Brooklyn",
    address: "440 Albee Square W",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    phone: "(718) 555-0160",
    hours: "Mon–Sat 9:30am–9:30pm · Sun 10am–8pm",
    distanceMi: 3.2,
    services: ["BOPIS", "In-store returns", "Curbside"],
  },
  {
    id: "store-jc",
    name: "Marshalls Jersey City",
    address: "30 Mall Dr W",
    city: "Jersey City",
    state: "NJ",
    zip: "07310",
    phone: "(201) 555-0194",
    hours: "Mon–Sat 10am–9pm · Sun 11am–7pm",
    distanceMi: 5.1,
    services: ["BOPIS", "In-store returns"],
  },
  {
    id: "store-hob",
    name: "Marshalls Hoboken",
    address: "59 Newark St",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    phone: "(201) 555-0117",
    hours: "Mon–Sat 10am–8pm · Sun 11am–6pm",
    distanceMi: 4.6,
    services: ["In-store returns"],
  },
]
