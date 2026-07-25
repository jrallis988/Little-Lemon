import type {
  CircleGroup,
  LoopFilter,
  PhotoSet,
  Profile,
  School,
  StudentVerification,
  VibeActivityCategory,
  VibeMoment,
} from "@/lib/types";
import { mockProfiles } from "@/lib/mock/data";

const now = Date.now();
const minsFromNow = (m: number) => new Date(now + m * 60000).toISOString();
const minsAgo = (m: number) => new Date(now - m * 60000).toISOString();
const hoursFromNow = (h: number) => new Date(now + h * 3600000).toISOString();
const daysFromNow = (d: number) => new Date(now + d * 86400000).toISOString();
const photo = (seed: string) => `https://picsum.photos/seed/${seed}/960/640`;

export const loopFilters: Array<{ id: LoopFilter; label: string }> = [
  { id: "now", label: "Now" },
  { id: "school", label: "School" },
  { id: "nearby", label: "Nearby" },
  { id: "following", label: "Following" },
];

export const vibeSchools: School[] = [
  {
    id: "school-northview",
    name: "Northview High",
    city: "Portland",
    state: "OR",
  },
  {
    id: "school-pine-ridge",
    name: "Pine Ridge Middle",
    city: "Portland",
    state: "OR",
  },
];

const enrichmentByProfileId: Record<string, Partial<Profile>> = {
  p1: {
    schoolId: "school-northview",
    grade: "10",
    studentVerified: true,
    schoolOnlyBoundary: true,
    mood: "outside after last bell",
    hereFor: "skate clips, study saves, and real plans",
    hometown: "Portland, OR",
    zodiac: "Aries",
    genderLabel: "nonbinary",
    interestMap: {
      Move: ["skating", "basketball", "film walks"],
      Create: ["35mm photos", "playlist covers"],
      School: ["yearbook", "science lab"],
    },
    nowPlaying: {
      title: "Curb Check",
      artist: "Jordan's Bus Mix",
      externalUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },
  p2: {
    schoolId: "school-pine-ridge",
    grade: "8",
    studentVerified: true,
    mood: "drawing in the margins",
    hereFor: "art friends and cozy game squads",
    hometown: "Austin, TX",
    zodiac: "Virgo",
    genderLabel: "girl",
    interestMap: {
      Create: ["digital art", "stickers", "character design"],
      Play: ["cozy games", "robotics posters"],
    },
    nowPlaying: {
      title: "Frog Sticker Parade",
      artist: "Mira Pixels",
      externalUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
  },
  p3: {
    schoolId: "school-northview",
    grade: "12",
    studentVerified: true,
    mood: "soundcheck brain",
    hereFor: "band people and pickup soccer",
    hometown: "Chicago, IL",
    zodiac: "Gemini",
    genderLabel: "boy",
    interestMap: {
      Music: ["bass", "marching band", "garage shows"],
      Sports: ["soccer", "pickup games"],
    },
  },
  p4: {
    schoolId: "school-northview",
    grade: "10",
    studentVerified: true,
    ghostMode: true,
    mood: "rainy locker notes",
    hereFor: "quiet hangs and photo walks",
    hometown: "Seattle, WA",
    zodiac: "Aquarius",
    genderLabel: "girl/nonbinary",
    interestMap: {
      Create: ["poetry", "journaling", "photography"],
      School: ["library", "study groups"],
    },
  },
  p5: {
    schoolId: "school-northview",
    grade: "11",
    studentVerified: true,
    mood: "locked into a beat",
    hereFor: "music swaps and court runs",
    hometown: "Brooklyn, NY",
    zodiac: "Cancer",
    genderLabel: "boy/nonbinary",
    interestMap: {
      Music: ["production", "synths", "lo-fi drums"],
      Sports: ["basketball", "night runs"],
    },
    nowPlaying: {
      title: "Midnight Hall Pass",
      artist: "Rio Static",
      externalUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  },
  p6: {
    schoolId: "school-pine-ridge",
    grade: "7",
    studentVerified: true,
    mood: "chrome backpack energy",
    hereFor: "soccer, themes, and after-school snacks",
    hometown: "Los Angeles, CA",
    zodiac: "Sagittarius",
    genderLabel: "girl",
    interestMap: {
      Style: ["fashion boards", "page themes", "dance practice"],
      Sports: ["soccer", "volleyball"],
    },
  },
  p7: {
    schoolId: "school-northview",
    grade: "10",
    studentVerified: true,
    mood: "rehearsal mode",
    hereFor: "drama club and late bus conversations",
    hometown: "Philadelphia, PA",
    zodiac: "Virgo",
    genderLabel: "boy",
    interestMap: {
      Stage: ["theater", "set design", "stage makeup"],
      Writing: ["dark poetry", "fanfic drafts"],
    },
  },
};

export const vibeProfiles: Profile[] = mockProfiles.map((profile) => ({
  ...profile,
  ...enrichmentByProfileId[profile.id],
}));

export const studentVerifications: StudentVerification[] = vibeProfiles.map(
  (profile) => ({
    userId: profile.userId,
    schoolId: profile.schoolId ?? "school-northview",
    grade: profile.grade ?? "10",
    status: profile.studentVerified ? "verified" : "pending",
    method: "demo",
    verifiedAt: profile.studentVerified ? minsAgo(7200) : undefined,
  })
);

export const activityCatalog: Array<{
  id: VibeActivityCategory;
  label: string;
  emoji: string;
  popular?: boolean;
}> = [
  { id: "skating", label: "Skating", emoji: "SK8", popular: true },
  { id: "studying", label: "Studying", emoji: "HW", popular: true },
  { id: "basketball", label: "Basketball", emoji: "HOOP", popular: true },
  { id: "gaming", label: "Gaming", emoji: "GG", popular: true },
  { id: "lunch", label: "Lunch", emoji: "BITE", popular: true },
  { id: "music", label: "Music", emoji: "MIX", popular: true },
  { id: "chilling", label: "Chilling", emoji: "CHILL" },
  { id: "gym", label: "Gym", emoji: "GYM" },
  { id: "soccer", label: "Soccer", emoji: "GOAL" },
  { id: "photography", label: "Photography", emoji: "CAM" },
  { id: "shopping", label: "Shopping", emoji: "BAG" },
  { id: "working", label: "Working", emoji: "SHIFT" },
  { id: "driving", label: "Driving", emoji: "RIDE" },
  { id: "other", label: "Something else", emoji: "PLUS" },
];

export const vibeMoments: VibeMoment[] = [
  {
    id: "vibe-skate-live",
    hostId: "u1",
    title: "Skate park after last bell",
    category: "skating",
    status: "live",
    coverUrl: photo("loop-skate-park-orange"),
    locationName: "Maple Street Skate Spot",
    distanceLabel: "0.4 mi",
    schoolId: "school-northview",
    startsAt: minsAgo(24),
    endsAt: minsFromNow(86),
    attendeeIds: ["u1", "u3", "u5", "u6", "u4"],
    hereNowIds: ["u1", "u5", "u6"],
    description:
      "Low-pressure skate clips, curb practice, and a mini photo dump before dinner.",
    updates: [
      {
        id: "vu1",
        authorId: "u1",
        body: "Flat rail is dry. Bring water if you are rolling over.",
        createdAt: minsAgo(16),
        photoUrl: photo("skate-update-rail"),
      },
      {
        id: "vu2",
        authorId: "u5",
        body: "Rio is here with the tiny speaker. Clean playlist so far.",
        createdAt: minsAgo(8),
      },
    ],
    visibility: "school",
  },
  {
    id: "vibe-hoops-soon",
    hostId: "u5",
    title: "Half-court runs before sunset",
    category: "basketball",
    status: "starting_soon",
    coverUrl: photo("loop-basketball-court"),
    locationName: "Northview Outdoor Court",
    distanceLabel: "at school",
    schoolId: "school-northview",
    startsAt: minsFromNow(38),
    endsAt: minsFromNow(130),
    attendeeIds: ["u5", "u1", "u3"],
    hereNowIds: [],
    description:
      "First to 11, rotate teams, no pressure if you are just shooting around.",
    updates: [
      {
        id: "vu3",
        authorId: "u5",
        body: "Starting around 4:30. Need one more for even teams.",
        createdAt: minsAgo(6),
      },
    ],
    visibility: "school",
  },
  {
    id: "vibe-study-live",
    hostId: "u4",
    title: "Bio quiz rescue table",
    category: "studying",
    status: "live",
    coverUrl: photo("loop-library-study"),
    locationName: "Library back tables",
    distanceLabel: "at school",
    schoolId: "school-northview",
    startsAt: minsAgo(12),
    endsAt: minsFromNow(55),
    attendeeIds: ["u4", "u1", "u7"],
    hereNowIds: ["u4", "u7"],
    description:
      "Flash cards, quiet questions, and one shared doc for the diagrams.",
    updates: [
      {
        id: "vu4",
        authorId: "u4",
        body: "We claimed the table by the window. Quizlet link in the group chat.",
        createdAt: minsAgo(10),
      },
    ],
    visibility: "school",
  },
  {
    id: "vibe-gaming-live",
    hostId: "u2",
    title: "Cozy co-op lobby",
    category: "gaming",
    status: "live",
    coverUrl: photo("loop-gaming-cozy"),
    locationName: "Online after homework",
    distanceLabel: "remote",
    schoolId: "school-pine-ridge",
    startsAt: minsAgo(5),
    endsAt: minsFromNow(115),
    attendeeIds: ["u2", "u6", "u1"],
    hereNowIds: ["u2", "u6"],
    description:
      "Cozy game island cleanup, low-volume voice chat, homework check first.",
    updates: [
      {
        id: "vu5",
        authorId: "u2",
        body: "Opening the lobby now. Bring fruit trees if you have extras.",
        createdAt: minsAgo(4),
      },
    ],
    visibility: "friends",
  },
  {
    id: "vibe-lunch-soon",
    hostId: "u6",
    title: "Friday lunch table switch-up",
    category: "lunch",
    status: "starting_soon",
    coverUrl: photo("loop-lunch-table"),
    locationName: "Cafeteria corner tables",
    distanceLabel: "tomorrow",
    schoolId: "school-pine-ridge",
    startsAt: hoursFromNow(22),
    attendeeIds: ["u6", "u2", "u4"],
    hereNowIds: [],
    description:
      "Open table for anyone verified from Pine Ridge. Bring snack opinions.",
    updates: [],
    visibility: "school",
  },
  {
    id: "vibe-music-soon",
    hostId: "u3",
    title: "Band room riff swap",
    category: "music",
    status: "starting_soon",
    coverUrl: photo("loop-band-room"),
    locationName: "Band room hallway",
    distanceLabel: "0.2 mi",
    schoolId: "school-northview",
    startsAt: hoursFromNow(3),
    endsAt: hoursFromNow(4),
    attendeeIds: ["u3", "u5", "u7"],
    hereNowIds: [],
    description:
      "Bring one riff, one voice memo, or just ears. Keep it after-school safe.",
    updates: [
      {
        id: "vu6",
        authorId: "u3",
        body: "Amp is available after jazz band clears out.",
        createdAt: minsAgo(34),
      },
    ],
    visibility: "school",
  },
  {
    id: "vibe-photo-walk",
    hostId: "u4",
    title: "Golden hour photo walk",
    category: "photography",
    status: "ended",
    coverUrl: photo("loop-photo-walk"),
    locationName: "Track bleachers",
    distanceLabel: "ended",
    schoolId: "school-northview",
    startsAt: minsAgo(180),
    endsAt: minsAgo(55),
    attendeeIds: ["u4", "u1", "u2"],
    hereNowIds: [],
    description:
      "Ended with the sky doing exactly what the camera roll needed.",
    updates: [
      {
        id: "vu7",
        authorId: "u4",
        body: "Posting the quiet bleacher shots later tonight.",
        createdAt: minsAgo(62),
        photoUrl: photo("photo-walk-update"),
      },
    ],
    visibility: "public",
  },
];

export const circleGroups: CircleGroup[] = [
  {
    id: "group-music-lovers",
    name: "Music Lovers",
    description:
      "Track swaps, school-safe playlists, beat feedback, and who has aux at lunch.",
    coverUrl: photo("group-music-lovers"),
    schoolId: "school-northview",
    memberIds: ["u1", "u3", "u5", "u7"],
    ownerId: "u3",
    visibility: "school",
    kind: "interest",
  },
  {
    id: "group-photography-club",
    name: "Photography Club",
    description:
      "Film walks, yearbook outtakes, editing tips, and weekly photo prompts.",
    coverUrl: photo("group-photography-club"),
    schoolId: "school-northview",
    memberIds: ["u1", "u2", "u4", "u6"],
    ownerId: "u4",
    visibility: "public",
    kind: "club",
  },
  {
    id: "group-local-hangouts",
    name: "Local Hangouts",
    description:
      "Verified teen plans around school, parks, library tables, and weekend spots.",
    coverUrl: photo("group-local-hangouts"),
    memberIds: ["u1", "u2", "u3", "u4", "u5", "u6", "u7"],
    ownerId: "u1",
    visibility: "public",
    kind: "hangout",
  },
  {
    id: "group-art-design",
    name: "Art & Design",
    description:
      "Sticker sheets, profile themes, poster requests, and hallway art challenges.",
    coverUrl: photo("group-art-design"),
    schoolId: "school-pine-ridge",
    memberIds: ["u2", "u4", "u6", "u7"],
    ownerId: "u2",
    visibility: "school",
    kind: "club",
  },
  {
    id: "group-volleyball",
    name: "Volleyball Open Gym",
    description:
      "Casual open gym reminders, rotation lists, and beginner-friendly drills.",
    coverUrl: photo("group-volleyball-open-gym"),
    schoolId: "school-pine-ridge",
    memberIds: ["u2", "u5", "u6"],
    ownerId: "u6",
    visibility: "school",
    kind: "team",
  },
];

export const photoSets: PhotoSet[] = [
  {
    id: "set-skate-film",
    profileId: "p1",
    title: "Skate park proof",
    mood: "sunny chaos",
    createdAt: minsAgo(260),
    caption: "Real friends, real clips, one very patient filmer.",
    photoUrls: [photo("set-skate-1"), photo("set-skate-2"), photo("set-skate-3")],
    visibility: "public",
  },
  {
    id: "set-art-table",
    profileId: "p2",
    title: "Sticker desk check",
    mood: "tiny icon mode",
    createdAt: minsAgo(520),
    caption: "New frogs, star glasses, and three almost-finished palettes.",
    photoUrls: [photo("set-art-1"), photo("set-art-2"), photo("set-art-3")],
    visibility: "public",
  },
  {
    id: "set-band-room",
    profileId: "p3",
    title: "Band room evidence",
    mood: "loud but worth it",
    createdAt: minsAgo(740),
    caption: "If you can hear the amp buzz in the photo, no you cannot.",
    photoUrls: [photo("set-band-1"), photo("set-band-2")],
    visibility: "friends",
  },
  {
    id: "set-locker-light",
    profileId: "p6",
    title: "Chrome backpack lunch",
    mood: "sparkle cursor offline",
    createdAt: minsAgo(180),
    caption: "Locker mirror fits before soccer practice.",
    photoUrls: [photo("set-locker-1"), photo("set-locker-2"), photo("set-locker-3")],
    visibility: "public",
  },
];

export const scheduledSchoolEvents = [
  {
    id: "event-pep-rally",
    title: "Northview pep rally",
    startsAt: daysFromNow(2),
    locationName: "Main gym",
    schoolId: "school-northview",
    category: "school spirit",
    attendeeIds: ["u1", "u3", "u5", "u7"],
  },
  {
    id: "event-art-night",
    title: "Pine Ridge art night",
    startsAt: daysFromNow(5),
    locationName: "Media center",
    schoolId: "school-pine-ridge",
    category: "art",
    attendeeIds: ["u2", "u6", "u4"],
  },
  {
    id: "event-library-finals",
    title: "Finals quiet hours",
    startsAt: daysFromNow(8),
    locationName: "Northview library",
    schoolId: "school-northview",
    category: "study",
    attendeeIds: ["u1", "u4", "u7"],
  },
];

export const fictionalTracks = [
  {
    id: "track-curb-check",
    title: "Curb Check",
    artist: "Jordan's Bus Mix",
    mood: "after school",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: 48,
  },
  {
    id: "track-frog-sticker",
    title: "Frog Sticker Parade",
    artist: "Mira Pixels",
    mood: "bright",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    likes: 36,
  },
  {
    id: "track-midnight-pass",
    title: "Midnight Hall Pass",
    artist: "Rio Static",
    mood: "late bus",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    likes: 61,
  },
  {
    id: "track-bus-window",
    title: "Bus Window Weather",
    artist: "Skye Notes",
    mood: "rainy",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    likes: 29,
  },
  {
    id: "track-cafeteria-feedback",
    title: "Cafeteria Feedback",
    artist: "Devon Loops",
    mood: "garage",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    likes: 44,
  },
];

export const vibePlaylists = [
  {
    id: "playlist-after-bell",
    title: "After Bell Heat",
    description: "Skate park, open gym, and walk-home tracks.",
    trackIds: ["track-curb-check", "track-midnight-pass", "track-cafeteria-feedback"],
  },
  {
    id: "playlist-study-window",
    title: "Study Window",
    description: "Soft loops for library tables and bus-window homework.",
    trackIds: ["track-bus-window", "track-frog-sticker"],
  },
  {
    id: "playlist-locker-mirror",
    title: "Locker Mirror Lights",
    description: "Bright fictional pop for outfit checks and poster making.",
    trackIds: ["track-frog-sticker", "track-curb-check"],
  },
];
