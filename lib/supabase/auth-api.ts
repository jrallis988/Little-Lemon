import type { Profile, ProfileThemePreset, UserAccount } from "@/lib/types";
import { createThemeFromPreset } from "@/lib/themes";
import { isValidUsername, slugifyUsername } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  mapProfileRow,
  mapUserRow,
  profilePatchToDb,
  type DbProfileRow,
  type DbThemeRow,
  type DbUserRow,
} from "@/lib/supabase/mappers";

type SessionBundle = {
  user: UserAccount;
  profile: Profile;
};

function requireClient() {
  const client = createClient();
  if (!client) {
    throw new Error("Supabase is not configured.");
  }
  return client;
}

function authErrorMessage(error: { message?: string } | null, fallback: string) {
  return error?.message || fallback;
}

async function fetchUserRow(userId: string) {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(authErrorMessage(error, "Could not load account."));
  return data as DbUserRow | null;
}

async function fetchProfileRow(userId: string) {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*, profile_themes(*)")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(authErrorMessage(error, "Could not load profile."));
  return data as DbProfileRow | null;
}

async function ensureAccountRows(input: {
  userId: string;
  email: string;
  username: string;
  displayName: string;
}): Promise<SessionBundle> {
  const supabase = requireClient();
  const username = slugifyUsername(input.username);
  if (!isValidUsername(username)) {
    throw new Error(
      "Username must be 3–24 characters: lowercase letters, numbers, underscores."
    );
  }

  const now = new Date().toISOString();
  const { error: userError } = await supabase.from("users").upsert(
    {
      id: input.userId,
      email: input.email.toLowerCase(),
      username,
      created_at: now,
      updated_at: now,
      last_login_at: now,
      is_active: true,
      moderation_status: "ok",
    },
    { onConflict: "id" }
  );
  if (userError) {
    throw new Error(authErrorMessage(userError, "Could not create account row."));
  }

  let profile = await fetchProfileRow(input.userId);
  if (!profile) {
    const { data: created, error: profileError } = await supabase
      .from("profiles")
      .insert({
        user_id: input.userId,
        username,
        display_name: input.displayName.trim() || username,
        show_age: false,
        online_status: "online",
        last_active_at: now,
        member_since: now,
        profile_views: 0,
        friend_count: 0,
        interests: [],
        favorite_music: [],
        details: { hiddenFields: [] },
        featured_friend_count: 8,
        visibility: "public",
        who_can_friend: "public",
        who_can_message: "friends",
        who_can_comment: "friends",
        who_can_view_photos: "public",
        show_online_status: true,
        onboarding_complete: false,
        avatar_url: `https://i.pravatar.cc/200?u=${input.userId}`,
      })
      .select("*, profile_themes(*)")
      .single();
    if (profileError) {
      throw new Error(
        authErrorMessage(profileError, "Could not create profile row.")
      );
    }
    profile = created as DbProfileRow;

    const theme = createThemeFromPreset("classic-blue", profile.id);
    const { error: themeError } = await supabase.from("profile_themes").upsert({
      profile_id: profile.id,
      preset: theme.preset,
      background_color: theme.backgroundColor,
      background_image: theme.backgroundImage || null,
      background_repeat: theme.backgroundRepeat,
      background_position: theme.backgroundPosition,
      primary_color: theme.primaryColor,
      secondary_color: theme.secondaryColor,
      text_color: theme.textColor,
      link_color: theme.linkColor,
      heading_font: theme.headingFont,
      body_font: theme.bodyFont,
      border_style: theme.borderStyle,
      card_transparency: theme.cardTransparency,
      header_image: theme.headerImage || null,
      layout: theme.layout,
      module_order: theme.moduleOrder,
      music_player_style: theme.musicPlayerStyle,
      cursor_effect: theme.cursorEffect,
      stickers: theme.stickers,
      display_mode: theme.displayMode,
    });
    if (themeError) {
      throw new Error(authErrorMessage(themeError, "Could not create theme."));
    }
    profile = (await fetchProfileRow(input.userId))!;
  }

  const userRow = await fetchUserRow(input.userId);
  if (!userRow) throw new Error("Account row missing after signup.");

  return {
    user: mapUserRow(userRow),
    profile: mapProfileRow(profile),
  };
}

export async function getSupabaseSession(): Promise<SessionBundle | null> {
  const supabase = requireClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const email = data.user.email;
  if (!email) return null;

  const meta = data.user.user_metadata || {};
  const username =
    (typeof meta.username === "string" && meta.username) ||
    email.split("@")[0] ||
    `user_${data.user.id.slice(0, 8)}`;
  const displayName =
    (typeof meta.display_name === "string" && meta.display_name) ||
    (typeof meta.displayName === "string" && meta.displayName) ||
    username;

  const existingUser = await fetchUserRow(data.user.id);
  const existingProfile = await fetchProfileRow(data.user.id);
  if (existingUser && existingProfile) {
    return {
      user: mapUserRow(existingUser),
      profile: mapProfileRow(existingProfile),
    };
  }

  return ensureAccountRows({
    userId: data.user.id,
    email,
    username,
    displayName,
  });
}

export async function supabaseLogin(email: string, password: string) {
  const supabase = requireClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error || !data.user) {
    throw new Error(authErrorMessage(error, "Invalid email or password."));
  }

  await supabase
    .from("users")
    .update({
      last_login_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.user.id);

  const session = await getSupabaseSession();
  if (!session) throw new Error("Signed in, but profile could not be loaded.");
  return session;
}

export async function supabaseSignup(input: {
  email: string;
  password: string;
  username: string;
  displayName: string;
}) {
  if (input.password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  const username = slugifyUsername(input.username);
  if (!isValidUsername(username)) {
    throw new Error(
      "Username must be 3–24 characters: lowercase letters, numbers, underscores."
    );
  }

  const supabase = requireClient();
  const { data: taken } = await supabase
    .from("profiles")
    .select("id")
    .ilike("username", username)
    .maybeSingle();
  if (taken) throw new Error("That username is already taken.");

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      data: {
        username,
        display_name: input.displayName.trim() || username,
      },
    },
  });
  if (error || !data.user) {
    throw new Error(authErrorMessage(error, "Could not create account."));
  }

  return ensureAccountRows({
    userId: data.user.id,
    email: input.email.trim().toLowerCase(),
    username,
    displayName: input.displayName.trim() || username,
  });
}

export async function supabaseLogout() {
  const supabase = requireClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(authErrorMessage(error, "Could not log out."));
}

export async function supabaseUpdateProfile(
  userId: string,
  patch: Partial<Profile>
) {
  const supabase = requireClient();
  if (patch.username) {
    const username = slugifyUsername(patch.username);
    if (!isValidUsername(username)) throw new Error("Invalid username.");
    const { data: taken } = await supabase
      .from("profiles")
      .select("id, user_id")
      .ilike("username", username)
      .maybeSingle();
    if (taken && taken.user_id !== userId) {
      throw new Error("That username is already taken.");
    }
    patch = { ...patch, username };
  }

  const dbPatch = profilePatchToDb(patch);
  const { error } = await supabase
    .from("profiles")
    .update(dbPatch)
    .eq("user_id", userId);
  if (error) {
    throw new Error(authErrorMessage(error, "Could not update profile."));
  }

  if (patch.username) {
    await supabase
      .from("users")
      .update({
        username: patch.username,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);
  }

  const profile = await fetchProfileRow(userId);
  if (!profile) throw new Error("Profile missing after update.");
  return mapProfileRow(profile);
}

export async function supabaseCompleteOnboarding(
  userId: string,
  data: Partial<Profile> & { themePreset?: ProfileThemePreset }
) {
  const { themePreset, theme: _ignoredTheme, ...profilePatch } = data;
  const updated = await supabaseUpdateProfile(userId, {
    ...profilePatch,
    onboardingComplete: true,
  });

  if (themePreset) {
    const supabase = requireClient();
    const nextTheme = createThemeFromPreset(themePreset, updated.id);
    const themeRow: Partial<DbThemeRow> = {
      profile_id: updated.id,
      preset: nextTheme.preset,
      background_color: nextTheme.backgroundColor,
      background_image: nextTheme.backgroundImage || null,
      background_repeat: nextTheme.backgroundRepeat,
      background_position: nextTheme.backgroundPosition,
      primary_color: nextTheme.primaryColor,
      secondary_color: nextTheme.secondaryColor,
      text_color: nextTheme.textColor,
      link_color: nextTheme.linkColor,
      heading_font: nextTheme.headingFont,
      body_font: nextTheme.bodyFont,
      border_style: nextTheme.borderStyle,
      card_transparency: nextTheme.cardTransparency,
      header_image: nextTheme.headerImage || null,
      layout: nextTheme.layout,
      module_order: nextTheme.moduleOrder,
      music_player_style: nextTheme.musicPlayerStyle,
      cursor_effect: nextTheme.cursorEffect,
      stickers: nextTheme.stickers,
      display_mode: nextTheme.displayMode,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("profile_themes")
      .upsert(themeRow, { onConflict: "profile_id" });
    if (error) {
      throw new Error(authErrorMessage(error, "Could not save theme preset."));
    }
    return supabaseUpdateProfile(userId, {});
  }

  return updated;
}

export function subscribeSupabaseAuth(
  onChange: (session: SessionBundle | null) => void
) {
  const supabase = createClient();
  if (!supabase) return () => undefined;

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_OUT") {
      onChange(null);
      return;
    }
    try {
      const session = await getSupabaseSession();
      onChange(session);
    } catch {
      onChange(null);
    }
  });

  return () => subscription.unsubscribe();
}
