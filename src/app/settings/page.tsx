"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PrivacySelector } from "@/components/ui/PrivacySelector";
import { useAuth } from "@/lib/auth/context";
import {
  blockUser,
  mutateStore,
  updatePrivacy,
  updateProfile as updateProfileInStore,
} from "@/lib/mock/store";
import type { PrivacySettings } from "@/lib/types/database";
import {
  Card,
  LoadingCard,
  VibeShell,
  ProfileListItem,
  SectionTitle,
  downloadJson,
  profileById,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function selectClass() {
  return "mt-1.5 block min-h-9 w-full rounded-[4px] border border-[#c5d0dc] bg-white px-3 py-2 text-sm text-[#0f2744]";
}

function SettingsContent() {
  const router = useRouter();
  const { user, profile, refresh: refreshAuth, logout } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [blockId, setBlockId] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user || !profile) return;
    setEmail(user.email);
    setDisplayName(profile.display_name);
  }, [profile, user]);

  if (!user || !profile || !store) return <LoadingCard label="Loading settings..." />;
  const currentProfile = profile;

  const privacy = store.privacy.find((item) => item.profile_id === profile.id) as
    | PrivacySettings
    | undefined;
  const blocked = store.blocks
    .filter((item) => item.blocker_id === profile.id)
    .map((item) => ({ block: item, profile: profileById(store, item.blocked_id) }))
    .filter((item) => item.profile);
  const blockCandidates = store.profiles.filter(
    (candidate) =>
      candidate.id !== profile.id && !store.blocks.some((block) => block.blocker_id === profile.id && block.blocked_id === candidate.id)
  );

  function refreshAll(message: string) {
    refresh();
    refreshAuth();
    setStatus(message);
  }

  function patchPrivacy(patch: Partial<PrivacySettings>, message: string) {
    if (!privacy) return;
    updatePrivacy(currentProfile.id, patch);
    refreshAll(message);
  }

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#0f2744]">Settings</h1>
        <p className="mt-2 text-sm text-[#5b6b7c]">
          Manage your account, privacy, notifications, blocks, and mock account lifecycle.
        </p>
        {status ? <p className="mt-3 text-sm font-semibold text-[#1f7a4d]">{status}</p> : null}
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Account info" />
          <div className="space-y-4">
            <Input
              id="settings-email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="settings-display-name"
              label="Display name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
            <Button
              onClick={() => {
                mutateStore((current) => {
                  const currentUser = current.users.find((item) => item.id === user.id);
                  if (currentUser) {
                    const oldEmail = currentUser.email;
                    currentUser.email = email;
                    currentUser.updated_at = new Date().toISOString();
                    if (current.passwords[oldEmail] && oldEmail !== email) {
                      current.passwords[email] = current.passwords[oldEmail];
                      delete current.passwords[oldEmail];
                    }
                  }
                });
                updateProfileInStore(profile.id, { display_name: displayName });
                refreshAll("Account info saved.");
              }}
            >
              Save account info
            </Button>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Password change" />
          <div className="space-y-4">
            <Input
              id="settings-current-password"
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
            <Input
              id="settings-new-password"
              label="New password"
              type="password"
              minLength={8}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <Button
              onClick={() => {
                if (!newPassword || newPassword.length < 8) {
                  setStatus("Choose a new password with at least 8 characters.");
                  return;
                }
                if (store.passwords[user.email] !== currentPassword) {
                  setStatus("Current password does not match the mock store.");
                  return;
                }
                mutateStore((current) => {
                  current.passwords[user.email] = newPassword;
                });
                setCurrentPassword("");
                setNewPassword("");
                refreshAll("Password changed in the mock store.");
              }}
            >
              Change password
            </Button>
          </div>
        </Card>

        {privacy ? (
          <>
            <Card>
              <SectionTitle title="Notification preferences" />
              <div className="grid gap-3">
                {[
                  ["email_notifications", "Email notifications"],
                  ["push_notifications", "Push notifications"],
                  ["notify_friend_requests", "Friend requests"],
                  ["notify_messages", "Messages"],
                  ["notify_comments", "Comments"],
                  ["notify_reactions", "Reactions"],
                ].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 text-sm font-semibold text-[#0f2744]">
                    <input
                      type="checkbox"
                      checked={Boolean(privacy[key as keyof PrivacySettings])}
                      onChange={(event) =>
                        patchPrivacy(
                          { [key]: event.target.checked } as Partial<PrivacySettings>,
                          `${label} updated.`
                        )
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle title="Privacy" />
              <div className="grid gap-4">
                <PrivacySelector
                  id="profile-visibility"
                  label="Profile visibility"
                  value={privacy.profile_visibility}
                  onChange={(value) => patchPrivacy({ profile_visibility: value }, "Profile visibility saved.")}
                />
                <PrivacySelector
                  id="photos-visibility"
                  label="Who can view photos"
                  value={privacy.photos_visibility}
                  onChange={(value) => patchPrivacy({ photos_visibility: value }, "Photo visibility saved.")}
                />
                <label className="text-sm font-semibold text-[#0f2744]" htmlFor="friend-requests-from">
                  Who can friend me
                  <select
                    id="friend-requests-from"
                    value={privacy.friend_requests_from}
                    onChange={(event) =>
                      patchPrivacy(
                        {
                          friend_requests_from: event.target
                            .value as PrivacySettings["friend_requests_from"],
                        },
                        "Friend request privacy saved."
                      )
                    }
                    className={selectClass()}
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends_of_friends">Friends of friends</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#0f2744]" htmlFor="messages-from">
                  Who can message me
                  <select
                    id="messages-from"
                    value={privacy.messages_from}
                    onChange={(event) =>
                      patchPrivacy(
                        { messages_from: event.target.value as PrivacySettings["messages_from"] },
                        "Message privacy saved."
                      )
                    }
                    className={selectClass()}
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </label>
                <label className="text-sm font-semibold text-[#0f2744]" htmlFor="comments-from">
                  Who can comment
                  <select
                    id="comments-from"
                    value={privacy.comments_from}
                    onChange={(event) =>
                      patchPrivacy(
                        { comments_from: event.target.value as PrivacySettings["comments_from"] },
                        "Comment privacy saved."
                      )
                    }
                    className={selectClass()}
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-[#0f2744]">
                  <input
                    type="checkbox"
                    checked={privacy.show_online_status}
                    onChange={(event) =>
                      patchPrivacy({ show_online_status: event.target.checked }, "Online status privacy saved.")
                    }
                  />
                  Show online status
                </label>
              </div>
            </Card>
          </>
        ) : null}

        <Card>
          <SectionTitle title="Blocked users" />
          <div className="space-y-3">
            <label className="text-sm font-semibold text-[#0f2744]" htmlFor="block-user">
              Add blocked user
              <select
                id="block-user"
                value={blockId}
                onChange={(event) => setBlockId(event.target.value)}
                className={selectClass()}
              >
                <option value="">Select a profile</option>
                {blockCandidates.map((candidate) => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.display_name}
                  </option>
                ))}
              </select>
            </label>
            <Button
              variant="secondary"
              onClick={() => {
                if (!blockId) {
                  setStatus("Choose a user to block.");
                  return;
                }
                blockUser(profile.id, blockId);
                setBlockId("");
                refreshAll("User blocked.");
              }}
            >
              Block selected user
            </Button>
            <div className="space-y-2">
              {blocked.length === 0 ? (
                <p className="text-sm text-[#5b6b7c]">No blocked users.</p>
              ) : (
                blocked.map((item) => (
                  <ProfileListItem
                    key={item.block.id}
                    profile={item.profile!}
                    action={
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          mutateStore((current) => {
                            current.blocks = current.blocks.filter((block) => block.id !== item.block.id);
                          });
                          refreshAll("User unblocked.");
                        }}
                      >
                        Unblock
                      </Button>
                    }
                  />
                ))
              )}
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Data export" />
          <p className="text-sm text-[#5b6b7c]">
            Download a JSON snapshot of your profile, privacy, friends, posts, messages, and notifications.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              const exportData = {
                user,
                profile,
                privacy,
                friendships: store.friendships.filter(
                  (item) => item.requester_id === profile.id || item.addressee_id === profile.id
                ),
                notifications: store.notifications.filter((item) => item.recipient_id === profile.id),
                blogPosts: store.blogPosts.filter((item) => item.profile_id === profile.id),
                messages: store.messages.filter((message) =>
                  store.conversationMembers.some(
                    (member) =>
                      member.profile_id === profile.id &&
                      member.conversation_id === message.conversation_id
                  )
                ),
              };
              downloadJson(`${profile.username}-vibe-export.json`, exportData);
              setStatus("Data export downloaded.");
            }}
          >
            Download my data
          </Button>
        </Card>

        <Card>
          <SectionTitle title="Account deactivation" />
          <p className="text-sm text-[#5b6b7c]">
            Deactivation marks your mock account inactive without removing your data.
          </p>
          <Button
            className="mt-4"
            variant={user.is_active ? "danger" : "secondary"}
            onClick={() => {
              const active = !user.is_active;
              mutateStore((current) => {
                const currentUser = current.users.find((item) => item.id === user.id);
                if (currentUser) {
                  currentUser.is_active = active;
                  currentUser.deactivated_at = active ? null : new Date().toISOString();
                }
                const currentProfile = current.profiles.find((item) => item.id === profile.id);
                if (currentProfile) currentProfile.online_status = active ? "online" : "offline";
              });
              refreshAll(active ? "Account reactivated." : "Account deactivated.");
            }}
          >
            {user.is_active ? "Deactivate account" : "Reactivate account"}
          </Button>
        </Card>

        <Card className="border-[#b42318]/40">
          <SectionTitle title="Account deletion" />
          <p className="text-sm text-[#5b6b7c]">
            Type DELETE to remove this mock account and related local data.
          </p>
          <Input
            id="delete-confirm"
            label="Confirmation"
            value={deleteConfirm}
            onChange={(event) => setDeleteConfirm(event.target.value)}
            placeholder="DELETE"
          />
          <Button
            className="mt-4"
            variant="danger"
            onClick={async () => {
              if (deleteConfirm !== "DELETE") {
                setStatus("Type DELETE to confirm account deletion.");
                return;
              }
              mutateStore((current) => {
                current.users = current.users.filter((item) => item.id !== user.id);
                current.profiles = current.profiles.filter((item) => item.id !== profile.id);
                current.themes = current.themes.filter((item) => item.profile_id !== profile.id);
                current.friendships = current.friendships.filter(
                  (item) => item.requester_id !== profile.id && item.addressee_id !== profile.id
                );
                current.featuredFriends = current.featuredFriends.filter(
                  (item) => item.profile_id !== profile.id && item.friend_profile_id !== profile.id
                );
                current.notifications = current.notifications.filter(
                  (item) => item.recipient_id !== profile.id && item.actor_id !== profile.id
                );
                current.blocks = current.blocks.filter(
                  (item) => item.blocker_id !== profile.id && item.blocked_id !== profile.id
                );
                delete current.passwords[user.email];
              });
              await logout();
              router.push("/signup");
            }}
          >
            Delete account
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <VibeShell>
      <SettingsContent />
    </VibeShell>
  );
}
