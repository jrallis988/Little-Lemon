"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flag, Lock, Music2, UserPlus } from "lucide-react";

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
import { BlogPreview } from "@/components/profile/BlogPreview";
import { FeaturedFriends } from "@/components/profile/FeaturedFriends";
import { PhotoGallery } from "@/components/profile/PhotoGallery";
import { ProfileComments } from "@/components/profile/ProfileComments";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMusicPlayer } from "@/components/profile/ProfileMusicPlayer";
import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
      <Card className="mp-profile-module">
        <CardHeader>
          <CardTitle>About {profile.displayName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="whitespace-pre-wrap text-sm leading-6 text-navy-800">
            {profile.details.aboutMe || profile.bio || "No about-me note yet."}
          </p>
          {profile.details.whoIdLikeToMeet ? (
            <div className="rounded-card border border-surface-border bg-surface-muted p-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                Who I&apos;d like to meet
              </h3>
              <p className="mt-1 text-sm leading-6 text-navy-700">
                {profile.details.whoIdLikeToMeet}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  if (moduleId === "details") {
    return (
      <ProfileDetails
        details={profile.details}
        interests={[]}
        favoriteMusic={[]}
        className="mp-profile-module"
      />
    );
  }

  if (moduleId === "interests") {
    return (
      <Card className="mp-profile-module">
        <CardHeader>
          <CardTitle>Interests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BadgeCloud title="Interests" items={profile.interests} />
          <BadgeCloud
            title="Favorite Music"
            items={profile.favoriteMusic}
            icon={<Music2 className="h-4 w-4" aria-hidden />}
          />
        </CardContent>
      </Card>
    );
  }

  if (moduleId === "music") {
    return <ProfileMusicPlayer tracks={tracks} className="mp-profile-module" />;
  }

  if (moduleId === "photos") {
    if (photosLocked) {
      return (
        <Card className="mp-profile-module">
          <CardContent>
            <EmptyState
              icon={Lock}
              title="Photos are friends-only"
              description="Become friends to view this member's photo albums."
            />
          </CardContent>
        </Card>
      );
    }
    return (
      <PhotoGallery
        albums={albums}
        photos={photos}
        onReportPhoto={(photo) => onReport("photo", photo.id)}
        className="mp-profile-module"
      />
    );
  }

  if (moduleId === "blog") {
    return (
      <BlogPreview
        posts={posts}
        author={profile}
        limit={3}
        className="mp-profile-module"
      />
    );
  }

  if (moduleId === "friends") {
    return (
      <FeaturedFriends
        friends={featuredFriends}
        count={profile.featuredFriendCount}
        className="mp-profile-module"
      />
    );
  }

  return (
    <ProfileComments
      comments={comments}
      authors={authors}
      currentUser={currentProfile}
      isProfileOwner={isOwner}
      canComment={canComment}
      onSubmit={onSubmitComment}
      onDelete={onDeleteComment}
      onReport={(comment) => onReport("comment", comment.id)}
      className="mp-profile-module"
    />
  );
}

function BadgeCloud({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy-700">
        {icon}
        {title}
      </h3>
      {items.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge key={item} variant="info">
              {item.trim()}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-navy-500">Nothing shared yet.</p>
      )}
    </section>
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
