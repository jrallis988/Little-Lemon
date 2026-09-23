/** Campaign photography assets (public/photos) */
const base = import.meta.env.BASE_URL

export const photos = {
  mayaTrack: `${base}photos/maya-track-dawn.jpg`,
  emptyTrack: `${base}photos/empty-track-dawn.jpg`,
  chalk: `${base}photos/chalk-detail.jpg`,
  mayaStrength: `${base}photos/maya-strength.jpg`,
  jordanGym: `${base}photos/jordan-gym.jpg`,
  mayaAfter: `${base}photos/maya-after.jpg`,
  mayaArrival: `${base}photos/maya-arrival.jpg`,
} as const

export type PhotoKey = keyof typeof photos
