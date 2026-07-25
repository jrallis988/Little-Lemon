"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ReportDialog, type ReportDialogSubmitPayload } from "@/components/ui/ReportDialog";
import { ProfilePageView } from "@/components/profile/ProfilePageView";
import { useAuth } from "@/lib/auth/context";
import {
  addProfileComment,
  deleteProfileComment,
  getOrCreateConversation,
  respondFriendRequest,
  sendFriendRequest,
} from "@/lib/mock/store";
import type { ProfileComment } from "@/lib/types/database";
import {
  Card,
  EmptyNotice,
  LoadingCard,
  VibeShell,
  ensureTheme,
  featuredProfiles,
  friendshipBetween,
  friendshipStatus,
  friendsForProfile,
  profileAssets,
  profileByUsername,
  profileCommentAuthors,
  themeForProfile,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

type ReportTarget = {
  type: "profile" | "comment";
  id: string;
  label: string;
};

function ProfileRouteContent() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const { profile: viewer } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [following, setFollowing] = useState(false);
  const [status, setStatus] = useState("");
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);

  if (!store || !viewer) return <LoadingCard label="Loading profile..." />;

  const target = profileByUsername(store, params.username);
  if (!target) {
    return (
      <EmptyNotice title="Profile not found" actionHref="/browse" actionLabel="Browse people">
        That Vibe profile may have moved, changed usernames, or never existed.
      </EmptyNotice>
    );
  }

  const theme = ensureTheme(themeForProfile(store, target.id));
  const assets = profileAssets(store, target.id);
  const friendProfiles = friendsForProfile(store, viewer.id);
  const isFriend = friendProfiles.some((friend) => friend.id === target.id);
  const statusValue = friendshipStatus(store, viewer.id, target.id);
  const commentAuthors = profileCommentAuthors(store, assets.comments);

  function handleAcceptFriend() {
    const friendship = friendshipBetween(store!, viewer!.id, target!.id);
    if (!friendship) return;
    respondFriendRequest(friendship.id, true);
    setStatus("Friend request accepted.");
    refresh();
  }

  function handleReport(payload: ReportDialogSubmitPayload) {
    setStatus(`Report submitted for ${payload.targetType}: ${payload.reason}`);
  }

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#0f2744]">{target.display_name}</h1>
          <p className="text-sm text-[#5b6b7c]">
            Viewing @{target.username} {following ? "- following" : ""}
          </p>
          {status ? <p className="mt-1 text-sm font-semibold text-[#1f7a4d]">{status}</p> : null}
        </div>
        {target.id !== viewer.id ? (
          <Button
            variant="danger"
            onClick={() => {
              setReportTarget({
                type: "profile",
                id: target.id,
                label: `${target.display_name}'s profile`,
              });
            }}
          >
            Report profile
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              router.push("/profile/edit");
            }}
          >
            Edit my profile
          </Button>
        )}
      </Card>

      <ProfilePageView
        profile={target}
        theme={theme}
        tracks={assets.tracks}
        featuredFriendProfiles={featuredProfiles(store, target)}
        albums={assets.albums}
        photos={assets.photos}
        blogPosts={assets.blogPosts}
        comments={assets.comments}
        commentAuthors={commentAuthors}
        photoComments={assets.photoComments}
        isOwn={target.id === viewer.id}
        isFriend={isFriend}
        friendshipStatus={statusValue}
        onAddFriend={() => {
          const result = sendFriendRequest(viewer.id, target.id);
          setStatus(result.error ?? "Friend request sent.");
          refresh();
        }}
        onAcceptFriend={handleAcceptFriend}
        onMessage={() => {
          const conversationId = getOrCreateConversation(viewer.id, target.id);
          router.push(`/messages/${conversationId}`);
        }}
        onFollow={() => {
          setFollowing((value) => !value);
          setStatus(following ? "Stopped following this profile." : "Following this profile.");
        }}
        onAddComment={(body) => {
          addProfileComment(target.id, viewer.id, body);
          setStatus("Comment posted.");
          refresh();
        }}
        onDeleteComment={(comment: ProfileComment) => {
          deleteProfileComment(comment.id, target.id);
          setStatus("Comment deleted.");
          refresh();
        }}
        onReportComment={(comment: ProfileComment) => {
          setReportTarget({
            type: "comment",
            id: comment.id,
            label: "profile comment",
          });
        }}
      />

      <ReportDialog
        isOpen={Boolean(reportTarget)}
        targetType={reportTarget?.type ?? "profile"}
        targetId={reportTarget?.id}
        targetLabel={reportTarget?.label}
        onClose={() => setReportTarget(null)}
        onSubmit={handleReport}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <VibeShell className="max-w-none px-0 py-0">
      <ProfileRouteContent />
    </VibeShell>
  );
}
