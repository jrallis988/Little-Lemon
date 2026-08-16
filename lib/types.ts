export type ComedyStyle =
  | "observational"
  | "storytelling"
  | "absurd"
  | "roast"
  | "musical"
  | "improv"
  | "political"
  | "clean"
  | "dark";

export type PostKind = "bit" | "setlist" | "show" | "workshop" | "clip";

export interface Comic {
  id: string;
  username: string;
  displayName: string;
  avatarInitials: string;
  avatarHue: number;
  city: string;
  bio: string;
  styles: ComedyStyle[];
  credits: string[];
  following: number;
  followers: number;
  stageYears: number;
  isVerified?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  vibe: string;
  nextMic: string;
  signupOpens: string;
  drinkMinimum?: string;
  tags: string[];
}

export interface Post {
  id: string;
  authorId: string;
  kind: PostKind;
  body: string;
  title?: string;
  venueId?: string;
  createdAt: string;
  laughs: number;
  groans: number;
  comments: number;
  tags: string[];
  isWorkshop?: boolean;
}

export interface MicNight {
  id: string;
  venueId: string;
  title: string;
  startsAt: string;
  slotsLeft: number;
  hostId: string;
  notes: string;
}

export interface MessageThread {
  id: string;
  peerId: string;
  preview: string;
  updatedAt: string;
  unread: number;
}

export interface NotificationItem {
  id: string;
  text: string;
  createdAt: string;
  unread: boolean;
}
