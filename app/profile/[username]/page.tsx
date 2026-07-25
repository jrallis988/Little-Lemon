"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpenText,
  ChevronDown,
  ExternalLink,
  Flag,
  ImagePlus,
  Lock,
  Music2,
  School,
} from "lucide-react";

import { useAuth } from "@/lib/auth/AuthProvider";
import { mockAlbums, mockPhotos, mockTracks } from "@/lib/mock/data";
import { mockApi } from "@/lib/mock/store";
import {
  canInteractWithVisibility,
  canViewVisibility,
  featuredProfilesFor,
  friendshipStatus,
  profilesByUserId,
  useMockStore,
} from "@/lib/mock/social";
import { themeToCssVars } from "@/lib/themes";
import { cn, formatDate } from "@/lib/utils";
import type {
  Album,
  BlogPost,
  MusicTrack,
  Photo,
  Profile,
  ProfileComment,
  ProfileModuleId,
  ReportTargetType,
} from "@/lib/types";
import { Logo } from "@/components/brand/Logo";
import { ProfileComments } from "@/components/profile/ProfileComments";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { ReportDialog } from "@/components/safety/ReportDialog";

type ReportTarget = {
  targetType: ReportTargetType;
  targetId: string;
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = React.use(params);
  const auth = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const [notice, setNotice] = React.useState<string | null>(null);
  const [reportTarget, setReportTarget] = React.useState<ReportTarget | null>(null);
  const [following, setFollowing] = React.useState(false);

  const profile = state.profiles.find(
    (item) => item.username.toLowerCase() === username.toLowerCase()
  );
  const currentProfile = auth.profile;
  const isOwner = Boolean(currentProfile && profile?.userId === currentProfile.userId);
  const isFriend = Boolean(
    currentProfile &&
      profile &&
      state.friendships.some(
        (friendship) =>
          friendship.status === "accepted" &&
          ((friendship.requesterId === currentProfile.userId &&
            friendship.addresseeId === profile.userId) ||
            (friendship.requesterId === profile.userId &&
              friendship.addresseeId === currentProfile.userId))
      )
  );

  React.useEffect(() => {
    if (!profile || isOwner) return;
    const key = `vibe-viewed-${profile.id}-${currentProfile?.userId ?? "anon"}`;
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) return;
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem(key, "1");
    mockApi.updateProfile(profile.userId, {
      profileViews: profile.profileViews + 1,
    });
  }, [currentProfile?.userId, isOwner, profile]);

  React.useEffect(() => {
    if (!profile || typeof localStorage === "undefined") return;
    setFollowing(localStorage.getItem(`vibe-following-${profile.id}`) === "1");
  }, [profile]);

  if (auth.loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <LoadingSkeleton lines={8} />
      </div>
    );
  }

  if (!profile) {
    return (
      <PublicFrame signedIn={Boolean(currentProfile)}>
        <div className="mx-auto max-w-3xl p-4">
          <ErrorState
            title="Profile not found"
            message={`No Vibe member exists for @${username}.`}
          />
        </div>
      </PublicFrame>
    );
  }

  const relationship = friendshipStatus(
    state.friendships,
    currentProfile?.userId,
    profile.userId
  );
  const canViewProfile = canViewVisibility(profile.visibility, isOwner, isFriend);
  const canMessage = canInteractWithVisibility(
    profile.whoCanMessage,
    Boolean(currentProfile),
    isOwner,
    isFriend
  );
  const canComment = canInteractWithVisibility(
    profile.whoCanComment,
    Boolean(currentProfile),
    isOwner,
    isFriend
  );
  const canViewPhotos = canViewVisibility(profile.whoCanViewPhotos, isOwner, isFriend);
  const authors = profilesByUserId(state.profiles);
  const comments = state.comments.filter((comment) => comment.profileId === profile.id);
  const posts = state.blogPosts.filter((post) => post.authorId === profile.userId);
  const featuredFriends = featuredProfilesFor(state, profile);
  const tracks = mockTracks.filter((track) => track.profileId === profile.id);
  const visibleAlbums = canViewPhotos
    ? mockAlbums.filter(
        (album) =>
          album.profileId === profile.id &&
          canViewVisibility(album.visibility, isOwner, isFriend)
      )
    : [];
  const visiblePhotos = canViewPhotos
    ? mockPhotos.filter(
        (photo) =>
          photo.profileId === profile.id &&
          canViewVisibility(photo.visibility, isOwner, isFriend)
      )
    : [];

  const requireSignIn = (action: string) => {
    setNotice(`Sign in to ${action}.`);
  };

  const submitFriendRequest = (target: Profile) => {
    if (!currentProfile) {
      requireSignIn("send friend requests");
      return;
    }
    if (!canInteractWithVisibility(target.whoCanFriend, true, isOwner, isFriend)) {
      setNotice(`${target.displayName} only accepts friend requests from friends.`);
      return;
    }
    try {
      mockApi.sendFriendRequest(currentProfile.userId, target.userId);
      setNotice(`Friend request sent to ${target.displayName}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not send request.");
    }
  };

  const startMessage = (target: Profile) => {
    if (!currentProfile) {
      requireSignIn("send messages");
      return;
    }
    if (!canMessage) {
      setNotice(`${target.displayName} only accepts messages from friends.`);
      return;
    }
    const conversation = mockApi.startConversation(currentProfile.userId, target.userId);
    router.push(`/messages/${conversation.id}`);
  };

  const toggleFollow = () => {
    if (!currentProfile) {
      requireSignIn("follow profiles");
      return;
    }
    const next = !following;
    setFollowing(next);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(`vibe-following-${profile.id}`, next ? "1" : "0");
    }
  };

  const submitComment = (body: string) => {
    if (!currentProfile) {
      requireSignIn("leave comments");
      return;
    }
    mockApi.addProfileComment(profile.id, currentProfile.userId, body);
  };

  const deleteComment = (comment: ProfileComment) => {
    if (!currentProfile) return;
    mockApi.deleteProfileComment(comment.id, currentProfile.userId);
  };

  const openReport = (targetType: ReportTargetType, targetId: string) => {
    if (!currentProfile) {
      requireSignIn("report content");
      return;
    }
    setReportTarget({ targetType, targetId });
  };

  const canvas = (
    <div className="mp-profile-canvas min-h-screen" style={themeToCssVars(profile.theme)}>
      <div className="relative mx-auto w-full max-w-6xl px-3 py-4 sm:px-4">
        <StickerCloud profile={profile} />
        {notice ? (
          <div className="mb-4 rounded-card border border-brand/30 bg-white/95 p-3 text-sm font-semibold text-navy-800 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>{notice}</span>
              {!currentProfile ? (
                <Button size="sm" onClick={() => router.push("/login")}>
                  Sign In
                </Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => setNotice(null)}>
                  Dismiss
                </Button>
              )}
            </div>
          </div>
        ) : null}

        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwner}
          friendshipStatus={relationship}
          isFollowing={following}
          onAddFriend={isOwner ? undefined : submitFriendRequest}
          onMessage={isOwner ? undefined : startMessage}
          onFollow={isOwner ? undefined : toggleFollow}
          onEditProfile={() => router.push("/profile/edit")}
          className="mp-profile-module"
        />

        {!isOwner ? (
          <div className="mt-3 text-right">
            <Button
              size="sm"
              variant="ghost"
              className="bg-white/80"
              onClick={() => openReport("profile", profile.id)}
            >
              <Flag className="h-4 w-4" aria-hidden />
              Report profile
            </Button>
          </div>
        ) : null}

        {canViewProfile ? (
          <div
            className={`mt-4 grid gap-4 ${
              profile.theme.layout === "wide"
                ? "lg:grid-cols-2"
                : profile.theme.layout === "stacked"
                  ? "grid-cols-1"
                  : "lg:grid-cols-[minmax(0,1fr)_360px]"
            }`}
          >
            {profile.theme.moduleOrder.map((moduleId) => (
              <ProfileModule
                key={moduleId}
                moduleId={moduleId}
                profile={profile}
                comments={comments}
                authors={authors}
                currentProfile={currentProfile ?? undefined}
                isOwner={isOwner}
                canComment={canComment}
                featuredFriends={featuredFriends}
                tracks={tracks}
                posts={posts}
                albums={visibleAlbums}
                photos={visiblePhotos}
                photosLocked={!canViewPhotos}
                onSubmitComment={submitComment}
                onDeleteComment={deleteComment}
                onReport={openReport}
              />
            ))}
          </div>
        ) : (
          <Card className="mp-profile-module mt-4">
            <CardContent>
              <EmptyState
                icon={Lock}
                title="This profile is private"
                description="Only approved friends can view the modules on this profile."
              />
            </CardContent>
          </Card>
        )}
      </div>

      <ReportDialog
        open={Boolean(reportTarget)}
        targetType={reportTarget?.targetType ?? "profile"}
        targetId={reportTarget?.targetId ?? profile.id}
        onClose={() => setReportTarget(null)}
        onSubmit={(payload) => {
          if (!currentProfile) return;
          mockApi.reportContent({ reporterId: currentProfile.userId, ...payload });
          setNotice("Thanks. Your report was submitted for review.");
        }}
      />
    </div>
  );

  return currentProfile ? (
    <AuthenticatedShell mainClassName="max-w-none p-0">{canvas}</AuthenticatedShell>
  ) : (
    <PublicFrame signedIn={false}>{canvas}</PublicFrame>
  );
}

function PublicFrame({
  children,
  signedIn,
}: {
  children: React.ReactNode;
  signedIn: boolean;
}) {
  return (
    <div className="min-h-screen bg-surface-muted">
      {!signedIn ? (
        <header className="sticky top-0 z-40 border-b border-navy-950 bg-navy-900 text-white shadow-card">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 sm:px-4">
            <Logo />
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-btn border border-surface-border bg-white px-3 py-2 text-sm font-bold text-navy-900 no-underline shadow-soft"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-btn border border-brand bg-brand px-3 py-2 text-sm font-bold text-white no-underline shadow-soft"
              >
                Join
              </Link>
            </div>
          </div>
        </header>
      ) : null}
      {children}
    </div>
  );
}

function ProfileModule({
  moduleId,
  profile,
  comments,
  authors,
  currentProfile,
  isOwner,
  canComment,
  featuredFriends,
  tracks,
  posts,
  albums,
  photos,
  photosLocked,
  onSubmitComment,
  onDeleteComment,
  onReport,
}: {
  moduleId: ProfileModuleId;
  profile: Profile;
  comments: ProfileComment[];
  authors: Record<string, Profile>;
  currentProfile?: Profile;
  isOwner: boolean;
  canComment: boolean;
  featuredFriends: Profile[];
  tracks: MusicTrack[];
  posts: BlogPost[];
  albums: Album[];
  photos: Photo[];
  photosLocked: boolean;
  onSubmitComment: (body: string) => void;
  onDeleteComment: (comment: ProfileComment) => void;
  onReport: (targetType: ReportTargetType, targetId: string) => void;
}) {
  if (moduleId === "about") {
    return (
      <>
        <CollapsibleModule title="ABOUT ME" eyebrow={`@${profile.username}`}>
          <p className="whitespace-pre-wrap text-sm leading-6 text-navy-800">
            {profile.details.aboutMe || profile.bio || "No about-me note yet."}
          </p>
        </CollapsibleModule>
        <CollapsibleModule title="WHO I'D LIKE TO MEET" defaultOpen={false}>
          <p className="whitespace-pre-wrap text-sm leading-6 text-navy-800">
            {profile.details.whoIdLikeToMeet ||
              "Friendly classmates, club people, and friends who leave kind comments."}
          </p>
        </CollapsibleModule>
      </>
    );
  }

  if (moduleId === "details") {
    return (
      <CollapsibleModule title="DETAILS" icon={<School className="h-4 w-4" aria-hidden />}>
        <TeenDetailsTable profile={profile} />
      </CollapsibleModule>
    );
  }

  if (moduleId === "interests") {
    return (
      <CollapsibleModule title="INTERESTS">
        <InterestTable profile={profile} />
      </CollapsibleModule>
    );
  }

  if (moduleId === "music") {
    return (
      <CollapsibleModule
        title="NOW PLAYING"
        icon={<Music2 className="h-4 w-4" aria-hidden />}
      >
        <NowPlaying profile={profile} tracks={tracks} />
      </CollapsibleModule>
    );
  }

  if (moduleId === "photos") {
    if (photosLocked) {
      return (
        <CollapsibleModule title="PHOTOS">
            <EmptyState
              icon={Lock}
              title="Photos are friends-only"
              description="Become friends to view this member's photo albums."
            />
        </CollapsibleModule>
      );
    }
    return (
      <CollapsibleModule
        title="PHOTOS"
        action={
          isOwner ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">
              <ImagePlus className="h-3.5 w-3.5" aria-hidden />
              Add set
            </span>
          ) : undefined
        }
      >
        <PhotoSetsGrid albums={albums} photos={photos} />
      </CollapsibleModule>
    );
  }

  if (moduleId === "blog") {
    return (
      <CollapsibleModule
        title="BLOG"
        defaultOpen={posts.length > 0}
        icon={<BookOpenText className="h-4 w-4" aria-hidden />}
      >
        <BlogList posts={posts} />
      </CollapsibleModule>
    );
  }

  if (moduleId === "friends") {
    return (
      <CollapsibleModule title="FEATURED FRIENDS">
        <FeaturedFriendGrid
          friends={featuredFriends}
          count={profile.featuredFriendCount}
        />
      </CollapsibleModule>
    );
  }

  return (
    <CollapsibleModule title="BULLETIN BOARD" defaultOpen>
      <ProfileComments
        comments={comments}
        authors={authors}
        currentUser={currentProfile}
        isProfileOwner={isOwner}
        canComment={canComment}
        onSubmit={onSubmitComment}
        onDelete={onDeleteComment}
        onReport={(comment) => onReport("comment", comment.id)}
        title="Bulletin Board"
        composerLabel="Leave a Message"
        composerPlaceholder="Write something nice..."
        submitLabel="Post Message"
        emptyTitle="No bulletin notes yet"
        emptyDescription="Be the first to pin a kind note on this profile."
        showHeader={false}
        className="border-0 bg-transparent shadow-none"
      />
    </CollapsibleModule>
  );
}

function CollapsibleModule({
  title,
  eyebrow,
  icon,
  action,
  defaultOpen = true,
  children,
}: {
  title: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "vibe-card overflow-hidden p-0 [&_summary::-webkit-details-marker]:hidden",
        title === "BULLETIN BOARD" && "border-[#c49a6c]"
      )}
    >
      <summary className="group flex cursor-pointer list-none items-center justify-between gap-3 rounded-t-[22px] bg-gradient-to-r from-[#ff8a3d] via-[#ff7a33] to-[#f08ad0] px-4 py-3 text-white">
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]">
            {icon}
            {title}
          </span>
          {eyebrow ? (
            <span className="mt-0.5 block text-[11px] font-semibold text-white/80">
              {eyebrow}
            </span>
          ) : null}
        </span>
        <span className="flex items-center gap-2 text-white/90">
          {action}
          <ChevronDown
            className="h-4 w-4 transition group-open:rotate-180"
            aria-hidden
          />
        </span>
      </summary>
      <div
        className={cn(
          "space-y-4 bg-white/95 p-4",
          title === "BULLETIN BOARD" && "bulletin-board rounded-none border-0"
        )}
      >
        {children}
      </div>
    </details>
  );
}

function uniqueItems(items: Array<string | undefined>) {
  return Array.from(
    new Set(items.map((item) => item?.trim()).filter((item): item is string => Boolean(item)))
  );
}

function TeenDetailsTable({ profile }: { profile: Profile }) {
  const clubs = uniqueItems([
    ...(profile.clubs || []),
    profile.details.occupation,
  ]);
  const rows = [
    ["Status", profile.statusMessage || "Keeping it kind."],
    ["Here For", profile.hereFor || "Real friends, school groups, photo sets, and playlists."],
    ["Hometown", profile.hometown || profile.location || "Not shared"],
    ["Zodiac", profile.zodiac || "Not shared"],
    [
      "Education / Grade",
      profile.grade
        ? `Grade ${profile.grade}`
        : profile.details.education?.split(" - ")[1] || "Not shared",
    ],
    ["School", profile.schoolName || profile.details.education?.split(" - ")[0] || "Not shared"],
    ["Clubs & Activities", clubs.length ? clubs.join(", ") : "Not shared"],
  ];

  return (
    <dl className="overflow-hidden rounded-card border border-brand/15 bg-white">
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={cn(
            "grid gap-1 px-3 py-2 text-sm sm:grid-cols-[160px_1fr]",
            index % 2 === 0 ? "bg-brand-soft/40" : "bg-white"
          )}
        >
          <dt className="font-black uppercase tracking-wide text-brand-dark">{label}</dt>
          <dd className="text-navy-800">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function InterestTable({ profile }: { profile: Profile }) {
  const map =
    profile.interestMap && Object.keys(profile.interestMap).length
      ? profile.interestMap
      : {
          General: profile.interests,
          Music: profile.favoriteMusic,
          "Clubs & Activities": profile.clubs || uniqueItems([profile.details.occupation]),
          "Movies / Shows": uniqueItems([profile.details.movies, profile.details.television]),
          Books: uniqueItems([profile.details.books]),
        };
  const entries = Object.entries(map).filter(([, items]) => items.length > 0);

  if (!entries.length) {
    return <p className="text-sm text-navy-500">No interests shared yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-card border border-brand/15 bg-white">
      {entries.map(([category, items], index) => (
        <div
          key={category}
          className={cn(
            "grid gap-2 px-3 py-3 sm:grid-cols-[140px_1fr]",
            index % 2 === 0 ? "bg-white" : "bg-brand-soft/35"
          )}
        >
          <h3 className="text-xs font-black uppercase tracking-wide text-brand-dark">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={`${category}-${item}`} variant="info">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function NowPlaying({
  profile,
  tracks,
}: {
  profile: Profile;
  tracks: MusicTrack[];
}) {
  const featured =
    tracks.find((track) => track.isFeatured) ||
    tracks[0] ||
    (profile.nowPlaying
      ? {
          id: "now-playing",
          profileId: profile.id,
          title: profile.nowPlaying.title,
          artist: profile.nowPlaying.artist,
          audioUrl: "",
          isFeatured: true,
          position: 0,
        }
      : undefined);

  if (!featured) {
    return (
      <div className="rounded-card border border-dashed border-brand/30 bg-white p-4 text-sm text-navy-600">
        Nothing on loop yet. Check back when this profile adds a song.
      </div>
    );
  }

  return (
    <div className="rounded-card border border-brand/15 bg-white p-3">
      <div className="flex gap-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-card border border-surface-border bg-brand-soft text-brand">
          {"coverUrl" in featured && featured.coverUrl ? (
            <img
              src={featured.coverUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Music2 className="h-8 w-8" aria-hidden />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-wide text-brand-dark">
            Featured track
          </p>
          <h3 className="truncate text-lg font-black text-navy-900">{featured.title}</h3>
          <p className="truncate text-sm text-navy-600">{featured.artist}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100">
            <div className="h-full w-2/3 bg-[linear-gradient(90deg,#2b5a9e,#1bb6a8)]" />
          </div>
          {profile.nowPlaying?.externalUrl ? (
            <a
              href={profile.nowPlaying.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold"
            >
              Open playlist
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PhotoSetsGrid({
  albums,
  photos,
}: {
  albums: Album[];
  photos: Photo[];
}) {
  if (!albums.length && !photos.length) {
    return (
      <EmptyState
        icon={ImagePlus}
        title="No photo sets yet"
        description="Photo sets will show here once this profile shares them."
      />
    );
  }

  return (
    <div className="space-y-4">
      {albums.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {albums.map((album) => {
            const albumPhotos = photos.filter((photo) => photo.albumId === album.id);
            const cover =
              photos.find((photo) => photo.id === album.coverPhotoId) || albumPhotos[0];
            return (
              <article
                key={album.id}
                className="overflow-hidden rounded-card border border-brand/15 bg-white shadow-soft"
              >
                <div className="h-28 bg-brand-soft">
                  {cover ? (
                    <img
                      src={cover.url}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="p-3">
                  <h3 className="font-black text-navy-900">{album.title}</h3>
                  <p className="text-xs text-navy-500">
                    {albumPhotos.length} photos - {formatDate(album.createdAt)}
                  </p>
                  {album.description ? (
                    <p className="mt-2 text-sm leading-5 text-navy-700">
                      {album.description}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
      {photos.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.slice(0, 8).map((photo) => (
            <div
              key={photo.id}
              className="group overflow-hidden rounded-card border border-surface-border bg-white text-left shadow-soft transition hover:border-brand/50"
            >
              <img
                src={photo.url}
                alt={photo.caption ?? "Profile photo"}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <span className="block truncate px-2 py-1 text-xs text-navy-600 group-hover:text-brand">
                {photo.caption ?? "Photo"}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FeaturedFriendGrid({
  friends,
  count,
}: {
  friends: Profile[];
  count: 4 | 8 | 12 | 16;
}) {
  const visibleFriends = friends.slice(0, count);
  if (!visibleFriends.length) {
    return (
      <EmptyState
        title="No featured friends yet"
        description="When friends are featured, they will appear in this top-friends grid."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {visibleFriends.map((friend) => (
        <Link
          key={friend.id}
          href={`/profile/${friend.username}`}
          className="group rounded-card border border-brand/15 bg-white p-3 text-center shadow-soft transition hover:border-brand/50 hover:bg-brand-soft"
        >
          <Avatar
            name={friend.displayName}
            src={friend.avatarUrl}
            size="lg"
            online={!friend.ghostMode && friend.onlineStatus === "online"}
            showOnlineIndicator={!friend.ghostMode && friend.showOnlineStatus}
            className="mx-auto bg-white"
          />
          <span className="mt-2 block truncate text-sm font-black text-navy-900 group-hover:text-brand">
            {friend.displayName}
          </span>
          <span className="block truncate text-xs text-navy-500">@{friend.username}</span>
        </Link>
      ))}
    </div>
  );
}

function BlogList({ posts }: { posts: BlogPost[] }) {
  const visiblePosts = posts.slice(0, 3);
  if (!visiblePosts.length) {
    return (
      <EmptyState
        icon={BookOpenText}
        title="No blog posts yet"
        description="When this profile publishes a blog entry, it will be previewed here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {visiblePosts.map((post) => (
        <article
          key={post.id}
          className="rounded-card border border-brand/15 bg-white p-3 shadow-soft"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/blog/${post.id}`}
              className="text-base font-black text-navy-900 hover:text-brand"
            >
              {post.title}
            </Link>
            {post.mood ? <Badge variant="info">{post.mood}</Badge> : null}
          </div>
          <p className="mt-1 text-xs text-navy-500">Posted {formatDate(post.createdAt)}</p>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-navy-700">
            {post.body}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-navy-500">
            {post.currentlyListening ? (
              <span className="inline-flex items-center gap-1">
                <Music2 className="h-3.5 w-3.5 text-brand" aria-hidden />
                {post.currentlyListening}
              </span>
            ) : null}
            <span>{post.commentCount} comments</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function StickerCloud({ profile }: { profile: Profile }) {
  if (!profile.theme.stickers.length) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-10 hidden justify-between px-8 text-3xl sm:flex">
      {profile.theme.stickers.slice(0, 6).map((sticker, index) => (
        <span
          key={`${sticker}-${index}`}
          className="drop-shadow"
          style={{
            transform: `rotate(${index % 2 ? "-" : ""}${8 + index * 4}deg)`,
          }}
        >
          {sticker}
        </span>
      ))}
    </div>
  );
}
