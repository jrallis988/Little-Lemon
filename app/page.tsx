"use client";

import Link from "next/link";
import {
  BookOpenText,
  Brush,
  MessageSquare,
  Music2,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { mockFeaturedFriends, mockProfiles, mockTracks } from "@/lib/mock/data";
import { themeToCssVars } from "@/lib/themes";
import { useAuth } from "@/lib/auth/AuthProvider";
import { APP_NAME, TEEN_MAX_AGE, TEEN_MIN_AGE, getAge } from "@/lib/utils";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Music on your page",
    description: "Pin a song, show what you’re looping, and let friends press play.",
    icon: Music2,
  },
  {
    title: "Themes that slap",
    description: "Colors, fonts, stickers, layouts — make it look like you, not a template.",
    icon: Brush,
  },
  {
    title: "Real posts",
    description: "Blog when a caption isn’t enough. Mood + currently listening included.",
    icon: BookOpenText,
  },
  {
    title: "Featured friends",
    description: "Show the people who actually matter instead of a giant follower count.",
    icon: Users,
  },
  {
    title: "DMs with people you know",
    description: "Message friends from their page. Built for your circle, not random spam.",
    icon: MessageSquare,
  },
];

function ProfilePreview() {
  const profile = mockProfiles[0];
  const age = getAge(profile.birthdate);
  const featured = (mockFeaturedFriends[profile.id] || [])
    .map((id) => mockProfiles.find((friend) => friend.id === id))
    .filter(Boolean)
    .slice(0, 4);
  const track = mockTracks.find((item) => item.profileId === profile.id && item.isFeatured);

  return (
    <div className="animate-slide-up rounded-card border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur">
      <div
        className="mp-profile-canvas overflow-hidden rounded-card border border-white/20"
        style={themeToCssVars(profile.theme)}
      >
        <div
          className="h-24 border-b border-white/30 bg-cover bg-center"
          style={{ backgroundImage: profile.coverUrl ? `url(${profile.coverUrl})` : undefined }}
        />
        <div className="grid gap-3 p-3 sm:grid-cols-[120px_1fr]">
          <aside className="space-y-3">
            <Avatar
              name={profile.displayName}
              src={profile.avatarUrl}
              size="xl"
              online={profile.onlineStatus === "online"}
              showOnlineIndicator={profile.showOnlineStatus}
              className="bg-white"
            />
            <div className="mp-profile-module text-xs">
              <p className="font-bold">{profile.displayName}</p>
              <p>@{profile.username}</p>
              {age ? <p className="mt-1">{age} · {profile.location}</p> : null}
            </div>
          </aside>
          <main className="space-y-3">
            <section className="mp-profile-module">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black">{profile.displayName.split(" ")[0]}&apos;s vibe</h2>
                <Badge variant="success">online</Badge>
              </div>
              <p className="text-sm">{profile.bio}</p>
              <p className="mt-2 rounded-card border border-current/20 bg-white/35 p-2 text-xs">
                {profile.statusMessage}
              </p>
            </section>
            <section className="grid gap-3 sm:grid-cols-2">
              <div className="mp-profile-module">
                <h3 className="text-sm font-black">Into</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {profile.interests.slice(0, 4).map((interest) => (
                    <span
                      key={interest}
                      className="rounded-btn border border-current/20 bg-white/40 px-2 py-0.5 text-[11px]"
                    >
                      {interest.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mp-profile-module">
                <h3 className="text-sm font-black">On loop</h3>
                <p className="mt-2 text-xs font-bold">{track?.title || "Hallway Echo"}</p>
                <p className="text-xs">{track?.artist || "Bedroom Demo"}</p>
              </div>
            </section>
            <section className="mp-profile-module">
              <h3 className="text-sm font-black">Featured Friends</h3>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {featured.map((friend) =>
                  friend ? (
                    <div key={friend.id} className="text-center text-[10px]">
                      <Avatar
                        name={friend.displayName}
                        src={friend.avatarUrl}
                        size="sm"
                        className="mx-auto bg-white"
                      />
                      <span className="mt-1 block truncate">
                        {friend.displayName.split(" ")[0]}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { profile, loading } = useAuth();
  const showHomeLink = !loading && profile?.onboardingComplete;

  return (
    <main className="min-h-screen overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(27,182,168,0.28),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(61,115,192,0.4),transparent_30%),linear-gradient(145deg,#070e17_0%,#0c1624_42%,#163a63_100%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="animate-fade-in flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-3 text-white hover:no-underline">
            <span className="grid h-12 w-12 place-items-center rounded-card border border-white/30 bg-white text-lg font-black text-brand shadow-lg">
              V
            </span>
            <span>
              <span className="block font-display text-3xl font-black leading-none tracking-tight">
                {APP_NAME}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-soft">
                For teens {TEEN_MIN_AGE}–{TEEN_MAX_AGE}
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-bold">
            {showHomeLink ? (
              <Link
                href="/home"
                className="rounded-btn border border-white/25 bg-white px-4 py-2 text-brand-dark shadow-soft hover:no-underline"
              >
                Go to Home
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-btn border border-white/25 px-4 py-2 text-white hover:bg-white/10 hover:no-underline"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden rounded-btn border border-accent bg-accent px-4 py-2 text-navy-950 shadow-soft hover:no-underline sm:inline-flex"
                >
                  Join free
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <div className="animate-slide-up">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-accent/40 bg-accent/15 text-accent-soft">
                Ages {TEEN_MIN_AGE}–{TEEN_MAX_AGE} only
              </Badge>
              <Badge className="border-blue-200/30 bg-blue-100/10 text-blue-50">
                Your page, not a highlight reel
              </Badge>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Your profile should feel like your vibe.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              {APP_NAME} is where teens build a page that actually feels like them — music,
              friends, photos, themes, and the weird little details that don’t fit in a
              15-second clip.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-btn border border-accent bg-accent px-5 py-3 text-sm font-black uppercase tracking-wide text-navy-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-dark hover:text-white hover:no-underline"
              >
                Create Your Profile
              </Link>
              <Link
                href="/login"
                className="rounded-btn border border-white/30 bg-navy-800/70 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-dark hover:no-underline"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-blue-100">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              Built for teens. Private controls, block/report tools, and no adult profiles in
              the mix.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-2 text-xs text-blue-100">
              {["Themes", "Friends", "Music"].map((label) => (
                <div
                  key={label}
                  className="animate-pulse-soft rounded-card border border-white/15 bg-white/10 px-3 py-2 text-center font-bold uppercase tracking-wide"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <ProfilePreview />
        </section>

        <section className="pb-12">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Made for your era
            </p>
            <h2 className="mt-2 font-display text-2xl font-black sm:text-3xl">
              Custom pages. Modern teen energy.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Same freedom as classic personal pages — updated so it feels natural for
              middle school and high school life right now.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="animate-fade-in rounded-card border border-white/15 bg-white p-4 text-navy-900 shadow-xl"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <Icon className="h-6 w-6 text-brand" aria-hidden />
                  <h3 className="mt-3 text-sm font-black uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-navy-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
