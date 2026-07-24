"use client";

import * as React from "react";
import { Download, KeyRound, LogOut, Shield, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PrivacySelector } from "@/components/profile/PrivacySelector";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { profileByUserId, useMockStore } from "@/lib/mock/social";
import type { Profile, Visibility } from "@/lib/types";

type Prefs = {
  emailMessages: boolean;
  emailComments: boolean;
  pushFriendRequests: boolean;
  weeklyDigest: boolean;
};

const defaultPrefs: Prefs = {
  emailMessages: true,
  emailComments: true,
  pushFriendRequests: true,
  weeklyDigest: false,
};

export default function SettingsPage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <SettingsContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function SettingsContent() {
  const { user, profile, logout } = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const liveProfile =
    state.profiles.find((item) => item.userId === profile?.userId) ?? profile;
  const [prefs, setPrefs] = React.useState<Prefs>(defaultPrefs);
  const [passwords, setPasswords] = React.useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [privacy, setPrivacy] = React.useState(() => profileToPrivacy(liveProfile));
  const [notice, setNotice] = React.useState<string | null>(null);
  const [confirmAction, setConfirmAction] = React.useState<"deactivate" | "delete" | null>(
    null
  );

  React.useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const raw = localStorage.getItem("myplace-notification-prefs");
    if (raw) setPrefs({ ...defaultPrefs, ...JSON.parse(raw) });
  }, []);

  React.useEffect(() => {
    setPrivacy(profileToPrivacy(liveProfile));
  }, [liveProfile]);

  if (!user || !liveProfile) return null;

  const updatePrefs = (patch: Partial<Prefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("myplace-notification-prefs", JSON.stringify(next));
    }
    setNotice("Notification preferences saved.");
  };

  const changePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwords.next.length < 8) {
      setNotice("New password must be at least 8 characters.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setNotice("New passwords do not match.");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    setNotice("Password updated (mock).");
  };

  const savePrivacy = () => {
    mockApi.updateProfile(user.id, privacy);
    setNotice("Privacy settings saved.");
  };

  const exportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      user,
      profile: liveProfile,
      notificationPrefs: prefs,
      blockedIds: state.blockedIds,
      conversations: state.conversations.filter((conversation) =>
        conversation.memberIds.includes(user.id)
      ),
      messages: state.messages.filter((message) =>
        state.conversations.some(
          (conversation) =>
            conversation.id === message.conversationId &&
            conversation.memberIds.includes(user.id)
        )
      ),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `myplace-${liveProfile.username}-export.json`;
    anchor.click();
    URL.revokeObjectURL(href);
    setNotice("Data export downloaded.");
  };

  const confirmDanger = async () => {
    const action = confirmAction;
    setConfirmAction(null);
    if (!action) return;
    await logout();
    mockApi.logout();
    window.alert(
      action === "delete"
        ? "Account deletion requested (mock). You have been logged out."
        : "Account deactivated (mock). You have been logged out."
    );
    router.push("/login");
  };

  const blockedProfiles = state.blockedIds
    .map((id) => profileByUserId(state.profiles, id))
    .filter((item): item is Profile => Boolean(item));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Settings</h1>
        <p className="text-sm text-navy-600">
          Manage your account, privacy, notifications, safety, and data.
        </p>
      </div>

      {notice ? (
        <div className="rounded-card border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-dark">
          {notice}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar
                  name={liveProfile.displayName}
                  src={liveProfile.avatarUrl}
                  size="lg"
                />
                <div>
                  <p className="font-bold text-navy-900">{liveProfile.displayName}</p>
                  <p className="text-sm text-navy-600">@{user.username}</p>
                  <p className="text-sm text-navy-600">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={changePassword} className="grid gap-3 sm:grid-cols-3">
                <Input
                  label="Current password"
                  type="password"
                  value={passwords.current}
                  onChange={(event) =>
                    setPasswords((current) => ({
                      ...current,
                      current: event.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label="New password"
                  type="password"
                  value={passwords.next}
                  onChange={(event) =>
                    setPasswords((current) => ({
                      ...current,
                      next: event.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label="Confirm password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(event) =>
                    setPasswords((current) => ({
                      ...current,
                      confirm: event.target.value,
                    }))
                  }
                  required
                />
                <Button type="submit" className="sm:col-span-3 sm:w-fit">
                  <KeyRound className="h-4 w-4" aria-hidden />
                  Change password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <PrivacySelector
                label="Profile visibility"
                value={privacy.visibility}
                onChange={(value) => setPrivacy((current) => ({ ...current, visibility: value }))}
              />
              <PrivacySelector
                label="Who can friend you"
                value={privacy.whoCanFriend}
                onChange={(value) =>
                  setPrivacy((current) => ({ ...current, whoCanFriend: value }))
                }
              />
              <PrivacySelector
                label="Who can message you"
                value={privacy.whoCanMessage}
                onChange={(value) =>
                  setPrivacy((current) => ({ ...current, whoCanMessage: value }))
                }
              />
              <PrivacySelector
                label="Who can comment"
                value={privacy.whoCanComment}
                onChange={(value) =>
                  setPrivacy((current) => ({ ...current, whoCanComment: value }))
                }
              />
              <PrivacySelector
                label="Who can view photos"
                value={privacy.whoCanViewPhotos}
                onChange={(value) =>
                  setPrivacy((current) => ({ ...current, whoCanViewPhotos: value }))
                }
              />
              <label className="flex items-center gap-2 rounded-card border border-surface-border bg-white p-3 text-sm font-semibold text-navy-800">
                <input
                  type="checkbox"
                  checked={privacy.showOnlineStatus}
                  onChange={(event) =>
                    setPrivacy((current) => ({
                      ...current,
                      showOnlineStatus: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-brand"
                />
                Show online status
              </label>
              <Button onClick={savePrivacy}>
                <Shield className="h-4 w-4" aria-hidden />
                Save privacy
              </Button>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Toggle
                label="Email me about messages"
                checked={prefs.emailMessages}
                onChange={(value) => updatePrefs({ emailMessages: value })}
              />
              <Toggle
                label="Email me about comments"
                checked={prefs.emailComments}
                onChange={(value) => updatePrefs({ emailComments: value })}
              />
              <Toggle
                label="Push friend requests"
                checked={prefs.pushFriendRequests}
                onChange={(value) => updatePrefs({ pushFriendRequests: value })}
              />
              <Toggle
                label="Weekly digest"
                checked={prefs.weeklyDigest}
                onChange={(value) => updatePrefs({ weeklyDigest: value })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blocked users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {blockedProfiles.length ? (
                blockedProfiles.map((blocked) => (
                  <div
                    key={blocked.id}
                    className="flex items-center gap-2 rounded-card border border-surface-border bg-white p-2"
                  >
                    <Avatar
                      name={blocked.displayName}
                      src={blocked.avatarUrl}
                      size="sm"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-900">
                      {blocked.displayName}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        mockApi.unblockUser(blocked.userId);
                        setNotice(`${blocked.displayName} was unblocked.`);
                      }}
                    >
                      Unblock
                    </Button>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No blocked users"
                  description="Blocked members will appear here."
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & account status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full" onClick={exportData}>
                <Download className="h-4 w-4" aria-hidden />
                Download JSON export
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setConfirmAction("deactivate")}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Deactivate account
              </Button>
              <Button
                variant="danger"
                className="w-full"
                onClick={() => setConfirmAction("delete")}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Delete account
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog
        open={Boolean(confirmAction)}
        onClose={() => setConfirmAction(null)}
        title={
          confirmAction === "delete" ? "Delete account?" : "Deactivate account?"
        }
        description="This is a mock action for the demo, but it will log you out."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmAction(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => void confirmDanger()}>
              Confirm
            </Button>
          </div>
        }
      >
        <p className="text-sm leading-6 text-navy-700">
          {confirmAction === "delete"
            ? "Your account would be scheduled for deletion in production."
            : "Your account would be hidden until you sign in again in production."}
        </p>
      </Dialog>
    </div>
  );
}

function profileToPrivacy(profile?: Profile | null): {
  visibility: Visibility;
  whoCanFriend: Visibility;
  whoCanMessage: Visibility;
  whoCanComment: Visibility;
  whoCanViewPhotos: Visibility;
  showOnlineStatus: boolean;
} {
  return {
    visibility: profile?.visibility ?? "public",
    whoCanFriend: profile?.whoCanFriend ?? "public",
    whoCanMessage: profile?.whoCanMessage ?? "friends",
    whoCanComment: profile?.whoCanComment ?? "friends",
    whoCanViewPhotos: profile?.whoCanViewPhotos ?? "public",
    showOnlineStatus: profile?.showOnlineStatus ?? true,
  };
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-card border border-surface-border bg-white p-3 text-sm font-semibold text-navy-800">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-brand"
      />
    </label>
  );
}
