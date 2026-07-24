"use client";

import Link from "next/link";
import {
  BookOpenText,
  Brush,
  Home,
  MessageSquare,
  Music2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { mockFeaturedFriends, mockProfiles, mockTracks } from "@/lib/mock/data";
import { themeToCssVars } from "@/lib/themes";
import { useAuth } from "@/lib/auth/AuthProvider";
import { APP_NAME } from "@/lib/utils";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Music on your page",
    description: "Feature a track, list your favorite sounds, and make the page feel lived-in.",
    icon: Music2,
  },
  {
    title: "Profile themes",
    description: "Pick colors, fonts, modules, stickers, and layouts that actually say something.",
    icon: Brush,
  },
  {
    title: "Blogging",
    description: "Post longer thoughts, moods, and currently-listening notes without chasing a feed.",
    icon: BookOpenText,
  },
  {
    title: "Friends that matter",
    description: "Show featured friends and keep a smaller, warmer neighborhood around your profile.",
    icon: Users,
  },
  {
    title: "Messaging",
    description: "Start conversations from the people and pages you already care about.",
    icon: MessageSquare,
  },
];

function ProfilePreview() {
  const profile = mockProfiles[0];
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
              <p className="mt-2">{profile.location}</p>
            </div>
          </aside>
          <main className="space-y-3">
            <section className="mp-profile-module">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black">Jordan&apos;s Place</h2>
                <Badge variant="success">online</Badge>
              </div>
              <p className="text-sm">{profile.bio}</p>
              <p className="mt-2 rounded-card border border-current/20 bg-white/35 p-2 text-xs">
                {profile.statusMessage}
              </p>
            </section>
            <section className="grid gap-3 sm:grid-cols-2">
              <div className="mp-profile-module">
                <h3 className="text-sm font-black">Interests</h3>
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
                <h3 className="text-sm font-black">Featured Track</h3>
                <p className="mt-2 text-xs font-bold">{track?.title || "Soft Window"}</p>
                <p className="text-xs">{track?.artist || "Placeholder Ensemble"}</p>
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
                      <span className="mt-1 block truncate">{friend.displayName.split(" ")[0]}</span>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(61,115,192,0.45),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(76,129,199,0.22),transparent_28%),linear-gradient(135deg,#070e17_0%,#0c1624_45%,#17345d_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="animate-fade-in flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 text-white hover:no-underline">
            <span className="grid h-12 w-12 place-items-center rounded-card border border-white/30 bg-white text-base font-black text-brand shadow-lg">
              MP
            </span>
            <span>
              <span className="block font-display text-3xl font-black leading-none tracking-tight">
                {APP_NAME}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-blue-100">
                Make it yours
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
                  className="hidden rounded-btn border border-white bg-white px-4 py-2 text-brand-dark shadow-soft hover:no-underline sm:inline-flex"
                >
                  Create Your Profile
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="animate-slide-up">
            <Badge className="border-blue-200/30 bg-blue-100/10 text-blue-50">
              <Home className="h-3 w-3" aria-hidden />
              {APP_NAME} social pages
            </Badge>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Your profile should feel like your place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Build a page that sounds like you, looks like you, and brings together the
              people, music, photos, and interests that matter to you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-btn border border-white bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-brand-dark shadow-lg transition hover:-translate-y-0.5 hover:no-underline"
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
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">
                Your corner, your rules
              </p>
              <h2 className="mt-2 font-display text-2xl font-black">Built for personal pages.</h2>
            </div>
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
