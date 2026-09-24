/** Campaign photography + mockup plates (public/photos) */
const base = import.meta.env.BASE_URL

export const photos = {
  mayaTrack: `${base}photos/maya-track-dawn.jpg`,
  emptyTrack: `${base}photos/empty-track-dawn.jpg`,
  chalk: `${base}photos/chalk-detail.jpg`,
  mayaStrength: `${base}photos/maya-strength.jpg`,
  jordanGym: `${base}photos/jordan-gym.jpg`,
  mayaAfter: `${base}photos/maya-after.jpg`,
  mayaArrival: `${base}photos/maya-arrival.jpg`,
  oohShelter: `${base}photos/ooh-bus-shelter.jpg`,
  oohBillboard: `${base}photos/ooh-billboard.jpg`,
  oohGym: `${base}photos/ooh-gym-poster.jpg`,
  oohStreet: `${base}photos/ooh-street-poster.jpg`,
  apparelTee: `${base}photos/apparel-tee.jpg`,
  apparelHoodie: `${base}photos/apparel-hoodie.jpg`,
  apparelBag: `${base}photos/apparel-bag.jpg`,
  facilityHall: `${base}photos/facility-hallway.jpg`,
} as const

export type PhotoKey = keyof typeof photos
