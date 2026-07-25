"use client";

import Link from "next/link";
import {
  BookOpenText,
  Brush,
  MessageSquare,
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
    title: "Loop for real moments",
    description: "Share what is happening now with classmates, friends, and groups.",
    icon: MessageSquare,
  },
  {
    title: "School verification",
    description: "Verified student onboarding helps keep Vibe centered on teen peers.",
    icon: ShieldCheck,
  },
  {
    title: "Photo sets",
    description: "Collect after-school photos into sets that feel like a real page.",
    icon: BookOpenText,
  },
  {
    title: "Groups that fit school life",
    description: "Clubs, teams, hangouts, and interests can stay close to your circle.",
    icon: Users,
  },
  {
    title: "Profiles with personality",
    description: "Music, blogs, interests, friends, themes, and the details that feel like you.",
    icon: Brush,
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
    <div className="animate-slide-up rounded-[24px] border border-white/70 bg-white/40 p-2 shadow-2xl backdrop-blur">
      <div
        className="overflow-hidden rounded-[22px] border border-white bg-white/95 shadow-card"
        style={themeToCssVars(profile.theme)}
      >
        <div
          className="h-24 border-b border-surface-border bg-cover bg-center"
          style={{ backgroundImage: profile.coverUrl ? `url(${profile.coverUrl})` : undefined }}
        />
        <div className="grid gap-3 p-4 sm:grid-cols-[120px_1fr]">
          <aside className="space-y-3">
            <Avatar
              name={profile.displayName}
              src={profile.avatarUrl}
              size="xl"
              online={profile.onlineStatus === "online"}
              showOnlineIndicator={profile.showOnlineStatus}
              className="border-4 border-white bg-white shadow-soft"
            />
            <div className="rounded-[18px] border border-surface-border bg-surface-muted p-3 text-xs">
              <p className="font-bold text-navy-900">
                {profile.displayName}
                {age ? `, ${age}` : ""}
              </p>
              <p className="text-navy-500">@{profile.username}</p>
              {profile.location ? (
                <p className="mt-1 text-navy-500">{profile.location}</p>
              ) : null}
            </div>
          </aside>
          <main className="space-y-3">
            <section className="rounded-[18px] border border-surface-border bg-white p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-black text-navy-900">
                  {profile.displayName}&apos;s vibe
                </h2>
                <Badge variant="success">online</Badge>
              </div>
              <p className="text-sm italic text-navy-700 [font-family:var(--font-script)]">
                {profile.bio}
              </p>
              <p className="mt-2 rounded-[14px] border border-brand/15 bg-brand-soft px-3 py-2 text-xs text-navy-700">
                Mood: {profile.mood || "✨ creative"}
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
    <main className="min-h-screen overflow-hidden text-navy-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,176,136,0.7),transparent_36%),radial-gradient(circle_at_88%_10%,rgba(201,160,232,0.55),transparent_34%),linear-gradient(165deg,#ffe0c2_0%,#ffd0b8_28%,#f3d2ea_62%,#e8d7f5_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="animate-fade-in flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-3 text-navy-900 hover:no-underline">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/80 bg-white text-2xl text-brand shadow-lg [font-family:var(--font-script)]">
              V
            </span>
            <span>
              <span className="block text-4xl leading-none text-[#ff7a33] [font-family:var(--font-script)]">
                {APP_NAME}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-navy-500">
                For teens {TEEN_MIN_AGE}–{TEEN_MAX_AGE}
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-bold">
            {showHomeLink ? (
              <Link
                href="/home"
                className="rounded-btn border border-white/80 bg-white px-4 py-2 text-brand-dark shadow-soft hover:no-underline"
              >
                Go to Home
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-btn border border-white/80 bg-white/70 px-4 py-2 text-navy-800 hover:bg-white hover:no-underline"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="hidden rounded-btn border-friend bg-friend px-4 py-2 text-white shadow-soft hover:bg-friend-dark hover:no-underline sm:inline-flex"
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
              <Badge className="border-brand/30 bg-brand-soft text-brand-dark">
                Ages {TEEN_MIN_AGE}–{TEEN_MAX_AGE} only
              </Badge>
              <Badge className="border-accent/30 bg-accent-soft text-accent-dark">
                Meet Sarah from Pine Ridge
              </Badge>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.95] tracking-tight text-navy-900 sm:text-6xl lg:text-7xl">
              Real Friends. Real Moments. Real You.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-navy-600 sm:text-lg">
              {APP_NAME} is a verified student ecosystem for ages {TEEN_MIN_AGE}-
              {TEEN_MAX_AGE}: Loop updates, school verification, photo sets, groups,
              music, friends, and profile modules that feel like you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-btn border border-friend bg-friend px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-friend-dark hover:no-underline"
              >
                Create Your Profile
              </Link>
              <Link
                href="/login"
                className="rounded-btn border border-white bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-navy-800 shadow-lg transition hover:-translate-y-0.5 hover:no-underline"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-navy-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-friend" aria-hidden />
              Built for teens with school peer boundaries, private controls, block/report
              tools, and no adult profiles in the mix.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-2 text-xs text-navy-700">
              {["Loop", "Photo Sets", "Groups"].map((label) => (
                <div
                  key={label}
                  className="animate-pulse-soft rounded-card border border-white/80 bg-white/80 px-3 py-2 text-center font-bold uppercase tracking-wide shadow-soft"
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-dark">
              Made for your era
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-navy-900 sm:text-3xl">
              Custom pages. Modern teen energy.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-navy-600">
              Classic personal-page modules with modern teen safety: verified school peers,
              collapsible cards, profile comments, playlists, and school-life groups.
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
