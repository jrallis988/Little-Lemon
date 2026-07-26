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
    bio: "sophomore · sticker maxxer · playlist in the bio",
    location: "Portland, OR",
    age: 15,
    about_me:
      "I rearrange my Featured Friends like lockers and rewrite my About Me every Sunday. Vibe is where my chaos looks intentional — stickers, photos, and a music player that actually waits for a click.",
    who_id_like_to_meet:
      "Teens who send song recs at midnight and aren't weird about glitter fonts.",
    interests: ["thrifting", "roller skating", "stickers", "cats", "editing edits"],
    music: ["indie pop", "bedroom pop", "city pop"],
    movies: ["Spider-Verse", "The Edge of Seventeen", "Turning Red"],
    television: ["Heartstopper", "Wednesday"],
    books: ["They Both Die at the End", "Cemetery Boys"],
    heroes: ["my older cousin", "my art teacher"],
    occupation: "Student · yearbook photo team",
    education: "Lincoln High · 10th grade",
    relationship_status: "It's complicated (with my sleep schedule)",
    website: "https://example.com/nova",
    status_message: "rewrote my theme again. Featured Friends stay undefeated ✨",
    favorite_music: "Late-night locker mix",
    theme: "Bubblegum",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 120,
    last_active_hours: 0.2,
  },
  {
    id: "u2",
    username: "pixel_raven",
    display_name: "Pixel Raven",
    email: "pixel@example.com",
    pronouns: "they/them",
    bio: "ranked grind by day · profile themes by night",
    location: "Austin, TX",
    age: 16,
    about_me:
      "I make tiny games in class when I'm supposed to be taking notes. If your profile has a custom cursor, we're already friends in spirit.",
    who_id_like_to_meet: "Quiet gamers, pixel artists, and anyone with a secret blog.",
    interests: ["pixel art", "Roblox studio", "horror games", "anime"],
    music: ["phonk", "lo-fi", "synthwave"],
    movies: ["Everything Everywhere", "Nimona"],
    television: ["Arcane", "The Owl House"],
    books: ["Legendborn", "Six of Crows"],
    heroes: ["my coding club mentor"],
    occupation: "Student · esports club",
    education: "Westlake High · 11th grade",
    relationship_status: "Single",
    status_message: "queueing ranked. don't @ me unless it's about themes.",
    favorite_music: "Focus grind playlist",
    theme: "Midnight",
    online_status: "away",
    featured_friends_count: 4,
    member_days_ago: 90,
    last_active_hours: 3,
  },
  {
    id: "u3",
    username: "jade_waves",
    display_name: "Jade Waves",
    email: "jade@example.com",
    pronouns: "she/her",
    bio: "sunrise practices · soft themes · soft launches",
    location: "Santa Cruz, CA",
    age: 14,
    about_me:
      "Beach mornings, volleyball afternoons, and a profile that feels calm on purpose. I blog about meets, playlists, and the weird birds at the pier.",
    who_id_like_to_meet: "Kind teens who love the ocean, sports, and terrible puns.",
    interests: ["volleyball", "surfing", "film photos", "hiking"],
    music: ["indie folk", "dream pop", "alt"],
    movies: ["Luca", "The Half of It"],
    television: ["Outer Banks (for the vibes)", "Avatar"],
    books: ["I Am Not Your Perfect Mexican Daughter"],
    heroes: ["my coach", "my sister"],
    occupation: "Student · JV volleyball",
    education: "Harbor Middle / rising 9th",
    relationship_status: "Talking",
    status_message: "practice at 6. then rewriting About Me again.",
    favorite_music: "Morning warm-up mix",
    theme: "Indie",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 60,
    last_active_hours: 1,
  },
  {
    id: "u4",
    username: "echo_void",
    display_name: "Echo Void",
    email: "echo@example.com",
    pronouns: "he/him",
    bio: "black hoodie season · notes-app poetry",
    location: "Chicago, IL",
    age: 17,
    about_me:
      "I write poems on the train home and keep my theme dark on purpose. Soft heart, loud headphones, Featured Friends who get it.",
    who_id_like_to_meet: "Band kids, writers, and anyone who still makes playlists with titles.",
    interests: ["poetry", "thrift coats", "sketching", "night walks"],
    music: ["emo", "alt rock", "shoegaze"],
    movies: ["Coraline", "Scott Pilgrim"],
    television: ["Wednesday", "Heartstopper"],
    books: ["The Perks of Being a Wallflower", "Clap When You Land"],
    heroes: ["my English teacher"],
    occupation: "Student · literary magazine",
    education: "Northside Prep · 12th grade",
    relationship_status: "Prefer not to say",
    status_message: "new draft: 'stations after last bell'",
    favorite_music: "Rainy window playlist",
    theme: "Goth",
    online_status: "offline",
    featured_friends_count: 4,
    member_days_ago: 150,
    last_active_hours: 28,
  },
  {
    id: "u5",
    username: "spark_lee",
    display_name: "Spark Lee",
    email: "spark@example.com",
    pronouns: "she/her",
    bio: "dance team captain energy · neon forever",
    location: "Brooklyn, NY",
    age: 15,
    about_me:
      "I treat my profile like a stage. Bright colors, loud music module, Featured Friends as my backup dancers. Competition season is chaos and I love it.",
    who_id_like_to_meet: "Dancers, editors, and people who clap on the one.",
    interests: ["dance", "K-pop", "fashion", "TikTok edits"],
    music: ["pop", "hyperpop", "K-pop"],
    movies: ["Feel the Beat", "Encanto"],
    television: ["Survival shows (ironically)", "Heartstopper"],
    books: ["The House in the Cerulean Sea"],
    heroes: ["my dance coach", "my mom"],
    occupation: "Student · dance team",
    education: "Brooklyn Arts High · 10th grade",
    relationship_status: "Crushing",
    website: "https://example.com/spark",
    status_message: "choreo drop after school 🔥 don't miss it",
    favorite_music: "Practice-room bangers",
    theme: "Pop Star",
    online_status: "online",
    featured_friends_count: 12,
    member_days_ago: 45,
    last_active_hours: 0.5,
  },
  {
    id: "u6",
    username: "moss_and_ink",
    display_name: "Moss & Ink",
    email: "moss@example.com",
    pronouns: "he/they",
    bio: "quiet profile · loud opinions about fonts",
    location: "Minneapolis, MN",
    age: 16,
    about_me:
      "Yearbook layout kid. Proof you can be expressive without neon chaos. I collect pens, annotate books, and redesign my About Me constantly.",
    who_id_like_to_meet: "Quiet creatives, writers, and people who actually read captions.",
    interests: ["drawing", "yearbook", "museums", "journaling"],
    music: ["bedroom indie", "ambient", "jazz"],
    movies: ["Paddington 2", "The Mitchells vs the Machines"],
    television: ["Great British Bake Off"],
    books: ["A Wizard of Earthsea", "Aristotle and Dante"],
    heroes: ["my librarian", "my art teacher"],
    occupation: "Student · yearbook editor",
    education: "South High · 11th grade",
    relationship_status: "Single",
    status_message: "redesigning my About Me for the 40th time (worth it).",
    favorite_music: "Study hall ambient",
    theme: "Minimal",
    online_status: "away",
    featured_friends_count: 4,
    member_days_ago: 200,
    last_active_hours: 5,
  },
  {
    id: "u7",
    username: "chrome_kid",
    display_name: "Chrome Kid",
    email: "chrome@example.com",
    pronouns: "he/him",
    bio: "Y2K core · skate decks · sticky notes everywhere",
    location: "Phoenix, AZ",
    age: 13,
    about_me:
      "Middle school, maximum chrome. I want profiles that feel like bedrooms again — stickers, playlists, and friends who leave actual comments. Contrast matters tho.",
    who_id_like_to_meet: "Skaters, meme archivists, and fellow theme experimenters.",
    interests: ["skating", "memes", "retro tech", "slime videos"],
    music: ["hyperpop", "early 2000s pop", "phonk"],
    movies: ["Spider-Verse", "Lilo & Stitch"],
    television: ["Gravity Falls", "The Amazing Digital Circus"],
    books: ["Diary of a Wimpy Kid (no shame)", "Percy Jackson"],
    heroes: ["my cousin who codes", "my skate coach"],
    occupation: "Student · skate club",
    education: "Desert Vista Middle · 8th grade",
    relationship_status: "It's complicated",
    status_message: "added chrome stickers. fight me (nicely).",
    favorite_music: "Y2K dance floor mix",
    theme: "Y2K",
    online_status: "online",
    featured_friends_count: 8,
    member_days_ago: 20,
    last_active_hours: 0.1,
  },
  {
    id: "u8",
    username: "static_bloom",
    display_name: "Static Bloom",
    email: "static@example.com",
    pronouns: "she/her",
    bio: "garage band · thrift denim · rainy sidewalk pics",
    location: "Seattle, WA",
    age: 17,
    about_me:
      "I write messy blogs and take photos of alley murals between band practice. My profile looks lived-in on purpose.",
    who_id_like_to_meet: "Band kids and people who still go to all-ages shows.",
    interests: ["guitar", "concerts", "film photos", "thrift jeans"],
    music: ["grunge", "indie rock", "alt"],
    movies: ["School of Rock", "Sing Street"],
    television: ["Heartstopper", "Stranger Things"],
    books: ["I'll Give You the Sun"],
    heroes: ["our drummer", "my music teacher"],
    occupation: "Student · garage band",
    education: "Rainier High · 12th grade",
    relationship_status: "Single",
    status_message: "setlist draft in the blog tonight. friends only.",
    favorite_music: "Rainy practice room rock",
    theme: "Grunge",
    online_status: "offline",
    featured_friends_count: 8,
    member_days_ago: 75,
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
    title: "Locker Lights",
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
    title: "Queue Hop",
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
    title: "Court Sunrise",
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
    title: "After Last Bell",
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
    title: "Chrome Recess",
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
    title: "Garage Warmup",
    artist: "Static Bloom",
    cover_url: photo("track-grunge", 200, 200),
    audio_url: softBeep2,
    is_featured: true,
    sort_order: 0,
    created_at: days(3),
  },
];

export const DEMO_STATUS: StatusUpdate[] = [
  { id: "st1", profile_id: "u1", body: "new theme unlocked: more stickers, zero regrets.", visibility: "public", moderation_status: "clean", created_at: hours(2), updated_at: hours(2) },
  { id: "st2", profile_id: "u2", body: "if your profile doesn't have a music player what are we even doing", visibility: "public", moderation_status: "clean", created_at: hours(5), updated_at: hours(5) },
  { id: "st3", profile_id: "u3", body: "foggy practice + warm-up playlist = About Me rewrite weather", visibility: "public", moderation_status: "clean", created_at: hours(8), updated_at: hours(8) },
  { id: "st4", profile_id: "u5", body: "Featured Friends reshuffled. choreo energy only.", visibility: "public", moderation_status: "clean", created_at: hours(1), updated_at: hours(1) },
  { id: "st5", profile_id: "u7", body: "glitter cursor acquired. middle school Y2K wins again.", visibility: "public", moderation_status: "clean", created_at: hours(0.5), updated_at: hours(0.5) },
  { id: "st6", profile_id: "u8", body: "setlist spill draft is 1,200 words and counting (friends only)", visibility: "friends", moderation_status: "clean", created_at: hours(12), updated_at: hours(12) },
];

export const DEMO_FEED: FeedItem[] = [
  { id: "fi1", actor_id: "u1", type: "status", reference_id: "st1", body: "new theme unlocked: more stickers, zero regrets.", metadata: {}, visibility: "public", created_at: hours(2) },
  { id: "fi2", actor_id: "u5", type: "status", reference_id: "st4", body: "Featured Friends reshuffled. choreo energy only.", metadata: {}, visibility: "public", created_at: hours(1) },
  { id: "fi3", actor_id: "u7", type: "music", reference_id: "t7", body: "is listening to Chrome Recess", metadata: { track: "Chrome Recess", artist: "Chrome Memory" }, visibility: "public", created_at: hours(0.8) },
  { id: "fi4", actor_id: "u1", type: "friendship", reference_id: "f4", body: "is now friends with Chrome Kid", metadata: { friend: "chrome_kid" }, visibility: "public", created_at: days(19) },
  { id: "fi5", actor_id: "u3", type: "blog", reference_id: "bp2", body: "published Court mornings & quiet playlists", metadata: { title: "Court mornings & quiet playlists" }, visibility: "public", created_at: days(2) },
  { id: "fi6", actor_id: "u2", type: "photo", reference_id: "ph3", body: "uploaded a new photo to Arcade Nights", metadata: { album: "Arcade Nights" }, visibility: "public", created_at: hours(10) },
  { id: "fi7", actor_id: "u8", type: "status", reference_id: "st6", body: "setlist spill draft is 1,200 words and counting (friends only)", metadata: {}, visibility: "friends", created_at: hours(12) },
  { id: "fi8", actor_id: "u5", type: "comment", reference_id: "pc2", body: "commented on Nova Skye's profile", metadata: {}, visibility: "public", created_at: hours(4) },
];

export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    profile_id: "u1",
    title: "why stickers belong on profiles again",
    body: "ok so feeds made everyone look the same and i'm done. i want a page that feels like my backpack — stickers, songs, friends, chaos, but like... readable.\n\ntonight's experiment: Bubblegum theme + Featured Friends grid + a music player that waits for a click (because autoplay is criminal).",
    mood: "sparkly",
    currently_listening: "Locker Lights — Demo Dreams",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(3),
    created_at: days(3),
    updated_at: days(3),
  },
  {
    id: "bp2",
    profile_id: "u3",
    title: "Court mornings & quiet playlists",
    body: "rebuilt my profile to feel like warm-up before practice: soft colors, honest About Me, folk track that doesn't autoplay.\n\nalso dropped three new photos from the pier. if you're in volleyball or just need calm energy, hi.",
    mood: "calm",
    currently_listening: "Court Sunrise — Harbor Light",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(2),
    created_at: days(2),
    updated_at: days(2),
  },
  {
    id: "bp3",
    profile_id: "u4",
    title: "stations after last bell",
    body: "short piece about empty platforms and songs that sound like fluorescent lights. goth theme stays. senior year is weird.",
    mood: "reflective",
    currently_listening: "After Last Bell — Void Choir",
    visibility: "public",
    moderation_status: "clean",
    published_at: days(5),
    created_at: days(5),
    updated_at: days(5),
  },
  {
    id: "bp4",
    profile_id: "u8",
    title: "garage practice notes",
    body: "messy thoughts on our new setlist. comments from friends only — parents if you're reading this, no you aren't.",
    mood: "amped",
    currently_listening: "Garage Warmup — Static Bloom",
    visibility: "friends",
    moderation_status: "clean",
    published_at: days(1),
    created_at: days(1),
    updated_at: days(1),
  },
  {
    id: "bp5",
    profile_id: "u5",
    title: "practice room diary #12",
    body: "eight counts, water breaks, and why my Featured Friends list looks like a dance crew roster. competition this weekend — send luck.",
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
  { id: "bc1", post_id: "bp1", author_id: "u7", body: "YES stickers with good contrast. iconic.", moderation_status: "clean", created_at: days(2) },
  { id: "bc2", post_id: "bp1", author_id: "u5", body: "sending neon palette inspo after practice!!", moderation_status: "clean", created_at: days(2) },
  { id: "bc3", post_id: "bp2", author_id: "u6", body: "this layout is so peaceful. yearbook-core.", moderation_status: "clean", created_at: days(1) },
  { id: "bc4", post_id: "bp3", author_id: "u2", body: "the fluorescent lights line hit different.", moderation_status: "clean", created_at: days(4) },
];

export const DEMO_PROFILE_COMMENTS: ProfileComment[] = [
  { id: "pc1", profile_id: "u1", author_id: "u3", body: "your page feels like a scrapbook i want to live in.", moderation_status: "clean", created_at: days(4), updated_at: days(4) },
  { id: "pc2", profile_id: "u1", author_id: "u5", body: "Featured Friends goals. also that playlist slapsss.", moderation_status: "clean", created_at: hours(4), updated_at: hours(4) },
  { id: "pc3", profile_id: "u1", author_id: "u7", body: "cursor effect when?? asking for a friend (me).", moderation_status: "clean", created_at: hours(18), updated_at: hours(18) },
  { id: "pc4", profile_id: "u2", author_id: "u1", body: "Queue Hop is stuck in my head help.", moderation_status: "clean", created_at: days(1), updated_at: days(1) },
  { id: "pc5", profile_id: "u5", author_id: "u1", body: "your profile is literally a stage. obsessed.", moderation_status: "clean", created_at: hours(9), updated_at: hours(9) },
  { id: "pc6", profile_id: "u3", author_id: "u6", body: "Indie theme is so clean. love that for you.", moderation_status: "clean", created_at: days(2), updated_at: days(2) },
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
  { id: "m1", conversation_id: "c1", sender_id: "u5", body: "your Featured Friends layout is giving dance crew roster fr", moderation_status: "clean", created_at: hours(3), updated_at: hours(3) },
  { id: "m2", conversation_id: "c1", sender_id: "u1", body: "wait till you see the sticker layer lol", moderation_status: "clean", created_at: hours(2.5), updated_at: hours(2.5) },
  { id: "m3", conversation_id: "c1", sender_id: "u5", body: "sending a practice track after rehearsal!!", moderation_status: "clean", created_at: hours(1), updated_at: hours(1) },
  { id: "m4", conversation_id: "c2", sender_id: "u2", body: "did you catch the new Queue Hop mix?", moderation_status: "clean", created_at: hours(6), updated_at: hours(6) },
  { id: "m5", conversation_id: "c2", sender_id: "u1", body: "listening now. brain melted in a good way", moderation_status: "clean", created_at: hours(5), updated_at: hours(5) },
  { id: "m6", conversation_id: "c3", sender_id: "u3", body: "pier walk after practice this weekend?", moderation_status: "clean", created_at: hours(22), updated_at: hours(22) },
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
    title: "Vibe is for teens 13–17",
    body: "Customize your page, keep friends close, and report anything that feels off. Adults aren’t the audience here.",
  },
  {
    id: "a2",
    title: "Theme editor tips",
    body: "Preview live, reorder modules, and watch for contrast warnings before you publish.",
  },
  {
    id: "a3",
    title: "Featured Friends sizes",
    body: "Spotlight 4, 8, 12, or 16 friends — your page, your crew.",
  },
];

/** Default signed-in demo account */
export const DEMO_SESSION_USER_ID = "u1";
