import type {
  Album,
  BlogComment,
  BlogPost,
  Conversation,
  ConversationMember,
  FeaturedFriend,
  FeedItem,
  Friendship,
  Message,
  MusicTrack,
  Notification,
  Photo,
  PrivacySettings,
  Profile,
  ProfileComment,
  ProfileTheme,
  Reaction,
  StatusUpdate,
  User,
  Block,
} from "@/lib/types/database";
import { createThemeForProfile, type ThemePresetName } from "@/lib/themes/presets";

const now = Date.now();
const hours = (h: number) => new Date(now - h * 3600_000).toISOString();
const days = (d: number) => new Date(now - d * 86400_000).toISOString();

function avatar(seed: string) {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function photo(seed: string, w = 640, h = 480) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

const defaultVisibility = {
  about_me: "public" as const,
  who_id_like_to_meet: "public" as const,
  interests: "public" as const,
  music: "public" as const,
  movies: "public" as const,
  television: "public" as const,
  books: "public" as const,
  heroes: "public" as const,
  occupation: "public" as const,
  education: "public" as const,
  relationship_status: "friends" as const,
  website: "public" as const,
  age: "public" as const,
  location: "public" as const,
};

type SampleDef = {
  id: string;
  username: string;
  display_name: string;
  email: string;
  pronouns?: string;
  bio: string;
  location: string;
  age: number;
  about_me: string;
  who_id_like_to_meet: string;
  interests: string[];
  music: string[];
  movies: string[];
  television: string[];
  books: string[];
  heroes: string[];
  occupation: string;
  education: string;
  relationship_status: string;
  website?: string;
  status_message: string;
  favorite_music: string;
  theme: ThemePresetName;
  online_status: Profile["online_status"];
  featured_friends_count: 4 | 8 | 12 | 16;
  member_days_ago: number;
  last_active_hours: number;
};

const samples: SampleDef[] = [
  {
    id: "u1",
    username: "nova_skye",
    display_name: "Nova Skye",
    email: "nova@example.com",
    pronouns: "she/they",
    bio: "Night owl · playlist curator · thrift-store maximalist",
    location: "Portland, OR",
    age: 24,
    about_me:
      "I collect stickers, write late-night blog posts, and rearrange my digital scrapbook weekly. MyPlace is where my chaos looks intentional.",
    who_id_like_to_meet:
      "People who send song recommendations at 2am and aren't weird about glitter fonts.",
    interests: ["zines", "roller skating", "thrift fashion", "polaroids", "cats"],
    music: ["indie pop", "shoegaze", "city pop"],
    movies: ["Eternal Sunshine", "Amélie", "The Breakfast Club"],
    television: ["Heartstopper", "Abbott Elementary"],
    books: ["Piranesi", "Normal People"],
    heroes: ["my grandma", "local DJs"],
    occupation: "Barista / illustrator",
    education: "PNW Community College",
    relationship_status: "It's complicated (with my sleep schedule)",
    website: "https://example.com/nova",
    status_message: "Currently rearranging my Featured Friends like furniture ✨",
    favorite_music: "City pop rain-day mix",
    theme: "Bubblegum",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 420,
    last_active_hours: 0.2,
  },
  {
    id: "u2",
    username: "pixel_raven",
    display_name: "Pixel Raven",
    email: "pixel@example.com",
    pronouns: "they/them",
    bio: "Lo-fi beats, high contrast themes, low social energy",
    location: "Austin, TX",
    age: 27,
    about_me:
      "I build weird little games and obsess over CRT scanlines. If your profile has a custom cursor, we are already friends in spirit.",
    who_id_like_to_meet: "Fellow night-shift creatives and anyone with a secret blog.",
    interests: ["pixel art", "chiptune", "arcade cabinets", "horror games"],
    music: ["synthwave", "darkwave", "ambient"],
    movies: ["Blade Runner", "Ghost in the Shell"],
    television: ["Severance", "The Bear"],
    books: ["Neuromancer", "House of Leaves"],
    heroes: ["early web designers"],
    occupation: "Indie game developer",
    education: "Self-taught",
    relationship_status: "Single",
    status_message: "Ship day tomorrow. Send caffeine.",
    favorite_music: "Midnight drive synthwave",
    theme: "Midnight",
    online_status: "away",
    featured_friends_count: 4,
    member_days_ago: 300,
    last_active_hours: 3,
  },
  {
    id: "u3",
    username: "jade_waves",
    display_name: "Jade Waves",
    email: "jade@example.com",
    pronouns: "she/her",
    bio: "Coastal mornings, vinyl evenings",
    location: "Santa Cruz, CA",
    age: 31,
    about_me:
      "Surfer who blogs about tide charts and quiet books. My page is intentionally calm — like a porch after rain.",
    who_id_like_to_meet: "Kind people who love the ocean and terrible puns.",
    interests: ["surfing", "gardening", "film photography", "hiking"],
    music: ["folk", "dream pop", "jazz"],
    movies: ["Call Me by Your Name", "Moonrise Kingdom"],
    television: ["Reservation Dogs"],
    books: ["Braiding Sweetgrass", "The Overstory"],
    heroes: ["Rachel Carson"],
    occupation: "Marine educator",
    education: "UC Santa Cruz",
    relationship_status: "In a relationship",
    status_message: "High tide at 6. See you out there.",
    favorite_music: "Morning folk playlist",
    theme: "Indie",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 510,
    last_active_hours: 1,
  },
  {
    id: "u4",
    username: "echo_void",
    display_name: "Echo Void",
    email: "echo@example.com",
    pronouns: "he/him",
    bio: "Black coffee. Black outfits. Soft heart.",
    location: "Chicago, IL",
    age: 29,
    about_me:
      "Poetry in the notes app. Concerts in sticky-floor venues. My theme is dark on purpose — it matches the setlists.",
    who_id_like_to_meet: "Anyone who still makes mixtapes (digital ones count).",
    interests: ["poetry", "thrift coats", "late trains", "vinyl"],
    music: ["post-punk", "goth rock", "shoegaze"],
    movies: ["The Crow", "Donnie Darko"],
    television: ["Wednesday", "True Detective"],
    books: ["The Bell Jar", "Crush by Richard Siken"],
    heroes: ["Siouxsie Sioux"],
    occupation: "Bookseller",
    education: "DePaul University",
    relationship_status: "Prefer not to say",
    status_message: "New poem draft: 'stations after midnight'",
    favorite_music: "Cathedral reverb playlist",
    theme: "Goth",
    online_status: "offline",
    featured_friends_count: 4,
    member_days_ago: 200,
    last_active_hours: 28,
  },
  {
    id: "u5",
    username: "spark_lee",
    display_name: "Spark Lee",
    email: "spark@example.com",
    pronouns: "she/her",
    bio: "Dance practice videos & neon dreams",
    location: "Brooklyn, NY",
    age: 22,
    about_me:
      "I treat my profile like a stage. Bright colors, loud music module, Featured Friends as my backup dancers.",
    who_id_like_to_meet: "Dancers, producers, and people who clap on the one.",
    interests: ["dance", "K-pop", "fashion", "energy drinks"],
    music: ["pop", "hyperpop", "dance"],
    movies: ["Step Up", "La La Land"],
    television: ["RuPaul's Drag Race"],
    books: ["The House in the Cerulean Sea"],
    heroes: ["my dance coach"],
    occupation: "Dance instructor",
    education: "Tisch (transfer dreams)",
    relationship_status: "Dating",
    website: "https://example.com/spark",
    status_message: "Choreo drop this Friday 🔥",
    favorite_music: "Practice-room bangers",
    theme: "Pop Star",
    online_status: "online",
    featured_friends_count: 12,
    member_days_ago: 90,
    last_active_hours: 0.5,
  },
  {
    id: "u6",
    username: "moss_and_ink",
    display_name: "Moss & Ink",
    email: "moss@example.com",
    pronouns: "he/they",
    bio: "Quiet profile. Loud opinions about fonts.",
    location: "Minneapolis, MN",
    age: 34,
    about_me:
      "Designer who prefers whitespace and honest bios. Proof that personal pages can be expressive without neon chaos.",
    who_id_like_to_meet: "Thoughtful writers and people who annotate their books.",
    interests: ["typography", "espresso", "museum visits", "slow TV"],
    music: ["classical", "ambient", "jazz"],
    movies: ["Paterson", "Perfect Days"],
    television: ["The Great British Bake Off"],
    books: ["Designing Design", "The Creative Act"],
    heroes: ["Dieter Rams", "my high school librarian"],
    occupation: "Product designer",
    education: "MCAD",
    relationship_status: "Married",
    status_message: "Redesigning my About Me for the 40th time.",
    favorite_music: "Focus ambient hour",
    theme: "Minimal",
    online_status: "away",
    featured_friends_count: 4,
    member_days_ago: 600,
    last_active_hours: 5,
  },
  {
    id: "u7",
    username: "chrome_kid",
    display_name: "Chrome Kid",
    email: "chrome@example.com",
    pronouns: "he/him",
    bio: "Y2K forever. Dial-up in my heart.",
    location: "Phoenix, AZ",
    age: 26,
    about_me:
      "I miss the weird web. Custom cursors, blinking stickers, and profiles that felt like bedrooms. Building that energy here — with better contrast.",
    who_id_like_to_meet: "Nostalgia collectors and HTML scrapbookers.",
    interests: ["retro tech", "skating", "memes", "tamagotchis"],
    music: ["eurodance", "early 2000s pop", "trance"],
    movies: ["The Matrix", "Charlie's Angels"],
    television: ["Buffy reruns"],
    books: ["Ready Player One (ironically)"],
    heroes: ["early Flash animators"],
    occupation: "IT support by day, archivist by night",
    education: "ASU",
    relationship_status: "It's complicated",
    status_message: "Just added chrome stickers. Fight me.",
    favorite_music: "Y2K dance floor mix",
    theme: "Y2K",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 45,
    last_active_hours: 0.1,
  },
  {
    id: "u8",
    username: "static_bloom",
    display_name: "Static Bloom",
    email: "static@example.com",
    pronouns: "she/her",
    bio: "Garage rock, thrift denim, coffee rings on notebooks",
    location: "Seattle, WA",
    age: 28,
    about_me:
      "I write messy blogs and take photos of alley murals. My profile looks lived-in on purpose.",
    who_id_like_to_meet: "Band kids and people who still go to matinee shows.",
    interests: ["concerts", "zines", " thrift jeans", "rain"],
    music: ["grunge", "garage rock", "alt"],
    movies: ["Singles", "Almost Famous"],
    television: ["Portlandia"],
    books: ["Just Kids"],
    heroes: ["local open-mic hosts"],
    occupation: "Cafe manager",
    education: "University of Washington",
    relationship_status: "Single",
    status_message: "New album spill coming to the blog tonight.",
    favorite_music: "Rainy garage rock",
    theme: "Grunge",
    online_status: "offline",
    featured_friends_count: 8,
    member_days_ago: 180,
    last_active_hours: 40,
  },
];

export const DEMO_USERS: User[] = samples.map((s) => ({
  id: s.id,
  email: s.email,
  username: s.username,
  created_at: days(s.member_days_ago),
  updated_at: hours(s.last_active_hours),
  last_sign_in_at: hours(s.last_active_hours),
  is_active: true,
  deactivated_at: null,
}));

export const DEMO_PROFILES: Profile[] = samples.map((s) => ({
  id: s.id,
  user_id: s.id,
  username: s.username,
  display_name: s.display_name,
  pronouns: s.pronouns ?? null,
  bio: s.bio,
  location: s.location,
  age: s.age,
  show_age: true,
  occupation: s.occupation,
  education: s.education,
  relationship_status: s.relationship_status,
  website: s.website ?? null,
  avatar_url: avatar(s.username),
  header_image_url: photo(`${s.username}-header`, 1200, 280),
  status_message: s.status_message,
  about_me: s.about_me,
  who_id_like_to_meet: s.who_id_like_to_meet,
  interests: s.interests,
  music: s.music,
  movies: s.movies,
  television: s.television,
  books: s.books,
  heroes: s.heroes,
  favorite_music: s.favorite_music,
  online_status: s.online_status,
  last_active_at: hours(s.last_active_hours),
  profile_views: 120 + Math.floor(Math.random() * 800),
  member_since: days(s.member_days_ago),
  featured_friends_count: s.featured_friends_count,
  field_visibility: { ...defaultVisibility },
  content_warning: null,
  moderation_status: "clean",
  onboarding_complete: true,
  created_at: days(s.member_days_ago),
  updated_at: hours(s.last_active_hours),
}));

export const DEMO_THEMES: ProfileTheme[] = samples.map((s) =>
  createThemeForProfile(s.id, s.theme)
);

export const DEMO_FRIENDSHIPS: Friendship[] = [
  { id: "f1", requester_id: "u1", addressee_id: "u2", status: "accepted", created_at: days(60), updated_at: days(59) },
  { id: "f2", requester_id: "u1", addressee_id: "u3", status: "accepted", created_at: days(50), updated_at: days(49) },
  { id: "f3", requester_id: "u1", addressee_id: "u5", status: "accepted", created_at: days(40), updated_at: days(39) },
  { id: "f4", requester_id: "u1", addressee_id: "u7", status: "accepted", created_at: days(20), updated_at: days(19) },
  { id: "f5", requester_id: "u2", addressee_id: "u4", status: "accepted", created_at: days(80), updated_at: days(79) },
  { id: "f6", requester_id: "u2", addressee_id: "u6", status: "accepted", created_at: days(70), updated_at: days(69) },
  { id: "f7", requester_id: "u3", addressee_id: "u6", status: "accepted", created_at: days(55), updated_at: days(54) },
  { id: "f8", requester_id: "u3", addressee_id: "u8", status: "accepted", created_at: days(30), updated_at: days(29) },
  { id: "f9", requester_id: "u5", addressee_id: "u7", status: "accepted", created_at: days(15), updated_at: days(14) },
  { id: "f10", requester_id: "u4", addressee_id: "u8", status: "accepted", created_at: days(25), updated_at: days(24) },
  { id: "f11", requester_id: "u5", addressee_id: "u3", status: "accepted", created_at: days(12), updated_at: days(11) },
  { id: "f12", requester_id: "u8", addressee_id: "u1", status: "accepted", created_at: days(10), updated_at: days(9) },
  { id: "f13", requester_id: "u4", addressee_id: "u1", status: "pending", created_at: hours(6), updated_at: hours(6) },
  { id: "f14", requester_id: "u6", addressee_id: "u1", status: "pending", created_at: hours(20), updated_at: hours(20) },
  { id: "f15", requester_id: "u2", addressee_id: "u5", status: "accepted", created_at: days(8), updated_at: days(7) },
];

export const DEMO_FEATURED_FRIENDS: FeaturedFriend[] = [
  { id: "ff1", profile_id: "u1", friend_profile_id: "u2", position: 0, created_at: days(30) },
  { id: "ff2", profile_id: "u1", friend_profile_id: "u3", position: 1, created_at: days(30) },
  { id: "ff3", profile_id: "u1", friend_profile_id: "u5", position: 2, created_at: days(30) },
  { id: "ff4", profile_id: "u1", friend_profile_id: "u7", position: 3, created_at: days(30) },
  { id: "ff5", profile_id: "u1", friend_profile_id: "u8", position: 4, created_at: days(30) },
  { id: "ff6", profile_id: "u1", friend_profile_id: "u6", position: 5, created_at: days(30) },
  { id: "ff7", profile_id: "u1", friend_profile_id: "u4", position: 6, created_at: days(30) },
  { id: "ff8", profile_id: "u1", friend_profile_id: "u2", position: 7, created_at: days(30) },
  { id: "ff9", profile_id: "u2", friend_profile_id: "u1", position: 0, created_at: days(20) },
  { id: "ff10", profile_id: "u2", friend_profile_id: "u4", position: 1, created_at: days(20) },
  { id: "ff11", profile_id: "u2", friend_profile_id: "u6", position: 2, created_at: days(20) },
  { id: "ff12", profile_id: "u2", friend_profile_id: "u5", position: 3, created_at: days(20) },
  { id: "ff13", profile_id: "u5", friend_profile_id: "u1", position: 0, created_at: days(10) },
  { id: "ff14", profile_id: "u5", friend_profile_id: "u7", position: 1, created_at: days(10) },
  { id: "ff15", profile_id: "u5", friend_profile_id: "u3", position: 2, created_at: days(10) },
  { id: "ff16", profile_id: "u5", friend_profile_id: "u2", position: 3, created_at: days(10) },
];

const softBeep =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const softBeep2 =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

export const DEMO_TRACKS: MusicTrack[] = [
  {
    id: "t1",
    profile_id: "u1",
    title: "Pink Neon Nights",
    artist: "Demo Dreams",
    cover_url: photo("track-neon", 200, 200),
    audio_url: softBeep,
    is_featured: true,
    sort_order: 0,
    created_at: days(10),
  },
  {
    id: "t2",
    profile_id: "u1",
    title: "Sticker Book",
    artist: "Demo Dreams",
    cover_url: photo("track-sticker", 200, 200),
    audio_url: softBeep2,
    is_featured: false,
    sort_order: 1,
    created_at: days(9),
  },
  {
    id: "t3",
    profile_id: "u2",
    title: "CRT Glow",
    artist: "Null Harbor",
    cover_url: photo("track-crt", 200, 200),
    audio_url: softBeep,
    is_featured: true,
    sort_order: 0,
    created_at: days(8),
  },
  {
    id: "t4",
    profile_id: "u3",
    title: "Tide Notes",
    artist: "Harbor Light",
    cover_url: photo("track-tide", 200, 200),
    audio_url: softBeep2,
    is_featured: true,
    sort_order: 0,
    created_at: days(7),
  },
  {
    id: "t5",
    profile_id: "u4",
    title: "After Stations",
    artist: "Void Choir",
    cover_url: photo("track-void", 200, 200),
    audio_url: softBeep,
    is_featured: true,
    sort_order: 0,
    created_at: days(6),
  },
  {
    id: "t6",
    profile_id: "u5",
    title: "Practice Lights",
    artist: "Stage Spark",
    cover_url: photo("track-spark", 200, 200),
    audio_url: softBeep2,
    is_featured: true,
    sort_order: 0,
    created_at: days(5),
  },
  {
    id: "t7",
    profile_id: "u7",
    title: "Dial-Up Disco",
    artist: "Chrome Memory",
    cover_url: photo("track-y2k", 200, 200),
    audio_url: softBeep,
    is_featured: true,
    sort_order: 0,
    created_at: days(4),
  },
  {
    id: "t8",
    profile_id: "u8",
    title: "Alley Feedback",
    artist: "Static Bloom",
    cover_url: photo("track-grunge", 200, 200),
    audio_url: softBeep2,
    is_featured: true,
    sort_order: 0,
    created_at: days(3),
  },
];

export const DEMO_STATUS: StatusUpdate[] = [
  { id: "st1", profile_id: "u1", body: "New theme unlocked: more stickers, zero regrets.", visibility: "public", moderation_status: "clean", created_at: hours(2), updated_at: hours(2) },
  { id: "st2", profile_id: "u2", body: "If your profile doesn't have a music player, what are we even doing?", visibility: "public", moderation_status: "clean", created_at: hours(5), updated_at: hours(5) },
  { id: "st3", profile_id: "u3", body: "Foggy morning + folk playlist = perfect About Me rewrite weather.", visibility: "public", moderation_status: "clean", created_at: hours(8), updated_at: hours(8) },
  { id: "st4", profile_id: "u5", body: "Featured Friends reshuffled. Choreo energy only.", visibility: "public", moderation_status: "clean", created_at: hours(1), updated_at: hours(1) },
  { id: "st5", profile_id: "u7", body: "Just found a translucent glitter cursor. The year is 2003 again.", visibility: "public", moderation_status: "clean", created_at: hours(0.5), updated_at: hours(0.5) },
  { id: "st6", profile_id: "u8", body: "Album spill draft is 1,200 words and counting.", visibility: "friends", moderation_status: "clean", created_at: hours(12), updated_at: hours(12) },
];

export const DEMO_FEED: FeedItem[] = [
  { id: "fi1", actor_id: "u1", type: "status", reference_id: "st1", body: "New theme unlocked: more stickers, zero regrets.", metadata: {}, visibility: "public", created_at: hours(2) },
  { id: "fi2", actor_id: "u5", type: "status", reference_id: "st4", body: "Featured Friends reshuffled. Choreo energy only.", metadata: {}, visibility: "public", created_at: hours(1) },
  { id: "fi3", actor_id: "u7", type: "music", reference_id: "t7", body: "is listening to Dial-Up Disco", metadata: { track: "Dial-Up Disco", artist: "Chrome Memory" }, visibility: "public", created_at: hours(0.8) },
  { id: "fi4", actor_id: "u1", type: "friendship", reference_id: "f4", body: "is now friends with Chrome Kid", metadata: { friend: "chrome_kid" }, visibility: "public", created_at: days(19) },
  { id: "fi5", actor_id: "u3", type: "blog", reference_id: "bp2", body: "published Tide Charts & Quiet Books", metadata: { title: "Tide Charts & Quiet Books" }, visibility: "public", created_at: days(2) },
  { id: "fi6", actor_id: "u2", type: "photo", reference_id: "ph3", body: "uploaded a new photo to Arcade Nights", metadata: { album: "Arcade Nights" }, visibility: "public", created_at: hours(10) },
  { id: "fi7", actor_id: "u8", type: "status", reference_id: "st6", body: "Album spill draft is 1,200 words and counting.", metadata: {}, visibility: "friends", created_at: hours(12) },
  { id: "fi8", actor_id: "u5", type: "comment", reference_id: "pc2", body: "commented on Nova Skye's profile", metadata: {}, visibility: "public", created_at: hours(4) },
];

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    profile_id: "u1",
    title: "Why stickers belong on profiles again",
    body: "Somewhere along the way, social profiles got too tidy. I'm bringing back the scrapbook energy — carefully, accessibly, and with better contrast than 2006 ever managed.\n\nTonight's experiment: Bubblegum theme + Featured Friends grid + a music player that waits for a click.",
    mood: "sparkly",
    currently_listening: "Pink Neon Nights — Demo Dreams",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(3),
    created_at: days(3),
    updated_at: days(3),
  },
  {
    id: "bp2",
    profile_id: "u3",
    title: "Tide Charts & Quiet Books",
    body: "I rebuilt my profile to feel like a morning on the beach: soft colors, honest About Me, and a folk track that doesn't autoplay because manners matter.\n\nAlso: three new photos from the overlook.",
    mood: "calm",
    currently_listening: "Tide Notes — Harbor Light",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(2),
    created_at: days(2),
    updated_at: days(2),
  },
  {
    id: "bp3",
    profile_id: "u4",
    title: "Stations after midnight",
    body: "A short piece about empty platforms and songs that sound like fluorescent lights. The Goth theme stays.",
    mood: "reflective",
    currently_listening: "After Stations — Void Choir",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(5),
    created_at: days(5),
    updated_at: days(5),
  },
  {
    id: "bp4",
    profile_id: "u8",
    title: "Alley murals and feedback pedals",
    body: "Premiere thoughts on a local garage record. Messy notes welcome. Comments from friends only.",
    mood: "amped",
    currently_listening: "Alley Feedback — Static Bloom",
    visibility: "friends",
    moderation_status: "clean",
    published_at: days(1),
    created_at: days(1),
    updated_at: days(1),
  },
  {
    id: "bp5",
    profile_id: "u5",
    title: "Practice room diary #12",
    body: "Eight counts, water breaks, and why my Featured Friends list looks like a dance crew roster.",
    mood: "energized",
    currently_listening: "Practice Lights — Stage Spark",
    visibility: "public",
    moderation_status: "clean",
    published_at: hours(30),
    created_at: hours(30),
    updated_at: hours(30),
  },
];

export const DEMO_BLOG_COMMENTS: BlogComment[] = [
  { id: "bc1", post_id: "bp1", author_id: "u7", body: "YES. Stickers with accessible contrast. Iconic.", moderation_status: "clean", created_at: days(2) },
  { id: "bc2", post_id: "bp1", author_id: "u5", body: "Sending you neon palette inspo later!", moderation_status: "clean", created_at: days(2) },
  { id: "bc3", post_id: "bp2", author_id: "u6", body: "This layout is so peaceful. Love the restraint.", moderation_status: "clean", created_at: days(1) },
  { id: "bc4", post_id: "bp3", author_id: "u2", body: "The fluorescent-lights line hit hard.", moderation_status: "clean", created_at: days(4) },
];

export const DEMO_PROFILE_COMMENTS: ProfileComment[] = [
  { id: "pc1", profile_id: "u1", author_id: "u3", body: "Your page feels like a scrapbook I want to live in.", moderation_status: "clean", created_at: days(4), updated_at: days(4) },
  { id: "pc2", profile_id: "u1", author_id: "u5", body: "Featured Friends goals. Also that playlist slapsss.", moderation_status: "clean", created_at: hours(4), updated_at: hours(4) },
  { id: "pc3", profile_id: "u1", author_id: "u7", body: "Cursor effect when?? Asking for a friend (me).", moderation_status: "clean", created_at: hours(18), updated_at: hours(18) },
  { id: "pc4", profile_id: "u2", author_id: "u1", body: "CRT Glow is permanently stuck in my head.", moderation_status: "clean", created_at: days(1), updated_at: days(1) },
  { id: "pc5", profile_id: "u5", author_id: "u1", body: "Your profile is basically a stage. Obsessed.", moderation_status: "clean", created_at: hours(9), updated_at: hours(9) },
  { id: "pc6", profile_id: "u3", author_id: "u6", body: "The Indie theme is chef's kiss.", moderation_status: "clean", created_at: days(2), updated_at: days(2) },
];

export const DEMO_ALBUMS: Album[] = [
  { id: "al1", profile_id: "u1", title: "Sticker Season", description: "Desk photos and thrift finds", visibility: "public", cover_photo_id: "ph1", created_at: days(20), updated_at: days(2) },
  { id: "al2", profile_id: "u1", title: "Friends & Lights", description: "Hangouts", visibility: "friends", cover_photo_id: "ph2", created_at: days(15), updated_at: days(5) },
  { id: "al3", profile_id: "u2", title: "Arcade Nights", description: "Cabinets and glow", visibility: "public", cover_photo_id: "ph3", created_at: days(12), updated_at: hours(10) },
  { id: "al4", profile_id: "u3", title: "Overlook", description: "Coast mornings", visibility: "public", cover_photo_id: "ph4", created_at: days(8), updated_at: days(2) },
  { id: "al5", profile_id: "u5", title: "Studio Mirror", description: "Practice stills", visibility: "public", cover_photo_id: "ph5", created_at: days(6), updated_at: days(1) },
];

export const DEMO_PHOTOS: Photo[] = [
  { id: "ph1", album_id: "al1", profile_id: "u1", url: photo("nova-desk", 800, 600), caption: "Scrapbook station", visibility: "public", moderation_status: "clean", content_warning: null, sort_order: 0, created_at: days(18) },
  { id: "ph2", album_id: "al2", profile_id: "u1", url: photo("nova-friends", 800, 600), caption: "Friday lights", visibility: "friends", moderation_status: "clean", content_warning: null, sort_order: 0, created_at: days(14) },
  { id: "ph3", album_id: "al3", profile_id: "u2", url: photo("pixel-arcade", 800, 600), caption: "Cabinet #4 still works", visibility: "public", moderation_status: "clean", content_warning: null, sort_order: 0, created_at: hours(10) },
  { id: "ph4", album_id: "al4", profile_id: "u3", url: photo("jade-overlook", 800, 600), caption: "Before the fog lifted", visibility: "public", moderation_status: "clean", content_warning: null, sort_order: 0, created_at: days(2) },
  { id: "ph5", album_id: "al5", profile_id: "u5", url: photo("spark-studio", 800, 600), caption: "Eight-count energy", visibility: "public", moderation_status: "clean", content_warning: null, sort_order: 0, created_at: days(1) },
  { id: "ph6", album_id: "al1", profile_id: "u1", url: photo("nova-stickers", 800, 600), caption: "New sticker haul", visibility: "public", moderation_status: "clean", content_warning: null, sort_order: 1, created_at: days(10) },
];

export const DEMO_CONVERSATIONS: Conversation[] = [
  { id: "c1", created_at: days(10), updated_at: hours(1), last_message_at: hours(1) },
  { id: "c2", created_at: days(8), updated_at: hours(5), last_message_at: hours(5) },
  { id: "c3", created_at: days(4), updated_at: hours(22), last_message_at: hours(22) },
];

export const DEMO_CONVERSATION_MEMBERS: ConversationMember[] = [
  { id: "cm1", conversation_id: "c1", profile_id: "u1", last_read_at: hours(2), muted: false, joined_at: days(10) },
  { id: "cm2", conversation_id: "c1", profile_id: "u5", last_read_at: hours(0.5), muted: false, joined_at: days(10) },
  { id: "cm3", conversation_id: "c2", profile_id: "u1", last_read_at: hours(6), muted: false, joined_at: days(8) },
  { id: "cm4", conversation_id: "c2", profile_id: "u2", last_read_at: hours(4), muted: false, joined_at: days(8) },
  { id: "cm5", conversation_id: "c3", profile_id: "u1", last_read_at: hours(30), muted: false, joined_at: days(4) },
  { id: "cm6", conversation_id: "c3", profile_id: "u3", last_read_at: hours(20), muted: false, joined_at: days(4) },
];

export const DEMO_MESSAGES: Message[] = [
  { id: "m1", conversation_id: "c1", sender_id: "u5", body: "Your Featured Friends layout is giving stage lineup.", moderation_status: "clean", created_at: hours(3), updated_at: hours(3) },
  { id: "m2", conversation_id: "c1", sender_id: "u1", body: "Ha — wait until you see the sticker layer.", moderation_status: "clean", created_at: hours(2.5), updated_at: hours(2.5) },
  { id: "m3", conversation_id: "c1", sender_id: "u5", body: "Sending you a practice track later tonight!", moderation_status: "clean", created_at: hours(1), updated_at: hours(1) },
  { id: "m4", conversation_id: "c2", sender_id: "u2", body: "Did you catch the new CRT Glow mix?", moderation_status: "clean", created_at: hours(6), updated_at: hours(6) },
  { id: "m5", conversation_id: "c2", sender_id: "u1", body: "Listening now. Scanlines forever.", moderation_status: "clean", created_at: hours(5), updated_at: hours(5) },
  { id: "m6", conversation_id: "c3", sender_id: "u3", body: "Coffee on the pier this weekend?", moderation_status: "clean", created_at: hours(22), updated_at: hours(22) },
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", recipient_id: "u1", actor_id: "u4", type: "friend_request", title: "Friend request", body: "Echo Void wants to be friends", link: "/friends", read: false, created_at: hours(6) },
  { id: "n2", recipient_id: "u1", actor_id: "u6", type: "friend_request", title: "Friend request", body: "Moss & Ink wants to be friends", link: "/friends", read: false, created_at: hours(20) },
  { id: "n3", recipient_id: "u1", actor_id: "u5", type: "message", title: "New message", body: "Spark Lee sent you a message", link: "/messages/c1", read: false, created_at: hours(1) },
  { id: "n4", recipient_id: "u1", actor_id: "u5", type: "profile_comment", title: "Profile comment", body: "Spark Lee commented on your profile", link: "/profile/nova_skye", read: true, created_at: hours(4) },
  { id: "n5", recipient_id: "u1", actor_id: "u7", type: "blog_comment", title: "Blog comment", body: "Chrome Kid commented on your blog", link: "/blog/bp1", read: true, created_at: days(2) },
  { id: "n6", recipient_id: "u1", actor_id: "u3", type: "reaction", title: "New reaction", body: "Jade Waves liked your status", link: "/home", read: true, created_at: hours(1.5) },
  { id: "n7", recipient_id: "u1", actor_id: "u2", type: "friend_accepted", title: "Friend accepted", body: "You and Pixel Raven are now friends", link: "/profile/pixel_raven", read: true, created_at: days(59) },
];

export const DEMO_REACTIONS: Reaction[] = [
  { id: "r1", actor_id: "u3", target_type: "status", target_id: "st1", reaction: "heart", created_at: hours(1.5) },
  { id: "r2", actor_id: "u5", target_type: "status", target_id: "st1", reaction: "like", created_at: hours(1.2) },
  { id: "r3", actor_id: "u1", target_type: "feed_item", target_id: "fi3", reaction: "wow", created_at: hours(0.6) },
];

export const DEMO_PRIVACY: PrivacySettings[] = DEMO_PROFILES.map((p) => ({
  profile_id: p.id,
  profile_visibility: "public",
  friend_requests_from: "everyone",
  messages_from: "friends",
  comments_from: "friends",
  photos_visibility: "public",
  show_online_status: true,
  email_notifications: true,
  push_notifications: true,
  notify_friend_requests: true,
  notify_messages: true,
  notify_comments: true,
  notify_reactions: true,
}));

export const DEMO_BLOCKS: Block[] = [];

export const DEMO_BIRTHDAYS = [
  { profile_id: "u5", label: "Spark Lee — tomorrow" },
  { profile_id: "u7", label: "Chrome Kid — in 4 days" },
  { profile_id: "u3", label: "Jade Waves — in 11 days" },
];

export const DEMO_ANNOUNCEMENTS = [
  {
    id: "a1",
    title: "Theme editor upgrade",
    body: "Drag modules, preview live, and get contrast warnings before you publish.",
  },
  {
    id: "a2",
    title: "Featured Friends sizes",
    body: "Choose 4, 8, 12, or 16 friends to spotlight on your profile.",
  },
];

/** Default signed-in demo account */
export const DEMO_SESSION_USER_ID = "u1";
